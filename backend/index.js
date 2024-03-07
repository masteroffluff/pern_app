const dotenv = require('dotenv')
dotenv.config();
const http = require('http');
const express = require("express");
const { initialize } = require('@oas-tools/core');
const passport = require('./utils/passport');
const cors = require('cors');


const serverPort = 8080;
const app = express();
app.use(express.json({limit: '50mb'}));

const config = {middleware: {
        security: {
            auth: {
                basicAuth: ( token ) => { const loginDetails = (atob(token.split(" ")[1])).split(":"); return {username:loginDetails[0],password:loginDetails[1]} },
                bearerAuth: ( token ) => { return token.split(" ")[1] },
            }
        }
    }
}

app.use(cors({
    credentials: true,
    origin:process.env.CLIENT_ADDRESS,
}));

app.use(passport.initialize());
app.use(passport.session());

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
