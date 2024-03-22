import React from "react";
import { DisplayToday, DisplayTodo, DisplayWall,  DisplayCalendar } from './subitems'
import { Outlet } from "react-router";
import { selectPopupState } from "./popupSlice";
import { useSelector } from "react-redux";

export default function MainDisplay(){
    
    const popupState = useSelector(selectPopupState)

    return (<>
        <div className={popupState ? 'grid-container blur-background' : 'grid-container'}>
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
            
        </div>
        <Outlet />
        </>)
}