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


