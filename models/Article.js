const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Article extends Model {}

Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  DateOfCreate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Article'
});

module.exports = Article;