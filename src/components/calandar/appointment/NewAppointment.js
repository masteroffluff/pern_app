import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { calendarPost } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewAppointment() {

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [attendee, setAttendee] = useState('')
    const [attendees, setAttendees] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(setPopup(true))
    return ()=>dispatch(setPopup(false))
    },[dispatch])

    const submitAppointment = (e) => {
        e.preventDefault();
        dispatch(calendarPost({ title, type: 'appointment', notes, place, dateFrom, dateTo, attendees }))
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
    const attendeesUpdate = (e) => {
        e.preventDefault()
        const newAttendeess = [...attendees, e.target.value]
        setAttendees(newAttendeess)
        setAttendee('')
    }
    const attendeeUpdate = (e) => {
        e.preventDefault();
        setAttendee(e.target.value)
    }
    const cancelAppointment=(e)=>{
        e.preventDefault()
        navigate('/')
    }


    return <div data-testid="newAppointment" className='popup'>
        <h3>Add Appointement</h3>
        <form onSubmit={submitAppointment}>
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} /><br />

            <label htmlFor="value">Description</label><br />
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes} /><br />

            <label htmlFor="place">Place</label><br />
            <input data-testid="place" type='text' id='place' onChange={placeUpdate} value={place} /><br />

            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' onChange={dateFromUpdate} value={dateFrom} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' onChange={dateToUpdate} value={dateTo} />

            <label htmlFor="attendee">Attendees</label>
            <input data-testid="attendee" type='text' id='attendee' onChange={attendeeUpdate} value={attendee} />
            <button type='button' data-testid='invite-attendee' aria-label="Invite Attendee" value='Invite Attendee' onClick={attendeesUpdate}>Invite Attendee</button>

            <br />
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelAppointment}>Cancel</button>
            <button type='submit' data-testid='confirmButton' aria-label="Done" value='Done'>Done</button>
        </form>
    </div>
}