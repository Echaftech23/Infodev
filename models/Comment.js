const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      // Association avec User
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // Association avec Article
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
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
