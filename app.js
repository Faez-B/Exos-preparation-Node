const express = require('express');
require("dotenv").config();
const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello world !"); 
    // res.send() envoie le message et effectue la commande res.end() pour nous
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});