const dotenv = require('dotenv')
dotenv.config();
const http = require('http');
const express = require("express");
const { initialize } = require('@oas-tools/core');
const passport = require('./utils/passport');
const cors = require('cors');


const serverPort = 8080;
const app = express();
app.use(express.json({ limit: '50mb' }));


app.use(passport.initialize());
//app.use(passport.session());


app.use((req,res, next)=>{res.setHeader('content-type', 'application/json;charset=utf-8');next()});

const config = {
    middleware: {
        security: {
            auth: {
                bearerAuth: (t)=>{ return t
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
