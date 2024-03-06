const service = require('../services/friendsService.js');

module.exports.funcfriends = function funcfriends(req, res) {
    service.funcfriends(req, res);
}

module.exports.get_friends = function get_friends(req, res) {
    service.get_friends(req, res);
}

module.exports.add_friend = function add_friend(req, res) {
    service.add_friend(req, res);
}

module.exports.update_friend = function update_friend(req, res) {
    service.update_friend(req, res);
}

