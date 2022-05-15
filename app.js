require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    console.log(req.query);
    res.send(req.query);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});