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
Test dans terminal : http POST localhost:3000 hello=World valeur=2 
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
