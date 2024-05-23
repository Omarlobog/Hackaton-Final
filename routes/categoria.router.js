const express = require('express');

const CategoriaService = require('../services/categoria.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategoriaSchema,
  updateCategoriaSchema,
  getCategoriaSchema
} = require('../schemas/categoria.schema');
const { fa } = require('faker/lib/locales');

const router = express.Router();
const service = new CategoriaService();



module.exports = router;
