const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(1).max(9999);
const descripcion = Joi.string().min(1).max(9999);
const id_categoria = Joi.number().integer();
const estado = Joi.number().integer();
const precio = Joi.number().integer();

const createProductoSchema = Joi.object({
  nombre: nombre.optional().allow(null),
  descripcion: descripcion.optional().allow(null).allow(''),
  id_categoria: id_categoria.optional().allow(null).allow(''),
  precio: precio,
  estado: estado,
});

const updateProductoSchema = Joi.object({
  id: id,
  nombre: nombre.optional().allow(null),
  descripcion: descripcion.optional().allow(null).allow(''),
  id_categoria: id_categoria.optional().allow(null),
  precio: precio,
  estado: estado,
});

const createCategoriaSchema = Joi.object({
  nombre: nombre.optional().allow(null),
  estado: estado,
});

const getProductoSchema = Joi.object({ id: id });
const getProductoName = Joi.object({ nombre });
const getProductoPrice = Joi.object({ precio });


module.exports = {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getProductoName,
  getProductoPrice,
  createCategoriaSchema
};
