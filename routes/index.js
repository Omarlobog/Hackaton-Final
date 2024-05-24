const express = require('express');

const productoRouter = require('./producto.router');
const usuariosRouter = require('./usuario.router');
const comprasRouter = require('./compra.router');
const categoriaRouter = require('./categoria.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/productos', productoRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/compras', comprasRouter);
  router.use('/categorias', categoriaRouter);
}

module.exports = routerApi;
