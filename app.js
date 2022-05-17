require("dotenv").config();
require('express-async-errors'); // Plus besoin d'écrire try, catch avec ce require
const express = require('express');
const path = require('path');
const Joi = require("joi");
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

app.post('/enregistrer/', (req, res) => {
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
		Comptes.insertOne(value);

		// 201 : PUT, POST
		res.status(201).json({
			name: value.name
		})
	}
})


if (process.env.NODE_ENV !== "test") {

	app.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});

}

module.exports = { app, Comptes };
