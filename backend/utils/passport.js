const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GitHubStrategy = require("passport-github2").Strategy;

const jwt = require('jsonwebtoken');

// Set up the Passport strategy:
passport.use(new LocalStrategy(
  function (username, password, done) {
    // Look up user in the db
    console.log('logging in user ' + username)
    userService.findByUsername(username, async (err, user) => {
      // If there's an error in db lookup,
      // return err callback function
      if(err) return done(err);
       // If user not found,
      // return null and false in callback
      console.log ("no errors checking user exists")
      if(!user) return done(null, false);
       // If user found, but password not valid,
      // return err and false in callback
      console.log ("user exists checking password")
      const matchFound = await bcrypt.compare(password, user.password);
      if(!matchFound) return done(null, false);
       // If user found and password valid,
      // return the user object in callback
      console.log ("authentication successful")
      return done(null, user)
    });
  })
);

// JWT Strategy Configuration
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY, // Change this to a secure secret key
    },
    async function (jwt_payload, done) {
      try {
        // Look up user id in database.
        console.log("payload: "+ JSON.stringify (jwt_payload))
        userService.findById(jwt_payload.sub, function (err, user) {
          if (err) return done(err);
          
          done(null, user);
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,

},
async function(accessToken, refreshToken, profile, done) {
      
    console.log({accessToken, refreshToken, profile, done})
    await userService.findByGitHubId(profile.id,done)
    

}
));


passport.serializeUser((user, done) => {
  try {
    // Check if the user object has an 'id' property (indicating a local user),
    // or 'githubId' property (indicating a GitHub user)
    console.log(`serializeUser ${user.id}`)
    if (user.id) {
      //const identifier = user.id ? { type: 'local', id: user.id } : { type: 'github', githubId: user.githubId };
      
      jwt.sign({sub: user.id }, process.env.SECRET_KEY,{ expiresIn: '6h' } ,(err, token) => {
        if (err) {
          console.error('Error serializing user:', err);
          return done(err);
        }
        console.log('Generated token:', token);
        user.token = token
        done(null, token);
      });
    }else{
/*       tempUser ={
        githubId: user.githubId,
        
      } */
      done(null, user);
    }
  } catch (error) {
    console.error('Error serializing user:', error);
    done(error); 
  }
});

// passport.deserializeUser(function(obj, done) {
//   console.log("deserialiser running")
//   done(null, obj);
// });

passport.deserializeUser((token, done) => {
  try {
    console.log(`deserializing token` + JSON.stringify (token))
    if(typeof(token)=='string'){
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Error deserializing user:', err);
        return done(err);
      }
      const identifier = decoded; // Assuming the decoded token contains the identifier directly
          console.log('deserializeUser local'+ decoded)
          userService.findById(identifier.sub, (err, user) => {
            if (err) return done(err);
            done(null, user);
          });    
    });
    }else{
      done(null,token)
    }
    
  } catch (error) {
    done(error)
  }
});


module.exports=passport