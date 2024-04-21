import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCalendar } from "../calendarSlice";
import UpdateEvent from "./event/NewEvent";
import UpdateReminder from "./reminder/UpdateReminder";
import UpdateAppointment from "./appointment/UpdateAppointment";


export default function UpdateCalendarItem(){


    

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const calendar = useSelector(selectCalendar)
    const [item_id] = useState(searchParams.get('id'))
    const [calendarItem, setCalendarItem] = useState()

    


    useEffect(()=>{
        // eslint-disable-next-line eqeqeq
        setCalendarItem(calendar.filter((e) => { return e.id == item_id })[0])

    },[calendar, item_id])
    
    switch(calendarItem.type){
        case 'Event':
            return <UpdateEvent calendarItem={calendarItem} />
        case 'Appointment':
            return <UpdateAppointment calendarItem={calendarItem} />
        case 'Reminder': 
        return <UpdateReminder calendarItem={calendarItem} />
        default:
            navigate('/main')
    }


}