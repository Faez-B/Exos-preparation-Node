require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.get("/:arg1/test/:arg2", (req, res) => {
    console.log(req.params);
    res.send(req.params);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});