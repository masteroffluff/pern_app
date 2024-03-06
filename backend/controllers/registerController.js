const service = require('../services/registerService.js');

module.exports.funcregister = function funcregister(req, res) {
    service.funcregister(req, res);
}

module.exports.post_register = function post_register(req, res) {
    service.post_register(req, res);
}

