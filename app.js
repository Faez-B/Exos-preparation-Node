require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT;

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get("/" , () => {
    // res.send(path.join(__dirname, 'public'));

});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});