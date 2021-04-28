require('dotenv').config()
const express = require('express')
const session = require('express-session')
const auth = require( './controllers/authController'); 
const game = require( './controllers/gameController'); 
const player = require( './controllers/playerController'); 
const userGames = require( './controllers/userGamesController');  
const userInfo = require( './controllers/userInfoController');  
const massive = require ('massive'); 

const app = express(); 

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24
  }
}))

massive({
	connectionString: CONNECTION_STRING,
	ssl: {rejectUnauthorized: 0}
	})
	.then(dbInstance => {
	    app.set('db', dbInstance); 
	    app.listen(SERVER_PORT, ()=> console.log('DB and Server Connected'))
})
.catch(err=> console.log(err));


