const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Importações de rotas
const rotasAuth = require('./routes/auth');
const rotasDocuments = require('./routes/documents');
const rotasAdmin = require('./routes/admin');
const rotasUser = require('./routes/users'); 

// Importação da inicialização do DB (PostgreSQL)
const { inicializarDB } = require('./utils/database'); // Alterado para o novo arquivo db.js

const servidor = express();

// Middlewares
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve arquivos estáticos

// Rotas
servidor.use('/auth', rotasAuth);
servidor.use('/documents', rotasDocuments);
servidor.use('/admin', rotasAdmin);
servidor.use('/users', rotasUser); // Rota para usuários

// Rota básica de saúde
servidor.get('/', (req, res) => {
  res.json({ status: 'Servidor de Assinatura Digital Online' });
});

// Inicialização do servidor
const port = process.env.PORT || 3000;

inicializarDB()
.then( () => {
  console.log('BD ok');
}   ).catch (erro => {
console.error('Falha ao inicializar BD: ', erro)
process.exit(1);
})

servidor.listen(port, () => {
console.log("Servidor rodando");
});