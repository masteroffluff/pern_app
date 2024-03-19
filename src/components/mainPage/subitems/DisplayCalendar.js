import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarFetch, selectCalendar } from "../../calandar/calendarSlice";
import { useNavigate } from "react-router";
import DisplayItem from "../DisplayItem";

export default function DisplayCalendar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var d = new Date();
    const {dateFrom, setDateFrom} = useState(d)
    const {dateTo, setDateTo} = useState(d.setMonth(d.getMonth() - 1))


    useEffect(()=>{
        dispatch(calendarFetch())
    }, [dispatch]);

    const dateFrom_change=(e)=>{
        e.preventDefault()
        setDateFrom(e.target.value)
    }
    const dateTo_change=(e)=>{
        e.preventDefault()
        setDateTo(e.target.value)
    }

    const calendar = useSelector(selectCalendar)

    const newEvent_click = (e) =>{
        e.preventDefault()
        navigate('/newevent')
    }
    const newReminder_click = (e) =>{
        e.preventDefault()
        navigate('/newreminder')
    }

    const newAppointment_click = (e) =>{
        e.preventDefault()
        navigate('/newappointment')
    }



    return <div data-testid="displayCalendar">
        <h3>Calendar</h3>
        <form>
            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' value={dateFrom} onChange={dateFrom_change} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' value={dateTo} onChange={dateTo_change}/>
        </form>
        <ul>
            {calendar.map((e,i)=><li key={i}><DisplayItem data={e}/></li>)}
        </ul>
        <button data-testid='newEvent' value='newEvent' onClick={newEvent_click} >New Event</button>
        <button data-testid='newReminder' value='newReminder' onClick={newReminder_click} >New Reminder</button>
        <button data-testid='newAppointment' value='newAppointment' onClick={newAppointment_click} >New Appointment</button>
    </div>
}