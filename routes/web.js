const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');
const profileController = require('../controllers/ProfileController'); // Make sure to import your profile controller

// User authentication routes
Router.get("/login", userController.getLoginPage);
Router.get("/sign", userController.getSignPage);
Router.post("/sign/addUser", userController.createUser);

// Profile routes
Router.get("/profile", profileController.index);           // View user profile
Router.get("/profile/edit", profileController.edit);       // Get edit profile page
Router.put("/profile", profileController.update);          // Update user profile
Router.delete("/profile", profileController.delete);       // Delete user profile

// Article routes
Router.get("/", articleController.index);
Router.get("/articles/create", articleController.add);
Router.post("/store", articleController.store);
Router.get("/articles/:id", articleController.show);
Router.get("/articles/:id/edit", articleController.edit);
Router.put("/articles/:id", articleController.update);
Router.delete("/articles/:id", articleController.delete);

module.exports = Router;
