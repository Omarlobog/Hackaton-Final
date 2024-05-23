const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(1).max(9999);
const estado = Joi.number().integer();

const createCategoriaSchema = Joi.object({
  nombre: nombre.optional().allow(null),
  estado: estado,
});

const updateCategoriaSchema = Joi.object({
  id: id,
  nombre: nombre.optional().allow(null),
  estado: estado,
});

const getCategoriaSchema = Joi.object({ id: id });

module.exports = {
  createCategoriaSchema,
  updateCategoriaSchema,
  getCategoriaSchema,
};
