module.exports.funclogin = function funclogin(req, res) {
    res.send({
        message: 'This is the mockup controller for funclogin'
    });
}

module.exports.post_login = function post_login(req, res) {
    const loginDetails = res.locals.oas.security.basicAuth
    
}

