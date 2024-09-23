const { Comment } = require('../models'); // Garder seulement cette déclaration
const commentSchema = require('../requests/commentRequest');

// Créer un commentaire
exports.createComment = async (req, res) => {
    try {
        // Vérifier si req.session.user est défini
        if (!req.session.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { content, articleId } = req.body;
        const userId = req.session.user.id;  

        // Création du commentaire dans la base de données
        const comment = await Comment.create({
            content,
            articleId,
            userId,
        });

        req.flash('success', 'Comment created successfully');
        res.redirect(`/articles/${articleId}`);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'An error occurred while creating the comment', error: error.message });
    }
};

// Mise à jour d'un commentaire
exports.updateComment = async (req, res) => {
    try {
        // const { commentId } = req.params;
        const { content, commentId} = req.body;
     

        // Vérification que l'ID du commentaire est valide
        // if (isNaN(commentId)) {
        //     return res.status(400).json({ message: 'Invalid comment ID' });
        // }

        // Récupérer le commentaire par ID
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Vérifie si l'utilisateur est l'auteur du commentaire
        if (comment.userId !== req.session.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this comment' });
        }

        // Mettre à jour le contenu du commentaire
        comment.content = content;
        await comment.save();

        req.flash('success', 'Comment updated successfully');
        return res.redirect(`/articles/${comment.articleId}`); // Redirige vers l'article associé
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the comment' });
    }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Récupérer le commentaire par ID
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Vérifie si l'utilisateur est l'auteur du commentaire
        if (comment.userId !== req.session.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        // Supprime le commentaire
        await comment.destroy();

        req.flash('success', 'Comment deleted successfully');
        return res.redirect(`/articles/${comment.articleId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the comment' });
    }
};


