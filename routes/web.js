const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');


Router.get("/login" , userController.getLoginPage)
Router.get("/sign" ,userController.getSignPage )
Router.post("/sign/addUser" ,userController.createUser)


// Article routes :
Router.get("/", articleController.index);
Router.get("/articles/create", articleController.add);
Router.post("/store", articleController.store);
Router.get("/articles/:id", articleController.show);
Router.get("/articles/:id/edit", articleController.edit);
Router.put("/articles/:id", articleController.update);
Router.delete("/articles/:id", articleController.delete);

module.exports = Router;
