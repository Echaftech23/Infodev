const fs = require('fs');
const path = require('path');
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
      },
      message: req.flash('message') 
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).send({ error: "An error occurred while fetching the profile." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.session.user?.id;    

    if (!userId) {
      return res.redirect('/login');
    }

    const { username, email } = req.body;
    // console.log(req.body);
    // console.log(req.file);

    let profilePicture = req.file?.filename;

    const user = await User.findByPk(userId);

    if (user) {
      console.log(username , email);

      user.username = username || user.username;
      user.email = email || user.email;

      if (profilePicture) {
        if (user.image && user.image !== 'https://via.placeholder.com/150') {
          fs.unlinkSync(path.join(__dirname, '../public/uploads', user.image));
        }

        user.image = profilePicture;
      }

      await user.save(); 

      req.flash('message', 'Profile updated successfully!');
    } else {
      req.flash('message', 'User not found.');
    }

    res.redirect('/profile'); 

  } catch (error) {
    console.error("Error updating profile:", error);
    req.flash('message', 'An error occurred while updating the profile.');
    return res.redirect('/profile');
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

    res.render('editProfile', {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.image || 'https://via.placeholder.com/150',
      },
      message: req.flash('message') // Add this line to include flash messages
    });

  } catch (error) {
    console.error("Error fetching user for editing:", error);
    return res.status(500).send({ error: "An error occurred while fetching the user." });
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
