import React, { useState } from "react";

export default function NewReminder(){
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

    return <div data-testid="newReminder">
        <h3>Add Reminder</h3>
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

            <label htmlFor="attendees">Attendees</label>
            <input type='text' id='attendees' />

            <button type='button' data-testid='shareButton' aria-label="Share" value='Share' />
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' />
            <button type='submit' data-testid='confirmButton' aria-label="Done" value='Done' />
        </form>
    </div>
}