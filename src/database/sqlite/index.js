const sqlite3 = require("sqlite3"); //drive
const sqlite = require("sqlite"); //responsável pela conexão
const path = require("path"); //lidando com a navegação entre diretórios

async function sqliteConnection() {
  const database = await sqlite.open({
    //passando objeto com as configurações da conexão

    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
