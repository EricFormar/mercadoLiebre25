const db = require('../../database/models');

/**
 * Obtiene todos las secciones de la base de datos
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
const getAllSections = async (req, res) => {
  try {
    const sections = await db.Section.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    return res.status(200).json({
      success: true,
      message: 'Secciones encontradas',
      data: sections
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener las secciones',
      data: null
    });
  }
};
module.exports = {
  getAllSections
}