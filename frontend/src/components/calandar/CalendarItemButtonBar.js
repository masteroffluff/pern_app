import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { calendarDeleteAttendee, calendarPostAttendee } from "./calendarSlice";
import { selectUserID } from "../user/auth/userAuthSlice";

export default function CalendarItemButtonBar({ editable, item }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userId = useSelector(selectUserID)

    const { item_id, type, attendees } = item

    const [iAmAttending, setIamAttending] = useState()


    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        console.log(item_id, attendees)
        setIamAttending(attendees.map((e)=>e.person).includes(userId))
    }, [attendees, item_id, userId])

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
        dispatch(calendarPostAttendee({ item_id, attendee: userId }))
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