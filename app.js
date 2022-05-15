require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

function middleware1(req, res, next) {
    console.log("middleware 1", req.method, req.url);
    next(); 
    // Il faut appeler next() dans les middleware qu'on créer pour passer au middleware suivant
}

function middleware2(req, res, next) {
    console.log("middleware 2", req.method, req.url);
    next(); 
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware1);

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get("/hey", (req,res) => {
    res.send("Hey");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});