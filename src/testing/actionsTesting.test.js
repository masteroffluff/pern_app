
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
//import configureStore from 'redux-mock-store';
import { setupStore } from '../store'
import { itemsTodoAdd, itemsNoteAdd } from '../components/items/itemSlice';
import { calendarPost } from '../components/calandar/calendarSlice';
import { NewAppointment, NewEvent, NewReminder } from '../components/calandar';
import { NewNote, NewTodo } from '../components/items/index.js';


import dummyStore, { date, tomorrow, time1, time2, time3 } from './dummyData.js'

import apiFetch from '../utils/apiFetch'; // Import the apifetch function

jest.mock('../utils/apiFetch',()=>jest.fn());
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
            render(
                <Provider store={store}>
                    <NewTodo />
                </Provider>
            );
            
            const textBox_title = screen.getByLabelText("title");
            const textBox_newItem = screen.getByLabelText("New Item");
            const button_addTodoItem = screen.getByLabelText('Add Todo Item')
            expect(button_addTodoItem).toBeInTheDocument()
            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Todo' } });
            // add some todo items 
            fireEvent.change(textBox_newItem, { target: { value: 'foo' } });
            fireEvent.click(button_addTodoItem);
            fireEvent.change(textBox_newItem, { target: { value: 'bar' } });
            fireEvent.click(button_addTodoItem);
            // Simulate a button click
            fireEvent.click(screen.getByLabelText('Done'));
                
            expect(apiFetch).toHaveBeenCalledWith(apiUrl+'/items/todo',{"body": {"items": [{"done": false, "value": "foo"}, {"done": false, "value": "bar"}], "notes": "", "title": "New Todo"}, "credentials": "include", "headers": {}, "method": "POST"}, expect.any(Function))
        });


    });

    describe('NewNote', () => {
        test('dispatches addNote action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <Provider store={store}>
                    <NewNote />
                </Provider>
            );
            const textBox_title = screen.getByLabelText("title");
            const textBox_value = screen.getByLabelText("value");
            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Note' } });
            // add some todo items 
            fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });

            fireEvent.click(screen.getByText('Add Note'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([itemsNoteAdd({ title: 'New Note', value: 'Lorem Ipsum' })]);
        });
    });

    describe('NewAppointment', () => {
        test('dispatches addAppointment action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <Provider store={store}>
                    <NewAppointment />
                </Provider>
            );
            const textBox_title = screen.getByLabelText("title");
            const textBox_value = screen.getByLabelText("value");
            const textBox_place = screen.getByLabelText("value");
            const textBox_dateFrom = screen.getByLabelText("date from");
            const textBox_dateTo = screen.getByLabelText("date to");
            //const selection_invites = screen.getByLabelText("invites");// not sure how to add invitees yet

            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Appointment' } });
            fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
            fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });
            fireEvent.change(textBox_dateFrom, { target: { value: date } });
            fireEvent.change(textBox_dateTo, { target: { value: tomorrow } });


            fireEvent.click(screen.getByText('Add Appointment'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([calendarPost({ title: 'New Appointment', value: 'Lorem Ipsum', place: 'Dolores sit', dateFrom: date, dateTo: tomorrow })]);
        });
    });

    describe('NewReminder', () => {
        test('dispatches addReminder action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <Provider store={store}>
                    <NewReminder />
                </Provider>
            );
            const textBox_title = screen.getByLabelText("title");
            const textBox_value = screen.getByLabelText("value");
            const textBox_place = screen.getByLabelText("value");
            const textBox_dateFrom = screen.getByLabelText("date from");
            const textBox_dateTo = screen.getByLabelText("date to");

            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Reminder' } });
            fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
            fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });
            fireEvent.change(textBox_dateFrom, { target: { value: date } });
            fireEvent.change(textBox_dateTo, { target: { value: tomorrow } });


            fireEvent.click(screen.getByText('Add Reminder'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([calendarPost({ title: 'New Reminder', value: 'Lorem Ipsum', place: 'Dolores sit', dateFrom: date, dateTo: tomorrow })]);
        });
    });

    describe('NewEvent', () => {
        test('dispatches addEvent action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state
            const store = setupStore({})
            render(
                <Provider store={store}>
                    <NewEvent />
                </Provider>
            );
            const textBox_title = screen.getByLabelText("Title");
            const textBox_value = screen.getByLabelText("Description");
            const textBox_place = screen.getByLabelText("Place");
            const textBox_dateFrom = screen.getByLabelText("Date From");
            const textBox_dateTo = screen.getByLabelText("Date To");

            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Event' } });
            fireEvent.change(textBox_value, { target: { value: 'Lorem Ipsum' } });
            fireEvent.change(textBox_place, { target: { value: 'Dolores sit' } });
            fireEvent.change(textBox_dateFrom, { target: { value: date } });
            fireEvent.change(textBox_dateTo, { target: { value: tomorrow } });


            fireEvent.click(screen.getByText('Add Event'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            console.log("actions", actions)
            expect(store.getActions()).toEqual([calendarPost.pending()]);
        });
    });
});