const db = require('../../database/models');

/**
 * Obtiene todos las marcas de la base de datos
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
const getAllBrands = async (req, res) => {
  try {
    const brands = await db.Brand.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    return res.status(200).json({
      success: true,
      message: 'Marcas encontradas',
      data: brands
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener las marcas',
      data: null
    });
  }
};
module.exports = {
  getAllBrands
}