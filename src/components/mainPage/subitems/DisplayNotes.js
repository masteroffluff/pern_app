import React,{ useEffect } from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../../items/itemSlice";
import Note from "../../items/note/Note"
import { useNavigate } from "react-router";

export default function DisplayNotes(){
    const notes = useSelector(selectNotes)
    const navigate = useNavigate()
    const newNote_click = (e) =>{
        e.preventDefault()
        navigate('/newnote')
    }
    return <div data-testid="displayNotes">
        <h3>Notes</h3>
        <ul>
            {notes.map(({ value, title, owner, date },i)=><li key={i}><Note value={value} title={title} owner={owner} date={date}/></li>)}
        </ul>
        <button data-testid='newNote' value='newNote' onClick={newNote_click} >New Note</button>
    </div>
}