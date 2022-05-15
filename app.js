require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.get('/', async (req, res, next) => {
	try {
	  throw new Error("Je suis un ASYNC bug");
	  res.send("JE NE SERAI JAMAIS EXECUTE");
	} catch (err) {
	  next(err);
	}
})

app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});