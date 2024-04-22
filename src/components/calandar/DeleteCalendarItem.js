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
    const [type, setType] = useState()
    const [item_id] = useState(searchParams.get('id'))



    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const myCalendarItem = calendar.filter((e) => { return e.id == item_id })[0]
        if (!myCalendarItem) { return }
        dispatch(setPopup(true))
        setTitle(myCalendarItem.title)
        const txt = myCalendarItem.type
        
        setType(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

        return () => dispatch(setPopup(false))
    }, [dispatch, item_id, navigate, calendar, searchParams])

    const submit = (e) => {
        e.preventDefault()
        dispatch(calendarDelete({ item_id }))
        //dispatch(wallFetch()).unwrap()
        navigate('/main')
    }
    const cancelClick = (e) => {
        e.preventDefault()
        navigate('/main')
    }
    return (
        <div data-testid="deleteCalendar" className='popup'>
            <h3>Really Delete {type}?</h3>
            <form onSubmit={submit} >
                <h4>"{title}"</h4>
                <br />
                <button type='no' data-testid="no" id='no' value='no' onClick={cancelClick}>No</button>
                <button type='submit' data-testid="yes" aria-label="yes" id='updateNote' >Yes</button>
                <p>{isLoading ? 'Generating Note' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>
            </form>
        </div>
    )
}