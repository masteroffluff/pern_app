import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarUpdate, hasErrorCalendar, isLoadingCalendar } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";


export default function UpdateReminder({calendarItem}) {
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [date_from, setDateFrom] = useState('')
    const [date_to, setDateTo] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const hasError = useSelector(hasErrorCalendar)
    const isLoading = useSelector(isLoadingCalendar)

    const {item_id} = calendarItem

    useEffect(() => {
        dispatch(setPopup(true))

        const {title,notes,date_from, date_to, place} = calendarItem
        setTitle(title)
        setNotes(notes)
        setDateFrom(date_from)
        setDateTo(date_to)
        setPlace(place)
        return () => dispatch(setPopup(false))
    }, [calendarItem, dispatch])

    const submitReminder = (e) => {
        e.preventDefault();
        dispatch(calendarUpdate({ item_id, title, type: 'reminder', notes, place, date_from, date_to, attendees: [], shared_to:1 })).unwrap()
        navigate('/main')
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
    const date_fromUpdate = (e) => {
        e.preventDefault();
        setDateFrom(e.target.value)
    }
    const date_toUpdate = (e) => {
        e.preventDefault();
        setDateTo(e.target.value)
    }
    const cancelReminder = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="updateReminder" className='popup'>
        <h3>Edit Reminder</h3>
        <form onSubmit={submitReminder}>
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} /><br />

            <label htmlFor="value">Description</label><br />
            <textarea rows="4" cols="50" data-testid="notes" id='value' onChange={notesUpdate} value={notes} /><br />

            <label htmlFor="place">Place</label><br />
            <input data-testid="place" type='text' id='place' onChange={placeUpdate} value={place} /><br />

            <label htmlFor="date_from">Date From</label>
            <input data-testid="date_from" type='date' id='date_from' onChange={date_fromUpdate} value={date_from} />

            <label htmlFor="date_to">Date To</label>
            <input data-testid="date_to" type='date' id='date_to' onChange={date_toUpdate} value={date_to} />
            <br />
            {/* <button type='button' data-testid='shareButton' aria-label="Share" value='Share'>Share</button> */}
            <button type='cancel' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelReminder}>Cancel</button>
            <button type='submit' data-testid='Done' aria-label="Done" value='Done'>Done</button>
        </form>
        <p>{isLoading?'Generating Todo':hasError?<span className='errorMessage'>{hasError}</span>:<></>}</p>
    </div>
}