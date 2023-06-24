const { hash, compare } = require('bcryptjs');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Nome, email e senha são obrigatórios!');
    }

    const checkUserExists = await knex('users').where({ email: email }).first();

    if (checkUserExists) {
      throw new AppError('Este email já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({ name, email, password: hashedPassword });

    return response.json();
  }
}

module.exports = UsersController;
