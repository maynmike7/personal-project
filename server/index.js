require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./Controllers/authController'),
      mainCtrl = require('./Controllers/mainController'),
      path = require('path'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//Auth endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

//recipe endpoints
app.get('/api/recipes', mainCtrl.getRecipes)
app.get('/api/recipes/:id', mainCtrl.getUserRecipes)
app.post('/api/recipes', mainCtrl.addRecipe)
app.post('/api/recipes/:id', mainCtrl.saveRecipe)
app.put('/api/recipes/:id', mainCtrl.editRecipeTitle)
app.delete('/api/recipes/:id', mainCtrl.deleteRecipe)

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.listen(port, () => console.log(`Server running on ${port}`))