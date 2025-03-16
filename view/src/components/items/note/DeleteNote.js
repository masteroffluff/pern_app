import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hasErrorItems, isLoadingItems, selectNotes, itemsNoteDelete } from "../itemSlice";
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
    const [id] = useState(searchParams.get('id'))



    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const myNote = notesList.filter((e) => { return e.id == id})[0]
        if (!myNote) { return}
        dispatch(setPopup(true))
        setTitle(myNote.title)


        return () => dispatch(setPopup(false))
    }, [dispatch, id, navigate, notesList, searchParams])

    const submitNote = (e) => {
        e.preventDefault()
        dispatch(itemsNoteDelete({ id })).unwrap()
        .then(()=>dispatch(wallFetch()))
        //dispatch(wallFetch()).unwrap()
        navigate('/main')
    }
    const cancelNote = (e) => {
        e.preventDefault()
        navigate('/main')
    }

    return <div data-testid="deleteNote" className='popup'>
        <h3>Really Delete Note?</h3>
        <form onSubmit={submitNote} >

            <h4>"{title}"</h4>
            <br />
            <button type='no' data-testid="cancelButton" id='no' value='no' onClick={cancelNote}>No</button>
            <button type='submit' data-testid="yes" aria-label="yes" id='deleteNote' >Yes</button>
            <p>{isLoading ? 'Generating Note' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>

        </form>
    </div>
}