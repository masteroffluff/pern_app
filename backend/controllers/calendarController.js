const service = require('../services/calendarService.js');

module.exports.funccalendar = function funccalendar(req, res) {
    service.funccalendar(req, res);
}

module.exports.get_calendar = function get_calendar(req, res) {
    service.get_calendar(req, res);
}

module.exports.post_calendar = function post_calendar(req, res) {
    service.post_calendar(req, res);
}

module.exports.update_calendar = function update_calendar(req, res) {
    service.update_calendar(req, res);
}


module.exports.delete_calendar = function delete_calendar(req, res) {
    service.delete_calendar(req, res);
}