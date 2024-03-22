import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsNoteAdd, hasErrorItems, isLoadingItems } from "../itemSlice";
import { wallFetch } from "../../mainPage/wallSlice";

import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewNote() {

    const navigate = useNavigate()
    const hasError = useSelector(hasErrorItems)
    const isLoading = useSelector(isLoadingItems)

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
        dispatch(itemsNoteAdd({ title, notes })).unwrap()
        dispatch(wallFetch()).unwrap()
        navigate('/')
    }
    const cancelNote=(e)=>{
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newNote" className='popup'>
        <h3>Note</h3>
        <form onSubmit={submitNote} >
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title}/><br />

            <label htmlFor="value">Notes</label><br />
            <textarea data-testid="notes" rows="4" cols="50" id='value' onChange={notesUpdate} value={notes}/><br />
            <br />
            <button data-testid="shareButton" value="share" id='shareButton'>Share</button>
            <button type='cancel' data-testid="cancelButton" id='cancel' value='cancel' onClick={cancelNote}>Cancel</button>
            <button type='submit' data-testid="confirmButton" id='addNote' value='Confirm'>Confirm</button>
            <p>{{isLoading}?'Generating Note':hasError?<span className='errorMessage'>{hasError}</span>:<></>}</p>
            
        </form>
    </div>
}