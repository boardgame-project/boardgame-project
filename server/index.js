require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authMiddleware = require('./middleware/authMiddleware');
const auth = require('./controllers/authController');
// const game = require('./controllers/gameController');
// const player = require('./controllers/playerController');
const userGames = require('./controllers/userGamesController');
// const userInfo = require('./controllers/userInfoController');

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))


//Auth endpoints
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/auth/user', auth.getUser);
app.delete('/api/auth/logout', auth.logout);

// // Game endpoints
// app.get('/api/game', game.getGames); //query for search 
// app.get('/api/game/:id', game.getGame);

//UserGame endpopints
app.post('/api/usergame/add/:id', authMiddleware.authorize, userGames.addUserGame);
app.get('/api/usergame', authMiddleware.authorize, userGames.getUserGames);
app.put('/api/usergame/review', authMiddleware.authorize, userGames.updateReview);
app.put('/api/usergame/rating', authMiddleware.authorize, userGames.updateRating);
app.put('/api/usergame/inccount/:id', authMiddleware.authorize, userGames.incPlayCount);
app.put('/api/usergame/deccount/:id', authMiddleware.authorize, userGames.decPlayCount);
app.delete('/api/usergame/:id', authMiddleware.authorize, userGames.deleteGame);

// //UserInfo endpoints
// app.get('/api/user', userInfo.getUser);
// app.put('/api/user/name', userInfo.editName);
// app.put('/api/user/email', userInfo.editEmail);
// app.put('/api/user/password', userInfo.editPassword); //needs bcryptjs added into this controller file

// //Player endpoints
// app.get('/api/player/playcount', player.getPlayCount);
// app.get('/api/player/findplayer', player.findPlayers);


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => console.log(`DB and Server Connected to Port ${SERVER_PORT}`))
  })
  .catch(err => console.log(err));


