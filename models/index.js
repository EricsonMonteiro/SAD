const { Sequelize } = require('sequelize');
const config = require('../utils/config');

// 1. Configuração da conexão
const conexaoDB = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: config.DB_PORT
  }
);

// 2. Carregar modelos
const User = require('./user');
const Document = require('./Document');
const Signature = require('./Signature');
//const UserRole = require('./UserRole')(conexaoDB, Sequelize);

// 3. Inicialização do Banco
const inicializarDB = async () => {
  try {
    await conexaoDB.authenticate();
    
    // Carrega relacionamentos
    require('./relacionamentos')();
    
    await conexaoDB.sync({ alter: true });
    console.log('✅ Banco de dados conectado e sincronizado');
  } catch (erro) {
    console.error('❌ Erro ao conectar/sincronizar BD:', erro);
    process.exit(1);
  }
};

module.exports = {
  inicializarDB,
  conexaoDB,
  User,
  Document,
  Signature,
  //UserRole
};