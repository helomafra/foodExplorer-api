const { Router } = require('express');

const routes = Router();

const usersRouter = require('./users.routes');
const platesRouter = require('./plates.routes');
const sessionsRouter = require('./sessions.routes');

routes.use('/users', usersRouter);
routes.use('/plates', platesRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes;
