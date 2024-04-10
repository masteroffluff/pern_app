const service = require('../services/userPFPService.js');

module.exports.funcuserpfp = function funcuserpfp(req, res) {
    service.funcuserpfp(req, res);
}

module.exports.get_user_pfp = function get_user_pfp(req, res) {
    service.get_user_pfp(req, res);
}

module.exports.update_user_pfp = function update_user_pfp(req, res) {
    service.update_user_pfp(req, res);
}

