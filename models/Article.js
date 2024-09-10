'use strict';
// const { Model} = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// module.exports = (sequelize, DataTypes) => {
//   class Article extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Article.init({
//     title: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//     autherId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Article',
//   });
//   return Article;
// };

class Article extends Model {}

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

module.exports = Article;