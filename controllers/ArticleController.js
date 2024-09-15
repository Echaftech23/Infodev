const { Article } = require('../models');
const ArticleRequest = require('../requests/ArticleRequest');
const fs = require('fs').promises;
const path = require('path');

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
            res.render("articles/add");
        } catch (error) {
            console.error("Error getting article:", error);
            return res.status(500).send({ error: "An error occurred while getting the article." });
        }
    }

    static async store(req, res) {
        try {
            console.log('Request body:', req.body);
            console.log('Request file:', req.file);

            // Validate the request
            const validationResult = ArticleRequest.validate(req);
           
            if (validationResult.error) {
                console.log('Validation error:', validationResult.error);
                if (req.file) {
                    await fs.unlink(req.file.path);
                }

                return res.status(400).render('articles/add', { 
                    errors: validationResult.error.details,
                    oldInput: req.body,
                });
            }

            // Handle file upload
            let imagePath = null;
            if (req.file) {
                const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

                console.log('Upload directory:', uploadDir);

                const fileExtension = path.extname(req.file.originalname);
                const newFileName = `${Date.now()}${fileExtension}`;
                const newPath = path.join(uploadDir, newFileName);
               
                await fs.rename(req.file.path, newPath);
                imagePath = `/uploads/${newFileName}`;
                console.log('File moved successfully to:', newPath);
            }

            // Create new article
            const article = new Article({
                title: req.body.title,
                content: req.body.content,
                image: imagePath,
                autherId: 1,
            });

            const savedArticle = await article.save();
            console.log('Article saved successfully:', savedArticle);

            return res.redirect("/");
        } catch (error) {
            console.error('Detailed error in store method:', error);
            return res.status(500).render('articles/add', { 
                errors: [{ message: 'An error occurred while creating the article' }],
                oldInput: req.body,
            });
        }
    }

    // Get a single article
    static async show(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            res.render("articles/show", { article });
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