const db = require('../../database/models');
const { baseURL } = require('../../utils');

/**
 * Obtiene todos las subcategorias de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
/**
 * Obtiene todos las categorias de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      attributes: {
        exclude: []
      },
      include: [
        {
          association: 'subcategories',
          attributes: ['id','name']
        },
      ]
    });
    return res.status(200).json({
      success: true,
      message: 'Categorías encontradas',
      data: categories
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener las categorias',
      data: null
    });
  }
};

/**
 * Obtiene una categoría por su ID de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getCategoryById = async (req, res) => {  
  try {
    const { id } = req.params;

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

    const category = await db.Category.findByPk(req.params.id);
    if (!category) {
      let error = new Error('No se ha encontrado la categoría con el id ' + id);
      error.status = 404;
      throw error;
    };

    return res.status(200).json({
      success: true,
      message: 'Categoría ' + category.name,
      data: {
        ...category.dataValues,
        link : `${baseURL(req)}/api/categories/${id}`,
        subcategories : `${baseURL(req)}/api/categories/${id}/subcategories`,
        products : `${baseURL(req)}/api/categories/${id}/products`
        }
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener la categoría',
      data: null
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
}