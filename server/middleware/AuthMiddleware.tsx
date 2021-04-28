type User = {
  user_id:string,
  first_name:string,
  last_name:string,
  hash:string,
  email:string
}

module.exports = {
  authorize: (req: { session: { user: User; }; } , res: { sendStatus: (arg0: number) => void; }, next: () => void) => {
    if (req.session.user ) {
      return next();
    } else {
      return res.sendStatus(403);
    };
  }
};