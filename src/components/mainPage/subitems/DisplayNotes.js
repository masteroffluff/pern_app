import React from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../../items/itemSlice";
import Note from "../../items/note/Note"

export default function DisplayNotes(){
    const notes = useSelector(selectNotes)
    return <div data-testid="displayNotes">
        <h3>Notes</h3>
        <ul>
            {notes.map(({ value, title, owner, date },i)=><li key={i}><Note value={value} title={title} owner={owner} date={date}/></li>)}
        </ul>
    </div>
}