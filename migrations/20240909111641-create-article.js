'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Articles', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        image: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        autherId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

      });

  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  autherId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Correct foreign key reference
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
};
