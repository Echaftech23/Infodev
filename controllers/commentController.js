const { Article, Comment, User } = require('../models');


// Créer un commentaire
exports.createComment = async (req, res) => {
    try {
        const { content, articleId } = req.body; // Supposant que le contenu et l'ID de l'article sont envoyés dans la requête
        const userId = req.user.id; // Récupérer l'utilisateur connecté à partir de l'objet req (si tu utilises un système d'authentification)

        // Validation des données
        if (!content || !articleId) {
            return res.status(400).json({ message: 'Content and article ID are required' });
        }

        // Création du commentaire
        const comment = await Comment.create({
            content,
            articleId,
            userId,
        });

        // Réponse avec le commentaire créé
        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'An error occurred while creating the comment' });
    }
};

// Afficher un article avec ses commentaires
exports.show = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérification que l'ID de l'article est valide
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid article ID' });
        }

        // Récupérer l'article avec les commentaires et leurs utilisateurs associés
        const article = await Article.findByPk(id, {
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username', 'email'] // Corriger selon ton modèle
                        }
                    ]
                }
            ]
        });

        // Vérifier si l'article existe
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Rendre la vue pour afficher l'article et ses commentaires
        res.render('articles/show', { article });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'An error occurred while fetching the article' });
    }
};
