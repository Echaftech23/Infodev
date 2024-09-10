const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');

Router.get("/", articleController.index);
Router.get("/login" , userController.getLoginPage)
Router.get("/sign" ,userController.getSignPage )
Router.post("/sign/addUser" ,userController.createUser)
// articlesRouter.get("articles/create", articleController.add);
// articlesRouter.post("/store", articleController.store);
// articlesRouter.get("articles/:id", articleController.show);
// articlesRouter.get("articles/:id/edit", articleController.edit);
// articlesRouter.put("articles/:id", articleController.update);
// articlesRouter.delete("articles/:id", articleController.delete);

module.exports = Router;