import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hasErrorItems, isLoadingItems, selectNotes, itemsNoteUpdate, itemsNoteDelete } from "../itemSlice";
import { wallFetch } from "../../mainPage/wallSlice";

import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function DeleteNote() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()


    const notesList = useSelector(selectNotes)
    const hasError = useSelector(hasErrorItems)
    const isLoading = useSelector(isLoadingItems)


    const dispatch = useDispatch();
    const [title, setTitle] = useState()
    const [value, setValue] = useState()
    const [sharedTo, setSharedTo] = useState()
    const [id] = useState(searchParams.get('id'))



    useEffect(() => {
        
        
        // eslint-disable-next-line eqeqeq
        const myNote = notesList.filter((e) => { return e.id == id})[0]
        console.log(myNote)
        if (!myNote) { return}
        dispatch(setPopup(true))
        setTitle(myNote.title)
        setValue(myNote.notes)
        setSharedTo(myNote.shared_to)


        return () => dispatch(setPopup(false))
    }, [dispatch, id, navigate, notesList, searchParams])



    const titleUpdate = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate = (e) => {
        e.preventDefault();
        setValue(e.target.value)
    }
    const sharedToChange = (e) => {
        e.preventDefault();
        setSharedTo(e.target.value)
    }
    const submitNote = (e) => {
        e.preventDefault()
        if (!title || !value) {

            return
        }
        dispatch(itemsNoteDelete({ title, notes: value, shared_to:sharedTo, id })).unwrap()
        .then(()=>dispatch(wallFetch()))
        //dispatch(wallFetch()).unwrap()
        navigate('/main')
    }
    const cancelNote = (e) => {
        e.preventDefault()
        navigate('/main')
    }

    return <div data-testid="newNote" className='popup'>
        <h3>Really Delete Note?</h3>
        <form onSubmit={submitNote} >

            <h4>"{title}"</h4>
            <br />
            <button type='no' data-testid="cancelButton" id='no' value='no' onClick={cancelNote}>No</button>
            <button type='submit' disabled={(!title || !value)} data-testid="yes" aria-label="yes" id='updateNote' >Yes</button>
            <p>{isLoading ? 'Generating Note' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>

        </form>
    </div>
}