const db = require('../../database/models');
const { baseURL } = require('../../utils');

const includeAssociations = {
  include: [
    {
      association: 'section',
      attributes: ['id', 'name']
    },
    {
      association: 'category',
      attributes: ['id', 'name']
    },
    {
      association: 'brand',
      attributes: ['id', 'name']
    },
    {
      association: 'subcategory',
      attributes: ['id', 'name']
    },
    {
      association: 'images',
      attributes: ['file']
    }
  ]
}

/**
 * Obtiene todos los productos de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const {count, rows} = await db.Product.findAndCountAll({
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId', 'subcategoryId']
      },
      offset: (page - 1) * limit,
      limit: limit,
      distinct: true,
      ...includeAssociations
    });
    
    const totalPages = Math.ceil(count / limit);
    const currentPage = parseInt(page);

    return res.status(200).json({
      success: true,
      message: 'Productos encontrados',
      data: {
        products: rows.map(product => {
          return {
            ...product.dataValues,
            images: product.images.map(image => {
              return `${baseURL(req)}/images/products/${image.file}`
            })
          }
        }),
        pagination: {
          totalItems: count,
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
          nextPage: currentPage + 1,
          previousPage: currentPage - 1
        },
      }
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener los productos',
      data: null
    });
  }
};

/**
 * Obtiene un producto por su ID de la base de datos
 * @async
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Promise<void>} Promesa que resuelve con una respuesta JSON
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      let error = new Error('No se ha enviado el id del producto');
      error.status = 400;
      throw error;
    };

    if (isNaN(id)) {
      let error = new Error('El id del producto debe ser un numero');
      error.status = 400;
      throw error;
    };

    const product = await db.Product.findByPk(req.params.id, {
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId', 'subcategoryId']
      },
      ...includeAssociations
    });

    if (!product) {
      let error = new Error('No se encontro el producto');
      error.status = 404;
      throw error;
    };

    return res.status(200).json({
      success: true,
      message: 'Producto encontrado',
      data: {
        ...product.dataValues,
        images: product.images.map(image => {
          return `${baseURL(req)}/images/products/${image.file}`
        })
      }
    });

  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener el producto',
      data: null
    });
  }
};

/**
 * Obtiene todos los productos de una categoría específica de la base de datos
 * @async
 * @param {number} categoryId - ID de la categoría
 * @returns {Promise<Array>} Promesa que resuelve con un arreglo de productos
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
async function getProductsByCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      let error = new Error('No se ha enviado el id de la categoria');
      error.status = 400;
      throw error;
    };

    if (isNaN(id)) {
      let error = new Error('El id de la categoria debe ser un numero');
      error.status = 400;
      throw error;
    };

    const category = await db.Category.findByPk(id);

    if (!category) {
      let error = new Error('No se encontro la categoria');
      error.status = 404;
      throw error;
    };

    const products = await db.Product.findAll({
      where: {
        categoryId: id
      },
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId', 'subcategoryId']
      },
      ...includeAssociations
    });

    return res.status(200).json({
      success: true,
      message: products.length ? 'Productos encontrados para la categoría ' + category.name : 'No hay productos para esta categoria',
      data: products.map(product => {
        return {
          ...product.dataValues,
          images: product.images.map(image => {
            return `${baseURL(req)}/images/products/${image.file}`
          }),
          link: `${baseURL(req)}/api/products/${product.id}`
        }
      })
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener el producto',
      data: null
    });
  }

};

/**
 * Obtiene todos los productos de una subcategoría específica de la base de datos
 * @async
 * @param {number} categoryId - ID de la categoría
 * @returns {Promise<Array>} Promesa que resuelve con un arreglo de productos
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos
 */
async function getProductsBySubcategory(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      let error = new Error('No se ha enviado el id de la subcategoria');
      error.status = 400;
      throw error;
    };

    if (isNaN(id)) {
      let error = new Error('El id de la subcategoria debe ser un numero');
      error.status = 400;
      throw error;
    };

    const products = await db.Product.findAll({
      where: {
        subcategoryId: id
      },
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId', 'subcategoryId']
      },
      ...includeAssociations
    });

    return res.status(200).json({
      success: true,
      message: products.length ? 'Productos encontrados' : 'No hay productos para esta subcategoria',
      data: products
    })
  } catch (error) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener el producto',
      data: null
    });
  }
}

async function getProductsByBrand(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      let error = new Error('No se ha enviado el id de la marca');
      error.status = 400;
      throw error;
    };
    if (isNaN(id)) {
      let error = new Error('El id de la marca debe ser un numero');
      error.status = 400;
      throw error; 
    }
    const products = await db.Product.findAll({
      where: {
        brandId: id
      },
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId','subcategoryId']
      },
     ...includeAssociations
    })
    return res.status(200).json({
      success: true,
      message: products.length? 'Productos encontrados' : 'No hay productos para esta marca',
      data: products
    })
  } catch (error) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener los productos',
      data: null
    })
  }
}

async function getProductsBySection(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      let error = new Error('No se ha enviado el id de la seccion');
      error.status = 400;
      throw error;
    };
    if (isNaN(id)) {
      let error = new Error('El id de la seccion debe ser un numero');
      error.status = 400;
      throw error;
    }
    const products = await db.Product.findAll({
      where: {
        sectionId: id
      },
      attributes: {
        exclude: ['sectionId', 'categoryId', 'brandId','subcategoryId']
      },
    ...includeAssociations
    })
    return res.status(200).json({
      success: true,
      message: products.length? 'Productos encontrados' : 'No hay productos para esta seccion',
      data: products
    })
  }
  catch (error) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Error al obtener los productos',
      data: null
    })
  }
}

async function createNewProduct(req, res) {
  try {
    const { name, description, price, discount, categoryId, subcategoryId, brandId, sectionId } = req.body;
    if (!name || !description || !price || !categoryId || !subcategoryId || !brandId || !sectionId) {
      let error = new Error('Faltan datos');
      error.status = 400;
      throw error;
    }
    if (isNaN(price) || isNaN(categoryId) || isNaN(subcategoryId) || isNaN(brandId) || isNaN(sectionId)) {
      let error = new Error('Los datos deben ser numeros');
      error.status = 400;
      throw error;
    }
    
    // Crear el producto primero
    const product = await db.Product.create({
      name,
      description,
      price,
      discount,
      categoryId,
      subcategoryId,
      brandId,
      sectionId
    });

    // Si hay imagen, guardarla usando el modelo Image
    if (req.file) {
      await db.Image.create({
        file: req.file.filename,
        productId: product.id
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Producto creado',
      data: product
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Error al crear el producto',
      data: null
    });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductsByBrand,
  getProductsBySection,
  createNewProduct
}