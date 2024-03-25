import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsNoteAdd, hasErrorItems, isLoadingItems } from "../itemSlice";
//import { wallFetch } from "../../mainPage/wallSlice";

import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewNote() {

    const navigate = useNavigate()
    const hasError = useSelector(hasErrorItems)
    const isLoading = useSelector(isLoadingItems)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPopup(true))
        return () => dispatch(setPopup(false))
    }, [dispatch])

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [sharedTo, setSharedTo] = useState(1)

    const titleUpdate = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate = (e) => {
        e.preventDefault();
        setNotes(e.target.value)
    }
    const sharedToChange = (e) => {
        e.preventDefault();
        setSharedTo(e.target.value)
    }
    const submitNote = (e) => {
        e.preventDefault()
        if (!title || !notes) {

            return
        }
        dispatch(itemsNoteAdd({ title, notes, sharedTo })).unwrap()
        //dispatch(wallFetch()).unwrap()
        navigate('/')
    }
    const cancelNote = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newNote" className='popup'>
        <h3>Note</h3>
        <form onSubmit={submitNote} >
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} /><br />

            <label htmlFor="value">Notes</label><br />
            <textarea rows="4" cols="50" data-testid="notes" id='value' onChange={notesUpdate} value={notes} /><br />
            <br />
            <label htmlFor="shareButton">Share</label><br />
            <select data-testid="shareButton" value="sharedTo" id='shareButton' onChange={sharedToChange}>
                <option value="1">Myself</option>
                <option value="2">My Friends</option>
            </select>
            <button type='cancel' data-testid="cancelButton" id='cancel' value='cancel' onClick={cancelNote}>Cancel</button>
            <button type='submit' disabled={(!title || !notes)} data-testid="Done" aria-label="Done" id='addNote' value='Done'>Done</button>
            <p>{isLoading ? 'Generating Note' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>

        </form>
    </div>
}