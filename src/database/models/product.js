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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del producto es requerido'
        },
        len: {
          args: [2, 100],
          msg: 'El nombre debe tener entre 2 y 100 caracteres'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'El precio debe ser un número entero'
        },
        min: {
          args: [0],
          msg: 'El precio no puede ser negativo'
        }
      }
    },
    discount: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'El descuento debe ser un número entero'
        },
        min: {
          args: [0],
          msg: 'El descuento no puede ser negativo'
        },
        max: {
          args: [100],
          msg: 'El descuento no puede exceder el 100%'
        }
      }
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Section',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La sección debe ser un número válido'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La categoría debe ser un número válido'
        }
      }
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brand',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La marca debe ser un número válido'
        }
      }
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subcategory',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'La subcategoría debe ser un número válido'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 500],
          msg: 'La descripción no puede exceder los 500 caracteres'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};