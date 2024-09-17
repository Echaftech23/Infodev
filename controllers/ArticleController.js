const { Op } = require('sequelize');
const { Article } = require('../models');
const { User } = require('../models');
const ArticleRequest = require('../requests/ArticleRequest');
const fs = require('fs').promises;
const path = require('path');

class ArticleController {

    // Get all articles
    static async index(req, res) {
        try {
            const articles = await Article.findAll({
                include: {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'image'],
                }
            });
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
                autherId: 8,
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
    static async show (req, res) {
        try {
            const article = await Article.findByPk(req.params.id, {
                include: {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'image']
                }
            });
    
            const relatedArticles = await Article.findAll({
                where: {
                    id: { [Op.ne]: article.id }
                },
                limit: 3,
                include: {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'image']
                }
            });
    
            res.render("articles/show", { article, relatedArticles });
        } catch (error) {
            console.error("Error fetching article details:", error);
            res.status(500).send("Internal Server Error");
        }
    };

    // Update an article
    static async edit(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            if (!article) {
                return res.status(404).render('articles/edit', {
                    errors: [{ message: 'Article not found' }],
                });
            }
            res.render("articles/edit", { article });
        } catch (error) {
            console.error("Error getting article:", error);
            return res.status(500).send({ error: "An error occurred while getting the article." });
        }
    }

    // Update an article
    static async update(req, res) {
        try {
            // Find the article
            const article = await Article.findByPk(req.params.id);
            if (!article) {
                return res.status(404).render('articles/edit', {
                    errors: [{ message: 'Article not found' }],
                    oldInput: req.body
                });
            }
            console.log('Request body ddd:', req.body);
            // Validate the request
            const validationResult = ArticleRequest.validate(req);
            if (validationResult.error) {
                console.error("Validation error:", validationResult.error.details);
                if (req.file) {
                    await fs.unlink(req.file.path);
                }
                return res.status(400).render('articles/edit', {
                    errors: validationResult.error.details,
                    oldInput: req.body,
                    article: article
                });
            }
    
            // Handle file upload
            let imagePath = article.image;
            if (req.file) {
                const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
                const fileExtension = path.extname(req.file.originalname);
                const newFileName = `${Date.now()}${fileExtension}`;
                const newPath = path.join(uploadDir, newFileName);
               
                await fs.rename(req.file.path, newPath);
                imagePath = `/uploads/${newFileName}`;
    
                // Delete the old image file if it exists
                if (article.image) {
                    const oldImagePath = path.join(__dirname, '..', 'public', article.image);
                    await fs.unlink(oldImagePath).catch(err => console.error('Error deleting old image:', err));
                }
            }
    
            // Update article
            article.title = req.body.title;
            article.content = req.body.content;
            article.image = imagePath;
            await article.save();
    
            return res.redirect(`/articles/${article.id}`);
        } catch (error) {
            console.error("Error updating article:", error);
            return res.status(500).render('articles/edit', {
                errors: [{ message: 'An error occurred while updating the article' }],
                oldInput: req.body,
                article: await Article.findByPk(req.params.id)
            });
        }
    }

    // Delete an article
    static async delete(req, res) {
        try {
            await Article.destroy({
                where: { id: req.params.id }
            });
            return res.redirect("/");
        } catch (error) {
            console.error("Error deleting article:", error);
            return res.status(500).send({ error: "An error occurred while deleting the article." });
        }
    }
}

module.exports = ArticleController;