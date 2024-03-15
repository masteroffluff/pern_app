import React from "react";
import { DisplayToday, DisplayTodo, DisplayWall, DisplayNotes, DisplayCalendar } from './subitems'

export default function MainDisplay(){
    return (
        <div>
            <h1>I havent thought of a title yet</h1>
            <DisplayToday />
            <DisplayTodo /> 
            <DisplayWall /> 
            <DisplayNotes />
            <DisplayCalendar />
        </div>)
}