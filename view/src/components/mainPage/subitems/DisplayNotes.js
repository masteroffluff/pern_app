import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsNoteFetch, selectNotes } from "../../items/itemSlice";
import Note from "../../items/note/Note"
import { useNavigate } from "react-router";

export default function DisplayNotes() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notes = useSelector(selectNotes)

    useEffect(() => {
        dispatch(itemsNoteFetch())
    }, [dispatch]);

    const newNote_click = (e) => {
        e.preventDefault()
        navigate('/main/newnote')
    }
    return <div id='notes' data-testid="displayNotes">
        <h3>Notes</h3>
        <div className="content">

            <ul>
                {notes.map(({ value, title, owner, date }, i) => <li key={i}><Note value={value} title={title} owner={owner} date={date} /></li>)}
            </ul>
        </div>
        <button data-testid='newNote' value='newNote' onClick={newNote_click} >New Note</button>
    </div>
}