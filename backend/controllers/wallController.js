const service = require('../services/wallService.js');

module.exports.funcwall = function funcwall(req, res) {
    service.funcwall(req, res);
}

module.exports.get_wall = function get_wall(req, res) {
    service.get_wall(req, res);
}

