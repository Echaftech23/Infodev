
// Dummy user data
let user = {
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: '/images/profile.jpg',
    articles: ['Article 1', 'Article 2', 'Article 3']
  };
  
  // Display the profile
  exports.index = (req, res) => {
    res.render('profile', { user });
  };
  
  // Edit the profile
  exports.edit = (req, res) => {
    res.render('editProfile', { user });
  };
  
  // Update the profile
  exports.update = (req, res) => {
    const { name, email } = req.body;
  
    // Update user data
    if (name) user.name = name;
    if (email) user.email = email;
  
    res.redirect('/profile');
  };
  
  // Delete the profile
  exports.delete = (req, res) => {
    // Clear the user data (simulate deletion)
    user = null;
    res.redirect('/');
  };
  