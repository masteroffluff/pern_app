const userHelperFunctions = require('../utils/userHelperFunctions')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.funcregister = function funcregister(req, res) {
    res.send({
        message: 'This is the mockup controller for funcregister'
    });
}

module.exports.post_register = async function post_register(req, res) {

    const { display_name, email, phone_no, password } = req.body
    const username_taken = await userHelperFunctions.findIfUserNameAlreadTaken(display_name)
    if (username_taken) {
        return res.status(401).send({ message: `Display Name ${display_name} already Taken` })
        
      }


}

