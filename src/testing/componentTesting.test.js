import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
// import configureStore from 'redux-mock-store'; // Import configureStore from your Redux library or mock it
import { Provider } from 'react-redux';
import { Note, NewNote, Todo, NewTodo, DeleteNote, UpdateNote } from '../components/items'
import { Appointment, NewAppointment, Event, NewEvent, Reminder, DeleteCalendarItem } from '../components/calandar';
import { AddFriend, UserDetails } from '../components/user';
import store from '../store';
import { BrowserRouter, MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import moment from 'moment';


const date = new Date() // todays date so that all items appear as today that have dates


function boilerplateTests(Component, componentName, componentTitle) {


    describe(`Boilerplate tests for ${componentName}`, () => {
        const notes = 'foo';
        const title = 'bar'
        // Render the parent component and store its container
        //console.log(Component)

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
            expect(screen.getByTestId("notes").value).toBe(notes);
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
            expect(screen.getByTestId('title').value).toBe(title);
        });
        it('has confirm button"', () => {
            const testElement = screen.getByTestId('Done');
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
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<BrowserRouter>
                <Provider store={store}><NewNote /></Provider>
            </BrowserRouter>);
        })
        afterEach(() => {
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


    // // - has button labelled "share"
    // describe('NewReminder', () => {
    //     // Render the parent component and store its container
    //     beforeEach(() => {
    //         // eslint-disable-next-line testing-library/no-render-in-setup
    //         render(<BrowserRouter>
    //             <Provider store={store}><NewReminder /></Provider>
    //         </BrowserRouter>);
    //     })
    //     afterEach(() => {
    //         cleanup();
    //     })
    //     boilerplateTests(NewReminder, 'NewReminder', "Add Reminder")
    //     it('has share button"', () => {
    //         const testElement = screen.getByTestId('shareButton');
    //         expect(testElement).toBeInTheDocument();
    //     });
    // })

    // NewAppointment
    // - has title - "Appointement"

    describe('NewAppointment', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<BrowserRouter>
                <Provider store={store}><NewAppointment /></Provider>
            </BrowserRouter>);
        })
        afterEach(() => {
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
        //     expect(screen.getByTestId('Done')).toHaveTextContent("Accept");
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
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NewEvent />
                    </Provider>
                </BrowserRouter>);
        })
        afterEach(() => {
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
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<BrowserRouter>
                <Provider store={store}><NewTodo /></Provider>
            </BrowserRouter>);
        })
        afterEach(() => {
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
                const inputElement = screen.getByLabelText('New Item');
                fireEvent.change(inputElement, { target: { value: 'Text to type' } });
                fireEvent.click(screen.getByLabelText('Add Todo Item'));
                expect(screen.getByLabelText('To Do Notes')).toBeInTheDocument()
                expect(screen.getByLabelText('Remove Todo Item')).toBeInTheDocument()
                expect(screen.getByLabelText('Done')).toBeInTheDocument()
            });

        })
    })

    const title = "foo", value = "bar", date_from = date, date_to = date, place = 'baz'
    const dateMoment = moment(date)

    // Note
    describe('Note', () => {
        // requires props title, value, date
        afterAll(() => { cleanup() })

        it("renders Note Props properly", () => {
            render(<BrowserRouter>
                <Provider store={store}><Note title={title} value={value} date={date} /></Provider>
            </BrowserRouter>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //date
            expect(screen.getByLabelText('date')).toHaveTextContent(dateMoment.format('Do MMMM YYYY, h:mm:ss a'));
        })
        cleanup()
    })
    // Todo
    describe('Todo', () => {
        afterAll(() => { cleanup() })
        const items = [
            { item_text: 'qux', item_done: true },
            { item_text: 'quux', item_done: true },
            { item_text: 'qux', item_done: false },
            { item_text: 'corge', item_done: false },
            { item_text: 'grault', item_done: false }
        ]
        // requires props title, value, items

        it("renders Todo Props properly", () => {
            render(<BrowserRouter>

                <Provider store={store}><Todo title={title} notes={value} items={items} /></Provider>
            </BrowserRouter>)
            //title
            expect(screen.getByLabelText('Title')).toHaveValue(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            screen.getAllByTestId("todo-item").forEach((element, index) => {
                //console.log(items[index])
                // eslint-disable-next-line testing-library/prefer-screen-queries
                expect(element).toHaveTextContent(items[index].item_text)
                // eslint-disable-next-line testing-library/no-node-access
                //const checkbox = element.querySelector("input[type='checkbox']")

                //expect(checkbox.checked).toBe(items[index].item_done);
            })
        })
        cleanup()
    })
    // Appointment
    describe('Appointment', () => {
        // requires props title, value, date_from, date_to, place

        it("renders Appointment Props properly", () => {
            const item = {title,value,date_to, date_from,place,  attendees:[3,2,4]}
            render(<BrowserRouter>
                <Provider store={store}><Appointment editable={false} item={item} /></Provider>
            </BrowserRouter>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //date_from
            expect(screen.getByLabelText('date_from')).toHaveTextContent(moment(date_from.toISOString()).format('ddd Do MMMM YYYY'));
            //date_to
            expect(screen.getByLabelText('date_to')).toHaveTextContent(moment(date_to.toISOString()).format('ddd Do MMMM YYYY'));
            //place
            expect(screen.getByLabelText('place')).toHaveTextContent(place);
        })
        cleanup()
    })
    // Event
    describe('Event', () => {
        // requires props title, value, date_from, date_to, place

        it("renders Event Props properly", () => {
            const item = {title,value,date_to, date_from,place,  attendees:[3,2,4]}
            render(<BrowserRouter>
                <Provider store={store}><Event editable={false} item={item}  /></Provider>
            </BrowserRouter>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //date_from
            expect(screen.getByLabelText('date_from')).toHaveTextContent(moment(date_from.toISOString()).format('ddd Do MMMM YYYY'));
            //date_to
            expect(screen.getByLabelText('date_to')).toHaveTextContent(moment(date_to.toISOString()).format('ddd Do MMMM YYYY'));
            //place
            expect(screen.getByLabelText('place')).toHaveTextContent(place);
        })
        cleanup()
    })
    // Reminder 
    describe('Reminder', () => {
        // requires props title, value, date_from, date_to


        it("renders Reminder props properly", () => {
            const item = {title,value,date_to, date_from, attendees:[3,2,4]}
            render(<BrowserRouter>
                <Provider store={store}><Reminder editable={false} item={item} /></Provider>
            </BrowserRouter>)
            //title
            expect(screen.getByLabelText('Title')).toHaveTextContent(title);
            //value 
            expect(screen.getByLabelText('Description')).toHaveTextContent(value);
            //date_from
            expect(screen.getByLabelText('date_from')).toHaveTextContent(moment(date_from.toISOString()).format('ddd Do MMMM YYYY'));
            //date_to
            expect(screen.getByLabelText('date_to')).toHaveTextContent(moment(date_to.toISOString()).format('ddd Do MMMM YYYY'));
        })
        cleanup()
    })
    describe('AddFriend', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<BrowserRouter>
                <Provider store={store}><AddFriend /></Provider>
            </BrowserRouter>);
        })
        afterEach(() => {
            cleanup();
        })
        // Render the parent component and store its container

        it('has enter friend text box"', () => {

            //render(<NewNote notes={notes} title={title} date={date} />);
            const testElement = screen.getByLabelText('Select Friend', { exact: false });
            expect(testElement).toBeInTheDocument();
        });
        cleanup();
    })
    describe('User Details', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<BrowserRouter>
                <Provider store={store}><UserDetails /></Provider>
            </BrowserRouter>);
        })
        afterEach(() => {
            cleanup();
        })
        // Render the parent component and store its container

        it('has element for display name, email, phone numbers, birthday and colour"', () => {

            //render(<NewNote notes={notes} title={title} date={date} />);
            const displayNameElement = screen.getByLabelText('Display Name', { exact: false });
            expect(displayNameElement).toBeInTheDocument();
            const emailElement = screen.getByLabelText('Email', { exact: false });
            expect(emailElement).toBeInTheDocument();
            const phoneNumberElement = screen.getByLabelText('Telephone Number', { exact: false });
            expect(phoneNumberElement).toBeInTheDocument();
            const birthdayElement = screen.getByLabelText('Birthday', { exact: false });
            expect(birthdayElement).toBeInTheDocument();
            const colourElement = screen.getByLabelText('Colour Scheme', { exact: false });
            expect(colourElement).toBeInTheDocument();
        });
        cleanup();
    })
    describe('deleteItem', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={[`/main/deletenote?id=1`]}>
                        <Routes>
                            <Route path="/main" element={<><Outlet /></>}>
                                <Route path="deletenote" element={<DeleteNote />} />
                                <Route path="updatenote" element={<UpdateNote />} />
                                <Route path="deletecalendar" element={<DeleteCalendarItem />} />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </Provider>);
        })
        afterEach(() => {
            cleanup();
        })
        it('has yes button"', () => {

            //render(<NewNote notes={notes} title={title} date={date} />);
            const testElement = screen.getByTestId('yes');
            expect(testElement).toBeInTheDocument();
        });
        cleanup();
    })
    describe('delete Calendar Item', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={[`/main/deletecalendar?id=1`]}>
                        <Routes>
                            <Route path="/main" element={<><Outlet /></>}>
                                <Route path="deletenote" element={<DeleteNote />} />
                                <Route path="updatenote" element={<UpdateNote />} />
                                <Route path="deletecalendar" element={<DeleteCalendarItem />} />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </Provider>);
        })
        afterEach(() => {
            cleanup();
        })
        it('has yes button"', () => {

            //render(<NewNote notes={notes} title={title} date={date} />);
            const testElement = screen.getByTestId('yes');
            expect(testElement).toBeInTheDocument();
        });
        cleanup();
    })
})
