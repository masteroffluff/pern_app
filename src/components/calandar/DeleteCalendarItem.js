import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { hasErrorItems, isLoadingItems, selectNotes, itemsNoteUpdate, itemsNoteDelete } from "../itemSlice";
import { hasErrorCalendar, isLoadingCalendar, selectCalendar, calendarDelete } from "./calendarSlice";
//import { wallFetch } from "../../mainPage/wallSlice";

import { setPopup } from "../mainPage/popupSlice";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function DeleteNote() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()


    const calendar = useSelector(selectCalendar)
    const hasError = useSelector(hasErrorCalendar)
    const isLoading = useSelector(isLoadingCalendar)


    const dispatch = useDispatch();
    const [title, setTitle] = useState()
    const [id] = useState(searchParams.get('id'))



    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const myCalendarItem = calendar.filter((e) => { return e.id == id })[0]
        if (!myCalendarItem) { return }
        dispatch(setPopup(true))
        setTitle(myCalendarItem.title)


        return () => dispatch(setPopup(false))
    }, [dispatch, id, navigate, calendar, searchParams])

    const submitNote = (e) => {
        e.preventDefault()
        dispatch(calendarDelete({ id }))
        //dispatch(wallFetch()).unwrap()
        navigate('/main')
    }
    const cancelNote = (e) => {
        e.preventDefault()
        navigate('/main')
    }
    return (
        <div data-testid="deleteCalendar" className='popup'>
            <h3>Really Delete Note?</h3>
            <form onSubmit={submitNote} >
                <h4>"{title}"</h4>
                <br />
                <button type='no' data-testid="cancelButton" id='no' value='no' onClick={cancelNote}>No</button>
                <button type='submit' data-testid="yes" aria-label="yes" id='updateNote' >Yes</button>
                <p>{isLoading ? 'Generating Note' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>
            </form>
        </div>
    )
}