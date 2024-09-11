const Comment = require('../models/Comment');
const Article = require('../models/Article');
const User = require('../models/User');
const { createCommentSchema, updateCommentSchema } = require('../requests/commentRequest');

// Créer un commentaire
exports.createComment = async (req, res) => {
    try {
        const { error } = createCommentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { content, articleId } = req.body;
        const userId = req.user.id;  // L'utilisateur connecté

        // Vérifier si l'article existe
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Créer le commentaire
        const newComment = await Comment.create({
            content,
            userId,
            articleId
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating comment' });
    }
};

// Obtenir tous les commentaires pour un article donné
exports.getCommentsByArticle = async (req, res) => {
    try {
        const { articleId } = req.params;

        const comments = await Comment.findAll({
            where: { articleId },
            include: [
                { model: User, as: 'user', attributes: ['name', 'email'] }
            ]
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
    try {
        const { error } = updateCommentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        // Trouver le commentaire
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Vérifier si l'utilisateur est le propriétaire du commentaire
        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Mettre à jour le contenu du commentaire
        comment.content = content;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating comment' });
    }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        // Trouver le commentaire
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Vérifier si l'utilisateur est le propriétaire du commentaire
        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Supprimer le commentaire
        await comment.destroy();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
};
