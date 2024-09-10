const { Article } = require('../models');
const ArticleRequest = require('../requests/ArticleRequest');

class ArticleController {

    // Get all articles
    static async index(req, res) {
        try {
            const articles = await Article.findAll();
            res.render("index", { articles });
        } catch (error) {
            console.error("Error getting articles:", error);
            return res.status(500).send({ error: "An error occurred while getting the articles." });
        }
    }

    // Create a new article
    static async create(req, res) {        
        try {
            res.render("articles/addArticle");
        } catch (error) {
            console.error("Error getting article:", error);
            return res.status(500).send({ error: "An error occurred while getting the article." });
        }
    }

    static async store(req, res) {
        // Validate input using ArticleRequest
        const validationResult = ArticleRequest.validate(req);
        if (validationResult.error) {
            console.error("Error validation :", validationResult.error.details);
            return res.status(400).send({ errors: validationResult.error.details });
        }

        try {
            // Create a new article in the database using Sequelize
            const { title, content, image } = req.body;
            const article = await Article.create({
                title,
                content,
                image,
                author_id: req.user.id
            });

            res.render("article/addArticle", {
                article
            });

        } catch (error) {
            console.error("Error creating article:", error);
            return res.status(500).send({ error: "An error occurred while creating the article." });
        }
    }

    // Get a single article
    static async show(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            res.render("article/showArticle", { article });
        } catch (error) {
            console.error("Error getting article:", error);
            return res.status(500).send({ error: "An error occurred while getting the article." });
        }
    }

    // Update an article
    static async edit(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            res.render("article/editArticle", {
                article
            });
        } catch (error) {
            console.error("Error getting article:", error);
            return res.status(500).send({ error: "An error occurred while getting the article." });
        }
    }

    // Update an article
    static async update(req, res) {
        // Validate input using ArticleRequest
        const validationResult = ArticleRequest.validate(req);
        if (validationResult.error) {
            console.error("Error validation :", validationResult.error.details);
            return res.status(400).send({ errors: validationResult.error.details });
        }

        try {
            const article = await Article.findByPk(req.params.id);
            article.title = req.body.title;
            article.content = req.body.content;
            article.image = req.body.image;
            await article.save();
            res.render("article/updateArticle", {
                article
            });
        } catch (error) {
            console.error("Error updating article:", error);
            return res.status(500).send({ error: "An error occurred while updating the article." });
        }
    }

    // Delete an article
    static async delete(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            await article.destroy();
            res.render("article/deleteArticle", {
                article
            });
        } catch (error) {
            console.error("Error deleting article:", error);
            return res.status(500).send({ error: "An error occurred while deleting the article." });
        }
    }
}

module.exports = ArticleController;