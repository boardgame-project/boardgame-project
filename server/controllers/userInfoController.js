const bcrypt = require('bcryptjs');

module.exports = {
  editEmail: async (req, res) => {
    const db = req.app.get('db')
    const { email } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "")
    const storedUser = await db.user.getUser(emailFiltered);
    if (storedUser.length === 0) {
      const user_id = req.session.user.user_id;
      try {
        await db.userInfo.editEmail(user_id, emailFiltered);
        req.session.user = { ...req.session.user, email: emailFiltered };
        res.status(200).send(req.session.user);
      } catch (err) { res.sendStatus(500) }
    } else {
      res.sendStatus(403);
    }
  },
  editPassword: async (req, res) => {
    const db = req.app.get('db')
    const { password } = req.body;
    const user_id = req.session.user.user_id;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await db.userInfo.editPassword(user_id, hash);
      req.session.user = { ...req.session.user, hash };
      res.status(200).send(req.session.user);
    } catch (err) { res.sendStatus(500) }
  },
  editName: async (req, res) => {
    const db = req.app.get('db')
    const { first_name, last_name } = req.body;
    const user_id = req.session.user.user_id;
    try {
      await db.userInfo.editName(user_id, first_name, last_name);
      req.session.user = { ...req.session.user, first_name, last_name };
      res.status(200).send(req.session.user);
    } catch (err) { res.sendStatus(500) }
  },
  deleteUser: async (req, res) => {
    const db = req.app.get('db');
    const user_id = req.session.user.user_id;
    try {
      await db.userInfo.deleteUser(user_id)
      req.session.destroy();
      res.sendStatus(200)
    } catch (err) { res.sendStatus(500) }
  }
}