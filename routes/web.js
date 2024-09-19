const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');
const Auth = require('../middlewares/auth');
// const commentController = require('../controllers/commentController');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// User routes:
Router.get("/login", (req, res) => {
    userController.getLoginPage(req, res, { layout: false });
});
Router.get("/sign", (req, res) => {
    userController.getSignPage(req, res, { layout: false });
});

Router.post("/login/check_user" , userController.check_user)
Router.post("/sign/addUser" ,userController.createUser)
Router.get("/logout", userController.Logout);

// Apply userAuth middleware to all routes
Router.use(Auth.userAuth);

// Public routes
Router.get("/", articleController.index);
Router.get("/article/:id", articleController.show);

// Protected routes
Router.get("/articles/create", Auth.isAuthenticated, articleController.create);
Router.post("/articles/store", Auth.isAuthenticated, upload.single('image'), articleController.store);
Router.get("/articles/:id/edit", Auth.isArticleAuthor, articleController.edit);
Router.post("/articles/:id", Auth.isArticleAuthor, upload.single('image'), articleController.update);
Router.delete("/articles/:id", Auth.isArticleAuthor, articleController.delete);

// Comments router :
// Router.post('/', commentController.createComment);
// Router.get('/:articleId', commentController.getCommentsByArticle);
// Router.put('/:commentId', commentController.updateComment);
// Router.delete('/:commentId', commentController.deleteComment);

module.exports = Router;