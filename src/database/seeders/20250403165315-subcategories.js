'use strict';
const categoriesJSON = require('../../data/categoriesExtreme.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all categories from the database to map their IDs
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Create subcategories array
    const subcategories = [];
    
    categoriesJSON.forEach(category => {
      // Find the corresponding category ID
      const dbCategory = categories.find(c => c.name === category.name);
      
      if (dbCategory && category.sub) {
        category.sub.forEach(subcategory => {
          subcategories.push({
            name: subcategory,
            categoryId: dbCategory.id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    });

    await queryInterface.bulkInsert('Subcategories', subcategories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};
