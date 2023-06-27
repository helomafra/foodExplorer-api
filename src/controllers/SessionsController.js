const SessionsService = require('../services/SessionsService');
const AppError = require('../utils/AppError');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsService = new SessionsService();

    try {
      const { user, token } = await sessionsService.authenticateUser(
        email,
        password
      );

      return response.json({ user, token });
    } catch (error) {
      throw new AppError('E-mail e/ou senha incorretos.', 401);
    }
  }
}

module.exports = SessionsController;
