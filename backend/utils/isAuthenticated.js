const passport = require('./passport')

const isAuthenticated = (req, res, next) => {
  
  
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => { 
        if (err) {
          reject(err);
        } else if (!user) {
          req.info = info;
          reject('not authenticated');
        } else {
          //console.log("isAuthenticated User:", user);
          req.user = user;
          resolve(true);
        }
      })(req, res, next);
    });
  };
  

  module.exports = isAuthenticated