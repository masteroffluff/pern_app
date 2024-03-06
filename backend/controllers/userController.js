const service = require('../services/userService.js');

module.exports.funcuser = function funcuser(req, res) {
    service.funcuser(req, res);
}

module.exports.get_user = function get_user(req, res) {
    service.get_user(req, res);
}

module.exports.update_user = function update_user(req, res) {
    service.update_user(req, res);
}

