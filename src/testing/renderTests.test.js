/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
import { Provider } from 'react-redux';
import MainDisplay from '../components/mainPage/MainDisplay'
import { DisplayToday, DisplayTodo, DisplayWall, DisplayNotes, DisplayCalendar } from '../components/mainPage/subitems'
import { UserDetails,UserDisplay,UserFriends } from '../components/user';

jest.mock('../components/calandar/appointment/Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/calandar/event/Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/calandar/reminder/Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/items/todo/Todo', () => ({ title, value, items }) => (
    <div data-testid="mocked-Todo">
        <h3>title</h3>
        <p>value</p>
        <ul>
            {items.map((todo, index) => (
                <li key={index}>
                    {todo.value} - {todo.state ? 'Completed' : 'Incomplete'}
                </li>
            ))}
        </ul>
    </div>
));
jest.mock('../components/items/note/Note', () => ({ value, title, owner, date }) => (
    <div data-testid="mocked-note">
        <h3>{title}</h3>
        <p>{value}</p>
        <p>{owner}</p>
        <p>{date}</p>
    </div>
));

const date = new Date() // todays date so that all items appear as today that have dates

const dummyStore = {
    calendar: [
        { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 },
    ],
    items: [
        {
            id: 1,
            type: 'Todo',
            title: "Todo list",
            todoItems: [
                { value: 'foo', state: true },
                { value: 'bar', state: false },
                { value: 'baz', state: false },
            ]
        }
    ],
    notes: [
        { id: 1, title: 'hello1', value: 'foo' },
        { id: 2, title: 'hello2', value: 'bar' },
        { id: 3, title: 'hello3', value: 'baz' },
    ],
    wall: [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
        { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
        { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: date.setHours(3, 0) },
    ],
    user: {
        displayName:'alice',
        telephoneNumber:'07123 456789',
        email:'foo@bar.baz',
        friends:[
            {name:'bob',status:'friend'},
            {name:'charlie',status:'unfollow'},
            {name:'dan',status:'blocked'},
        ],
    },
};
// Component List and tests
// MainDisplay 
describe('MainDisplay', () => {

    it('renders child components', () => {
        // Render the parent component and store its container
        render(<MainDisplay />);

        // - contains DisplayToday
        const displayToday = screen.getByTestId('displayToday');
        expect(displayToday).toBeInTheDocument();
        // - constins DisplayTodo
        const displayTodo = screen.getByTestId('displayTodo');
        expect(displayTodo).toBeInTheDocument();
        // - constins DisplayWall

        const displayWall = screen.getByTestId('displayWall');
        expect(displayWall).toBeInTheDocument();

        // - constins DisplayNotes
        const displayNotes = screen.getByTestId('displayNotes');
        expect(displayNotes).toBeInTheDocument();


        const displayCalendar = screen.getByTestId('displayCalendar');
        expect(displayCalendar).toBeInTheDocument();
    });
})
// DisplayToday
// Mocked data for Appointment, Event, and Reminder components


describe('DisplayToday', () => {

    

    const mockStore = configureStore(); // Create a mock Redux store
    let store;

    beforeEach(() => {
        store = mockStore(dummyStore); // Initialize the mock store with initial state
    });

    it('renders DisplayToday with mocked components', () => {
        render(
            <Provider store={store}>
                <DisplayToday />
            </Provider>
        );
        // - has title "Today"
        expect(screen.getByText('Today')).toBeInTheDocument();
        // - contains mocked Appointment
        expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('foo');

        // - contains mocked Event
        expect(screen.getByTestId('mocked-event')).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('baz');
        // - does not contain mocked Appointment for tomorrow
        expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('qux');

        // - does not contain mocked Event for tomorrow
        expect(screen.getByTestId('mocked-event')).toHaveTextContent('quux');

        // - does not contain mocked Reminder for tomorrow
        expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('corge');
    });
});


// DisplayTodo
// Mocked Todo and TodoItem components
describe('DisplayTodo', () => {

    const initialState = {
        items: [
            {
                id: 1,
                type: 'Todo',
                title: "Todo list",
                todoItems: [
                    { value: 'foo', state: true },
                    { value: 'bar', state: false },
                    { value: 'baz', state: false }
                ]
            }
        ]
    };
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders DisplayTodo with mocked Todo and TodoItem components', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <DisplayTodo />
            </Provider>
        );

        // Assert that Todo component is rendered
        const todoComponent = getByTestId('mocked-Todo');
        expect(todoComponent).toBeInTheDocument();

        // Assert that Todo component receives correct props (list of todo items)
        expect(todoComponent).toHaveAttribute('items', initialState.items[0].todoItems);

        // Assert that TodoItem components are properly rendered within Todo component
        const todoItems = screen.getByRole('li');
        expect(todoItems.length).toBe(initialState.items[0].todoItems.length);
        todoItems.forEach((todoItem, index) => {
            const { value, state } = initialState.items[0].todoItems[index];
            expect(todoItem.textContent).toContain(value);
            expect(todoItem.textContent).toContain(state ? 'Completed' : 'Incomplete');
        });
    });
});


