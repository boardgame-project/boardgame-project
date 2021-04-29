module.exports = {
  getPlayerTotalPlays: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const plays = await db.userGames.getPlayerTotalPlays(userID)
      return res.status(200).send(plays[0])
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getPlayerReviews: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const plays = await db.userGames.getPlayerTotalPlays(userID)
      return res.status(200).send(plays[0])
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getAllPlayersTotalPlays: async (req, res) => {
    try {
      const db = req.app.get('db');
      const userID = req.session.user.user_id
      const plays = await db.userGames.getPlayerTotalPlays(userID)
      return res.status(200).send(plays[0])
    } catch (err) {
      return res.sendStatus(500)
    }
  }
}