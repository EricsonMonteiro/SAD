const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Signature = sequelize.define('Signature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  signature_data: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  signed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'signatures',
  timestamps: false
});

// Métodos personalizados (opcionais)
Signature.createSignature = async function({ document_id, user_id, signature_data, ip_address }) {
  return await this.create({
    document_id,
    user_id,
    signature_data,
    ip_address
  });
};

module.exports = Signature;