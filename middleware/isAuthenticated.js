class auth {
    static isAuthenticated = (req, res, next) => {
      if (req.cookies.loggedIn_user) {
        next();
      } else {
        return res.render("/login", {
          error: "You must be logged in to access this page",
        });
      }
    };
  
    static isAuthorization = (req, res, next) => {
      console.log(req.body);
      next();
    };
  }
  
  module.exports = auth;