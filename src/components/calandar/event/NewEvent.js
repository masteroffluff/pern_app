import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { calendarPost } from "../calendarSlice";


export default function NewEvent() {
    const dispatch = useDispatch()
    const onSubmit = () => {
        const date = new Date().setHours(0, 0, 0, 0);

        dispatch(calendarPost({ title: 'New Appointment', value: 'Lorem Ipsum', place: 'Dolores sit', dateFrom: date, dateTo: date }))
    }
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const titleUpdate = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate = (e) => {
        e.preventDefault();
        setNotes(e.target.value)
    }
    return <div data-testid="newEvent" onSubmit={onSubmit}>
        <h3>Add Event</h3>
        <form>
            <label htmlFor="title">title</label>
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} />

            <label htmlFor="value">To Do Notes</label>
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes} />

            <label htmlFor="place">Place</label>
            <input type='text' id='place' />

            <label htmlFor="dateFrom">Date From</label>
            <input type='date' id='dateFrom'></input>

            <label htmlFor="dateTo">Date To</label>
            <input type='date' id='dateTo' />

            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' />
            <button type='submit' data-testid='confirmButton' aria-label="Done" value='Done' />
        </form>
    </div>
}