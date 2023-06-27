const { hash } = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const AppError = require('../utils/AppError');

class UsersService {
  async createUser(name, email, password) {
    const userRepository = new UserRepository();

    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Este email já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    await userRepository.create({ name, email, password: hashedPassword });
  }
}

module.exports = UsersService;
