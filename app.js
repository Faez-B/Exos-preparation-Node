require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

function errorMiddleware(err, req, res, next) {
	res.status(500).json({erreur: err.message});
}

app.get('/', (req, res, next) => {
	throw new Error('Ceci est un bug dans la route /');
	res.send('Pas executé');
})

app.get('/route2', (req, res, next) => {
	throw new Error('Ceci est un bug dans /route 2');
	res.send('Pas executé');
})

// TOUJOURS UTILISER LE MIDDLEWARE ERREUR À LA FIN
// APRÈS LES DÉFINITIONS ET LES AUTRES MIDDLEWARE
app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});