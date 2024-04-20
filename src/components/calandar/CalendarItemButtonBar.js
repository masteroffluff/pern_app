import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { calendarDeleteAttendee } from "./calendarSlice";
import { selectUserID } from "../user/auth/userAuthSlice";

export default function CalendarItemButtonBar({ editable, item }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userId = useSelector(selectUserID)

    const { item_id, owner_id, type, attendees } = item

    const [iAmAttending, setIamAttending] = useState()


    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        setIamAttending(attendees.includes(userId))
    }, [userId, owner_id, attendees])

    const deleteClick = (e) => {
        e.preventDefault()
        navigate(`/main/deletecalendar?id=${item_id}`)

    }

    const editClick = (e) => {
        e.preventDefault()
        navigate(`/main/updatecalendar?id=${item_id}`)
    }
    const attendingClick = (e) => {
        e.preventDefault()
        dispatch()
    }
    const notAttening = (e) => {
        e.preventDefault()
        dispatch(calendarDeleteAttendee({ item_id, attendee: userId }))
    }


    switch (type) {
        case 'appointment':
        case 'event':
            if (editable) {
                return (
                    <div>
                        <button onClick={deleteClick}>Delete</button>
                        <button onClick={editClick}>Edit</button>
                    </div>
                )
            } else {
                if (iAmAttending) {
                    return (
                        <div>
                            <button onClick={notAttening}>Not Attending</button>
                        </div>)  
                } else{
                    return (
                        <div>
                            <button onClick={attendingClick}>Attending</button>
                        </div>)                    
                }
            }
        case 'reminder':
            return (
                <div>
                    <button onClick={deleteClick}>Dismiss</button>
                    <button onClick={editClick}>Edit</button>
                </div>
            )
        
        default:
    }
}