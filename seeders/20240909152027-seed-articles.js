'use strict';

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
    return queryInterface.bulkInsert('Articles', [
      {
        title: 'First Article',
        content: 'This is the content of the first article.',
        autherId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Second Article',
        content: 'This is the content of the second article.',
        autherId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Third Article',
        content: 'This is the content of the third article.',
        autherId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fourth Article',
        content: 'This is the content of the fourth article.',
        autherId: 4,
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
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
