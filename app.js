require("dotenv").config();
require('express-async-errors'); // Plus besoin d'écrire try, catch avec ce require
const express = require('express');
const path = require('path');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("./db");
const Collection = require("./Collection");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT;

const Comptes = new Collection('Comptes');

app.use(express.json());

app.get('/comptes/', (req, res) => {
	res.json(Comptes.getAll());
})

app.post('/enregistrer/', async (req, res) => {
	const data = req.body;

	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		password: Joi.string().min(6).max(255).required()
	})

	const { value, error } = schema.validate(data);

	if (error) {
		res.status(400).send({ erreur : error.details[0].message })
		// Si erreur alors on s'arrête ici
	}
	else {
		const compte = value;

		const {found} = Comptes.findByName(compte.name);

		if (found) {
			res.status(400).send("Ce compte existe déjà, veuillez vous connecter");
		} 
		else {
			const salt = await bcrypt.genSalt(10);
			const mdpHashed = await bcrypt.hash(compte.password, salt);
			compte.password = mdpHashed;
			
			Comptes.insertOne(compte);
	
			// 201 : PUT, POST
			res.status(201).json({
				name: value.name
			})
		}

	}
})

app.post('/connexion', async (req, res) => {
	const data = req.body;

	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		password: Joi.string().min(3).max(50).required()
	});

	const { value : login, error } = schema.validate(data);

	if (error) res.status(400).send({ erreur : error.details[0].message });

	const {result: found, compte} = Comptes.findByName(login.name);

	if (!found) {
		return res.status(400).send({ erreur: "Identifiant invalide" });
	}
	const id = compte.id;

	const passwordIsValid = await bcrypt.compare(req.body.password, compte.password);

	if (!passwordIsValid)
    return res.status(400).send({ erreur: "Mot de Passe Invalide" });

	// Si mot de passe valide, on crée le token de connexion
	const token = jwt.sign({ id }, process.env.SECRET_JWT);
	res.header("x-auth-token", token).status(200).send({ name: compte.name });
  
})


if (process.env.NODE_ENV !== "test") {

	app.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});

}

// Pour faire les tests
module.exports = { app, Comptes };
