const express = require('express');

const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getProductoName,
  getProductoPrice,
  createCategoriaSchema
} = require('../schemas/producto.schema');


const router = express.Router();
const service = new ProductoService();

router.get(
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
  '/categoria/:id',
  validatorHandler(getProductoSchema, 'params'),
  async (req, res, next) => {
    try {

      const { id } = req.params;
      const product = await service.FilterByCategoria(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:nombre',
  validatorHandler(getProductoName, 'params'),
  async (req, res, next) => {
    try {

      const { nombre } = req.params;
      const product = await service.FilterByNombre(nombre);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/precio/:precio',
  validatorHandler(getProductoPrice, 'params'),
  async (req, res, next) => {
    try {

      const { precio } = req.params;
      const product = await service.FilterByPrecio(precio);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);




router.get(
  '/detail/:id',
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
  '/categoria/nuevo',
  validatorHandler(createCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const categoria = await service.createCategoria(body);
      res.status(201).json(categoria);
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
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/eliminar/:id',
  validatorHandler(getProductoSchema, 'params'),
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
