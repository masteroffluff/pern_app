import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
// import { Provider } from 'react-redux';
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
            title: "corge",
            todoItems: [
                { value: 'foo', state: true },
                { value: 'bar', state: false },
                { value: 'baz', state: false }
            ]
        }
    ],
    notes: [
        { id: 1, title: 'FOO', value: 'foo' },
        { id: 2, title: 'BAR', value: 'bar' },
        { id: 3, title: 'BAZ', value: 'baz' }
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


function boilerplateTests(Component, componentName, componentTitle) {
    describe(`Boilerplate tests for ${componentName}`, () => {
        const notes = 'foo';
        const title = 'bar'
        // Render the parent component and store its container
        render(<Component notes={notes} title={title} />);

        it(`has header "${componentTitle}"`, () => {
            expect(screen.getByText(componentTitle)).toBeInTheDocument();
        });
        it('has textbox labelled "notes"', () => {
            expect(screen.getByLabelText("notes")).toHaveTextContent(notes);
        });
        it('has textbox labelled "title"', () => {
            expect(screen.getByLabelText("title")).toHaveTextContent(title);
        });
        it('state update for "notes"', () => {

            // Initial state assertion
            const textbox = screen.getByTestId('notes');
            expect(textbox.value).toBe(notes);

            // Simulate typing into the textbox
            screen.fireEvent.change(textbox, { target: { value: 'baz' } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe('baz');

            // Assert that the state has changed as expected
            expect(screen.getByTestId('notes').textContent).toBe('baz');
        });
        it('state update for "title"', () => {
            // Initial state assertion
            const textbox = screen.getByTestId('title');
            expect(textbox.value).toBe(notes);

            // Simulate typing into the textbox
            fireEvent.change(textbox, { target: { value: 'baz' } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe('baz');

            // Assert that the state has changed as expected
            expect(screen.getByTestId('notes').textContent).toBe('baz');
        });
        it('has confirm button"', () => {
            const testElement = screen.getByTestId('confirmButton');
            expect(testElement).toBeInTheDocument();
        });
        it('has cancel button', () => {
            const testElement = screen.getByTestId('cancelButton');
            expect(testElement).toBeInTheDocument();
        });
        // it('cancel gracefully closes form', () => {

        // });

    });
}
// NewNote
// - has title - "Note"
boilerplateTests(NewNote, 'NewNote', 'Note')

// - has button labelled "share"
describe('NewNote specific', () => {
    const notes = 'foo';
    const title = 'bar';
    // Render the parent component and store its container

    it('has share button"', () => {
        render(<NewNote notes={notes} title={title} date={date} />);
        const testElement = screen.getByTestId('shareButton');
        expect(testElement).toBeInTheDocument();
    });
})
// NewReminder
// - has title - "Reminder"
boilerplateTests(NewReminder, 'NewReminder', "Reminder")

// - has button labelled "share"
describe('NewReminder specific', () => {
    const notes = 'foo';
    const title = 'bar';
    // Render the parent component and store its container

    it('has share button"', () => {
        render(<NewReminder notes={notes} title={title} dateFrom={date} dateTo={date} />);
        const testElement = screen.getByTestId('shareButton');
        expect(testElement).toBeInTheDocument();
    });
})

// NewAppointment
// - has title - "Appointement"
boilerplateTests(NewAppointment, 'NewAppointment', "Appointement")
describe('NewAppointment specific', () => {
    // Render the parent component and store its container
    render(<NewAppointment />);
    // - has textbox labelled "start date"    
    it('has textbox labelled "start date"', () => {
        expect(screen.getByLabelText("Start Date")).toBeInTheDocument();

    });
    // - has textbox labelled "end date"
    it('has textbox labelled "end date"', () => {
        expect(screen.getByLabelText("End Date")).toBeInTheDocument();

    });
    // - has textbox labelled "place"
    it('has textbox labelled "place"', () => {
        expect(screen.getByLabelText("Place")).toBeInTheDocument();

    });
    // - has a button marked "Invite attendees"
    it('has textbox labelled "Invite Attendees"', () => {
        expect(screen.getByLabelText("Invite Attendees")).toBeInTheDocument();

    });
    // - has textbox to contain the list of attendees
    it('has textbox labelled "Attendees"', () => {
        expect(screen.getByLabelText("Attendees")).toBeInTheDocument();

    });
    // // - if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"
    // it('if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"', () => {
    //     expect(screen.getByTestId('confirmButton')).toHaveTextContent("Accept");
    //     expect(screen.getByTestId('cancelButton')).toHaveTextContent("Reject");

    // }); 
})

// NewEvent
// - has title - "Event"
boilerplateTests(NewEvent, 'NewEvent', "Event")

// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"
describe('NewEvent specific', () => {

    // Render the parent component and store its container
    render(<NewAppointment />);


    // - has textbox labelled "start date"    
    it('has textbox labelled "start date"', () => {
        expect(screen.getByLabelText("Start Date")).toBeInTheDocument();

    });
    // - has textbox labelled "end date"
    it('has textbox labelled "end date"', () => {
        expect(screen.getByLabelText("End Date")).toBeInTheDocument();

    });
    // - has textbox labelled "place"

})
// NewTodo
boilerplateTests(NewTodo, 'NewTodo', "Todo")
let todoItems;
describe('NewTodo specific', () => {
    // Render the parent component and store its container
    render(<NewTodo />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    todoItems = screen.getByRole('li');

    // - has list list of todo items
    it('has list list of todo items"', () => {
        expect(todoItems).toBeInTheDocument()

    });
    // - hasbutton Labelled addTodo item
    it('has button Labelled addTodo item', () => {
        expect(screen.getByLabelText('Add Todo Item')).toBeInTheDocument()

    });
    describe('After pressing todo', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByLabelText('Add Todo Item'));
        })
        it('has element Labelled "To Do Notes"', () => {
            expect(screen.getByLabelText('To Do Notes')).toBeInTheDocument()

        });

        // - toto list item has button labelled "Remove To do"
        it('has button Labelled "Remove Todo Item', () => {
            expect(screen.getByLabelText('Remove Todo Item')).toBeInTheDocument()

        });
        // - toto list item has checkbox labelled "done"
        it('has button Labelled addTodo item', () => {
            expect(screen.getByLabelText('Done')).toBeInTheDocument()

        });
    })
})

const title = "foo",value = "bar", dateFrom = date, dateTo=date, place = 'baz'


// Note
describe('Note',()=>{
    // requires props title, value, date
    render(<Note title={title}  value={value}  date={date} />)
    it("renders Props properly",()=>{
        //title
        expect(screen.getByLabelText('title')).toHaveTextContent(title);
        //value 
        expect(screen.getByLabelText('value')).toHaveTextContent(value);
        //date
        expect(screen.getByLabelText('date')).toHaveTextContent(date);
    })
})
// Todo
describe('Todo',()=>{
    const items = [
        {value:'qux',done:true},
        {value:'quux',done:true},
        {value:'qux',done:false},
        {value:'corge',done:false},
        {value:'grault',done:false}
    ]
    // requires props title, value, items
    render(<Todo title={title}  value={value}  items={items} />)
    it("renders Props properly",()=>{
        //title
        expect(screen.getByLabelText('title')).toHaveTextContent(title);
        //value 
        expect(screen.getByLabelText('value')).toHaveTextContent(value);
        screen.getAllByTestId("todo-item").forEach((element, index)=>{
            console.log(items[index])
            // eslint-disable-next-line testing-library/prefer-screen-queries
            expect(element.getByTestId('todo-item-value')).toHaveTextContent(items[index].value)
            // eslint-disable-next-line testing-library/prefer-screen-queries
            expect(element.getByTestId('todo-item-done')).toHaveTextContent(items[index].done)
        })
    })
})
// Appointment
describe('Appointment',()=>{
    // requires props title, value, dateFrom, dateTo, place
    render(<Appointment title={title}  value={value}  dateFrom={dateFrom} dateTo={dateTo} place={place} />)
    it("renders Props properly",()=>{
        //title
        expect(screen.getByLabelText('title')).toHaveTextContent(title);
        //value 
        expect(screen.getByLabelText('value')).toHaveTextContent(value);
        //dateFrom
        expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom);
        //dateTo
        expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo);
        //place
        expect(screen.getByLabelText('place')).toHaveTextContent(place);
    })
})
// Event
describe('Event',()=>{
    // requires props title, value, dateFrom, dateTo, place
    render(<Event title={title}  value={value}  dateTo={dateTo} dateFrom={dateFrom} place={place} />)
    it("renders Props properly",()=>{
        //title
        expect(screen.getByLabelText('title')).toHaveTextContent(title);
        //value 
        expect(screen.getByLabelText('value')).toHaveTextContent(value);
        //dateFrom
        expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom);
        //dateTo
        expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo);
        //place
        expect(screen.getByLabelText('place')).toHaveTextContent(place);
    })
})
// Reminder 
describe('Reminder',()=>{
    // requires props title, value, dateFrom, dateTo
    render(<Reminder title={title}  value={value}  dateTo={dateTo} dateFrom={dateFrom} />)
    it("renders Props properly",()=>{
        //title
        expect(screen.getByLabelText('title')).toHaveTextContent(title);
        //value 
        expect(screen.getByLabelText('value')).toHaveTextContent(value);
        //dateFrom
        expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom);
        //dateTo
        expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo);
        //place
        expect(screen.getByLabelText('place')).toHaveTextContent(place);
    })
})

