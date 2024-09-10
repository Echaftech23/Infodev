const User = require('./User');
const Article = require('./Article');

User.hasMany(Article);
Article.belongsTo(User);

module.exports = {
  User,
  Article
};