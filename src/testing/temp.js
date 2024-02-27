/* eslint-disable */
/* eslint-disable testing-library/no-render-in-setup */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
import { Provider } from 'react-redux';
import MainDisplay from '../components/mainPage/MainDisplay'
import { DisplayToday, DisplayTodo, DisplayWall, DisplayNotes, DisplayCalendar } from '../components/mainPage/subitems'
import { Note, NewNote, Todo, NewTodo } from '../components/items'
import { Appointment, NewAppointment, Event, NewEvent, Reminder, NewReminder } from '../components/calandar';


jest.mock('../components/calandar/appointment/Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/calandar/event/Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/calandar/reminder/Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
jest.mock('../components/items/todo/Todo', () => ({ items }) => (
    <div data-testid="mocked-Todo">
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

const initialState = {
    calendar: [
        { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
    ],
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
    ],
    notes: [
        { id: 1, title: 'hello1', value: 'foo' },
        { id: 2, title: 'hello2', value: 'bar' },
        { id: 3, title: 'hello3', value: 'baz' }
    ],
    wall: [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
        { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
        { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: date.setHours(3, 0) }
    ]
};



// Component List and tests
// MainDisplay 
// describe('MainDisplay', () => {

//     it('renders child components', () => {
//         // Render the parent component and store its container
//         render(<MainDisplay />);

//         // - contains DisplayToday
//         const displayToday = screen.getByTestId('displayToday');
//         expect(displayToday).toBeInTheDocument();
//         // - constins DisplayTodo
//         const displayTodo = screen.getByTestId('displayTodo');
//         expect(displayTodo).toBeInTheDocument();
//         // - constins DisplayWall

//         const displayWall = screen.getByTestId('displayWall');
//         expect(displayWall).toBeInTheDocument();

//         // - constins DisplayNotes
//         const displayNotes = screen.getByTestId('displayNotes');
//         expect(displayNotes).toBeInTheDocument();


//         const displayCalendar = screen.getByTestId('displayCalendar');
//         expect(displayCalendar).toBeInTheDocument();
//     });
// })
// // DisplayToday
// // Mocked data for Appointment, Event, and Reminder components


// describe('DisplayToday', () => {

    

//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;

//     beforeEach(() => {
//         store = mockStore(initialState); // Initialize the mock store with initial state
//     });

//     it('renders DisplayToday with mocked components', () => {
//         const { getByTestId, getByText } = render(
//             <Provider store={store}>
//                 <DisplayToday />
//             </Provider>
//         );
//         // - has title "Today"
//         expect(getByText('Today')).toBeInTheDocument();
//         // - contains mocked Appointment
//         expect(getByTestId('mocked-appointment')).toHaveTextContent('foo');

//         // - contains mocked Event
//         expect(getByTestId('mocked-event')).toHaveTextContent('bar');

//         // - contains mocked Reminder
//         expect(getByTestId('mocked-reminder')).toHaveTextContent('baz');
//         // - does not contain mocked Appointment for tomorrow
//         expect(getByTestId('mocked-appointment')).toHaveTextContent('qux');

//         // - does not contain mocked Event for tomorrow
//         expect(getByTestId('mocked-event')).toHaveTextContent('quux');

//         // - does not contain mocked Reminder for tomorrow
//         expect(getByTestId('mocked-reminder')).toHaveTextContent('corge');
//     });
// });


// // DisplayTodo
// // Mocked Todo and TodoItem components
// describe('DisplayTodo', () => {

//     const initialState = {
//         items: [
//             {
//                 id: 1,
//                 type: 'Todo',
//                 title: "Todo list",
//                 todoItems: [
//                     { value: 'foo', state: true },
//                     { value: 'bar', state: false },
//                     { value: 'baz', state: false }
//                 ]
//             }
//         ]
//     };
//     const mockStore = configureStore();
//     let store;

//     beforeEach(() => {
//         store = mockStore(initialState);
//     });

//     it('renders DisplayTodo with mocked Todo and TodoItem components', () => {
//         const { getByTestId } = render(
//             <Provider store={store}>
//                 <DisplayTodo />
//             </Provider>
//         );

//         // Assert that Todo component is rendered
//         const todoComponent = getByTestId('mocked-Todo');
//         expect(todoComponent).toBeInTheDocument();

//         // Assert that Todo component receives correct props (list of todo items)
//         expect(todoComponent).toHaveAttribute('items', initialState.items[0].todoItems);

//         // Assert that TodoItem components are properly rendered within Todo component
//         const todoItems = screen.getByRole('li');
//         expect(todoItems.length).toBe(initialState.items[0].todoItems.length);
//         todoItems.forEach((todoItem, index) => {
//             const { value, state } = initialState.items[0].todoItems[index];
//             expect(todoItem.textContent).toContain(value);
//             expect(todoItem.textContent).toContain(state ? 'Completed' : 'Incomplete');
//         });
//     });
// });


// // DisplayNotes
// describe('DisplayNotes', () => {

//     const mockStore = configureStore();
//     let store;
//     beforeEach(() => {
//         store = mockStore(initialState);
//     });

//     it('renders DisplayNotes with mocked Note components', () => {
//         const { getByTestId, getByText } = render(
//             <Provider store={store}>
//                 <DisplayNotes />
//             </Provider>
//         );
//         // - has title "My Notes"
//         expect(getByText('Notes')).toBeInTheDocument();
//         // - contains mocked Notes
//         // Assert that Note components are properly rendered with correct values from the store
//         const noteComponents = getByTestId('mocked-note');
//         expect(noteComponents.length).toBe(initialState.notes.length);

//         initialState.notes.forEach((note, index) => {
//             const noteComponent = noteComponents[index];
//             expect(noteComponent).toHaveTextContent(note.title);
//             expect(noteComponent).toHaveTextContent(note.value);
//         });
//     });



// });

// // DisplayCalendar
// describe('DisplayCalendar', () => {

//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;

//     beforeEach(() => {
//         store = mockStore(initialState); // Initialize the mock store with initial state
//     });

//     it('renders DisplayCalendar with mocked components', () => {

//         render(
//             <Provider store={store}>
//                 <DisplayCalendar />
//             </Provider>
//         );

//         // - has title "Calendar"
//         expect(screen.getByText('Calendar')).toBeInTheDocument();

//         // - has date range selector
//         const dateFrom = screen.getByTestId('dateFrom');
//         expect(dateFrom).toBeInTheDocument();

//         const dateTo = screen.getByTestId('dateTo');
//         expect(dateTo).toBeInTheDocument();

//         // - contains mocked Appointment
//         expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('foo');

//         // - contains mocked Event
//         expect(screen.getByTestId('mocked-event')).toHaveTextContent('bar');

//         // - contains mocked Reminder
//         expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('baz');

//         // - contains mocked Appointment for tomorrow
//         expect(screen.getByTestId('mocked-appointment')).toHaveTextContent('qux');

//         // - contains mocked Event for tomorrow
//         expect(screen.getByTestId('mocked-event')).toHaveTextContent('quux');

//         // - contains mocked Reminder for tomorrow
//         expect(screen.getByTestId('mocked-reminder')).toHaveTextContent('corge');
//     });
// });

// // DisplayWall
// // - has title "My Wall"

// describe("Display Wall", () => {


//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;

//     beforeEach(() => {
//         store = mockStore(initialState); // Initialize the mock store with initial state
//     });
//     it('renders DisplayWall with mocked Todo and TodoItem components', () => {
        
//         render(
//             <Provider store={store}>
//                 <DisplayWall />
//             </Provider>
//         );
        
//         // - has title "Calendar"
//         expect(screen.getByText('My Wall')).toBeInTheDocument();
//         // - constains mocked Note from user 
//         // - contains mocked item from friend
//         // - does not contain mocked item not from friend -- handle this in backend
//         // displays name title and owner for each item
//         const wallComponents = screen.getByTestId('mocked-wallItem');
//         initialState.wall.forEach((wallItem, index) => {
//             const wallComponent = wallComponents[index];
//             expect(wallComponent).toHaveTextContent(wallItem.title);
//             expect(wallComponent).toHaveTextContent(wallItem.value);
//             expect(wallComponent).toHaveTextContent(wallItem.owner);
//             // eslint-disable-next-line jest/no-conditional-expect
//             if (wallItem.type === 'note') { expect(wallComponent).toHaveTextContent(wallItem.date) }
//             else {
//                 // eslint-disable-next-line jest/no-conditional-expect
//                 expect(wallComponent).toHaveTextContent(wallItem.dateFrom)
//                 // eslint-disable-next-line jest/no-conditional-expect
//                 expect(wallComponent).toHaveTextContent(wallItem.dateTo)
//             };


//         });
//         // - contains add button that calls NewNote 
//         const dateFrom = screen.getByTestId('dateFrom');
//         expect(dateFrom).toBeInTheDocument();
//     });

// })

// // UserDisplay
// describe('UserDisplay', () => {
//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;
//     store = mockStore(dummyStore); // Initialize the mock store with initial state
//     render(
//         <Provider store={store}>
//             <UserDisplay />
//         </Provider>
//     );
    
        
//     // - contains UserDetails
//     it('renders UserDetails', () => {
//         const userDetails = screen.getByTestId('userDetails');
//         expect(userDetails).toBeInTheDocument();
//     });
//     // - constins UserFriends
//     it('renders UserFriends', () => {
//         const userFriends = screen.getByTestId('userFriends');
//         expect(userFriends).toBeInTheDocument();
//     });
// })
// // UserDetails
// // - (all tests use a mocked user)
// // - displays user display name
// // - displays user phone number
// // - displays user email
// describe('UserDetails', () => {
//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;
//     store = mockStore(dummyStore); // Initialize the mock store with initial state
//     render(
//         <Provider store={store}>
//             <UserDetails />
//         </Provider>
//     );

//     it('displays user display name', () => {
//         expect(screen.getByLabelText("displayName")).toHaveTextContent(dummyStore.user.displayName);
//     });
//     it('displays user phone number', () => {
//         expect(screen.getByLabelText("phone")).toHaveTextContent(dummyStore.user.telephoneNumber);
//     });
//     it('displays user email', () => {
//         expect(screen.getByLabelText("email")).toHaveTextContent(dummyStore.user.email);
//     });
// })
// // UserFriends
// // - has title "Friends"
// // - displays friend
// // - displays blocked friend as blocked
// // - displays unfollowed friend as unfollowed
// describe('UserFriends', () => {
//     const mockStore = configureStore(); // Create a mock Redux store
//     let store;
//     store = mockStore(dummyStore); // Initialize the mock store with initial state
//     render(
//         <Provider store={store}>
//             <UserFriends />
//         </Provider>
//     );
//     it('displays friend', () => {
//         expect(screen.getByLabelText("friends")).toHaveTextContent('bob');
//     });
//     it('displays blocked friend as blocked', () => {
//         expect(screen.getByLabelText("blocked")).toHaveTextContent('charlie');
//     });
//     it('displays unfollowed friend as unfollowed', () => {
//         expect(screen.getByLabelText("unfollowed")).toHaveTextContent('dan');
//     });
// })
// all components below heve these tests:
// - has textbox labelled "notes" 
// - state update for "notes"
// - has textbox labelled "title"
// - state update for "title"
// - has confirm button
// - has cancel button
// - cancel gracefully closes form

// function boilerplateTests(Component, componentName, componentTitle) {
//     describe(`Boilerplate tests for ${componentName}`, () => {
//         const notes = 'foo';
//         const title = 'bar'

//         beforeEach(() => {
//             // Render the parent component and store its container
//             ({ getByLabelText, getByTestId, container, getByText } = render(<Component notes={notes} title={title} />));

//         });
//         it(`has header "${componentTitle}"`, () => {
//             expect(getByText(componentTitle)).toBeInTheDocument();
//         });
//         it('has textbox labelled "notes" ', () => {
//             expect(getByLabelText("notes")).toHaveTextContent(notes);
//         });
//         it('has textbox labelled "title" ', () => {
//             expect(getByLabelText("title")).toHaveTextContent(title);
//         });
//         it('state update for "notes"', () => {

//             // Initial state assertion
//             const textbox = getByTestId('notes');
//             expect(textbox.value).toBe(notes);

//             // Simulate typing into the textbox
//             fireEvent.change(textbox, { target: { value: 'baz' } });

//             // Assert that the state has changed as expected
//             expect(textbox.value).toBe('baz');

//             // Assert that the state has changed as expected
//             expect(getByTestId('notes').textContent).toBe('baz');
//         });
//         it('state update for "title"', () => {
//             // Initial state assertion
//             const textbox = getByTestId('title');
//             expect(textbox.value).toBe(notes);

//             // Simulate typing into the textbox
//             fireEvent.change(textbox, { target: { value: 'baz' } });

//             // Assert that the state has changed as expected
//             expect(textbox.value).toBe('baz');

//             // Assert that the state has changed as expected
//             expect(getByTestId('notes').textContent).toBe('baz');
//         });
//         it('has confirm button"', () => {
//             const testElement = screen.getByTestId('confirmButton');
//             expect(testElement).toBeInTheDocument();
//         });
//         it('has cancel button ', () => {
//             const testElement = screen.getByTestId('cancelButton');
//             expect(testElement).toBeInTheDocument();
//         });
//         // it('cancel gracefully closes form', () => {

//         // });

//     });
// }
// // NewNote
// // - has title - "Note"
// boilerplateTests(NewNote, 'NewNote', 'Note')

// // - has button labelled "share"
// describe('NewNote specific', () => {
//     const notes = 'foo';
//     const title = 'bar';
//     // Render the parent component and store its container

//     it('has share button"', () => {
//         const { container } = render(<NewNote notes={notes} title={title} date={date} />);
//         const testElement = screen.getByTestId('shareButton');
//         expect(testElement).toBeInTheDocument();
//     });
// })
// // NewReminder
// // - has title - "Reminder"
// boilerplateTests(NewReminder, 'NewReminder', "Reminder")

// // - has button labelled "share"
// describe('NewReminder specific', () => {
//     const notes = 'foo';
//     const title = 'bar';
//     // Render the parent component and store its container

//     it('has share button"', () => {
//         const { container } = render(<NewReminder notes={notes} title={title} dateFrom={date} dateTo={date} />);
//         const testElement = screen.getByTestId('shareButton');
//         expect(testElement).toBeInTheDocument();
//     });
// })
// // NewAppointment
// // - has title - "Appointement"
// boilerplateTests(NewAppointment, 'NewAppointment', "Appointement")
// describe('NewAppointment specific', () => {
//     let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
//     beforeEach(() => {
//         // Render the parent component and store its container
//         ({ getByLabelText, getByTestId, container, getByText } = render(<NewAppointment />));

//     });
//     // - has textbox labelled "start date"    
//     it('has textbox labelled "start date"', () => {
//         expect(getByLabelText("Start Date")).toBeInTheDocument();

//     });
//     // - has textbox labelled "end date"
//     it('has textbox labelled "end date"', () => {
//         expect(getByLabelText("End Date")).toBeInTheDocument();

//     });
//     // - has textbox labelled "place"
//     it('has textbox labelled "place"', () => {
//         expect(getByLabelText("Place")).toBeInTheDocument();

//     });
//     // - has a button marked "Invite attendees"
//     it('has textbox labelled "Invite Attendees"', () => {
//         expect(getByLabelText("Invite Attendees")).toBeInTheDocument();

//     });
//     // - has textbox to contain the list of attendees
//     it('has textbox labelled "Attendees"', () => {
//         expect(getByLabelText("Attendees")).toBeInTheDocument();

//     });
//     // // - if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"
//     // it('if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"', () => {
//     //     expect(screen.getByTestId('confirmButton')).toHaveTextContent("Accept");
//     //     expect(screen.getByTestId('cancelButton')).toHaveTextContent("Reject");

//     // }); 
// })




// // NewEvent
// // - has title - "Event"
// boilerplateTests(NewEvent, 'NewEvent', "Event")

// // - has textbox labelled "start date"
// // - has textbox labelled "end date"
// // - has textbox labelled "place"
// describe('NewEvent specific', () => {
//     let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
//     beforeEach(() => {
//         // Render the parent component and store its container
//         ({ getByLabelText, getByTestId, container, getByText } = render(<NewAppointment />));

//     });
//     // - has textbox labelled "start date"    
//     it('has textbox labelled "start date"', () => {
//         expect(getByLabelText("Start Date")).toBeInTheDocument();

//     });
//     // - has textbox labelled "end date"
//     it('has textbox labelled "end date"', () => {
//         expect(getByLabelText("End Date")).toBeInTheDocument();

//     });
//     // - has textbox labelled "place"

// })
// // NewTodo
// boilerplateTests(NewTodo, 'NewTodo', "Todo")
// let todoItems;
// describe('NewTodo specific', () => {
//     let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
//     beforeEach(() => {
//         // Render the parent component and store its container
//         ({ getByLabelText, getByTestId, container, getByText } = render(<NewTodo />));
//         // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
//         todoItems = screen.getByRole('li');
//     });
//     // - has list list of todo items
//     it('has list list of todo items"', () => {
//         expect(todoItems).toBeInTheDocument()

//     });
//     // - hasbutton Labelled addTodo item
//     it('has button Labelled addTodo item', () => {
//         expect(getByLabelText('Add Todo Item')).toBeInTheDocument()

//     });
//     describe('After pressing todo', () => {
//         beforeEach(() => {
//             fireEvent.click(getByLabelText('Add Todo Item'));
//         })
//         it('has element Labelled "To Do Notes"', () => {
//             expect(getByLabelText('To Do Notes')).toBeInTheDocument()

//         });

//         // - toto list item has button labelled "Remove To do"
//         it('has button Labelled "Remove Todo Item', () => {
//             expect(getByLabelText('Remove Todo Item')).toBeInTheDocument()

//         });
//         // - toto list item has checkbox labelled "done"
//         it('has button Labelled addTodo item', () => {
//             expect(getByLabelText('Done')).toBeInTheDocument()

//         });
//     })
// })

// Middleware routes to test mocked error responses and changes to the redux store
// Each route needs 2 tests 1 error one for mocked change to base state. 
// request route                       slicer          action           returns
// post    /login                      userSlice       userLogin        user bearer token
// post    /register                   userSlice       userRegister     user bearer token
// post    /auth/[3rd party site]      userSlice       userAuth         3rd part auth token
// post    /callback/[3rd party site]  userSlice       userAuthCallback user bearer token
// get     /user                       userSlice       userDetails      list of user details (display name, email, phone number)
// update  /user                       userSlice       userUpdate       list of user details (display name, email, phone number)
// post    /userPfp                    userSlice       userDetails      user PFP
// update  /userPfp                    userSlice       userDetails      user PFP
// get     /userPfp                    userSlice       userDetails      user PFP
// get     /friends                    friendsSlice    friendsList      list of users freinds and their state (freind, unfollowed, blocked)
// post    /friends                    friendsSlice    friendsCreate    list of users freinds and their state (freind, unfollowed, blocked)
// update  /friends/confirm            friendsSlice    friendConfirm    confirmation message
// update  /friends/unfollow           friendsSlice    friendsUnfollow  confirmation message
// update  /friends/block              friendsSlice    friendsBlock     confirmation message
// get     /items/note                 itemsSlice      itemsNoteFetch   list of notes in descending date order
// post    /items/note                 itemsSlice      itemsNoteCreate  list of notes in descending date order
// update  /items/note                 itemsSlice      itemsNoteUpdate  list of notes in descending date order
// delete  /items/note                 itemsSlice      itemsNoteDelete  list of notes in descending date order
// get     /items/todo                 itemsSlice      itemsTodoFetch   list of todos in descending date order
// post    /items/todo                 itemsSlice      itemsTodoCreate  list of todos in descending date order
// update  /items/todo                 itemsSlice      itemsTodoUpdate  list of todos in descending date order
// delete  /items/todo                 itemsSlice      itemsTodoDelete  list of todos in descending date order
// get     /items/calendar             calendarSlice   calendarGet      list of users calendar items in date range
// post    /items/calendar             calendarSlice   calendarPost     list of users calendar items in date range
// delete  /items/calendar             calendarSlice   CalendarDelete   list of users calendar items in date range
// get     /wall                       wallSlice       wallFetch        list of items on users wall in descending date order

// selectors to test
// Mocked store is required for all of these
// selectedTodos 
//     - returns list of users totdos
// selectedWall
//     - returns list of items fromuser and users friends
//     - does not return any items from blocked or unfollowed friends
// selectedCalendar
//     - returns items by date for user
// selectedToday
//     - returns users items for todys including
//         - todays remiders
//         - todays appointments from user
//         - todays appointments that user is attending
//         - todays events from user
//         - todays events user is attending
// selectedUserDetails
//     -returns user details
//         - display name
//         - email
//         - user ID
//         - telephone number
// selectedUserPFP 
//     - returns user pfp
// selecetedFriends_Live
//     - returns list of users friends that are live
// selecetedFriends_Pending
//     - returns list of users friends that are pending
// selecetedFriends_Blocked
//     - returns list of users friends that are blocked
// selecetedFriends_Unfollowed
//     - returns list of users friends that are unfollowed
