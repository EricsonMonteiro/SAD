const envs = require('./config')
const { Sequelize } = require('sequelize');

const conexaoDB= new Sequelize(
    envs.DBNAME,
    envs.DBUSER,
    envs.DBPASSWORD,{
        dialect:'postgres',
        host: envs.DBHOST,
    }
);

const inicializarDB = async () => {
    try {
      await conexaoDB.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      // Aqui você pode sincronizar os modelos
      await conexaoDB.sync({ alter: true });
      console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error;
    }
  };
module.exports = { conexaoDB, inicializarDB };