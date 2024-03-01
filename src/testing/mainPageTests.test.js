/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
// import configureStore from 'redux-mock-store';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import MainDisplay from '../components/mainPage/MainDisplay'
import { DisplayToday, DisplayTodo, DisplayWall, DisplayNotes, DisplayCalendar } from '../components/mainPage/subitems'
import { UserDetails, UserDisplay, UserFriends } from '../components/user';




jest.mock('../components/calandar/appointment/Appointment', () => ({ title, value, dateFrom, dateTo, owner }) =>
    <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}, {owner} </div>);
jest.mock('../components/calandar/event/Event', () => ({ title, value, dateFrom, dateTo, owner  }) =>
    <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}, {owner} </div>);
jest.mock('../components/calandar/reminder/Reminder', () => ({ title, value, dateFrom, dateTo, owner  }) =>
    <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}, {owner} </div>);
jest.mock('../components/items/todo/Todo', () => ({ title, value, todoItems, owner  }) => (
    <div data-testid="mocked-Todo">
        <h3>{title}</h3>
        <p>{value}</p>
        <ul>
            {todoItems.map((todo, index) => (
                <li data-testid="mocked-TodoItem" key={index}>
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

const date1 = new Date()
date1.setHours(0, 0, 0, 0);
const tomorrow = new Date(date1.getDate() + 1).toString()
const time1 = new Date().setHours(1).toString()
const time2 = new Date().setHours(2).toString()
const time3 = new Date().setHours(3).toString()
const date = date1.toString()

const dummyStore = {
    calendar: {
        calendarItems: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: tomorrow, dateTo: tomorrow },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: tomorrow, dateTo: tomorrow },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: tomorrow, dateTo: tomorrow },
        ]
    },
    today: {
        calendarItems: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        ]
    },
    items: {
        todos: [
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
            { id: 4, title: 'hello4', value: 'qux' },
        ]
    },
    wall: {
        wallItems: [
            { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: time1 },
            { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: time2 },
            { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: time3 },
        ]
    },
    user: {
        details: {
            displayName: 'alice',
            telephoneNumber: '07123 456789',
            email: 'foo@bar.baz',
        },
        friends: {
            list: [
                { name: 'bob', status: 'friend' },
                { name: 'charlie', status: 'unfollowed' },
                { name: 'dan', status: 'blocked' },
                { name: 'edd', status: 'pending' }
            ]
        },

        authentication: {
            authToken: "1234567890",
            isLoggedIn: true,
            customer_id: 1,
            userAlreadyExists: false,
        },
        pfp: { data: '00 00 00 00' }
    },
};
// Component List and tests
// MainDisplay 
describe('MainDisplay', () => {

    //const mockStore = configureStore();
    beforeEach(() => {
        const store = setupStore(dummyStore);
        render(

            <Provider store={store}>
                <MainDisplay />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('renders child components', () => {
        // Render the parent component and store its container

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



    //////const mockStore = configureStore(); // Create a mock Redux store

    beforeEach(() => {
        const store = setupStore(dummyStore);
        render(

            <Provider store={store}>
                <DisplayToday />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('renders DisplayToday with mocked components', () => {

        // - has title "Today"
        expect(screen.getByText('Today')).toBeInTheDocument();

        // - contains mocked Appointment
        expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('foo');

        // - contains mocked Event
        expect(screen.getByTestId('mocked-event')).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('baz');

        // - does not contain mocked Appointment for tomorrow
        expect(screen.getByTestId('mocked-appointment')).not.toHaveTextContent('qux');

        // - does not contain mocked Event for tomorrow
        expect(screen.getByTestId('mocked-event')).not.toHaveTextContent('quux');

        // - does not contain mocked Reminder for tomorrow
        expect(screen.getByTestId('mocked-reminder')).not.toHaveTextContent('corge');
    });
});


// DisplayTodo
// Mocked Todo and TodoItem components
describe('DisplayTodo', () => {


    beforeEach(() => {
        const store = setupStore(dummyStore);
        render(
            <Provider store={store}>
                <DisplayTodo />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })

    it('renders DisplayTodo with mocked Todo and TodoItem components', () => {

        // Assert that Todo component is rendered
        const todoComponent = screen.getByTestId('mocked-Todo');
        expect(todoComponent).toBeInTheDocument();

        // Count the number of mocked todo items 
        const todoItems = screen.getAllByTestId("mocked-TodoItem");
        expect(todoItems.length).toBe(3);
    });
});


// DisplayNotes
describe('DisplayNotes', () => {

    //const mockStore = configureStore();

    beforeEach(() => {
        const store = setupStore(dummyStore);
        render(

            <Provider store={store}>
                <DisplayNotes />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })

    it('renders DisplayNotes with mocked Note components', () => {
        // - has title "My Notes"
        expect(screen.getByText('Notes')).toBeInTheDocument();
        // - contains mocked Notes
        // Assert that Note components are properly rendered with correct values from the store
        const noteComponents = screen.getAllByTestId('mocked-note');
        expect(noteComponents.length).toBe(4);
        const notes = [
            { id: 1, title: 'hello1', value: 'foo' },
            { id: 2, title: 'hello2', value: 'bar' },
            { id: 3, title: 'hello3', value: 'baz' },
            { id: 4, title: 'hello4', value: 'qux' },
        ]
        notes.forEach((note, index) => {
            const noteComponent = noteComponents[index];
            expect(noteComponent).toHaveTextContent(note.title);
            expect(noteComponent).toHaveTextContent(note.value);
        });
    });



});

// DisplayCalendar
describe('DisplayCalendar', () => {

    //////const mockStore = configureStore(); // Create a mock Redux store


    beforeEach(() => {
        const store = setupStore(dummyStore);
        render(
            <Provider store={store}>
                <DisplayCalendar />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('renders DisplayCalendar with mocked components', () => {



        // - has title "Calendar"
        expect(screen.getByText('Calendar')).toBeInTheDocument();

        // - has date range selector
        const dateFrom = screen.getByTestId('dateFrom');
        expect(dateFrom).toBeInTheDocument();

        const dateTo = screen.getByTestId('dateTo');
        expect(dateTo).toBeInTheDocument();

        // - contains mocked Appointment
        expect(screen.getAllByTestId('mocked-appointment')[0]).toHaveTextContent('foo');

        // - contains mocked Event
        expect(screen.getAllByTestId('mocked-event')[0]).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(screen.getAllByTestId('mocked-reminder')[0]).toHaveTextContent('baz');

        // - contains mocked Appointment for tomorrow
        expect(screen.getAllByTestId('mocked-appointment')[1]).toHaveTextContent('qux');

        // - contains mocked Event for tomorrow
        expect(screen.getAllByTestId('mocked-event')[1]).toHaveTextContent('quux');

        // - contains mocked Reminder for tomorrow
        expect(screen.getAllByTestId('mocked-reminder')[1]).toHaveTextContent('corge');
    });
});

// DisplayWall
// - has title "My Wall"

describe("Display Wall", () => {
    let store;
    store = setupStore(dummyStore); // Initialize the mock store with initial state
    beforeEach(() => {
        render(
            <Provider store={store}>
                <DisplayWall />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('renders DisplayWall with components', () => {
        //////const mockStore = configureStore(); // Create a mock Redux store


        // - has title "Calendar"
        expect(screen.getByText('My Wall')).toBeInTheDocument();
        // - constains mocked Note from user 
        // - contains mocked item from friend
        // - does not contain mocked item not from friend -- handle this in backend
        // displays name title and owner for each item
        const wallComponents = screen.getAllByTestId('wallItem');
        const wallItems = [
            { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: time1 },
            { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: time2 },
            { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: time3 },
        ]
        wallItems.forEach((wallItem, index) => {
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
        const newNote = screen.getByTestId('newNote');
        expect(newNote).toBeInTheDocument();
    });

})

// UserDisplay
describe('UserDisplay', () => {
    ////const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = setupStore(dummyStore); // Initialize the mock store with initial state
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserDisplay />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })


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
    cleanup()
})
// UserDetails
// - (all tests use a mocked user)
// - displays user display name
// - displays user phone number
// - displays user email
describe('UserDetails', () => {
    ////const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = setupStore(dummyStore); // Initialize the mock store with initial state
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserDetails />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('displays user display name', () => {
        expect(screen.getByLabelText("displayName")).toHaveTextContent('alice');
    });
    it('displays user phone number', () => {
        expect(screen.getByLabelText("telephoneNumber")).toHaveTextContent('07123 456789');
    });
    it('displays user email', () => {
        expect(screen.getByLabelText("email")).toHaveTextContent('foo@bar.baz');
    });
    cleanup()
})
// UserFriends
// - has title "Friends"
// - displays friend
// - displays blocked friend as blocked
// - displays unfollowed friend as unfollowed
describe('UserFriends', () => {
    ////const mockStore = configureStore(); // Create a mock Redux store
    let store;
    store = setupStore(dummyStore); // Initialize the mock store with initial state
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserFriends />
            </Provider>
        );
    })
    afterEach(() => {
        cleanup()
    })
    it('renders the title freinds', () => {
        expect(screen.getByText("Friends")).toBeInTheDocument()

    });
    it('displays friend', () => {
        expect(screen.getByLabelText("friends")).toBeInTheDocument()
        expect(screen.getByLabelText("friends")).toHaveTextContent('bob');
    });
    it('displays blocked friend as blocked', () => {
        expect(screen.getByLabelText("blocked")).toBeInTheDocument()
        expect(screen.getByLabelText("blocked")).toHaveTextContent('dan');
    });
    it('displays unfollowed friend as unfollowed', () => {

        expect(screen.getByLabelText("unfollowed")).toBeInTheDocument();
        expect(screen.getByLabelText("unfollowed")).toHaveTextContent('charlie');
    });
})