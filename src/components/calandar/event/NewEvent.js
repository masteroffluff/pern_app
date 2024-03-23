import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarPost, hasErrorCalendar, isLoadingCalendar } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";


export default function NewEvent() {

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [sharedTo, setSharedTo] = useState(1)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const hasError = useSelector(hasErrorCalendar)
    const isLoading = useSelector(isLoadingCalendar)


    useEffect(()=>{
        dispatch(setPopup(true))
    return ()=>dispatch(setPopup(false))
    },[dispatch])

    const submitEvent = (e) => {
        e.preventDefault();
        dispatch(calendarPost({ title, type: 'event', notes, place, dateFrom, dateTo, attendees:[], sharedTo })).unwrap()
        navigate('/')
    }
    const cancelEvent=(e)=>{
        e.preventDefault()
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
    return <div data-testid="newEvent"  className='popup'>
        <h3>Add Event</h3>
        <form onSubmit={submitEvent}>
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
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelEvent}>Cancel</button>
            <button type='submit' disabled={!title||!notes||!dateFrom||!dateTo} data-testid='Done' aria-label="Done" value='Done' >Done</button>
        </form>
        <p>{isLoading?'Generating Event':hasError?<span className='errorMessage'>{hasError}</span>:<></>}</p>
    </div>
}