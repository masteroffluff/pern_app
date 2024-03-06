const service = require('../services/todayService.js');

module.exports.functoday = function functoday(req, res) {
    service.functoday(req, res);
}

module.exports.get_today = function get_today(req, res) {
    service.get_today(req, res);
}

