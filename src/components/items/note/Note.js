import React from "react";

export default function Note({title, value, date}){
    return <div data-testid="note">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <p aria-label="date">{date.toString()}</p>
    </div>
}