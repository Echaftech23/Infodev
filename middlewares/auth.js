const { Article } = require('../models');

class Auth {
    static userAuth = (req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
        } else {
            res.locals.user = null;
        }
        next();
    };

    // Middleware to check if user is authenticated
    static isAuthenticated = (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            req.flash('error', 'You need to be logged in to perform this action.');
            setTimeout(() => {
                res.redirect('/login'); 
            }, 2000);
        }
    };

    // Middleware to check if user is the author of the article
    static isArticleAuthor = async (req, res, next) => {
        try {
            const articleId = req.params.id;
            const article = await Article.findByPk(articleId);
            
            if (!article) {
                req.flash('error', 'Article not found.');
                return res.status(404).redirect('/');
            }
            
            if (article.authorId !== req.session.user.id) {
                req.flash('error', 'You are not authorized to perform this action.');
                return res.status(403).redirect('/');
            }

            res.locals.isAuthor = true;
            next();
        } catch (error) {
            console.error('Authorization error:', error);
            req.flash('error', 'An error occurred while checking authorization.');
            res.status(500).redirect('/');
        }
    };
}

module.exports = Auth;