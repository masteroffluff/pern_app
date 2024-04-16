// this is redundant since we are using JWT but i'm leaving it here incase we need someting for the other routes

module.exports.funclogout = function funclogout(req, res) {
    res.send({
        message: 'This is the mockup controller for funclogout'
    });
}

module.exports.get_logout = function get_logout(req, res) {
    res.send({
        message: 'This is the mockup controller for get_logout'
    });
}

