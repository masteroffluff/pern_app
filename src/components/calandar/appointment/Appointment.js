import React from "react";
import moment from "moment";

export default function Appointment({title, value, date_to, date_from , place, owner}){
    const dateFrom = moment(date_from)
    const dateTo= moment(date_to)
    // TODO: add confirm/deny
    // TODO: update details
    
    return <div data-testid="appointment">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="date_from">{dateFrom.format('ddd Do MMMM YYYY')}</p>
        <p aria-label="date_to">{dateTo.format('ddd Do MMMM YYYY')}</p>
        <p aria-label="place">{place}</p>
        <p aria-label="owner">{owner}</p>
    </div>
}