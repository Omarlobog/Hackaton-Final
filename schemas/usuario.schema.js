const Joi = require('joi');

const id = Joi.number().integer();
const nombres = Joi.string().min(1).max(9999);
const apellidos = Joi.string().min(1).max(9999);
const email = Joi.string().email();
const clave = Joi.string().min(1).max(9999);
const tipo = Joi.number().integer();
const estado = Joi.number().integer();

const createUsuarioSchema = Joi.object({
  nombres: nombres,
  apellidos: apellidos,
  email: email,
  clave: clave,
  tipo: tipo,
  estado: estado,
});

const updateUsuarioSchema = Joi.object({
  id: id,
  nombres: nombres,
  apellidos: apellidos,
  email: email,
  clave: clave,
  tipo: tipo,
  estado: estado,
});

const getUsuarioSchema = Joi.object({ id: id.required() });

const getUsuarioLoginSchema = Joi.object({
  email: email.required(),
  clave: clave.required(),
});

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  getUsuarioSchema,
  getUsuarioLoginSchema,
};
