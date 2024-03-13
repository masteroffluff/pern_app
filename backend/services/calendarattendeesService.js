const db = require('../utils/db')


module.exports.funccalendar = function funccalendar(req, res) {
    res.send({
        message: 'This is the mockup controller for funccalendar'
    });
}

module.exports.post_calendar = function post_calendar(req, res) {
    res.send({
        message: 'This is the mockup controller for post_calendar'
    });
}

module.exports.delete_calendar = function delete_calendar(req, res) {
    res.send({
        message: 'This is the mockup controller for delete_calendar'
    });
}


////// helper functions /////


