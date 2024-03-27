import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarPost, hasErrorCalendar, isLoadingCalendar } from "../calendarSlice";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";
import { selectFriends_LiveMap, friendsFetch } from "../../user/friends/userFriendsSlice";


export default function NewAppointment() {

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [place, setPlace] = useState('')
    const [date_from, setDateFrom] = useState('')
    const [date_to, setDateTo] = useState('')
    const [attendee, setAttendee] = useState(false)
    const [attendees, setAttendees] = useState(new Map())

    const friendsMap = useSelector(selectFriends_LiveMap)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hasError = useSelector(hasErrorCalendar)
    const isLoading = useSelector(isLoadingCalendar)

    useEffect(() => {
        dispatch(setPopup(true))
        dispatch(friendsFetch)
        return () => dispatch(setPopup(false))
    }, [dispatch])

    const submitAppointment = (e) => {
        e.preventDefault();
        dispatch(calendarPost({ title, type: 'appointment', notes, place, date_from, date_to, attendees:Object.values(attendees), shared_to: 1 })).unwrap()
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
    const date_fromUpdate = (e) => {
        e.preventDefault();
        setDateFrom(e.target.value)
    }
    const date_toUpdate = (e) => {
        e.preventDefault();
        setDateTo(e.target.value)
    }
    const attendeesClick = (e) => {
        e.preventDefault()
        console.log(attendee,friendsMap, friendsMap.get(attendee))

        if (attendee) {
            const newAttendees = new Map(attendees)
            newAttendees.set(attendee, friendsMap.get(Number(attendee)))
            setAttendees(newAttendees)
            setAttendee(false)
        }
    }
    const attendeeUpdate = (e) => {
        e.preventDefault();
        setAttendee(e.target.value)
    }
    const cancelAppointment = (e) => {
        e.preventDefault()
        navigate('/')
    }
    

    return <div data-testid="newAppointment" className='popup'>
        <h3>Add Appointement</h3>
        <form onSubmit={submitAppointment}>
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
            <label htmlFor="attendee">Attendees</label>
            <select data-testid="attendee" type='text' id='attendee' onChange={attendeeUpdate} value={attendee}>
                <option value='false'>...........</option>
                {Array.from(friendsMap.keys()).map((e, i) => {
                    return <option key={i} value={e}>{friendsMap.get(e)}</option>
                })}
            </select>
            
            <button type='button' data-testid='invite-attendee' aria-label="Invite Attendee" value='Invite Attendee' onClick={attendeesClick}>Invite Attendee</button>
            <br />
            <label>Invited:</label>
            <p>{Array.from(attendees.values()).join(', ')}</p>
            <br />
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelAppointment}>Cancel</button>
            <button type='submit' data-testid='Done' disabled={!title || !notes || !date_from || !date_to} aria-label="Done" value='Done'>Done</button>
        </form>
        <p>{isLoading ? 'Generating Appointment' : hasError ? <span className='errorMessage'>{hasError}</span> : <></>}</p>
    </div>
}