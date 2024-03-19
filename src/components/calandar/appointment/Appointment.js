import React from "react";

export default function Appointment({title, value, date_to, date_from , place, owner}){
    return <div data-testid="appointment">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="date_from">{date_from}</p>
        <p aria-label="date_to">{date_to}</p>
        <p aria-label="place">{place}</p>
        <p aria-label="owner">{owner}</p>
    </div>
}