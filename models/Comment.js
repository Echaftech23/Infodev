// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
class Comment extends Model {

  static associate(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleId', as: 'article' });
  }

}



Comment.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Articles',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  timestamps: true  
});


return Comment;

};
