const service = require('../services/calendarattendeesService.js');

module.exports.funccalendarattendees = function funccalendarattendees(req, res) {
    service.funccalendarattendees(req, res);
}

module.exports.post_calendar_attendees = function post_calendar_attendees(req, res) {
    service.post_calendar_attendees(req, res);
}

module.exports.delete_calendar_attendees = function delete_calendar_attendees(req, res) {
    service.delete_calendar_attendees(req, res);
}