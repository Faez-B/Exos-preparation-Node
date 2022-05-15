require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

function modifyRequestObject(req, res, next) {
	req.nouveau = { nouveauTruc: "je nexistais pas avant"};
	next();
}

function modifyResponseObject(req, res, next) {
	res.locals.blabla = "je nexistais pas avant";
	next();
}

function blockDeleteRequest(req, res,next){;
	if (req.method === "DELETE") {
		throw new Error('NO DELETE PLEASE');
	}
	else next();
}

function blockPutRequest(req, res,next){
	if (req.method === "PUT") {
		res.status(400).send('NO DELETE PLEASE');
        // Pas besoin de next() ici
        // On envoie le code 400 avec status() avec res
        // Et on fait un send() de message (!! ON NE FAIT PAS UN SEND DU STATUS CODE)
        // Le send() interromps la chaine de middleware
        // Donc à faire en dernier.
	}
	else {next()}
}


app.use(blockDeleteRequest);
app.use(modifyRequestObject);
app.use(modifyResponseObject);
app.use(blockPutRequest);

app.get('/', (req, res) => {
	console.log(req.nouveau)
	console.log(res.locals)
	res.send('Hello World');
})

app.put('/', (req, res) => {
    // jamais exécuté.
    console.log("I AM IN"); 
	res.send('Hello');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});