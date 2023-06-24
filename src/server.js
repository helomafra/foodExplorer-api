require('dotenv/config');
require('express-async-errors');

const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');

const cors = require('cors');

const express = require('express'); //importando o express
const routes = require('./routes');

const app = express(); //inicializando o express
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  //verificando se é erro do cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  //mostrando no console pra debugar
  console.error(error);

  //se for erro do servidor
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3333; //cte para definir qual o numero da porta a API deve observar
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
