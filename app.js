require("dotenv").config();
require('express-async-errors'); // Plus besoin d'écrire try, catch avec ce require
const express = require('express');
const path = require('path');
const Joi = require("joi");
const db = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT;

const token = jwt.sign({userId: 12}, process.env.SECRET_JWT);
console.log("token JWT", token);

const decoded = jwt.verify(token, process.env.SECRET_JWT);
console.log("token JWT décodé", decoded);

// verify avec une chaine incorrecte / 
// chaine différente que celle qu'on a utilisé pour faire le sign

// Match véritable token contre faux string
try {
	const notdecoded = jwt.verify(token, "PAS_LE_BON_SECRET");
}catch(exc){
	console.log("échec de jwt.verify : PAS LA BONNE SIGNATURE");
}


// Match faux token contre vrai string

const token2 = jwt.sign({userId: 13}, process.env.SECRET_JWT);

const header = token.split('.')[0];
const payload = token.split('.')[1];
const signature = token2.split('.')[2];

const fakeToken = header +"."+ payload +"."+ signature
console.log("FAKE TOKEN : ", fakeToken);


try {
  const failedVerification = jwt.verify(fakeToken, process.env.SECRET_JWT);
}catch(exc){
  console.log('echec de la vérification du Faux Token : PAS LA BONNE SIGNATURE');
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});