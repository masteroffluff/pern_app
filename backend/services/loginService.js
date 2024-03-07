const passport = require('../utils/passport')
const jwt = require('jsonwebtoken');

module.exports.funclogin = function funclogin(req, res) {
    res.send({
        message: 'This is the mockup controller for funclogin'
    });
}

module.exports.post_login = function post_login(req, res) {
    console.log (req.body);
    passport.authenticate("local",{ session: false }, (err, user, info) => {
      if (err) {
        console.error('Passport authentication error:', err);
        return res.status(400).send('Authentication error: '+ err)
      }
  
      if (!user) {
        // Log additional information about the authentication failure
        console.log('Authentication failure:', info);
        return res.status(401).send('Authentication failure')//.redirect("/login");
      }
  
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during req.logIn:', err);
          return res.status(400).send('Error during req.logIn: '+ err)
        }
        
        // Generate a JWT token
        const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, { expiresIn: '6h' });

        // Respond with the token
        return res.status(200).json({ token });
        // note to forntend need to get cart id immediately. 
      });
    })(req, res);
    
}

