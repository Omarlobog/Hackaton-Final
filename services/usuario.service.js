const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UsuarioService {
  constructor() {}

  async create(data) {
    const usuario = await models.Usuario.create(data);
    return usuario;
  }

  async findUser(id) {
    const usuario = await models.Usuario.findByPk(id);

    if (!usuario) {
      throw boom.notFound('Usuario no encontrado');
    }
    return usuario;
  }

  async findOne(id) {
    const usuario = await models.Usuario.findByPk(id);
    if (!usuario) {
      throw boom.notFound('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  async disable(id) {
    const user = await this.findOne(id);
    const response = user._previousDataValues;
    response.estado = 0;

    const rta = await user.update(response);
    return rta;
  }

  async login(data) {
    const user = await models.Usuario.findAll({
      where: {
        tipo: 2,
        estado: 1,
      },
      attributes: { exclude: ['foto'] },
    });
    return { user: user };
  }

  async findUserLogin(email) {
    const usuario = await models.Usuario.findOne({
      where: {
        email: email,
      },
    });
    if (!usuario) {
      return;
    }
    return usuario;
  }
}

module.exports = UsuarioService;
