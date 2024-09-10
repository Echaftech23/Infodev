const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");

// Article routes :
router.get("/", articleController.index);
router.get("/articles/create", articleController.add);
router.post("/store", articleController.store);
router.get("/articles/:id", articleController.show);
router.get("/articles/:id/edit", articleController.edit);
router.put("/articles/:id", articleController.update);
router.delete("/articles/:id", articleController.delete);

module.exports = router;