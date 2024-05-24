const express = require('express');

const CompraService = require('../services/compra.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCompraSchema,
  updateCompraSchema,
  getCompraSchema,
} = require('../schemas/compra.schema');

const Culqi = require('culqi-node');

const router = express.Router();
const service = new CompraService();

router.post(
  '/',
  validatorHandler(createCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const detalle = body.detallecompra;
      compra = await service.createCompra(body);
      user = await service.findUserLogin(compra.id_usuario);

      if (detalle?.length) {
        detalle.map(async (emp) => {
          emp.id_compra = compra.id;
          await service.createDetalle(emp);
        });
      }

      const culqi = new Culqi({
        privateKey: process.env.CULQI_TOKEN,
        pciCompliant: true,
        publicKey: process.env.CULQI_TOKEN_PK,
      });

      
      const token = await culqi.tokens.createToken({
        card_number: '4111111111111111',
        cvv: '123',
        expiration_month: '09',
        expiration_year: '2025',
        email: user.email,
      });
      console.log(token.id);

      const result = await culqi.charges.createCharge({
        amount: compra.total*100,
        currency_code: 'PEN',
        email: user.email,
        source_id: token.id,
        antifraud_details: {
          first_name: user.apellidos,
          last_name: user.nombres,
        },
        capture: false,
      });

      return res.status(201).json(result.outcome);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      compra = await service.detalleCompra(id);

      return res.status(201).json(compra);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user/:id',
  validatorHandler(getCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      compra = await service.findAll(id);

      return res.status(201).json(compra);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
