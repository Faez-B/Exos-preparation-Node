require("dotenv").config();
require('express-async-errors'); // Plus besoin d'écrire try, catch avec ce require
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) => {
	throw new Error("Je suis un ASYNC bug")
	res.send('JE NE SERAI JAMAIS EXECUTE');
})


app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});