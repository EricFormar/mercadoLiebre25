'use strict';
const productsJSON = require('../data/products.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all subcategories from the database to map their IDs
    const subcategories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Subcategories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const products = productsJSON.map(product => {
      const subcategory = subcategories.find(sub => sub.name === product.subcategory);
      
      return {
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        description: product.description,
        image: product.image,
        subcategoryId: subcategory ? subcategory.id : null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
