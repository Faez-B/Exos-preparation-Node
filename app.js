require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body); // affichage dans la console // dans le terminal => là où on lancer le serveur
    res.send(req.body); // affichage là où on a passer la requête http
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});