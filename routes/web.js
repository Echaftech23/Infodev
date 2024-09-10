const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");
const profileController = require("../controllers/ProfileController");

// Article routes
router.get("/", articleController.index);
router.get("/articles/create", articleController.add);
router.post("/store", articleController.store);
router.get("/articles/:id", articleController.show);
router.get("/articles/:id/edit", articleController.edit);
router.put("/articles/:id", articleController.update);
router.delete("/articles/:id", articleController.delete);

// Profile routes
router.get("/profile", profileController.index);
router.get("/profile/edit", profileController.edit);
router.put("/profile", profileController.update);
router.delete("/profile", profileController.delete);

module.exports = router;
