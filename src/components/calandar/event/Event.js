import React from "react";

export default function Event({title, value, dateTo, dateFrom,place}){
    return <div data-testid="event">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="dateFrom">{dateFrom.toString()}</p>
        <p aria-label="dateTo">{dateTo.toString()}</p>
        <p aria-label="place">{place}</p>
    </div>
}