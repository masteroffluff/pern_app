/* eslint-disable testing-library/no-unnecessary-act */

import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
//import configureStore from 'redux-mock-store';
import { setupStore } from '../store'

import { NewAppointment, NewEvent, NewReminder } from '../components/calandar';
import { NewNote, NewTodo } from '../components/items/index.js';
import { BrowserRouter } from 'react-router-dom';

import dummyStore, { date, tomorrow } from './dummyData.js'

import apiFetch from '../utils/apiFetch'; // Import the apifetch function

jest.mock('../utils/apiFetch', () => jest.fn());
const apiUrl = process.env.REACT_APP_API_URL

//const mockStore = configureStore([]);
describe("action tests", () => {
    afterEach(() => {
        cleanup()
    })

    describe('NewTodo', () => {

        test('dispatches addTodo action when button is clicked', async () => {

            // const store = mockStore(initialState); // Initial store state
            const store = setupStore(dummyStore)
            render(<BrowserRouter>
                <Provider store={store}>
                    <NewTodo />
                </Provider>
            </BrowserRouter>);


            const textBox_title = screen.getByLabelText("Title");
            const textbox_notes = screen.getByLabelText("To Do Notes")
            const textBox_newItem = screen.getByLabelText("New Item");
            const button_addTodoItem = screen.getByLabelText('Add Todo Item')
            expect(button_addTodoItem).toBeInTheDocument()
            await act(async () => {
                // add the title
                fireEvent.change(textBox_title, { target: { value: 'New Todo' } });
                // add notes
                fireEvent.change(textbox_notes, { target: { value: 'Hello' } });
            })
            await act(async () => {
                // add some todo items 
                fireEvent.change(textBox_newItem, { target: { value: 'foo' } });
                await waitFor(() => expect(textBox_newItem).toHaveValue('foo'))
                await waitFor(() => expect(button_addTodoItem).not.toBeDisabled())
                fireEvent.click(button_addTodoItem);
            })
            await act(async () => {
                fireEvent.change(textBox_newItem, { target: { value: 'bar' } });
                await waitFor(() => expect(textBox_newItem).toHaveValue('bar'))
                await waitFor(() => expect(button_addTodoItem).not.toBeDisabled())
                fireEvent.click(button_addTodoItem);
            })
            await act(async () => {
                // Simulate a button click
                const doneButton = screen.getByLabelText('Done')
                await waitFor(() => expect(doneButton).not.toBeDisabled())
                fireEvent.click(doneButton);
            })
            const authToken = store.getState().user.authentication.authToken
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': 'Bearer ' + authToken,

                },
                body: JSON.stringify({
                    "title": "New Todo",
                    "notes": "Hello",
                    "items": [{ "item_text": "foo", "item_done": false, }, { "item_text": "bar", "item_done": false }],
                })

            };

            expect(apiFetch).toHaveBeenCalledWith(apiUrl + '/items/todo', options, expect.any(Function))
        });


    });

    describe('NewNote', () => {
        test('dispatches addNote action when button is clicked', async () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NewNote />
                    </Provider>
                </BrowserRouter>);
            const textBox_title = screen.getByLabelText("Title");
            const textBox_value = screen.getByLabelText("Notes");
            await act(async () => {
                // add the title
                fireEvent.change(textBox_title, { target: { value: 'New Note' } });
                // add some notes
                fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });

                const doneButton = screen.getByLabelText('Done')
                await waitFor(() => expect(doneButton).not.toBeDisabled())
                fireEvent.click(doneButton);
            })
            // Check if the expected action was dispatched
            const authToken = store.getState().user.authentication.authToken
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': 'Bearer ' + authToken,

                },
                body: JSON.stringify({
                    title: 'New Note',
                    notes: 'Lorem Ipsum',
                    shared_to: 1
                })
            };
            expect(apiFetch).toHaveBeenCalledWith(apiUrl + '/items/note', options, expect.any(Function))
        });
    });

    describe('NewAppointment', () => {
        test('dispatches addAppointment action when button is clicked', async () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NewAppointment />
                    </Provider>
                </BrowserRouter>);
            const textBox_title = screen.getByLabelText("Title");
            const textBox_value = screen.getByLabelText("Description");
            const textBox_place = screen.getByLabelText("Place");
            const textBox_date_from = screen.getByLabelText("Date From");
            const textBox_date_to = screen.getByLabelText("Date To");
            //const selection_invites = screen.getByLabelText("invites");// not sure how to add invitees yet

            // add the title
            await act(async () => {
                fireEvent.change(textBox_title, { target: { value: 'New Appointment' } });
                fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
                fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });

                fireEvent.change(textBox_date_from, { target: { value: date } });
                fireEvent.change(textBox_date_to, { target: { value: tomorrow } });


                expect(textBox_date_from).toBeInTheDocument()
                expect(textBox_date_from.value).toEqual(date)

                const Done = screen.getByLabelText('Done')
                await waitFor(() => expect(Done).not.toBeDisabled())
                fireEvent.click(Done);
            })
            const authToken = store.getState().user.authentication.authToken
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': 'Bearer ' + authToken,

                },
                body: JSON.stringify({
                    type: 'appointment',
                    title: 'New Appointment',
                    notes: 'Lorem Ipsum',
                    place: 'Dolores sit',
                    date_from: date,
                    date_to: tomorrow,
                    attendees: []
                })
            };
            // Check if the expected action was dispatched
            expect(apiFetch).toHaveBeenCalledWith(`${apiUrl}/calendar`, options, expect.any(Function))
        });
    });

    describe('NewReminder', () => {
        test('dispatches addReminder action when button is clicked', async () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NewReminder />
                    </Provider>
                </BrowserRouter>);
            const textBox_title = screen.getByLabelText("Title");
            const textBox_value = screen.getByLabelText("Description");
            const textBox_place = screen.getByLabelText("Place");
            const textBox_date_from = screen.getByLabelText("Date From");
            const textBox_date_to = screen.getByLabelText("Date To");

            // add the title
            await act(async () => {
                fireEvent.change(textBox_title, { target: { value: 'New Reminder' } });
                fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
                fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });
                fireEvent.change(textBox_date_from, { target: { value: date } });
                fireEvent.change(textBox_date_to, { target: { value: tomorrow } });


                const doneButton = screen.getByLabelText('Done')
                await waitFor(() => expect(doneButton).not.toBeDisabled())
                fireEvent.click(doneButton);
            })
            // Check if the expected action was dispatched
            const authToken = store.getState().user.authentication.authToken
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': 'Bearer ' + authToken,

                },
                body: JSON.stringify({
                    type: 'reminder',
                    title: 'New Reminder',
                    notes: 'Lorem Ipsum',
                    place: 'Dolores sit',
                    date_from: date,
                    date_to: tomorrow,
                    attendees: []
                })
            };
            // Check if the expected action was dispatched
            expect(apiFetch).toHaveBeenCalledWith(`${apiUrl}/calendar`, options, expect.any(Function))
        });
    });

    describe('NewEvent', () => {
        test('dispatches addEvent action when button is clicked', async () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <NewEvent />
                    </Provider>
                </BrowserRouter>
            );
            const textBox_title = screen.getByLabelText("Title");
            const textBox_value = screen.getByLabelText("Description");
            const textBox_place = screen.getByLabelText("Place");
            const textBox_date_from = screen.getByLabelText("Date From");
            const textBox_date_to = screen.getByLabelText("Date To");
            const doneButton = screen.getByLabelText('Done')

            // add the title
            await act(async () => {
                fireEvent.change(textBox_title, { target: { value: 'New Event' } });
                fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
                fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });
                fireEvent.change(textBox_date_from, { target: { value: date } });
                fireEvent.change(textBox_date_to, { target: { value: tomorrow } });


                await waitFor(() => expect(textBox_title).toHaveValue('New Event'))
                await waitFor(() => expect(textBox_value).toHaveValue('Lorem Ipsum'))
                await waitFor(() => expect(textBox_place).toHaveValue('Dolores sit'))
                await waitFor(() => expect(textBox_date_from).toHaveValue(date))
                await waitFor(() => expect(textBox_date_to).toHaveValue(tomorrow))



                await waitFor(() => expect(doneButton).not.toBeDisabled())
                fireEvent.click(doneButton);
            })
            // Check if the expected action was dispatched
            const authToken = store.getState().user.authentication.authToken
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': 'Bearer ' + authToken,

                },
                body: JSON.stringify({
                    'type': 'event',
                    'title': 'New Event',
                    'notes': 'Lorem Ipsum',
                    'place': 'Dolores sit',
                    'date_from': date,
                    'date_to': tomorrow,
                    'attendees': [],
                    'shared_to':'1',
                })
            };
            // Check if the expected action was dispatched
            expect(apiFetch).toHaveBeenCalledWith(`${apiUrl}/calendar`, options, expect.any(Function))
        });
    });
});