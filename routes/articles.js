const express = require("express");
const articlesRouter = express.Router();
const articleController = require("../controllers/ArticleController");

articlesRouter.get("/", articleController.index);
articlesRouter.get("articles/create", articleController.add);
articlesRouter.post("/store", articleController.store);
articlesRouter.get("articles/:id", articleController.show);
articlesRouter.get("articles/:id/edit", articleController.edit);
articlesRouter.put("articles/:id", articleController.update);
articlesRouter.delete("articles/:id", articleController.delete);

module.exports = articlesRouter;