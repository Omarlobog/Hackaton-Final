const express = require('express');

const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');

const { fa } = require('faker/lib/locales');

const router = express.Router();
const service = new ProductoService();


router.get('/lista', async (req, res, next) => {
    try {
      const categorias = await service.Categories();
      res.json(categorias);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
