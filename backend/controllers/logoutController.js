const service = require('../services/logoutService.js');

module.exports.funclogout = function funclogout(req, res) {
    service.funclogout(req, res);
}

module.exports.get_logout = function get_logout(req, res) {
    service.get_logout(req, res);
}

