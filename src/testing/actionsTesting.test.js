
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import store from '../store'
import { addTodo } from '../components/items/itemSlice';
import { NewAppointment, NewEvent, NewReminder } from '../components/calandar';
import { NewNote, NewTodo } from '../components/items';
import calendar, { calendarPost } from '../components/calandar/calendarSlice';

const date = new Date().setHours(0, 0, 0, 0);

// const initialState = {
//     calendar: { calendarItems: [] },
//     items: {
//         todos: [],
//         notes: [],
//     },
//     wall: [],
//     user: {
//         displayName: '',
//         telephoneNumber: '',
//         email: '',
//         friends: [],
//     },
// };
const initialState = {
    calendarItems: [],
    todos: [],
    notes: [],
    wall: [],
    user: {
        displayName: '',
        telephoneNumber: '',
        email: '',
        friends: [],
    },
};


//const mockStore = configureStore([]);
describe("action tests", () => {
    afterEach(() => {
        cleanup()
    })
    describe('NewTodo', () => {
        test('dispatches addTodo action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state

            render(
                <Provider store={store}>
                    <NewTodo />
                </Provider>
            );
            const textBox_title = screen.getByLabelText("title");
            const textBox_newItem = screen.getByLabelText("new item");
            // add the title
            fireEvent.change(textBox_title, { target: { value: 'New Todo' } });
            // add some todo items 
            fireEvent.change(textBox_newItem, { target: { value: 'foo' } });
            fireEvent.click(screen.getByText('Add new item'));
            fireEvent.change(textBox_newItem, { target: { value: 'bar' } });
            fireEvent.click(screen.getByText('Add new item'));
            // Simulate a button click


            fireEvent.click(screen.getByText('Add Todo'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([addTodo({ title: 'New Todo', items: [{ value: 'foo', done: false }, { value: 'bar', done: false }] })]);
        });
    });

    describe('NewNote', () => {
        test('dispatches addNote action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state

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
            expect(actions).toEqual([addTodo({ title: 'New Note', value: 'Lorem Ipsum' })]);
        });
    });

    describe('NewAppointment', () => {
        test('dispatches addAppointment action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state

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
            fireEvent.change(textBox_dateTo, { target: { value: date + 1 } });


            fireEvent.click(screen.getByText('Add Appointment'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([addTodo({ title: 'New Appointment', value: 'Lorem Ipsum', place: 'Dolores sit', dateFrom: date, dateTo: date + 1 })]);
        });
    });

    describe('NewReminder', () => {
        test('dispatches addReminder action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state

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
            fireEvent.change(textBox_dateTo, { target: { value: date + 1 } });


            fireEvent.click(screen.getByText('Add Reminder'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            expect(actions).toEqual([addTodo({ title: 'New Reminder', value: 'Lorem Ipsum', place: 'Dolores sit', dateFrom: date, dateTo: date + 1 })]);
        });
    });

    describe('NewEvent', () => {
        test('dispatches addEvent action when button is clicked', () => {
            // const store = mockStore(initialState); // Initial store state

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
            fireEvent.change(textBox_dateTo, { target: { value: date + 1 } });


            fireEvent.click(screen.getByText('Add Event'));

            // Check if the expected action was dispatched
            const actions = store.getActions();
            console.log("actions", actions)
            expect(store.getActions()).toEqual([calendarPost.pending()]);
        });
    });
});