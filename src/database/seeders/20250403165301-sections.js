'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sections = [
      {
        name: 'visited',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'in-sale',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Sections', sections, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sections', null, {});
  }
};
