const { User, Article } = require('../models');

class ProfileController {

    // Show user's profile with articles
    static async index(req, res) {
        try {
            const userId = req.session.userId; // Assuming userId is stored in the session after login
            if (!userId) {
                return res.redirect('/login'); // Redirect if user is not logged in
            }

            // Fetch user with associated articles
            const user = await User.findByPk(userId, {
                include: [{ model: Article, as: 'articles' }] // Fetch articles related to the user
            });

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            // Render profile page with user data and articles
            res.render('profile', {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.image || 'https://via.placeholder.com/150',
                    articles: user.articles // Articles authored by the user
                }
            });

        } catch (error) {
            console.error("Error fetching profile:", error);
            return res.status(500).send({ error: "An error occurred while fetching the profile." });
        }
    }

    // Edit user's profile
    static async edit(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/login');
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            res.render('editProfile', {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.image || 'https://via.placeholder.com/150'
                }
            });

        } catch (error) {
            console.error("Error fetching user for editing:", error);
            return res.status(500).send({ error: "An error occurred while fetching the user." });
        }
    }

    // Update user's profile
    static async update(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/login');
            }

            const { username, email, profilePicture } = req.body;

            // Update user's profile
            const user = await User.findByPk(userId);
            if (user) {
                user.username = username || user.username;
                user.email = email || user.email;
                user.image = profilePicture || user.image;
                await user.save();
            }

            res.redirect('/profile');

        } catch (error) {
            console.error("Error updating profile:", error);
            return res.status(500).send({ error: "An error occurred while updating the profile." });
        }
    }

    // Delete user's account
    static async delete(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/login');
            }

            // Delete the user and their articles
            const user = await User.findByPk(userId);
            if (user) {
                await user.destroy(); // This will also remove associated articles if cascading is set up
            }

            req.session.destroy(); // Log out the user after deletion
            res.redirect('/');

        } catch (error) {
            console.error("Error deleting profile:", error);
            return res.status(500).send({ error: "An error occurred while deleting the profile." });
        }
    }
}

module.exports = ProfileController;
