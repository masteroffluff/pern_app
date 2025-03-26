const TodoItemModel = require('../models/TodoItemModel')
const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')
const ItemModel = require('../models/ItemModel')
const CalendarModel = require('../models/CalendarModel')

module.exports.funccalendarattendees = function funccalendar(req, res) {
    res.send({
        message: 'This is the mockup controller for funccalendar'
    });
}

module.exports.post_calendar_attendees = async function post_calendar_attendees(req, res) {
    try {
        const {item_id, attendee} = req.query
        const calendarModel = new CalendarModel()
        await calendarModel.addCalendarAttendees(item_id, attendee)
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('post_calendar_attendees error', e)
        return res.status(400).send({ message: e.message })
    }
}

module.exports.delete_calendar_attendees = async function delete_calendar_attendees(req, res) {
    try {
        
        const {item_id, attendee} = req.query
        const calendarModel = new CalendarModel()
        await calendarModel.deleteCalendarAttendees(item_id, attendee)
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}


module.exports.update_calendar_attendees = async function update_calendar_attendees(req, res) {
    const at = db.atomicTrasaction()
    try {
        const {item_id, attendees} = req.body
        
        const calendarModel = new CalendarModel()
        calendarModel.begin()
        await calendarModel.deleteAllCalendarAttendees(item_id)
        const promiseArray = []
        for (const index in attendees){
            promiseArray.push(
                calendarModel.addCalendarAttendees(item_id, attendees[index])
            )
        }
        await Promise.all(promiseArray)
        await calendarModel.commit_and_release()
        
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        calendarModel.rollback_and_release()
        console.log('update_calendar_attendees error', e)
        return res.status(400).send({ message: e.message })
    }
}
