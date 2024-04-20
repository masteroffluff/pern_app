import React from "react";
import moment from "moment";
import CalendarItemButtonBar from "../CalendarItemButtonBar";

export default function Appointment({editable, item}){
    const { title, value, date_to, date_from , place, owner} = item
    const dateFrom = moment(date_from)
    const dateTo= moment(date_to)
    
    return <div data-testid="appointment">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p> Takes place at <p aria-label="place">{place}</p> on <span aria-label="date_from">{dateFrom.format('ddd Do MMMM YYYY')}</span> 
            <span aria-label="time_from">{dateFrom.format('HH:mm')}</span> until <span aria-label="date_to">{dateTo.format('ddd Do MMMM YYYY')}</span> <span aria-label="time_to">{dateTo.format('HH:mm')}</span>
        </p>
        <p aria-label="owner">Set up by {owner}</p>
        <CalendarItemButtonBar editable={editable} item={item} />
    </div>
}