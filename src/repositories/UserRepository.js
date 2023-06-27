const knex = require('../database/knex');

class UserRepository {
  async findByEmail(email) {
    return knex('users').where({ email }).first();
  }

  async create(userData) {
    return knex('users').insert(userData);
  }
}

module.exports = UserRepository;
