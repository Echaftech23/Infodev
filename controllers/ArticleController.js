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
            req.flash('error', 'An error occurred while getting the articles.');
            return res.status(500).redirect('/');
        }
    }

    // Create a new article
    static async create(req, res) {        
        try {
            res.render("articles/add");
        } catch (error) {
            req.flash('error', 'An error occurred while getting the article.');
            return res.status(500).redirect('/articles/add');
        }
    }

    // Store a new article
    static async store(req, res) {
        try {

            // Validate the request
            const validationResult = ArticleRequest.validate(req);
           
            if (validationResult.error) {
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

                const fileExtension = path.extname(req.file.originalname);
                const newFileName = `${Date.now()}${fileExtension}`;
                const newPath = path.join(uploadDir, newFileName);
               
                await fs.rename(req.file.path, newPath);
                imagePath = `/uploads/${newFileName}`;
            }

            // Create new article
            const article = new Article({
                title: req.body.title,
                content: req.body.content,
                image: imagePath,
                autherId: req.session.user?.id,
            });

            await article.save();

            req.flash('success', 'Article created successfully.');
            return res.redirect("/");
        } catch (error) {
            req.flash('error', 'An error occurred while creating the article.');
            return res.status(500).render('articles/add', { oldInput: req.body });
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

            if (!article) {
                req.flash('error', 'Article not found.');
                return res.status(404).redirect('/');
            }
        
              const isAuthor = req.session.user && article.autherId === req.session.user.id;                      
    
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
    
            res.render("articles/show", { article, relatedArticles, isAuthor });
        } catch (error) {
            req.flash('error', 'An error occurred while fetching the article details.');
            return res.status(500).redirect('/');
        }
    };

    // Edit an article
    static async edit(req, res) {
        try {
            const article = await Article.findByPk(req.params.id);
            if (!article) {
                req.flash('error', 'Article not found.');
                return res.status(404).render('articles/edit');
            }
            res.render("articles/edit", { article });
        } catch (error) {
            req.flash('error', 'An error occurred while getting the article.');
            return res.status(500).redirect('/');
        }
    }

    // Update an article
    static async update(req, res) {
        try {
            // Find the article
            const article = await Article.findByPk(req.params.id);
            if (!article) {
                req.flash('error', 'Article not found.');
                return res.status(404).render('articles/edit', { oldInput: req.body });
            }
            
            // Validate the request
            const validationResult = ArticleRequest.validate(req);
            if (validationResult.error) {
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
    
            req.flash('success', 'Article updated successfully.');
            return res.redirect(`/articles/${article.id}`);
        } catch (error) {
            req.flash('error', 'An error occurred while updating the article.');
            return res.status(500).render('articles/edit', {
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
            req.flash('success', 'Article deleted successfully.');
            return res.redirect("/");
        } catch (error) {
            req.flash('error', 'An error occurred while deleting the article.');
            return res.status(500).redirect('/');
        }
    }
}

module.exports = ArticleController;