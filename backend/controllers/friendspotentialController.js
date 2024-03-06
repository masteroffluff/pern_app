const service = require('../services/friendspotentialService.js');

module.exports.funcfriendspotential = function funcfriendspotential(req, res) {
    service.funcfriendspotential(req, res);
}

module.exports.get_potentialFriends = function get_potentialFriends(req, res) {
    service.get_potentialFriends(req, res);
}

