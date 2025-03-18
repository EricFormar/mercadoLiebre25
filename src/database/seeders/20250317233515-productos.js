'use strict';
const {numberRandom} = require('../../utils')
const productsJson = require('../../data/productsDataBase.json');
const products = productsJson.map(({name, description, price, discount}) => {
  return {
    name,
    description,
    price,
    discount,
    categoryId: numberRandom(12),
    sectionId : numberRandom(2),
    createdAt : new Date,
    updatedAt : new Date
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products", products,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
