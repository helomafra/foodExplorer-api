const UsersService = require('../services/UsersService');
const AppError = require('../utils/AppError');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Nome, email e senha são obrigatórios!');
    }

    const usersService = new UsersService();

    const user = await usersService.createUser(name, email, password);

    return response.status(201).json(user);
  }
}

module.exports = UsersController;
