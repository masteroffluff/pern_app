const service = require('../services/itemstodoitemsServices');

module.exports.funcitemstodoitems= function funcitemstodo(req, res) {
    service.funcitemstodo(req, res);
}


module.exports.post_todo_items = function post_todo_items(req, res) {
    service.post_todo_items(req, res);
}

module.exports.update_todo_items = function update_todo_items(req, res) {
    service.update_todo_items(req, res);
}

module.exports.delete_todo_items = function delete_todo_items(req, res) {
    service.delete_todo_items(req, res);
}
