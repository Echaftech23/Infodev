'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {
      Article.belongsToMany(models.User, { through: 'ArticleUser' });
    }
  
  }

  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    autherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });

  return Article;
};