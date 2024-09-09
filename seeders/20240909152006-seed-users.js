'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        username: 'JohnDoe',
        email: 'john@example.com',
        password: await bcrypt.hash('hashedpassword123', 10),
        image: 'john.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'JaneDoe',
        email: 'jane@example.com',
        password: await bcrypt.hash('hashedpassword456', 10),
        image: 'jane.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'JimDoe',
        email: 'jimedoe@example.com',
        password: await bcrypt.hash('hashedpassword789', 10),
        image: 'jim.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'JackDoe',
        email: 'jackdoe@example.com',
        password: await bcrypt.hash('hashedpassword101112', 10),
        image: 'jack.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
