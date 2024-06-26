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
            let currentDate = moment(_dateFrom).startOf('day')
            while (currentDate.isSameOrBefore(_dateTo)) {
                _calendarMap[currentDate.format('YYYY-MM-DD')] = []
                currentDate = currentDate.add(1, 'day');
            }

            calendar.forEach((item_parent) => {

                const item = JSON.parse(JSON.stringify(item_parent))// create a deep copy of the item
                //console.log(item)
                const dtFrom = moment(item.date_from).startOf('day')
                const dtTo = moment(item.date_to).startOf('day')
                item.days = dtTo.diff(dtFrom, 'days') + 1 // get the number of days to insert into the calendar formatting map
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
        navigate('/main/newevent')
    }
    const newReminder_click = (e) => {
        e.preventDefault()
        navigate('/main/newreminder')
    }

    const newAppointment_click = (e) => {
        e.preventDefault()
        navigate('/main/newappointment')
    }

    return <div id='calendar' data-testid="displayCalendar">
        <h3>Calendar</h3>
        {/* <p>...{JSON.stringify(calendarMap)}</p> */}
        <div className='calendar-header'>
        <form>
            <table><tbody>
            <tr>
                <td><label htmlFor="dateFrom">Date From</label></td>
                <td><input className="calendar-control" data-testid="dateFrom" type='date' id='dateFrom' value={dateFrom.format('YYYY-MM-DD')} onChange={dateFrom_change} /></td>
            </tr>

            <tr>
                <label htmlFor="dateTo">Date To</label>
                <td><input className="calendar-control" data-testid="dateTo" type='date' id='dateTo' value={dateTo.format('YYYY-MM-DD')} onChange={dateTo_change} /></td>
            </tr> </tbody></table>
        </form>
        </div>
        <div className='calendar-body content'>
            <table >
                <tbody>
                    {Object.entries(calendarMap).map(([dt, items], i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <h5>{dt}</h5>
                                </td>
                                {items.filter(item => item.show).map((item, ii) => (
                                    <td className='calendarItem' rowSpan={item.days} key={ii}><DisplayItem data={item} /></td>
                                ))}
                            </tr>)
                    }
                    )}
                </tbody>

            </table>
        </div>
        <div className="calendar-footer">
            <button data-testid='newEvent' value='newEvent' onClick={newEvent_click} >New Event</button>
            <button data-testid='newReminder' value='newReminder' onClick={newReminder_click} >New Reminder</button>
            <button data-testid='newAppointment' value='newAppointment' onClick={newAppointment_click} >New Appointment</button>
        </div>

    </div>
}