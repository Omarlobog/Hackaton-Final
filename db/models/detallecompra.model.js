const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLA_DETALLE_COMPRA = 'detallecompra';

const DetalleCompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_compra: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  id_producto: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  cantidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  precio: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class DetalleCompra extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLA_DETALLE_COMPRA,
      modelName: 'DetalleCompra',
      timestamps: false,
    };
  }
}

module.exports = { TABLA_DETALLE_COMPRA, DetalleCompraSchema, DetalleCompra };
