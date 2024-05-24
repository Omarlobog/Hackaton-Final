const express = require('express');
const UsuarioService = require('./../services/usuario.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updateUsuarioSchema,
  createUsuarioSchema,
  getUsuarioSchema,
  getUsuarioLoginSchema,
} = require('../schemas/usuario.schema');

const jwt = require('jsonwebtoken');
const { validateJwt } = require('../middlewares/validate-jwt');
const crypto = require('crypto-js');

const router = express.Router();
const service = new UsuarioService();

router.post(
  '/register',
  [validatorHandler(createUsuarioSchema, 'body'), validateJwt],
  async (req, res, next) => {
    try {
      let body = req.body;
      const key = '20232023';

      body.clave = crypto.AES.encrypt(body.clave, key).toString();

      const user = await service.create(body);

      res.status(201).json({ user });
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
      const usuario = body.email;
      const clave = body.clave;

      const user = await service.findUserLogin(usuario);

      const claveBD = user?.clave ? user?.clave : '123';

      const key = '20232023';

      const decrypted = crypto.AES.decrypt(claveBD, key).toString(
        crypto.enc.Utf8
      );

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '1h' }
      );

      if (decrypted === clave) {
        res.status(201).json({
          status: true,
          id: user.id,
          user: user,
          tokens: {
            accessToken: token,
          },
        });
      } else {
        res.status(201).json([]);
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