// DisplayNotes
describe('DisplayNotes', () => {

    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(dummyStore);
    });

    it('renders DisplayNotes with mocked Note components', () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <DisplayNotes />
            </Provider>
        );
        // - has title "My Notes"
        expect(getByText('Notes')).toBeInTheDocument();
        // - contains mocked Notes
        // Assert that Note components are properly rendered with correct values from the store
        const noteComponents = getByTestId('mocked-note');
        expect(noteComponents.length).toBe(dummyStore.notes.length);

        dummyStore.notes.forEach((note, index) => {
            const noteComponent = noteComponents[index];
            expect(noteComponent).toHaveTextContent(note.title);
            expect(noteComponent).toHaveTextContent(note.value);
        });
    });



});

// DisplayCalendar
describe('DisplayCalendar', () => {

    const mockStore = configureStore(); // Create a mock Redux store
    let store;

    beforeEach(() => {
        store = mockStore(dummyStore); // Initialize the mock store with initial state
    });

    it('renders DisplayCalendar with mocked components', () => {

        render(
            <Provider store={store}>
                <DisplayCalendar />
            </Provider>
        );

        // - has title "Calendar"
        expect(screen.getByText('Calendar')).toBeInTheDocument();

        // - has date range selector
        const dateFrom = screen.getByTestId('dateFrom');
        expect(dateFrom).toBeInTheDocument();

        const dateTo = screen.getByTestId('dateTo');
        expect(dateTo).toBeInTheDocument();

        // - contains mocked Appointment
        expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('foo');

        // - contains mocked Event
        expect(screen.getByTestId('mocked-event')).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('baz');

        // - contains mocked Appointment for tomorrow
        expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('qux');

        // - contains mocked Event for tomorrow
        expect(screen.getByTestId('mocked-event')).toHaveTextContent('quux');

        // - contains mocked Reminder for tomorrow
        expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('corge');
    });
});

// DisplayWall
// - has title "My Wall"

describe("Display Wall", () => {

    it('renders DisplayWall with mocked Todo and TodoItem components', () => {
        const mockStore = configureStore(); // Create a mock Redux store
        let store;
        store = mockStore(dummyStore); // Initialize the mock store with initial state
        render(
            <Provider store={store}>
                <DisplayWall />
            </Provider>
        );
        
        // - has title "Calendar"
        expect(screen.getByText('My Wall')).toBeInTheDocument();
        // - constains mocked Note from user 
        // - contains mocked item from friend
        // - does not contain mocked item not from friend -- handle this in backend
        // displays name title and owner for each item
        const wallComponents = screen.getByTestId('mocked-wallItem');
        dummyStore.wall.forEach((wallItem, index) => {
            const wallComponent = wallComponents[index];
            expect(wallComponent).toHaveTextContent(wallItem.title);
            expect(wallComponent).toHaveTextContent(wallItem.value);
            expect(wallComponent).toHaveTextContent(wallItem.owner);
            // eslint-disable-next-line jest/no-conditional-expect
            if (wallItem.type === 'note') { expect(wallComponent).toHaveTextContent(wallItem.date) }
            else {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(wallComponent).toHaveTextContent(wallItem.dateFrom)
                // eslint-disable-next-line jest/no-conditional-expect
                expect(wallComponent).toHaveTextContent(wallItem.dateTo)
            };


        });
        // - contains add button that calls NewNote 
        const dateFrom = screen.getByTestId('dateFrom');
        expect(dateFrom).toBeInTheDocument();
    });

})

// UserDisplay
describe('UserDisplay', () => {
    const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = mockStore(dummyStore); // Initialize the mock store with initial state
    render(
        <Provider store={store}>
            <UserDisplay />
        </Provider>
    );
    
        
    // - contains UserDetails
    it('renders UserDetails', () => {
        const userDetails = screen.getByTestId('userDetails');
        expect(userDetails).toBeInTheDocument();
    });
    // - constins UserFriends
    it('renders UserFriends', () => {
        const userFriends = screen.getByTestId('userFriends');
        expect(userFriends).toBeInTheDocument();
    });
})
// UserDetails
// - (all tests use a mocked user)
// - displays user display name
// - displays user phone number
// - displays user email
describe('UserDetails', () => {
    const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = mockStore(dummyStore); // Initialize the mock store with initial state
    render(
        <Provider store={store}>
            <UserDetails />
        </Provider>
    );

    it('displays user display name', () => {
        expect(screen.getByLabelText("displayName")).toHaveTextContent(dummyStore.user.displayName);
    });
    it('displays user phone number', () => {
        expect(screen.getByLabelText("phone")).toHaveTextContent(dummyStore.user.telephoneNumber);
    });
    it('displays user email', () => {
        expect(screen.getByLabelText("email")).toHaveTextContent(dummyStore.user.email);
    });
})
// UserFriends
// - has title "Friends"
// - displays friend
// - displays blocked friend as blocked
// - displays unfollowed friend as unfollowed
describe('UserFriends', () => {
    const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = mockStore(dummyStore); // Initialize the mock store with initial state
    render(
        <Provider store={store}>
            <UserFriends />
        </Provider>
    );
    it('displays friend', () => {
        expect(screen.getByLabelText("friends")).toHaveTextContent('bob');
    });
    it('displays blocked friend as blocked', () => {
        expect(screen.getByLabelText("blocked")).toHaveTextContent('charlie');
    });
    it('displays unfollowed friend as unfollowed', () => {
        expect(screen.getByLabelText("unfollowed")).toHaveTextContent('dan');
    });
})