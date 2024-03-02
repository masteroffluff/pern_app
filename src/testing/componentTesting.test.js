import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup, querySelector } from '@testing-library/react';
// import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
import { Provider } from 'react-redux';
import { Note, NewNote, Todo, NewTodo } from '../components/items'
import { Appointment, NewAppointment, Event, NewEvent, Reminder, NewReminder } from '../components/calandar';
import {store} from '../store';




// jest.mock('../components/calandar/appointment/Appointment', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-appointment">{value}, {title}, {dateFrom}, {dateTo}</div>);
// jest.mock('../components/calandar/event/Event', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-event">{value}, {title}, {dateFrom}, {dateTo}</div>);
// jest.mock('../components/calandar/reminder/Reminder', () => ({ title, value, dateFrom, dateTo }) => <div data-testid="mocked-reminder">{value}, {title}, {dateFrom}, {dateTo}</div>);
// jest.mock('../components/items/todo/Todo', () => ({ items }) => (
//     <div data-testid="mocked-Todo">
//         <ul>
//             {items.map((todo, index) => (
//                 <li key={index}>
//                     {todo.value} - {todo.state ? 'Completed' : 'Incomplete'}
//                 </li>
//             ))}
//         </ul>
//     </div>
// ));
// jest.mock('../components/items/note/Note', () => ({ value, title, owner, date }) => (
//     <div data-testid="mocked-note">
//         <h3>{title}</h3>
//         <p>{value}</p>
//         <p>{owner}</p>
//         <p>{date}</p>
//     </div>
// ));

const date = new Date() // todays date so that all items appear as today that have dates


