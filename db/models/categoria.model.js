const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLA_CATEGORIA = 'categoria';

const CategoriaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Categoria extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLA_CATEGORIA,
      modelName: 'Categoria',
      timestamps: false,
    };
  }
}

module.exports = { TABLA_CATEGORIA, CategoriaSchema, Categoria };
