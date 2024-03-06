const service = require('../services/friendsactionService.js');

module.exports.funcfriendsaction = function funcfriendsaction(req, res) {
    service.funcfriendsaction(req, res);
}

module.exports.confirm_friend = function confirm_friend(req, res) {
    service.confirm_friend(req, res);
}