function boilerplateTests(Component, componentName, componentTitle) {
    
    
    describe(`Boilerplate tests for ${componentName}`, () => {
        const notes = 'foo';
        const title = 'bar'
        // Render the parent component and store its container
        //console.log(Component)
        
        //render(<Provider store={store}><Component /></Provider>)
        //render(<Provider store={store}><NewNote /></Provider>);
        it(`has header "${componentTitle}"`, () => {
            expect(screen.getByText(componentTitle)).toBeInTheDocument();
        });
        it('has textbox labelled "notes"', () => {
            expect(screen.getByTestId("notes")).toBeInTheDocument();
            
        });
        it('has textbox labelled "title"', () => {
            expect(screen.getByTestId("title")).toBeInTheDocument();
        });
        it('state update for "notes"', () => {

            // Initial state assertion
            //const textbox = screen.getByTestId('notes');
            const textbox = screen.getByTestId("notes")
            expect(textbox).toBeInTheDocument()
            expect(textbox.value).toBe('');

            // Simulate typing into the textbox
            fireEvent.change(textbox, { target: { value: notes } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe(notes);

            // Assert that the state has changed as expected
            expect(screen.getByTestId("notes").value).toBe( notes );
        });
        it('state update for "title"', () => {
            // Initial state assertion
            const textbox = screen.getByTestId('title');
            expect(textbox).toBeInTheDocument()
            expect(textbox.value).toBe('');

            // Simulate typing into the textbox
            fireEvent.change(textbox, { target: { value: title } });

            // Assert that the state has changed as expected
            expect(textbox.value).toBe(title);

            // Assert that the state has changed as expected
            expect(screen.getByTestId('title').value).toBe( title );
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
        cleanup();
    });
}


describe('component Tests', () => {

    // NewNote
    // - has title - "Note"


    // - has button labelled "share"

    describe('NewNote', () => {
        beforeEach(()=>{
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<Provider store={store}><NewNote /></Provider>);
        })
        afterEach(()=>{
            cleanup();
        })
        // Render the parent component and store its container
        boilerplateTests(NewNote, 'NewNote', 'Note')
        it('has share button"', () => {
            
            //render(<NewNote notes={notes} title={title} date={date} />);
            const testElement = screen.getByTestId('shareButton');
            expect(testElement).toBeInTheDocument();
        });
        cleanup();
    })
    // NewReminder
    // - has title - "Reminder"


    // - has button labelled "share"
    describe('NewReminder', () => {
        // Render the parent component and store its container
        beforeEach(()=>{
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<Provider store={store}><NewReminder /></Provider>);
        })
        afterEach(()=>{
            cleanup();
        })
        boilerplateTests(NewReminder, 'NewReminder', "Add Reminder")
        it('has share button"', () => {
            //render(<NewReminder notes={notes} title={title} dateFrom={date} dateTo={date} />);
            const testElement = screen.getByTestId('shareButton');
            expect(testElement).toBeInTheDocument();
        });
    })

    // NewAppointment
    // - has title - "Appointement"

    describe('NewAppointment', () => {
        beforeEach(()=>{
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<Provider store={store}><NewAppointment /></Provider>);
        })
        afterEach(()=>{
            cleanup();
        })
        boilerplateTests(NewAppointment, 'NewAppointment', "Add Appointement")
        // Render the parent component and store its container
        //render(<NewAppointment />);
        // - has textbox labelled "date from"    
        it('has textbox labelled "date from"', () => {
            expect(screen.getByLabelText("Date From")).toBeInTheDocument();

        });
        // - has textbox labelled "date to"
        it('has textbox labelled "date to"', () => {
            expect(screen.getByLabelText("Date To")).toBeInTheDocument();

        });
        // - has textbox labelled "place"
        it('has textbox labelled "place"', () => {
            expect(screen.getByLabelText("Place")).toBeInTheDocument();

        });
        // - has a button marked "Invite attendees"
        it('has button labelled "Invite Attendees"', () => {
            expect(screen.getByTestId("invite-attendee")).toBeInTheDocument();

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


    // - has textbox labelled "date from"
    // - has textbox labelled "date to"
    // - has textbox labelled "place"
    describe('NewEvent specific', () => {
        // Render the parent component and store its container
        beforeEach(()=>{
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<Provider store={store}><NewEvent /></Provider>);
        })
        afterEach(()=>{
            cleanup();
        })
        
        //render(<NewAppointment />);
        boilerplateTests(NewEvent, 'NewEvent', "Add Event")

        // - has textbox labelled "date from"    
        it('has textbox labelled "date from"', () => {
            expect(screen.getByLabelText("Date From")).toBeInTheDocument();

        });
        // - has textbox labelled "date to"
        it('has textbox labelled "date to"', () => {
            expect(screen.getByLabelText("Date To")).toBeInTheDocument();

        });
        // - has textbox labelled "place"

    })
    // NewTodo

    describe('NewTodo', () => {
        //afterAll(() => { cleanup() })
        // Render the parent component and store its container
        beforeEach(()=>{
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<Provider store={store}><NewTodo /></Provider>);
        })
        afterEach(()=>{
            cleanup();
        })
        //render(<NewTodo />);
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        boilerplateTests(NewTodo, 'NewTodo', "Add Todo")
        
        // - has list list of todo items
        it('has list of todo items"', () => {
            const todoItems = screen.getByTestId('todoItems');
            expect(todoItems).toBeInTheDocument()

        });
        // - hasbutton Labelled addTodo item
        it('has button Labelled addTodo item', () => {
            expect(screen.getByLabelText('Add Todo Item')).toBeInTheDocument()

        });
        describe('After pressing todo', () => {
            it('has element Labelled "To Do Notes,Labelled "Remove Todo Item" and Labelled" addTodo item"', () => {

                fireEvent.click(screen.getByLabelText('Add Todo Item'));
                expect(screen.getByLabelText('To Do Notes')).toBeInTheDocument()
                expect(screen.getByLabelText('Remove Todo Item')).toBeInTheDocument()
                expect(screen.getByLabelText('Done')).toBeInTheDocument()
            });

        })
    })

    const title = "foo", value = "bar", dateFrom = date, dateTo = date, place = 'baz'


    // Note
    describe('Note', () => {
        // requires props title, value, date
        afterAll(() => { cleanup() })
        
        it("renders Note Props properly", () => {
            render(<Provider store={store}><Note title={title} value={value} date={date} /></Provider>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //date
            expect(screen.getByLabelText('date')).toHaveTextContent(date.toString());
        })
        cleanup()
    })
    // Todo
    describe('Todo', () => {
        afterAll(() => { cleanup() })
        const items = [
            { value: 'qux', done: true },
            { value: 'quux', done: true },
            { value: 'qux', done: false },
            { value: 'corge', done: false },
            { value: 'grault', done: false }
        ]
        // requires props title, value, items
        
        it("renders Todo Props properly", () => {
            render(<Provider store={store}><Todo title={title} value={value} items={items} /></Provider>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            screen.getAllByTestId("todo-item").forEach((element, index) => {
                //console.log(items[index])
                // eslint-disable-next-line testing-library/prefer-screen-queries
                expect(element).toHaveTextContent(items[index].value)
                // eslint-disable-next-line testing-library/no-node-access
                const checkbox = element.querySelector("input[type='checkbox']")
                
                expect(checkbox.checked).toBe(items[index].done);
            })
        })
        cleanup()
    })
    // Appointment
    describe('Appointment', () => {
        // requires props title, value, dateFrom, dateTo, place
        
        it("renders Appointment Props properly", () => {
            render(<Provider store={store}><Appointment title={title} value={value} dateFrom={dateFrom} dateTo={dateTo} place={place} /></Provider>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //dateFrom
            expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom.toString());
            //dateTo
            expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo.toString());
            //place
            expect(screen.getByLabelText('place')).toHaveTextContent(place);
        })
        cleanup()
    })
    // Event
    describe('Event', () => {
        // requires props title, value, dateFrom, dateTo, place
        
        it("renders Event Props properly", () => {
            render(<Provider store={store}><Event title={title} value={value} dateTo={dateTo} dateFrom={dateFrom} place={place} /></Provider>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //dateFrom
            expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom.toString());
            //dateTo
            expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo.toString());
            //place
            expect(screen.getByLabelText('place')).toHaveTextContent(place);
        })
        cleanup()
    })
    // Reminder 
    describe('Reminder', () => {
        // requires props title, value, dateFrom, dateTo
        
        
        it("renders Reminder props properly", () => {
            render(<Provider store={store}><Reminder title={title} value={value} dateTo={dateTo} dateFrom={dateFrom} /></Provider>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //dateFrom
            expect(screen.getByLabelText('dateFrom')).toHaveTextContent(dateFrom.toString());
            //dateTo
            expect(screen.getByLabelText('dateTo')).toHaveTextContent(dateTo.toString());
        })
        cleanup()
    })
    
})