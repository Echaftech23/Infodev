const { Article } = require('../models');

class Auth {
    static userAuth = (req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
            // console.log('User found in session:', res.locals.user);
        } else {
            res.locals.user = null;
            // console.log('No user found in session');
        }
        next();
    };

    // Middleware to check if user is authenticated
    static isAuthenticated = (req, res, next) => {
        // console.log('req.session.user:', req.session.user);
        if (req.session.user) {
            // console.log('User is authenticated');
            next();
        } else {
            // console.log('User is not authenticated, redirecting to login');
            res.redirect('/login');
        }
    };

    // Middleware to check if user is the author of the article
    static isArticleAuthor = async (req, res, next) => {
        try {
            this.isAuthenticated;

            const articleId = req.params.id;
            const article = await Article.findByPk(articleId);
            
            if (!article) {
                return res.status(404).send({ error: "Article not found." });
            }
            
            if (article.userId !== req.session.user.id) {
                return res.status(403).send({ error: "You are not authorized to perform this action." });
            }
            
            next();
        } catch (error) {
            console.error('Authorization error:', error);
            res.status(500).send({ error: "An error occurred while checking authorization." });
        }
    };
}

module.exports = Auth;