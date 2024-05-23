const express = require('express');

const productoRouter = require('./producto.router');
const usuariosRouter = require('./usuario.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/productos', productoRouter);
  router.use('/usuarios', usuariosRouter);
}



module.exports = routerApi;
