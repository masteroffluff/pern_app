//const passport = require('../utils/passport')
const userHelperFunctions = require('../utils/helperFunctions')
const bcrypt = require("bcrypt");

module.exports.funclogin = function funclogin(req, res) {
    res.send({
        message: 'This is the mockup controller for funclogin'
    });
}

module.exports.post_login = async function post_login(req, res) {
  const { username, password } = req.body;

  // Validate username and password (e.g., against a user database)
  console.log("logging in", username, password)
  const user = await userHelperFunctions.findByUsername(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Generate JWT token
  const token = userHelperFunctions.generate_jwt_token(user.id)
  
  
  console.log('Token Generated:', token)
  res.send({ token, id:user.id });
    
}

