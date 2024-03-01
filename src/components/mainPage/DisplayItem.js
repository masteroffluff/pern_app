import React from "react";
import {Reminder, Appointment, Event} from '../calandar'
import {Note, Todo} from '../items'


export default function DisplayItem({data}){
    const {type, title, value, owner, dateTo, dateFrom, date}=data
    switch(type){
        case 'appointment':
            return <Appointment title={title} value={value} dateFrom={dateFrom} dateTo={dateTo} owner={owner} />
        case 'reminder':
            return <Reminder title={title} value={value} dateFrom={dateFrom} dateTo={dateTo} owner={owner} />
        case 'event':
            return <Event title={title} value={value} dateFrom={dateFrom} dateTo={dateTo}  owner={owner} />
        case 'note':
            return <Note title={title} value={value} date={date} owner={owner} />
        default:
            return <></>
    }
}