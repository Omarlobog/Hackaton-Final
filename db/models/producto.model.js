const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLA_PRODUCTO = 'producto';

const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_categoria: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'id_categoria',
  },
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  precio: {
    allowNull: true,
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Producto extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLA_PRODUCTO,
      modelName: 'Producto',
      timestamps: false,
    };
  }
}

module.exports = { TABLA_PRODUCTO, ProductoSchema, Producto };
