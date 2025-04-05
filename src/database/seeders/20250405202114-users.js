"use strict";
const bcrypt = require('bcrypt');
const password = process.env.INIT_PASSWORD || '123123'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: 'Admin',
          surname: 'MercadoLiebre',
          email: 'admin@gmail.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validate: true,
          lock: false,
          rolId: 1,
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: 'User',
          surname: 'MercadoLiebre',
          email: 'user@gmail.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validate: true,
          lock: false,
          rolId: 2,
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Users', null, {});

  },
};