'use strict';

const categoriesJson = require('../../data/categoriesExtreme.json');
const categories = categoriesJson.map(category => {
  return {
    name : category.name,
    createdAt : new Date,
    updatedAt : new Date
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories", categories,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
