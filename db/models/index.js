const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Producto, ProductoSchema } = require('./producto.model');
const { Categoria, CategoriaSchema } = require('./categoria.model');
const { Compra, CompraSchema } = require('./compra.model');
const { DetalleCompra, DetalleCompraSchema } = require('./detallecompra.model');


function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Compra.init(CompraSchema, Compra.config(sequelize));
  DetalleCompra.init(DetalleCompraSchema, DetalleCompra.config(sequelize));


  Usuario.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Compra.associate(sequelize.models);
  DetalleCompra.associate(sequelize.models);
}

module.exports = setupModels;
