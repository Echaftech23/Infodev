const { User } = require('../models');

const showProfile = async (req, res) => {
  try {
    const userId = req.session.user?.id; 
    
    if (!userId) {
      return res.redirect('/login'); 
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.render('profile', {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.image || 'https://via.placeholder.com/150',
      }
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).send({ error: "An error occurred while fetching the profile." });
  }
};

const getEditProfilePage = async (req, res) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      return res.redirect('/login');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Render edit profile view and pass current user data
    res.render('editProfile', {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.image || 'https://via.placeholder.com/150',
      }
    });

  } catch (error) {
    console.error("Error fetching user for editing:", error);
    return res.status(500).send({ error: "An error occurred while fetching the user." });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      return res.redirect('/login');
    }

    const { username, email, profilePicture } = req.body;

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
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      return res.redirect('/login');
    }

    const user = await User.findByPk(userId);

    if (user) {
      await user.destroy(); 
    }

    req.session.destroy(); 
    res.redirect('/'); 

  } catch (error) {
    console.error("Error deleting profile:", error);
    return res.status(500).send({ error: "An error occurred while deleting the profile." });
  }
};

module.exports = {
  showProfile,
  getEditProfilePage,
  updateProfile,
  deleteProfile
};
