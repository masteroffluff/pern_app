import React from "react";

export default function Appointment({title, value, dateTo, dateFrom , place, owner}){
    return <div data-testid="appointment">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="dateFrom">{dateFrom.toString()}</p>
        <p aria-label="dateTo">{dateTo.toString()}</p>
        <p aria-label="place">{place}</p>
    </div>
}