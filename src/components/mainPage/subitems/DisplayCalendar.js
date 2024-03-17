import React, {useState} from "react";
import { useSelector } from "react-redux";
import { selectCalendar } from "../../calandar/calendarSlice";

export default function DisplayCalendar() {

    const {dateFrom, setDateFrom} = useState(null)
    const {dateTo, setDateTo} = useState(null)

    const dateFrom_change=(e)=>{
        e.preventDefault()
        setDateFrom(e.target.value)
    }
    const dateTo_change=(e)=>{
        e.preventDefault()
        setDateTo(e.target.value)
    }

    const calendar = useSelector(selectCalendar)
    



    return <div data-testid="displayCalendar">
        <h3>Calendar</h3>
        <form>
            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' value={dateFrom} onChange={dateFrom_change} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' value={dateTo} onChange={dateTo_change}/>
        </form>
        <ul>
            {calendar.map((e,i)=><li data-testid={'mocked-' + e.type} key={i}><h4>{e.title}</h4><p>{e.value}</p> </li>)}
        </ul>
    </div>
}