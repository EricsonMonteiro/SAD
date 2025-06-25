const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

module.exports = {
  DBNAME: process.env.DBNAME,
  DBUSER: process.env.DBUSER,
  DBPASSWORD: process.env.DBPASSWORD,
  DBHOST: process.env.DBHOST,
};