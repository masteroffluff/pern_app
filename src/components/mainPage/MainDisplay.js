import React from "react";
import { DisplayToday, DisplayTodo, DisplayWall,  DisplayCalendar } from './subitems'

export default function MainDisplay(){
    return (
        <div className='grid-container'>
            <div className='grid-item'>
                <DisplayToday />
            </div>
            <div className='grid-item'>
                <DisplayTodo /> 
            </div>
            <div className='grid-item'>
                <DisplayWall /> 
            </div>
            <div className='grid-item'>
                <DisplayCalendar />
            </div>
        </div>)
}