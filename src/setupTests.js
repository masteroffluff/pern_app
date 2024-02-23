// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
import { Provider } from 'react-redux';




const date = new Date() // todays date to sync up 
// Component List and tests
// MainDisplay 
describe('MainDisplay', () => {
    let container; // Container to hold the rendered parent component
    beforeEach(() => {
        // Render the parent component and store its container
        const { container: renderedContainer } = render(<MainDisplay />);
        container = renderedContainer;
    });
    // - contains DisplayToday
    it('renders DisplayToday', () => {
        const displayToday = container.querySelector('[data-testid="displayToday"]');
        expect(displayToday).toBeInTheDocument();
    });
    // - constins DisplayTodo
    it('renders DisplayTodo', () => {
        const displayTodo = container.querySelector('[data-testid="displayTodo"]');
        expect(displayTodo).toBeInTheDocument();
    });
    // - constins DisplayWall
    it('renders DisplayWall', () => {
        const displayWall = container.querySelector('[data-testid="displayWall"]');
        expect(displayWall).toBeInTheDocument();
    });
    // - constins DisplayNotes
    it('renders DisplayNotes', () => {
        const displayNotes = container.querySelector('[data-testid="displayNotes"]');
        expect(displayNotes).toBeInTheDocument();
    });
    // - constins DisplayCalendar
    it('renders DisplayCalendar', () => {
        const displayCalendar = container.querySelector('[data-testid="displayCalendar"]');
        expect(displayCalendar).toBeInTheDocument();
    });
})
// DisplayToday
// Mocked data for Appointment, Event, and Reminder components


describe('DisplayToday', () => {
    jest.mock('./Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
    const date = new Date()
    const initialState = {
        calendar: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ]
    };
    const mockStore = configureStore(); // Create a mock Redux store
    let store;

    beforeEach(() => {
        store = mockStore(initialState); // Initialize the mock store with initial state
    });

    it('renders DisplayToday with mocked components', () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <DisplayToday />
            </Provider>
        );
        // - has title "Today"
        expect(getByText('Today')).toBeInTheDocument();
        // - contains mocked Appointment
        expect(getByTestId('mocked-appointment')).toHaveTextContent('foo');

        // - contains mocked Event
        expect(getByTestId('mocked-event')).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(getByTestId('mocked-reminder')).toHaveTextContent('baz');
        // - does not contain mocked Appointment for tomorrow
        expect(getByTestId('mocked-appointment')).toHaveTextContent('qux');

        // - does not contain mocked Event for tomorrow
        expect(getByTestId('mocked-event')).toHaveTextContent('quux');

        // - does not contain mocked Reminder for tomorrow
        expect(getByTestId('mocked-reminder')).toHaveTextContent('corge');
    });
});


// DisplayTodo
// Mocked Todo and TodoItem components
describe('DisplayTodo', () => {
    jest.mock('./Todo', () => ({ items }) => (
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
        expect(todoComponent).toHaveAttribute('items', initialState.items[0].TodoItems);

        // Assert that TodoItem components are properly rendered within Todo component
        const todoItems = todoComponent.querySelectorAll('li');
        expect(todoItems.length).toBe(initialState.items[0].TodoItems.length);
        todoItems.forEach((todoItem, index) => {
            const { value, state } = initialState.items[0].TodoItems[index];
            expect(todoItem.textContent).toContain(value);
            expect(todoItem.textContent).toContain(state ? 'Completed' : 'Incomplete');
        });
    });
});


// DisplayNotes
describe('DisplayNotes', () => {
    jest.mock('./Note', () => ({ value, title, owner, date }) => (
        <div data-testid="mocked-note">
            <h3>{title}</h3>
            <p>{value}</p>
            <p>{owner}</p>
            <p>{date}</p>
        </div>
    ));
    const mockStore = configureStore();
    let store;
    const initialState = {
        notes: [
            { id: 1, title: 'hello1', value: 'foo' },
            { id: 2, title: 'hello2', value: 'bar' },
            { id: 3, title: 'hello3', value: 'baz' }
        ]
    };

    beforeEach(() => {
        store = mockStore(initialState);
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
        expect(noteComponents.length).toBe(initialState.notes.length);

        initialState.notes.forEach((note, index) => {
            const noteComponent = noteComponents[index];
            expect(noteComponent).toHaveTextContent(note.title);
            expect(noteComponent).toHaveTextContent(note.value);
        });
    });



});

