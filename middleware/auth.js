class Auth {
    static userAuth = (req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
          } else {
            res.locals.user = null;
          }
          next();
    };
}

module.exports = Auth;