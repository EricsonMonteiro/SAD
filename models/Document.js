const { DataTypes } = require('sequelize');
const  conexaoDB = require('../utils/database');
const User = require('./user');
//const Sequelize = require('sequelize');
const Document = conexaoDB.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  file_path: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_hash: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      is: /^[a-f0-9]{64}$/i // Valida SHA-256
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'signed', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'documents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Métodos personalizados
Document.prototype.addSignature = async function(userId, signatureData, ipAddress) {
  return await this.createSignature({
    user_id: userId,
    signature_data: signatureData,
    ip_address: ipAddress
  });
};

Document.getUserDocuments = async function(userId) {
  return await this.findAll({
    where: { owner_id: userId },
    order: [['created_at', 'DESC']]
  });
};

module.exports = Document;