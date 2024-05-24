const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLA_COMPRA = 'compra';

const CompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_usuario: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  total: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Compra extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLA_COMPRA,
      modelName: 'Compra',
      timestamps: false,
    };
  }
}

module.exports = { TABLA_COMPRA, CompraSchema, Compra };
