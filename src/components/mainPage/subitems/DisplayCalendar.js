import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { calendarFetch, selectCalendar } from "../../calandar/calendarSlice";
import { useNavigate } from "react-router";

import DisplayItem from "../DisplayItem";

function checkNested(obj, props) {
    return props.reduce((accumulator, prop) => {
        if (accumulator && accumulator.hasOwnProperty(prop)) {
            return accumulator[prop];
        }
        return undefined;
    }, obj);
}

export default function DisplayCalendar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    var dFrom = moment().add(-1, 'M');
    //dFrom.setMonth(dFrom.getMonth() - 1)   
    const [dateFrom, setDateFrom] = useState(dFrom)
    var dTo = moment().add(1, 'M');
    //dTo.setMonth(dFrom.getMonth() + 1)   
    const [dateTo, setDateTo] = useState(dTo)

    const [calendarMap, setCalendarMap] = useState([])
    const calendar = useSelector(selectCalendar)

    useEffect(() => {
        dispatch(calendarFetch())
    }, [dispatch]);

    useEffect(() => {

        const mapCalendar = (_dateFrom, _dateTo) => {

            // why god why??
            //console.log(_dateFrom, _dateTo)
            const _calendarMap = {}
            let currentDate = moment(_dateFrom)
            while (currentDate.isSameOrBefore(_dateTo)) {
                //console.log(currentDate)
                const year = currentDate.format('YYYY');
                const month = currentDate.format('MM');
                const day = currentDate.format('DD');

                if (!_calendarMap[year]) {
                    _calendarMap[year] = {};
                }
                if (!_calendarMap[year][month]) {
                    _calendarMap[year][month] = {};
                }
                if (!_calendarMap[year][month][day]) {
                    _calendarMap[year][month][day] = [];
                }

                currentDate = currentDate.add(1, 'day');
            }

            calendar.forEach((item) => {
                // const day = item.date_from.getDate()
                // const year = item.date_from.getFullYear()
                // const month = item.date_from.getMonth()
                const itemDT = moment(item.date_from)
                //console.log(itemDT)
                var day = itemDT.format('DD');
                var month = itemDT.format('MM');
                var year = itemDT.format('YYYY');
                //console.log(item, [year,month,day])
                if (checkNested(_calendarMap, [year, month, day])) {

                    _calendarMap[year][month][day].push(item)
                }
            }

            )
            console.log('calendarmap', _calendarMap)
            return _calendarMap
        }
        if (calendar.length > 0) { setCalendarMap(mapCalendar(dateFrom, dateTo)) }
    }, [calendar, dateFrom, dateTo]);

    const dateFrom_change = (e) => {
        e.preventDefault()
        setDateFrom(new Date(e.target.value))
    }
    const dateTo_change = (e) => {
        e.preventDefault()
        setDateTo(new Date(e.target.value))
    }



    const newEvent_click = (e) => {
        e.preventDefault()
        navigate('/newevent')
    }
    const newReminder_click = (e) => {
        e.preventDefault()
        navigate('/newreminder')
    }

    const newAppointment_click = (e) => {
        e.preventDefault()
        navigate('/newappointment')
    }



    return <div data-testid="displayCalendar">
        <h3>Calendar</h3>
        {/* <p>...{JSON.stringify(calendarMap)}</p> */}
        <form>
            <label htmlFor="dateFrom">Date From</label>
            <input data-testid="dateFrom" type='date' id='dateFrom' value={dateFrom.format('YYYY-MM-DD')} onChange={dateFrom_change} />

            <label htmlFor="dateTo">Date To</label>
            <input data-testid="dateTo" type='date' id='dateTo' value={dateTo.format('YYYY-MM-DD')} onChange={dateTo_change} />
        </form>
        {Object.entries(calendarMap).map(([yr, mn], i) => {
            return (<><h4 key={i}>{yr}</h4>
                {Object.entries(mn).map(([mn_, dy], i) => {
                    return (<>
                        <h5 key={i}>{mn_}</h5>
                        {
                            Object.entries(dy).map(([dy_, items], i)=>{
                                return (<><p>{dy_}</p>
                                    {items.map((item)=><p>{item.title}</p>)}
                                </>)
                            }
                        )}
                    </>)
                })}
            </>)}
        )}
         

        <button data-testid='newEvent' value='newEvent' onClick={newEvent_click} >New Event</button>
            <button data-testid='newReminder' value='newReminder' onClick={newReminder_click} >New Reminder</button>
            <button data-testid='newAppointment' value='newAppointment' onClick={newAppointment_click} >New Appointment</button>
    </div>
}