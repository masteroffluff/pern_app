const service = require('../services/itemsnoteService.js');

module.exports.funcitemsnote = function funcitemsnote(req, res) {
    service.funcitemsnote(req, res);
}

module.exports.get_notes = function get_notes(req, res) {
    service.get_notes(req, res);
}

module.exports.post_note = function post_note(req, res) {
    service.post_note(req, res);
}

module.exports.update_note = function update_note(req, res) {
    service.update_note(req, res);
}

