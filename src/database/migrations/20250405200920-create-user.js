'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      surname: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING(20),
      },
      validate: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      lock: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      rolId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName : 'Rols'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};