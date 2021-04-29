const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "")
    const db = req.app.get('db');
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const storedUser = await db.user.getUser(emailFiltered);
      if (storedUser.length === 0) {
        try {
          const user_id = await db.user.register(emailFiltered, first_name, last_name, hash)
          const newUser = { user_id: user_id[0].user_id, email: emailFiltered, first_name, last_name };
          req.session.user = newUser;
          return res.status(200).send(newUser);
        } catch (err) { console.log(err) }
      } else {
        return res.sendStatus(403);
      }
    } catch (err) { console.log(err) }
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "")
    try {
      const storedUser = await db.user.getUser(emailFiltered);
      if (storedUser.length !== 0) {
        if (await bcrypt.compare(password, storedUser[0].hash)) {
          req.session.user = storedUser[0];
          return res.status(200).send(req.session.user);
        } else {
          req.session.destroy();
          return res.sendStatus(401);
        }
      } else { return res.sendStatus(404) }
    } catch (err) { console.log(err) }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: async (req, res) => {
    res.status(200).send(req.session.user);
  }
};
