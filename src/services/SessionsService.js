const bcrypt = require('bcryptjs');
const knex = require('../database/knex');
const { sign } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

class SessionsService {
  async authenticateUser(email, password) {
    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new Error('E-mail e/ou senha incorretos');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('E-mail e/ou senha incorretos');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return {
      user,
      token
    };
  }
}

module.exports = SessionsService;
