const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

User.hasMany(Article);
Article.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

module.exports = { User, Article, Comment };