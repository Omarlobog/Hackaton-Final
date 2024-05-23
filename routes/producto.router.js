const express = require('express');

const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getDescripcionProductoSchema
} = require('../schemas/producto.schema');


const router = express.Router();
const service = new ProductoService();

router.post(
  '/',
  validatorHandler(getProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.findAllProducts();

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/categorias',
  validatorHandler(getProductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const products = await service.Categories();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getProductoSchema, 'params'),
  async (req, res, next) => {
    try {

      const { id } = req.params;
      const product = await service.detailById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/crear',
  validatorHandler(createProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const product = await service.createProduct(body);
      res.status(201).json(product?.id);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/eliminar/:id',
  validatorHandler(getDescripcionProductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.deleteProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  '/editar/:id',
  validatorHandler(updateProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.updateProducto(id, body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
