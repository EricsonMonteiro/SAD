const { Sequelize, DataTypes } = require('sequelize');
const conexaoDB = require('../utils/database').conexaoDB;
const crypto = require('crypto');

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
user.beforeCreate(async (userInstance) => {
  const bcrypt = require('bcrypt');
  console.log('Original password before hashing:', userInstance.password); // Log da senha original
  userInstance.password = await bcrypt.hash(userInstance.password, 10);
  console.log('Hashed password:', userInstance.password); // Log da senha criptografada
});

user.comparePassword = async function (email, password) {
  const userInstance = await this.findOne({ where: { email } });
  if (!userInstance) {
    console.log('User not found for email:', email); // Log caso o usuário não seja encontrado
    return false;
  }

  const bcrypt = require('bcrypt');
  console.log('Stored password:', userInstance.password); // Log da senha armazenada
  console.log('Input password:', password); // Log da senha fornecida
  const isMatch = await bcrypt.compare(password, userInstance.password);
  console.log('Password match result:', isMatch); // Log do resultado da comparação
  return isMatch;
};

user.findByEmail = async function (email) {
  return this.findOne({ where: { email } });
};

user.generateDigitalSignature = async function (data, privateKey) {
  try {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');
    console.log('Generated digital signature:', signature); // Log da assinatura gerada
    return signature;
  } catch (error) {
    console.error('Error generating digital signature:', error);
    throw error;
  }
};

// Método para verificar assinatura digital
user.verifyDigitalSignature = async function (data, signature, publicKey) {
  try {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    const isValid = verify.verify(publicKey, signature, 'hex');
    console.log('Digital signature valid:', isValid); // Log da validade da assinatura
    return isValid;
  } catch (error) {
    console.error('Error verifying digital signature:', error);
    throw error;
  }
};
module.exports = user;