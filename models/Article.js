'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // Associate the article with a user (author)
      Article.belongsTo(models.User, {
        foreignKey: 'autherId',
        as: 'author',
      });
    }
  }

  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    autherId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Author is required
    },
  }, {
    sequelize,
    modelName: 'Article',
  });

  return Article;
};
