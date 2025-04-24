const db = require('../../database/models');

/**
 * Obtiene todos las subcategorias de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getAllSubcategories = async (req, res) => {
  try {
    const subCategories = await db.Subcategory.findAll({
      attributes: {
        exclude: []
      },
      include: [
        {
          association: 'category',
          attributes: ['id','name']
        },
      ]
    });
    return res.status(200).json({
      success: true,
      message: 'Subcategorías encontradas',
      data: subCategories
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener las subcategorias',
      data: null
    });
  }
};

/**
 * Obtiene una subcategoría por su ID de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      let error = new Error('No se ha enviado el id de la subcategoria');
      error.status = 400;
      throw error;
    };

    if (isNaN(id)) {
      let error = new Error('El id de la subcategoría debe ser un numero');
      error.status = 400;
      throw error;
    };

    const subCategory = await db.Subcategory.findByPk(req.params.id, {
      attributes: {
        exclude: []
      }, 
      include: [
        {
          association:'category',
          attributes: ['id','name']
        }, 
      ]
    });

    return res.status(200).json({
      success: true,
      message: 'Subcategoría encontrada',
      data: subCategory
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener la subcategoría',
      data: null
    });
  }
};

/**
 * Obtiene una subcategoría por su el ID de su categoría de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await db.Category.findByPk(req.params.id);

    if (!category) {
      let error = new Error('Categoría inexistente');
      error.status = 400;
      throw error;
    };

    if (!id) {
      let error = new Error('No se ha enviado el id de la categoria');
      error.status = 400;
      throw error;
    };

    if (isNaN(id)) {
      let error = new Error('El id de la categoría debe ser un numero');
      error.status = 400;
      throw error;
    };

    const subCategories = await db.Subcategory.findAll({
      where: {
        categoryId: id
      },
      attributes: {
        exclude: []
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Subcategorías de la categoría ' + category.name + ' encontradas',
      data: subCategories
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener la subcategoría',
      data: null
    });
  }
};

module.exports = {
  getAllSubcategories,
  getSubcategoryById,
  getSubcategoriesByCategory
}