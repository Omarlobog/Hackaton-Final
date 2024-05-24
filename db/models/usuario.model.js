const { Model, DataTypes, Sequelize } = require('sequelize');

const TABLA_USUARIO = 'usuario';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombres: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  apellidos: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  clave: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  tipo: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  github: {
    type: DataTypes.STRING,
    defaultValue: null,
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

class Usuario extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLA_USUARIO,
      modelName: 'Usuario',
      timestamps: false,
    };
  }
}

module.exports = { TABLA_USUARIO, UsuarioSchema, Usuario };
