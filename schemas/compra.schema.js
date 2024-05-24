const Joi = require('joi');

const id = Joi.number().integer();
const id_usuario = Joi.number().integer();
const total = Joi.number().integer();
const estado = Joi.number().integer();

const id_compra = Joi.number().integer();
const id_producto = Joi.number().integer();
const cantidad = Joi.number().integer();
const precio = Joi.number().integer();


const createCompraSchema = Joi.object({
  id_usuario: id_usuario,
  total: total,
  estado: estado,
  detallecompra: Joi.array().items(
    Joi.object({
      id_producto: id_producto,
      cantidad: cantidad,
      precio: precio
    })
  )
});

const updateCompraSchema = Joi.object({
  id: id,
  total: total,
  estado: estado,
  detallecompra: Joi.array().items(
    Joi.object({
      id: id,
      id_producto: id_producto,
      cantidad: cantidad,
      precio: precio
    })
  )
});

const getCompraSchema = Joi.object({ id: id });


module.exports = {
  createCompraSchema,
  updateCompraSchema,
  getCompraSchema
};
