const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");
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
    const categoria = await models.Categoria.findAll({
      where: {
        estado: 1,
      },
    });

    return categoria;
  }  

  async createCategoria(data) {
    const categoria = await models.Categoria.create(data);
    return categoria;
  }


  async FilterByCategoria(id_categoria) {
    const producto = await models.Producto.findAll({
      where: {
        id_categoria: id_categoria,
      },
    });

    return producto;
  }  

  async FilterByPrecio(precio) {
    const producto = await models.Producto.findAll({
      where: {
        precio: {
          [Op.gte]: precio
        }
      },
    });

    return producto;
  }  

  async FilterByNombre(nombre) {
    const producto = await models.Producto.findAll({
      where: {
        nombre: {
          [Op.startsWith]: nombre
        }
      },
    });

    return producto;
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
