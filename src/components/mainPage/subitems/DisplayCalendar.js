import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { calendarFetch, selectCalendar } from "../../calandar/calendarSlice";
import { useNavigate } from "react-router";

import DisplayItem from "../DisplayItem";

export default function DisplayCalendar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    var dFrom = moment();
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
        function findFirstEmptyIndex(array) {
            // Using a loop
            for (let i = 0; i < array.length; i++) {
                if (array[i] === undefined || array[i] === null || array[i] === '') {
                    return i;
                }
            }
            return -1; // Return -1 if no empty element is found
        }
        const mapCalendar = (_dateFrom, _dateTo) => {

            // why god why??
            //console.log(_dateFrom, _dateTo)
            const _calendarMap = {}
            let currentDate = moment(_dateFrom)
            while (currentDate.isSameOrBefore(_dateTo)) {
                _calendarMap[currentDate.format('YYYY-MM-DD')] = []
                currentDate = currentDate.add(1, 'day');
            }

            calendar.forEach((item_parent) => {

                const item = JSON.parse(JSON.stringify(item_parent))
                console.log(item)
                const dtFrom = moment(item.date_from).startOf('day')
                const dtTo = moment(item.date_to).startOf('day')
                item.days = dtTo.diff(dtFrom, 'days') + 1
                let item_current_date = moment(dtFrom)

                while (item_current_date.isSameOrBefore(moment(item.date_to))) {
                    let show;
                    const itemDT_Formatted = item_current_date.format('YYYY-MM-DD')
                    if (_calendarMap[itemDT_Formatted]) {

                        if (!item.slot) {
                            const temp = findFirstEmptyIndex(_calendarMap[itemDT_Formatted]) + 1
                            if (!temp) {
                                _calendarMap[itemDT_Formatted].push(item)
                                item.slot = _calendarMap[itemDT_Formatted].length
                            } else {
                                item.slot = temp
                            }
                            show = true
                        } else {

                            show = false
                            if (_calendarMap[itemDT_Formatted].length <= item.slot) {
                                for (let i = _calendarMap[itemDT_Formatted].length; i < item.slot; i++) {
                                    _calendarMap[itemDT_Formatted].push({ show: false })
                                }
                            }
                        }

                        _calendarMap[itemDT_Formatted][item.slot - 1] = { ...item, show }
                    }
                    item_current_date = item_current_date.add(1, 'day');
                }

            }

            )
            //console.log('calendarmap', _calendarMap)
            return _calendarMap
        }
        if (calendar.length > 0) { setCalendarMap(mapCalendar(dateFrom, dateTo)) }
    }, [calendar, dateFrom, dateTo]);

    const dateFrom_change = (e) => {
        e.preventDefault()
        setDateFrom(moment(e.target.value))
    }
    const dateTo_change = (e) => {
        e.preventDefault()
        setDateTo(moment(e.target.value))
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
        <div className='calendar content'>
            <table >
                <tbody>
                    {Object.entries(calendarMap).map(([dt, items], i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <h4 key={i}>{dt}</h4>
                                </td>
                                {items.map((item, ii) => item.show ? <td class='calendarItem' rowspan={item.days} key={ii}><DisplayItem data={item} /></td> : <></>)}
                            </tr>)
                    }
                    )}
                </tbody>

            </table>
        </div>
        <button data-testid='newEvent' value='newEvent' onClick={newEvent_click} >New Event</button>
        <button data-testid='newReminder' value='newReminder' onClick={newReminder_click} >New Reminder</button>
        <button data-testid='newAppointment' value='newAppointment' onClick={newAppointment_click} >New Appointment</button>
    </div>
}