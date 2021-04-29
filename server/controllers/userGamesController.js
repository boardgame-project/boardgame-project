module.exports = {
  addUserGame: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id;
      const gameID = req.params.id;
      await db.userGames.addGame(userID, gameID);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getUserGames: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id;
      const userGames = await db.userGames.getUserGames(userID)
      return res.status(200).send(userGames);
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getUserGame: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id;
      const gameID = req.params.id
      const userGame = await db.userGames.getUserGame(userID, gameID)
      return res.status(200).send(userGame[0])
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  updateReview: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id;
      const gameID = req.body.gameID;
      const review = req.body.review;
      await db.userGames.updateReview(userID, gameID, review);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  updateRating: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const gameID = req.body.gameID;
      const rating = req.body.rating;
      await db.userGames.updateRating(userID, gameID, rating);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  incPlayCount: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const gameID = req.params.id;
      const playCount = await db.userGames.increasePlayCount(userID, gameID)
      return res.status(200).send(playCount[0]);
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  decPlayCount: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const gameID = req.params.id;
      let playCount = await db.userGames.decreasePlayCount(userID, gameID)
      if (playCount[0].play_count < 0) {
        playCount = await db.userGames.increasePlayCount(userID, gameID)
        return res.status(200).send(playCount[0])
      } else { return res.status(200).send(playCount[0]) }
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  deleteGame: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const gameID = req.params.id
      await db.userGames.deleteGame(userID, gameID)
      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(500)
    }
  }
};