// DisplayCalendar
describe('DisplayCalendar', () => {
    jest.mock('./Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
    const initialState = {
        calendar: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ]
    };
    const mockStore = configureStore(); // Create a mock Redux store
    let store;

    beforeEach(() => {
        store = mockStore(initialState); // Initialize the mock store with initial state
    });

    it('renders DisplayCalendar with mocked components', () => {
        let container;
        const { getByTestId, getByText, container: renderedContainer } = render(
            <Provider store={store}>
                <DisplayCalendar />
            </Provider>
        );
        // - has title "Calendar"
        expect(getByText('Calendar')).toBeInTheDocument();

        // - has date range selector
        const dateFrom = container.querySelector('[data-testid="dateFrom"]');
        expect(dateFrom).toBeInTheDocument();

        const dateTo = container.querySelector('[data-testid="dateTo"]');
        expect(dateTo).toBeInTheDocument();

        // - contains mocked Appointment
        expect(getByTestId('mocked-appointment')).toHaveTextContent('foo');

        // - contains mocked Event
        expect(getByTestId('mocked-event')).toHaveTextContent('bar');

        // - contains mocked Reminder
        expect(getByTestId('mocked-reminder')).toHaveTextContent('baz');

        // - contains mocked Appointment for tomorrow
        expect(getByTestId('mocked-appointment')).toHaveTextContent('qux');

        // - contains mocked Event for tomorrow
        expect(getByTestId('mocked-event')).toHaveTextContent('quux');

        // - contains mocked Reminder for tomorrow
        expect(getByTestId('mocked-reminder')).toHaveTextContent('corge');
    });
});

// DisplayWall
// - has title "My Wall"

