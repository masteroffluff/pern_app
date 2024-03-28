import React, { useEffect } from "react";
import { DisplayToday, DisplayTodo, DisplayWall, DisplayCalendar } from './subitems'
import { Outlet } from "react-router";
import { selectPopupState } from "./popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { itemsTodoItemsUpdate, selectHasDirtyTodoItems } from "../items/itemSlice";
import { wallFetch } from "./wallSlice";
import { calendarFetch } from "../calandar/calendarSlice";

export default function MainDisplay() {

    const popupState = useSelector(selectPopupState)
    const hasDirtyTodoItems = useSelector(selectHasDirtyTodoItems)
    


    const dispatch = useDispatch()
    useEffect(() => {
        function updates(){
            alert('updating')
            if(hasDirtyTodoItems) (dispatch(itemsTodoItemsUpdate()))
            dispatch(wallFetch())
            dispatch(calendarFetch)
            
        }
        alert('starting updates')

        const intervalId = setInterval(updates, 60000); 
        
        return () => clearInterval(intervalId);
    }, [dispatch]);

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