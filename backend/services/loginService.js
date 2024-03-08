//const passport = require('../utils/passport')
const jwt = require('jsonwebtoken');
const {findByUsername} = require('../utils/userHelperFunctions')
const bcrypt = require("bcrypt");

module.exports.funclogin = function funclogin(req, res) {
    res.send({
        message: 'This is the mockup controller for funclogin'
    });
}

module.exports.post_login = async function post_login(req, res) {
  const { username, password } = req.body;

  // Validate username and password (e.g., against a user database)
  const user = await findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, { expiresIn: '6h' });
  
  
  console.log('Token Generated:', token)
  res.send({ token });
    
}

