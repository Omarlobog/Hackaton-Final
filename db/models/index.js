const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Producto, ProductoSchema } = require('./producto.model');
const { Categoria, CategoriaSchema } = require('./categoria.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));

  Usuario.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Categoria.associate(sequelize.models);
}

module.exports = setupModels;
