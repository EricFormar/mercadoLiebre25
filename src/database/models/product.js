'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Section, {
        foreignKey: 'sectionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "section",
      });

      Product.belongsTo(models.Category, {
        foreignKey:'categoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "category",
      });

      Product.belongsTo(models.Brand, {
        foreignKey:'brandId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "brand",
      });

      Product.belongsTo(models.Subcategory, {
        foreignKey:'subcategoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "subcategory",
      });

      Product.hasMany(models.Image, {
        foreignKey:'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "images",
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};