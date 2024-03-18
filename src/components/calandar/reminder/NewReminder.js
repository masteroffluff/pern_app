import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { calendarPost } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";


export default function NewReminder(){
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPopup(true))
    return ()=>dispatch(setPopup(false))
    },[dispatch])

    const submitReminder = (e) => {
        e.preventDefault();
        dispatch(calendarPost({ title, type: 'reminder', notes, place, dateFrom, dateTo, attendees:[] }))
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
    const cancelReminder=(e)=>{
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newReminder" className='popup'>
        <h3>Add Reminder</h3>
        <form  onSubmit={submitReminder}>
        <label htmlFor="title">Title</label>
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} />

            <label htmlFor="value">Description</label>
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes} />

            <label htmlFor="place">Place</label>
            <input data-testid="place" type='text' id='place' onChange={placeUpdate} value={place} />

            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' onChange={dateFromUpdate} value={dateFrom} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' onChange={dateToUpdate} value={dateTo} />

            <button type='button' data-testid='shareButton' aria-label="Share" value='Share'>Share</button>
            <button type='cancel' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelReminder}>Cancel</button>
            <button type='submit' data-testid='confirmButton' aria-label="Done" value='Done'>Done</button>
        </form>
    </div>
}