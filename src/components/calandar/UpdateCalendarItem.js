import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCalendar } from "./calendarSlice";
import UpdateEvent from "./event/UpdateEvent";
import UpdateReminder from "./reminder/UpdateReminder";
import UpdateAppointment from "./appointment/UpdateAppointment";


export default function UpdateCalendarItem(){


    

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const calendar = useSelector(selectCalendar)
    const item_id = searchParams.get('id')
    //const [calendarItem, setCalendarItem] = useState()

    // eslint-disable-next-line eqeqeq
    const calendarItem = calendar.filter((e) => { return e.item_id == item_id })[0]


    switch(calendarItem.type){
        case 'event':
            return <UpdateEvent calendarItem={calendarItem} />
        case 'appointment':
            return <UpdateAppointment calendarItem={calendarItem} />
        case 'reminder': 
        return <UpdateReminder calendarItem={calendarItem} />
        default:
            alert(calendarItem.type)
            console.log(calendarItem)
    }


}