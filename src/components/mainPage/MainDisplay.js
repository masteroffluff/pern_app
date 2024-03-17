import React from "react";
import { DisplayToday, DisplayTodo, DisplayWall, DisplayNotes, DisplayCalendar } from './subitems'

export default function MainDisplay(){
    return (
        <div>
            <DisplayToday />
            <DisplayTodo /> 
            <DisplayWall /> 
            <DisplayNotes />
            <DisplayCalendar />
        </div>)
}