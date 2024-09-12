const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');


// Router.get("/login" , userController.getLoginPage)
// Router.get("/sign" , userController.getSignPage )

// User routes:
Router.get("/login", (req, res) => {
    userController.getLoginPage(req, res, { layout: false });
});
Router.get("/sign", (req, res) => {
    userController.getLoginPage(req, res, { layout: false });
});
Router.post("/sign/addUser" ,userController.createUser)

// Article routes :
Router.get("/", articleController.index);
Router.get("/articles/create", articleController.create);
Router.post("/store", articleController.store);
Router.get("/articles/:id", articleController.show);
Router.get("/articles/:id/edit", articleController.edit);
Router.put("/articles/:id", articleController.update);
Router.delete("/articles/:id", articleController.delete);

module.exports = Router;
