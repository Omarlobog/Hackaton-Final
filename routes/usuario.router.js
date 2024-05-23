const express = require('express');
const UsuarioService = require('./../services/usuario.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updateUsuarioSchema,
  createUsuarioSchema,
  getUsuarioSchema,
  getUsuarioLoginSchema
} = require('../schemas/usuario.schema');

const crypto = require('crypto-js');

const router = express.Router();
const service = new UsuarioService();


router.post(
  '/register',
  validatorHandler(createUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.create(body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  validatorHandler(updateUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.update(id, body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);



router.post(
  '/login',
  validatorHandler(getUsuarioLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const usuario = body.usuario;
      const clave = body.clave;

      const user = await service.findUserLogin(usuario);

      const claveBD = user?.clave ? user?.clave : '123';

      const key = '20232023';

      const decrypted = crypto.AES.decrypt(claveBD, key).toString(crypto.enc.Utf8);

      if (decrypted === clave) {
        res.status(201).json({ status: true, id: user.id , user: user});
      } else {
        res.status(201).json({ status: false, id: null });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findUser(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/actualizar',
  validatorHandler(updateUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.update(body.id, body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
