import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToday, todayFetch } from "../todaySlice";


export default function DisplayToday(){

    const dispatch = useDispatch()

    const today = useSelector(selectToday)
    useEffect(()=>{
        dispatch(todayFetch())
    }, [dispatch]);
    

    return <div data-testid="displayToday">
        <h3>Today</h3>
        
        <div classname='content'>
            <ul>
                {today.map((e,i)=><li data-testid={'mocked-' + e.type} key={i}><h4>{e.title}</h4><p>{e.value}</p> </li>)}
            </ul>
        </div>
    </div>
}