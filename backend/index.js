const dotenv = require('dotenv')
dotenv.config();
const http = require('http');
const express = require("express");
const session = require('express-session');
const { initialize } = require('@oas-tools/core');
const passport = require('./utils/passport');
const cors = require('cors');
const pgSession = require('connect-pg-simple')(session);
const { sharedPool } = require('./utils/db')

const serverPort = 8080;
const app = express();
app.use(express.json({ limit: '50mb' }));

app.use(
    session({
        store: new pgSession({
            pool: sharedPool
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// const isAuthenticated = async () => {
    
//     const promise = new Promise((resolve, reject) => {
//       passport.authenticate('jwt', { session: false }, (err, user, info) => {
//         console.log("authenticating")
//         if (err || !user) {
//           //req.info =info
//           resolve(false);
//         } else {
//           console.log("isAuthenticated User:" & user)
//           //req.user = user;
//           resolve(user);
//         }
//       })();
//     });
//     return await promise
//   };


const config = {
    middleware: {
        security: {
            auth: {
                bearerAuth: ()=>{ console.log(new Date().toISOString() ,"what is going on")
                    // console.log('authing')
                    // passport.authenticate('jwt', { session: false })
                    // return true;
                }
            }
        }
    }
}


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_ADDRESS,
}));


initialize(app, config).then(() => {
    http.createServer(app).listen(serverPort, () => {
        console.log("\nApp running at http://localhost:" + serverPort);
        console.log("________________________________________________________________");
        if (!config?.middleware?.swagger?.disable) {
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        }
    });
});
