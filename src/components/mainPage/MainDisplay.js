import React from "react";
import { DisplayToday, DisplayTodo, DisplayWall,  DisplayCalendar } from './subitems'

export default function MainDisplay(){
    return (
        <div>
            <DisplayToday />
            <DisplayTodo /> 
            <DisplayWall /> 
            <DisplayCalendar />
        </div>)
}