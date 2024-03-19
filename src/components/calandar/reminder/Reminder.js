import React from "react";

export default function Reminder({title, value, date_to, date_from}){
    return (<div data-testid="reminder">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="date_from">{date_from.toString()}</p>
        <p aria-label="date_to">{date_to.toString()}</p>
    </div>)
}