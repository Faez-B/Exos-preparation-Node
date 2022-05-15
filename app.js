require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.post("/", (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});