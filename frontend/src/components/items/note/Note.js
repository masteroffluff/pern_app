import moment from "moment";
import React from "react";
import './note.css'
import { useNavigate } from "react-router";

export default function Note({id, editable, title, value, date, type}){
    const navigate = useNavigate()
    const dateMoment = moment(date)
    const deleteClick = (e) => {
        e.preventDefault()
        navigate(`/main/deletenote?id=${id}`)
        
    }
    const editClick = (e) => {
        e.preventDefault()
        navigate(`/main/updatenote?id=${id}`)
    }
    const ButtonBlock = () =>{
        switch (type){
            case 'note':
            return (<div style={editable?{display:'block'}:{display:"none"}}>
                <button onClick={deleteClick}>Delete</button>
                <button onClick={editClick}>Edit</button>
            </div>)
            case 'notification':
            return (
            <div style={editable?{display:'block'}:{display:"none"}}>
                <button onClick={deleteClick}>Dismiss</button>
            </div>)
            default:
        }
    }

    return <div data-testid="note">
        <span><h4 style={{display:'inline'}}><span aria-label="Title">{title}</span></h4>-<span aria-label="date">{dateMoment.format('Do MMMM YYYY, h:mm:ss a')}</span></span>
        <span className='note_wrapper'>
            <p aria-label="Description" className="noteValue">{value}</p>
            
        </span>
        <ButtonBlock />
    </div>
}