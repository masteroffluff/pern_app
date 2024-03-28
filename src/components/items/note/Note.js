import moment from "moment";
import React from "react";
import './note.css'

export default function Note({title, value, date}){
    const dateMoment = moment(date)
    return <div data-testid="note">
        <span><h4 style={{display:'inline'}}><span aria-label="Title">{title}</span></h4>-<span aria-label="date">{dateMoment.format('Do MMMM YYYY, h:mm:ss a')}</span></span>
        <span className='note_wrapper'>
            <p aria-label="Description" className="noteValue">{value}</p>
        </span>
        
    </div>
}