describe("Display Wall", () => {
    jest.mock('./Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
    jest.mock('./Note', () => ({ value, title, owner, date }) => (
        <div data-testid="mocked-note">
            <h3>{title}</h3>
            <p>{value}</p>
            <p>{owner}</p>
            <p>{date}</p>
        </div>
    ));

    const initialState = {
        wall: [
            { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
            { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
            { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: date.setHours(3, 0) }
        ]
    };
    const mockStore = configureStore(); // Create a mock Redux store
    let store;

    beforeEach(() => {
        store = mockStore(initialState); // Initialize the mock store with initial state
    });
    it('renders DisplayWall with mocked Todo and TodoItem components', () => {
        let container;
        const { getByTestId, getByText, container: renderedContainer } = render(
            <Provider store={store}>
                <DisplayWall />
            </Provider>
        );
        // - has title "Calendar"
        expect(getByText('My Wall')).toBeInTheDocument();
        // - constains mocked Note from user 
        // - contains mocked item from friend
        // - does not contain mocked item not from friend -- handle this in backend
        // displays name title and owner for each item
        const wallComponents = getByTestId('mocked-wallItem');
        initialState.wall.forEach((wallItem, index) => {
            const wallComponent = wallComponents[index];
            expect(wallComponent).toHaveTextContent(wallItem.title);
            expect(wallComponent).toHaveTextContent(wallItem.value);
            expect(wallComponent).toHaveTextContent(wallItem.owner);
            if (wallItem.type === 'note') { expect(wallComponent).toHaveTextContent(wallItem.date) }
            else {
                expect(wallComponent).toHaveTextContent(wallItem.dateFrom)
                expect(wallComponent).toHaveTextContent(wallItem.dateTo)
            };


        });
        // - contains add button that calls NewNote 
        const dateFrom = container.querySelector('[data-testid="dateFrom"]');
        expect(dateFrom).toBeInTheDocument();
    });

})



// The following subcomponetsall thave the following tests
// Appointment
describe('Appointment', () => {
    const data = { title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date, place: 'home' }
    it('receives prop correctly', () => {
        // Define props to be passed to the component


        // Render the component with props
        const { getByText, getByLabelText } = render(<Appointment title='FOO' owner='bob' value='foo' dateFrom={date} dateTo={date} />);
        // - has title - "Appointment"
        expect(getByText("Appointment")).toBeInTheDocument();
        // - has textbox labelled "Start Date"
        expect(getByLabelText("Title")).toHaveTextContent(data.title);
        // - has textbox labelled "Start Date"
        expect(getByLabelText("Start Date")).toHaveTextContent(data.dateFrom);
        // - has textbox labelled "endDate"
        expect(getByLabelText("End Date")).toHaveTextContent(data.dateTo);
        // - has textbox labelled "Place"
        expect(getByLabelText("Place")).toHaveTextContent(data.place);
        // - has textbox labelled "Value"
        expect(getByLabelText("Value")).toHaveTextContent(data.value);
    });
});

// Event

describe('Event', () => {
    const data = { title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date, place: 'home' }
    it('receives prop correctly', () => {
        // Define props to be passed to the component


        // Render the component with props
        const { getByText, getByLabelText } = render(<Event title='FOO' owner='bob' value='foo' dateFrom={date} dateTo={date} />);
        // - has title - "Event"
        expect(getByText("Event")).toBeInTheDocument();
        // - has textbox labelled "Start Date"
        expect(getByLabelText("Title")).toHaveTextContent(data.title);
        // - has textbox labelled "Start Date"
        expect(getByLabelText("Start Date")).toHaveTextContent(data.dateFrom);
        // - has textbox labelled "endDate"
        expect(getByLabelText("End Date")).toHaveTextContent(data.dateTo);
        // - has textbox labelled "Place"
        expect(getByLabelText("Place")).toHaveTextContent(data.place);
        // - has textbox labelled "Value"
        expect(getByLabelText("Value")).toHaveTextContent(data.value);
    });
});
// Reminder
describe('Reminder', () => {
    const data = { title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date, place: 'home' }

    // Render the component with props
    let getByText, getByLabelText
    beforeEach(()=>{
    ({ getByText, getByLabelText } = render(<Event title={data.title} owner={data.owner} value={data.value} dateFrom={data.dateFrom} dateTo={data.dateTo} />));
    })

    it('has title - "Reminder"', () => {
        expect(getByText("Reminder")).toBeInTheDocument();
    })
    it('has textbox labelled "Title" with content',()=>{
        expect(getByLabelText("Title")).toHaveTextContent(data.title);
    })
    it('has textbox labelled "Start Date" with content', () => {
        expect(getByLabelText("Start Date")).toHaveTextContent(data.dateFrom);
    })
    it('as textbox labelled "endDate""', () => {
        expect(getByLabelText("End Date")).toHaveTextContent(data.dateTo);
    })
    it('has textbox labelled "Place"', () => {    
        expect(getByLabelText("Place")).toHaveTextContent(data.place);
    })
    it('// - has textbox labelled "Value"', () => {
        expect(getByLabelText("Value")).toHaveTextContent(data.value);
    
    });
});
// Note
// - has title - "Note"
// - has textbox labelled "title" 
// - has textbox labelled "notes" 
describe('Note', () => {
    const data = { title: 'FOO', owner: 'bob', value: 'foo' }
    it('receives prop correctly', () => {
        // Define props to be passed to the component


        // Render the component with props
        const { getByText, getByLabelText } = render(<Note title={data.title} owner={data.owner} value={data.value} />);
        // - has title - "Reminder"
        expect(getByText("Note")).toBeInTheDocument();
        // - has textbox labelled "Start Date"
        expect(getByLabelText("Title")).toHaveTextContent(data.title);
        // - has textbox labelled "Start Date"
        expect(getByLabelText("owner")).toHaveTextContent(data.place);
        // - has textbox labelled "Value"
        expect(getByLabelText("Value")).toHaveTextContent(data.value);
    });
});
// Todo
// - has title - "To Do"
describe('make sure Todo renders TodoItems properly', () => {
    let getAllByTestId,getByText
    beforeEach(()=>{
        // Define props to be passed to the component
        const myPropValue = [
            { value: 'foo', state: true },
            { value: 'bar', state: false },
            { value: 'baz', state: false }
        ];

        // Render the component with props
        ({ getAllByTestId,getByText } = render(<Todo todoItems={myPropValue} />));//**
    })

        
        it('has textbox labelled "To Dos"', () => {
            expect(getByText("To Dos")).toBeInTheDocument();

        })

        // - has textbox labelled "To Dos" 
        
        it('receives prop correctly', () => {       
        // has list of TodoItem components
            const components = getAllByTestId('ToDoItem');
            expect(components[0]).toHaveTextContent('foo');
            expect(components[1]).toHaveTextContent('bar');
            expect(components[2]).toHaveTextContent('baz');

    });
});
// TodoItem
// - has checkbox

// UserDisplay
describe('UserDisplay', () => {
    let container; // Container to hold the rendered parent component
    beforeEach(() => {
        // Render the parent component and store its container
        const { container: renderedContainer } = render(<UserDisplay />);
        container = renderedContainer;
    });
    // - contains UserDetails
    it('renders UserDetails', () => {
        const userDetails = container.querySelector('[data-testid="userDetails"]');
        expect(userDetails).toBeInTheDocument();
    });
    // - constins UserFriends
    it('renders UserFriends', () => {
        const userFriends = container.querySelector('[data-testid="userFriends"]');
        expect(userFriends).toBeInTheDocument();
    });
})
// UserDetails
// - (all tests use a mocked user)
// - displays user display name
// - displays user phone number
// - displays user email
describe('UserDetails', () => {
    let getByLabelText; // Container to hold the rendered parent component
    const displayName='alice'
    const email='foo@bar.baz'
    const phone='0161 1234567'
    beforeEach(() => {
        // Render the parent component and store its container
        ({ getByLabelText } = render(<UserDetails displayName={displayName} email={email} phone={phone} />));

    });
    it('displays user display name', () => {
        expect(getByLabelText("displayName")).toHaveTextContent(displayName);
    });
    it('displays user phone number', () => {
        expect(getByLabelText("phone")).toHaveTextContent(phone);
    });
    it('displays user email', () => {
        expect(getByLabelText("email")).toHaveTextContent(email);
    });
})
// UserFriends
// - has title "Friends"
// - displays friend
// - displays blocked friend as blocked
// - displays unfollowed friend as unfollowed
describe('UserFriends', () => {
    let getByLabelText; // Container to hold the rendered parent component
    const friendlist={
        friends:['alice'],
        unfollowed: ['bob'],
        blocked:['charlie']
    }
    beforeEach(() => {
        // Render the parent component and store its container
        ({ getByLabelText } = render(<UserFriends friends={friendList.friends} unfollowed={friendlist.unfollowed} blocked={friendlist.blocked} />));

    });
    it('displays friend', () => {
        expect(getByLabelText("friends")).toHaveTextContent('alice');
    });
    it('displays blocked friend as blocked', () => {
        expect(getByLabelText("unfollowed")).toHaveTextContent('bob');
    });
    it('displays unfollowed friend as unfollowed', () => {
        expect(getByLabelText("blocked")).toHaveTextContent('charlie');
    });
})

// all components below heve these tests:
// - has textbox labelled "notes" 
// - state update for "notes"
// - has textbox labelled "title"
// - state update for "title"
// - has confirm button
// - has cancel button
// - cancel gracefully closes form

function boilerplateTests(Component, componentName, title) {
    describe(`Boilerplate tests for ${componentName}`, () => {
        let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
        const notes = 'foo';
        const title = 'bar';

        beforeEach(() => {
            // Render the parent component and store its container
            ({ getByLabelText, getByTestId, container, getByText } = render(<Component notes={notes} title={title} />));

        });
        it(`has header "${title}"`, () => {
            expect(getByText(title)).toBeInTheDocument();
        });       
        it('has textbox labelled "notes" ', () => {
            expect(getByLabelText("notes")).toHaveTextContent(notes);
        });
        it('has textbox labelled "title" ', () => {
            expect(getByLabelText("title")).toHaveTextContent(title);
        });
        it('state update for "notes"', () => {

            // Initial state assertion
            const textbox = getByTestId('notes');
            expect(textbox.value).toBe(notes);

            // Simulate typing into the textbox
            fireEvent.change(textbox, { target: { value: 'baz' } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe('baz');

            // Assert that the state has changed as expected
            expect(getByTestId('notes').textContent).toBe('baz');
        });
        it('state update for "title"', () => {
            // Initial state assertion
            const textbox = getByTestId('title');
            expect(textbox.value).toBe(notes);

            // Simulate typing into the textbox
            fireEvent.change(textbox, { target: { value: 'baz' } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe('baz');

            // Assert that the state has changed as expected
            expect(getByTestId('notes').textContent).toBe('baz');
        });
        it('has confirm button"', () => {
            const testElement = container.querySelector('[data-testid="confirmButton"]');
            expect(testElement).toBeInTheDocument();
        });
        it('has cancel button ', () => {
            const testElement = container.querySelector('[data-testid="cancelButton"]');
            expect(testElement).toBeInTheDocument();
        });
        // it('cancel gracefully closes form', () => {
            
        // });

    });
}
// NewNote
// - has title - "Note"
boilerplateTests(NewNote,'NewNote','Note')

// - has button labelled "share"
describe('NewNote specific', () => {
    const notes = 'foo';
    const title = 'bar';
    // Render the parent component and store its container
    
    it('has share button"', () => {
        const { container } = render(<NewNote notes={notes} title={title} date={date} />);
        const testElement = container.querySelector('[data-testid="shareButton"]');
        expect(testElement).toBeInTheDocument();
    });
})
// NewReminder
// - has title - "Reminder"
boilerplateTests(NewReminder,'NewReminder', "Reminder")

// - has button labelled "share"
describe('NewReminder specific', () => {
    const notes = 'foo';
    const title = 'bar';
    // Render the parent component and store its container
    
    it('has share button"', () => {
        const { container } = render(<NewReminder notes={notes} title={title} dateFrom={date} dateTo={date} />);
        const testElement = container.querySelector('[data-testid="shareButton"]');
        expect(testElement).toBeInTheDocument();
    });
})
// NewAppointment
// - has title - "Appointement"
boilerplateTests(NewAppointment,'NewAppointment',"Appointement")
describe('NewAppointment specific', () => {
    let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
    beforeEach(() => {
        // Render the parent component and store its container
        ({ getByLabelText, getByTestId, container, getByText } = render(<NewAppointment />));

    });
// - has textbox labelled "start date"    
    it('has textbox labelled "start date"', () => {
        expect(getByLabelText("Start Date")).toBeInTheDocument();

    }); 
// - has textbox labelled "end date"
it('has textbox labelled "end date"', () => {
    expect(getByLabelText("End Date")).toBeInTheDocument();

}); 
// - has textbox labelled "place"
it('has textbox labelled "place"', () => {
    expect(getByLabelText("Place")).toBeInTheDocument();

}); 
// - has a button marked "Invite attendees"
it('has textbox labelled "Invite Attendees"', () => {
    expect(getByLabelText("Invite Attendees")).toBeInTheDocument();

}); 
// - has textbox to contain the list of attendees
it('has textbox labelled "Attendees"', () => {
    expect(getByLabelText("Attendees")).toBeInTheDocument();

}); 
// // - if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"
// it('if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"', () => {
//     expect(container.querySelector('[data-testid="confirmButton"]')).toHaveTextContent("Accept");
//     expect(container.querySelector('[data-testid="cancelButton"]')).toHaveTextContent("Reject");

// }); 
})




// NewEvent
// - has title - "Event"
boilerplateTests(NewEvent,'NewEvent',"Event")

// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"
describe('NewAppointment specific', () => {
    let getByLabelText, getByTestId, container, getByText; // functions and container for rendered component
    beforeEach(() => {
        // Render the parent component and store its container
        ({ getByLabelText, getByTestId, container, getByText } = render(<NewAppointment />));

    });
// - has textbox labelled "start date"    
    it('has textbox labelled "start date"', () => {
        expect(getByLabelText("Start Date")).toBeInTheDocument();

    }); 
    // - has textbox labelled "end date"
    it('has textbox labelled "end date"', () => {
        expect(getByLabelText("End Date")).toBeInTheDocument();

    }); 
    // - has textbox labelled "place"
    it('has textbox labelled "place"', () => {
        expect(getByLabelText("Place")).toBeInTheDocument();

    });
})

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
