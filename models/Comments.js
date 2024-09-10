// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Article = require('./Article');

class Comment extends Model {}

Comment.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true  
});


Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

module.exports = Comment;
