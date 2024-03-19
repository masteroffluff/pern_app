import React from "react";
import {Reminder, Appointment, Event} from '../calandar'
import {Note} from '../items'



export default function DisplayItem({data}){
    const {type, title, value, owner, date_to, date_from, date}=data
    
    switch(type){
        case 'appointment':
            return <Appointment title={title} value={value} date_from={date_from} date_to={date_to} owner={owner} />
        case 'reminder':
            return <Reminder title={title} value={value} date_from={date_from} date_to={date_to} owner={owner} />
        case 'event':
            return <Event title={title} value={value} date_from={date_from} date_to={date_to}  owner={owner} />
        case 'note':
        case 'notification':
            return <Note title={title} value={value} date={date} owner={owner} />
        default:
            return <><p>{type}</p></>
    }
}