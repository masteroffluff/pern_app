import React from "react";
import { useSelector } from "react-redux";
import { selectWall } from "../wallSlice";
import DisplayItem from "../DisplayItem";

export default function DisplayWall() {
    const wall = useSelector(selectWall)

    const newNote_click = (e) =>{
        e.preventDefault()

    }

    return <div data-testid="displayWall">
        <h3>My Wall</h3>
        <ul>
            {wall.map((e, i) => <li data-testid='wallItem' key={i}><DisplayItem data={e} /> </li>)}
        </ul>
        <button data-testid='newNote' value='newNote' onClick={newNote_click} >New Note</button>
    </div>
}