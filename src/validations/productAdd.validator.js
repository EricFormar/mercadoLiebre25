const { check } = require('express-validator');

// Validaciones para el modelo Product
const productValidation = [
  // Validación del nombre
  check('name')
    .not().isEmpty().withMessage('El nombre del producto es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  // Validación del precio
  check('price')
    .not().isEmpty().withMessage('El precio es requerido')
    .isInt().withMessage('El precio debe ser un número entero')
    .isNumeric().withMessage('El precio debe ser un número válido')
    .isInt({ min: 0 }).withMessage('El precio no puede ser negativo'),

  // Validación del descuento
  check('discount')
    .isInt().withMessage('El descuento debe ser un número entero')
    .isNumeric().withMessage('El descuento debe ser un número válido')
    .isInt({ min: 0 }).withMessage('El descuento no puede ser negativo')
    .isInt({ max: 100 }).withMessage('El descuento no puede exceder el 100%'),

  // Validaciones de IDs de relaciones
  check('section')
    .not().isEmpty().withMessage('La sección es requerida')
    .isInt().withMessage('La sección debe ser un número válido'),
    
  check('category')
    .not().isEmpty().withMessage('La categoría es requerida')
    .isInt().withMessage('La categoría debe ser un número válido'),
    
  check('brand')
    .not().isEmpty().withMessage('La marca es requerida')
    .isInt().withMessage('La marca debe ser un número válido'),
    
  check('subcategory')
    .not().isEmpty().withMessage('La subcategoría es requerida')
    .isInt().withMessage('La subcategoría debe ser un número válido'),

  // Validación de la descripción
  check('description')
    .isLength({ min: 20, max: 500 }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
];

module.exports = productValidation;
