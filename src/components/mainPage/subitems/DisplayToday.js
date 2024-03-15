import React from "react";
import { useSelector } from "react-redux";
import { selectToday } from "../todaySlice";

export default function DisplayToday(){
    const today = useSelector(selectToday)

    

    return <div data-testid="displayToday">
        <h3>Today</h3>
        <ul>
            {today.map((e,i)=><li data-testid={'mocked-' + e.type} key={i}><h4>{e.title}</h4><p>{e.value}</p> </li>)}
        </ul>
    </div>
}