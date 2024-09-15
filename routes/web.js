const express = require("express");
const Router = express.Router();
const articleController = require("../controllers/ArticleController");
const userController = require('../controllers/userController');
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


// Article routes :
Router.get("/", articleController.index);
Router.get("/articles/create", articleController.create);
Router.post("/articles/store", upload.single('image'), articleController.store);
Router.get("/articles/:id", articleController.show);
Router.get("/articles/:id/edit", articleController.edit);
Router.put("/articles/:id", articleController.update);
Router.delete("/articles/:id", articleController.delete);

// Comments router :
// Router.post('/', commentController.createComment);
// Router.get('/:articleId', commentController.getCommentsByArticle);
// Router.put('/:commentId', commentController.updateComment);
// Router.delete('/:commentId', commentController.deleteComment);

module.exports = Router;

