const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
class CompraService {
  constructor() {}

  async createCompra(data) {
    const compra = await models.Compra.create(data);
    return compra;
  }

  async findAll(id) {
    const compra = await models.Compra.findAll({
      where: {
        id_usuario: id,
      },
    });

    return compra;
  }

  async createDetalle(data) {
    const detalleCompra = await models.DetalleCompra.create(data);
    return detalleCompra;
  }
  async detalleCompra(id) {
    const compra = await models.Compra.sequelize.query(
      'select com.id, usu.nombres, usu.apellidos, com.total, com.estado from compra com inner join usuario usu on com.id_usuario = usu.id where com.id = ' +
        id,
      {
        type: models.Compra.sequelize.QueryTypes.SELECT,
      }
    );

    if (compra[0]?.id) {
      const detalle = await models.DetalleCompra.sequelize.query(
        'select pro.nombre, det.cantidad,det.precio from detallecompra det inner join producto pro on det.id_producto = pro.id where det.id_compra = ' +
          compra[0]?.id,
        {
          type: models.DetalleCompra.sequelize.QueryTypes.SELECT,
        }
      );
      return { compra: compra[0], detalle };
    }
    return [];
  }

  async findUserLogin(id) {
    const usuario = await models.Usuario.findOne({
      where: {
        id: id,
      },
    });
    if (!usuario) {
      return;
    }
    return usuario;
  }
}

module.exports = CompraService;
