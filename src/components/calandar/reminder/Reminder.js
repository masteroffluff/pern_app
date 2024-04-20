import React from "react";
import moment from 'moment';

export default function Reminder({title, value, date_to, date_from}){
    const dateFrom = moment(date_from)
    const dateTo= moment(date_to)
    // TODO: add dismiss function
    return (<div data-testid="reminder">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="date_from">{dateFrom.format('ddd Do MMMM YYYY')}</p>
        <p aria-label="date_to">{dateTo.format('ddd Do MMMM YYYY')}</p>
    </div>)
}