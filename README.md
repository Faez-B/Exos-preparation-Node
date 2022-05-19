# Exercices de préparation pour le contrôle de NodeJS

## Exercice 1
<code>
    app.get('/', (req, res) => {
        res.send("Hello world !"); 
    })
</code>
<p>
    // res.send() envoie le message et effectue la commande res.end() pour nous
</p>

## Exercice 2
<code>
    app.use('/public', express.static(path.join(__dirname, 'public')));
</code>

## Exercice 3
Test dans terminal : <code>http POST localhost:3000 hello=World valeur=2</code>
### A - Sans middleware
<code>
    app.post("/", (req, res) => {
        console.log(req.body); // affichage dans la console // dans le terminal => là où on lancer le serveur
        res.send(req.body); // affichage là où on a passer la requête http
    }) 
</code>

### B - Avec middleware
<code>
    app.use(express.json());

    app.post("/", (req, res) => {
        console.log(req.body); // affichage dans la console // dans le terminal => là où on lancer le serveur
        res.send(req.body); // affichage là où on a passer la requête http
    }) 
</code>

## Exercice 4
Test dans le terminal : <code>http --form localhost:3000 hello=World valeur=2</code>
<p>
    Autre moyen pour parser les arguments passer dans la requête http
</p>

## Exercice 5
<p>
Passer des arguments dans l'url
</p>

Test dans le terminal : <code>http GET :3000/hey/test/2</code>

<code>
app.get("/:arg1/test/:arg2", (req, res) => {
    console.log(req.params);
    res.send(req.params);
})
</code>

## Exercice 6
<p>
Passer des arguments dans l'url en Search Params
</p>

Test dans le terminal : <code>curl http://localhost:3000/\?lg\=Fr\&page\=2</code> ou <code>http GET :3000/ lg==FR page==2
</code>

<code>
app.get("/:arg1/test/:arg2", (req, res) => {
    console.log(req.params);
    res.send(req.params);
})
</code>

## Exercice 7
Utiliser des middleware persos
Test dans le terminal : <code>curl http://localhost:3000</code>

<code>
function middleware1(req, res, next) {
    console.log("middleware 1", req.method, req.url);
    next(); 
    // Il faut appeler next() dans les middleware qu'on créer pour passer au middleware suivant
}

function middleware2(req, res, next) {
    console.log("middleware 2", req.method, req.url);
    next(); 
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware1);

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get("/hey", (req,res) => {
    res.send("Hey");
})
</code>

## Exercice 8

Tester dans le terminal : 
<code>http :8000</code>
<code>http PUT :8000 number=2</code>
<code>http DELETE :8000</code>

<code>

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
</code>

## Exercice 9
Test dans le terminal : 
<code>http :8000</code>
<code>http :8000/route2</code>

<code>

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

</code>

## Exercice 10

### 1 - Try, Catch (à la main)

<code>
app.get("/", async (req, res, next) => {
  try {
    throw new Error("Je suis un ASYNC bug");
    res.send("JE NE SERAI JAMAIS EXECUTE");
  } catch (exc) {
    next(exc);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ erreur: err.message });
});
</code>

### 2 - Module express-async-errors

<code>
require('express-async-errors');
app.get('/', async (req, res) => {
	throw new Error("Je suis un ASYNC bug")
	res.send('JE NE SERAI JAMAIS EXECUTE');
})


app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})
</code>


## Exercice 11

!!! x Il est possible d'avoir plusieurs verbes/méthodes sur une même route, exemple :

<code>
app.get('/', (req, res) => {
	res.send('ici traiter GET')
})
</code>

<code>
app.post('/', (req, res) => { 
	res.send('ici traiter POST')
})
</code>

<code>
app.put('/', (req, res) => {
	res.send('ici traiter PUT')
})
</code>

<code>
app.delete('/', (req, res) => {
	res.send('ici traiter DELETE')
})
</code>

## Exercice 12 - JOI
Test dans le terminal : 
<code>http :8000 name=A age=12</code>
<code>http :8000 name=Adrien age=douze</code>
<code>http :8000 name=Adrien age=12</code>

<code>
app.use(express.json()); // Parser les args

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
</code>

## Exercice 13 - JSON WEB TOKEN
<code>
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
</code>

## Connexion / S'enregistrer / Retrouver les comptes

<code>

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
</code>