require("dotenv").config();
require('express-async-errors'); // Plus besoin d'écrire try, catch avec ce require
const express = require('express');
const path = require('path');
const Joi = require("joi");
const db = require("./db");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/", (req, res) => {
	const data = req.body;

	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		age: Joi.number().min(0)
	});

	const { value, error } = schema.validate(data);

	// 400 : Bad request
	if (error) res.status(400).send({ erreur: error.details[0].message });

	// Si on a une erreur alors la suite ne sera pas exécuter 
	db.insertOne(value);

	console.log(db.getAll());

	// 201 : created (PUT, POST)
	res.status(201).json(data);

})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});