const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;