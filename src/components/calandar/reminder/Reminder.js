import React from "react";

export default function Reminder({title, value, dateTo, dateFrom}){
    return (<div data-testid="reminder">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="dateFrom">{dateFrom.toString()}</p>
        <p aria-label="dateTo">{dateTo.toString()}</p>
    </div>)
}