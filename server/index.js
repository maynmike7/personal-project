require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./Controllers/authController'),
      mainCtrl = require('./Controllers/mainController'),
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



app.listen(port, () => console.log(`Server running on ${port}`))