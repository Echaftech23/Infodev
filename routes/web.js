const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');

// User routes
Router.get("/login", userController.getLoginPage);
Router.get("/sign", userController.getSignPage);
Router.post("/sign/addUser", userController.createUser);
Router.post("/login/check_user", userController.check_user);

// Profile routes
Router.get("/profile", profileController.showProfile);
Router.get("/profile/edit", profileController.getEditProfilePage);
Router.put("/profile", profileController.updateProfile);
Router.delete("/profile", profileController.deleteProfile);

// Article routes
Router.get("/", articleController.index);
Router.get("/articles/create", articleController.add);
Router.post("/store", articleController.store);
Router.get("/articles/:id", articleController.show);
Router.get("/articles/:id/edit", articleController.edit);
Router.put("/articles/:id", articleController.update);
Router.delete("/articles/:id", articleController.delete);

module.exports = Router;
