import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToday, todayFetch } from "../todaySlice";
import DisplayItem from "../DisplayItem";
import './today.css'

export default function DisplayToday(){

    const dispatch = useDispatch()

    const today = useSelector(selectToday)
    useEffect(()=>{
        dispatch(todayFetch())
    }, [dispatch]);
    

    return <div id='today' data-testid="displayToday">
        <h3>Today</h3>
        
        <div className='content'>
            <ul>
                {today.map((e,i)=><li data-testid={ e.type} key={i}>{<DisplayItem data={e} />}<p>{e.notes}</p> </li>)}
            </ul>
        </div>
    </div>
}