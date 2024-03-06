const service = require('../services/heartbeatService.js');

module.exports.funcheartbeat = function funcheartbeat(req, res) {
    service.funcheartbeat(req, res);
}

module.exports.get_heartbeat = function get_heartbeat(req, res) {
    service.get_heartbeat(req, res);
}

