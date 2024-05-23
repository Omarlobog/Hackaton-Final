const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductoService {
  constructor() { }
  
  async findAllProducts() {
    const producto = await models.Producto.findAll({
      where: {
        estado: 1,
      },
    });

    return producto;
  }  

  async Categories() {
    const subCategorias = await models.Categoria.findAll({
      where: {
        estado: 1,
      },
    });

    return subCategorias;
  }  

  async detailById(id) {
    const producto = await models.Producto.findByPk(id);

    return producto;
  }
  
  async createProduct(data) {
    const producto = await models.Producto.create(data);
    return producto;
  }

  async create(data) {
    const producto = await models.Producto.create(data);
    return producto;
  }

  async deleteProduct(id) {
    const producto = await models.Producto.destroy({
      where: {
        id: id
      },
    });

    return producto;
  }

  async updateProducto(id, changes) {
    const producto = await this.detailById(id);
    const productoUpdate = await producto.update(changes);
    return productoUpdate;
  }
}

module.exports = ProductoService;
