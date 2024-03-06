const service = require('../services/itemstodoService.js');

module.exports.funcitemstodo = function funcitemstodo(req, res) {
    service.funcitemstodo(req, res);
}

module.exports.get_todos = function get_todos(req, res) {
    service.get_todos(req, res);
}

module.exports.post_todo = function post_todo(req, res) {
    service.post_todo(req, res);
}

module.exports.update_todo = function update_todo(req, res) {
    service.update_todo(req, res);
}

