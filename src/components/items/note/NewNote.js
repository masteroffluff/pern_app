import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemsNoteAdd } from "../itemSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewNote() {

    const navigate = useNavigate()


    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setPopup(true))
     return () => dispatch(setPopup(false))
    },[dispatch])

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
    const cancelNote=(e)=>{
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newNote" className='popup'>
        <h3>Note</h3>
        <form onSubmit={submitNote} >
            <label htmlFor="title">Title</label>
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title}/>

            <label htmlFor="value">Notes</label>
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes}/>

            <button type='cancel' data-testid="cancelButton" id='cancel' value='cancel' onClick={cancelNote}>Cancel</button>
            <button type='submit' data-testid="confirmButton" id='addNote' value='Confirm'>Confirm</button>
            <button data-testid="shareButton" value="share" id='shareButton'>Share</button>
        </form>
    </div>
}