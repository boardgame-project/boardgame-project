require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require ('massive'); 
const auth = require( './controllers/authController'); 
const game = require( './controllers/gameController'); 
const player = require( './controllers/playerController'); 
const userGames = require( './controllers/userGamesController');  
const userInfo = require( './controllers/userInfoController');  

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


//Auth endpoints
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/authuser', auth.getUser);
app.delete('/api/auth/logout', auth.logout);

//Game endpoints
app.get('/api/game', game.getGames); //query for search 
app.get('/api/game/:id', game.getGame);
app.post('/api/game/review', game.postReview);
app.post('/api/game/rating', game.postRating);

//UserGame endpopints
app.get('/api/usergame', userGames.getUserGames);
app.get('/api/usergame/:id', userGames.getUserGame);
app.post('/api/usergame/playcount', userGames.incPlayCount);
app.delete('/api/usergame/:id', userGames.deleteGame)

//UserInfo endpoints
app.get('/api/user', userInfo.getUser);
app.put('/api/user/name', userInfo.editName);
app.put('/api/user/email', userInfo.editEmail);
app.put('/api/user/password', userInfo.editPassword); //needs bcryptjs added into this controller file

//Player endpoints
app.get('/api/player/playcount', player.getPlayCount);
app.get('/api/player/findplayer', player.findPlayers);


massive({
	connectionString: CONNECTION_STRING,
	ssl: {rejectUnauthorized: 0}
	})
	.then(dbInstance => {
	    app.set('db', dbInstance); 
	    app.listen(SERVER_PORT, ()=> console.log('DB and Server Connected'))
})
.catch(err=> console.log(err));


