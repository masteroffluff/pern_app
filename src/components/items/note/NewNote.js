import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { itemsNoteAdd } from "../itemSlice";

export default function NewNote() {
    const dispatch = useDispatch();

    const [title,setTitle] = useState('')
    const [notes, setNotes] = useState ('')

    const titleUpdate =(e)=>{
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate =(e)=>{
        e.preventDefault();
        setNotes(e.target.value)
    }
    const submitNote=(e)=>{
        e.preventDefault()
        dispatch(itemsNoteAdd({ title, notes }))
    }

    return <div data-testid="newNote">
        <h3>Note</h3>
        <form onSubmit={submitNote}>
            <label htmlFor="title">Title</label>
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title}/>

            <label htmlFor="value">Notes</label>
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes}/>

            <button type='cancel' data-testid="cancelButton" id='cancel' value='cancel' />
            <input type='submit' data-testid="confirmButton" id='addNote' value='Confirm' />
            <button data-testid="shareButton" value="share" id='shareButton' />
        </form>
    </div>
}