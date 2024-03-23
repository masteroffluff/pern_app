import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarPost, hasErrorCalendar, isLoadingCalendar } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";


export default function NewReminder() {
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const hasError = useSelector(hasErrorCalendar)
    const isLoading = useSelector(isLoadingCalendar)


    useEffect(() => {
        dispatch(setPopup(true))
        return () => dispatch(setPopup(false))
    }, [dispatch])

    const submitReminder = (e) => {
        e.preventDefault();
        dispatch(calendarPost({ title, type: 'reminder', notes, place, dateFrom, dateTo, attendees: [] })).unwrap()
        navigate('/')
    }



    const titleUpdate = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate = (e) => {
        e.preventDefault();
        setNotes(e.target.value)
    }
    const placeUpdate = (e) => {
        e.preventDefault();
        setPlace(e.target.value)
    }
    const dateFromUpdate = (e) => {
        e.preventDefault();
        setDateFrom(e.target.value)
    }
    const dateToUpdate = (e) => {
        e.preventDefault();
        setDateTo(e.target.value)
    }
    const cancelReminder = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newReminder" className='popup'>
        <h3>Add Reminder</h3>
        <form onSubmit={submitReminder}>
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} /><br />

            <label htmlFor="value">Description</label><br />
            <textarea rows="4" cols="50" data-testid="notes" id='value' onChange={notesUpdate} value={notes} /><br />

            <label htmlFor="place">Place</label><br />
            <input data-testid="place" type='text' id='place' onChange={placeUpdate} value={place} /><br />

            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' onChange={dateFromUpdate} value={dateFrom} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' onChange={dateToUpdate} value={dateTo} />
            <br />
            <button type='button' data-testid='shareButton' aria-label="Share" value='Share'>Share</button>
            <button type='cancel' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelReminder}>Cancel</button>
            <button type='submit' data-testid='Done' aria-label="Done" value='Done'>Done</button>
        </form>
        <p>{isLoading?'Generating Todo':hasError?<span className='errorMessage'>{hasError}</span>:<></>}</p>
    </div>
}