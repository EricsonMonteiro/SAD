const {Sequelize}  = require('sequelize');
const conexaoDB = require('../utils/database');


const user = conexaoDB.define('user', {
    name: {
        type: String,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      nif: {
        type: Sequelize.STRING,
        required: true,
        unique: true
      },
      digitalCertificate: {
        type: Sequelize.STRING,
        required: false // Será preenchido após cadastro do certificado
      },
      certificateExpiration: {
        type: Date,
        required: false
      },
      role: {
        type: Sequelize.STRING,
        enum: ['user', 'admin'],
        default: 'user'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
    user.comparePassword = async function (email, password) {
      const user = await this.findOne({ where: { email } });
      if (!user) return false;
    
      const bcrypt = require('bcrypt');
      return bcrypt.compare(password, user.password);
    };  
    /// Adicionando um hook para hash da senha antes de salvar
  user.beforeCreate(async (userInstance) => {
    const bcrypt = require('bcrypt');
    userInstance.password = await bcrypt.hash(userInstance.password, 10);
},
  user.findByEmail = async function (email) {
  return this.findOne({ where: { email } });
});

module.exports = user;