const { Sequelize, DataTypes } = require('sequelize');
const conexaoDB = require('../utils/database').conexaoDB;

// Definição do modelo 'user'
const user = conexaoDB.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Gera automaticamente o valor do ID
    primaryKey: true, // Define como chave primária
  },
  name: {
    type: DataTypes.STRING, // Corrigido para usar DataTypes.STRING
    allowNull: false, // Substitui 'required' por 'allowNull'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  digitalCertificate: {
    type: DataTypes.STRING,
    allowNull: true, // Substitui 'required: false' por 'allowNull: true'
  },
  certificateExpiration: {
    type: DataTypes.DATE, // Corrigido para usar DataTypes.DATE
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'), // Corrigido para usar DataTypes.ENUM
    defaultValue: 'user',
  },
  createdAt: {
    type: DataTypes.DATE, // Corrigido para usar DataTypes.DATE
    defaultValue: Sequelize.NOW, // Corrigido para usar Sequelize.NOW
  },
});

// Adicionando métodos estáticos e hooks
user.comparePassword = async function (email, password) {
  const userInstance = await this.findOne({ where: { email } });
  if (!userInstance) return false;

  const bcrypt = require('bcrypt');
  return bcrypt.compare(password, userInstance.password);
};

user.beforeCreate(async (userInstance) => {
  const bcrypt = require('bcrypt');
  userInstance.password = await bcrypt.hash(userInstance.password, 10);
});

user.findByEmail = async function (email) {
  return this.findOne({ where: { email } });
};

module.exports = user;