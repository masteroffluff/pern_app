const service = require('../services/loginService.js');

module.exports.funclogin = function funclogin(req, res) {
    service.funclogin(req, res);
}

module.exports.post_login = function post_login(req, res) {
    service.post_login(req, res);
}

