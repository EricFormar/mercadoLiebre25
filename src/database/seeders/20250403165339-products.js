'use strict';
const productsJSON = require('../../data/productsDataBase.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all categories, subcategories and brands from the database

    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const subcategories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Subcategories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM Brands',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const products = productsJSON.map(product => {
      const category = categories.find(cat => cat.name === product.category);
      const subcategory = subcategories.find(sub => sub.name === product.subcategory);
      const brand = brands.find(b => product.name.includes(b.name));
      
      return {
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        description: product.description,
        sectionId: product.section == "visited" ? 1 : 2,
        categoryId: category? category.id : null,
        subcategoryId: subcategory ? subcategory.id : null,
        brandId: brand ? brand.id : null,
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
