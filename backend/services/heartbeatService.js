module.exports.funcheartbeat = function funcheartbeat(req, res) {
    res.send({
        message: 'This is the mockup controller for funcheartbeat'
    });
}

module.exports.get_heartbeat = function get_heartbeat(req, res) {
    res.send({
        message: 'This is the heartbeat'
    });
}

 