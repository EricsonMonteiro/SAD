const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const registarUser = async (req, res) => {
  try {
    const { name, email, password, nif, role } = req.body;

    // Verificar se o email já está registrado
    const utilizadorExistente = await User.findOne({
      where: { email }
    });

    if (utilizadorExistente) {
      return res.status(400).json({ mensagem: 'Email duplicado' });
    }

    // Criptografar a senha
    const encPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const novoUser = await User.create({
      name,
      email,
      password: encPassword,
      nif,
      role: role || 'user' // Define o papel como 'user' por padrão
    });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      user: novoUser
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      erro: error.message,
      mensagem: 'Erro ao criar usuário'
    });
  }
};

const fazerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email existe
    const utilizadorExistente = await User.findOne({
      where: { email }
    });

    if (!utilizadorExistente) {
      return res.status(400).json({ mensagem: 'Email não encontrado!' });
    }

    // Comparar a senha
    const passwordMatch = await User.comparePassword(email, password);
    console.log('Password match:', passwordMatch); // Log para verificar o resultado
    if (!passwordMatch) {
      return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    // Gerar um token
    const token = jwt.sign(
      { userId: utilizadorExistente.id },
      process.env.JWT_SECRET, // Certifique-se de que a variável JWT_SECRET está configurada no .env
      { expiresIn: '1h' }
    );

    res.status(200).json({ mensagem: 'Login realizado com sucesso!', token });
  } catch (erro) {
    console.error('Erro ao fazer login:', erro);
    res.status(500).json({ erro: 'Erro do servidor' });
  }
};

const pesquisarUsuarios = async (req, res) => {
  try {
    const { nome, email } = req.query;
    const filtros = {};

    if (nome) filtros.nome = nome;
    if (email) filtros.email = email;

    const usuarios = await User.findAll({ where: filtros });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.registarUser = async (req, res) => {
  const { name, email, password, nif, role } = req.body;

  if (!name || !email || !password || !nif) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const novoUsuario = await User.create({
      name,
      email,
      password,
      nif,
      role: role || 'user', // Define o papel como 'user' por padrão
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: error.message, message: 'Erro ao criar usuário.' });
  }
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

// Gerar assinatura digital
const generateSignature = async (req, res) => {
  try {
    const { data, privateKey } = req.body;

    if (!data || !privateKey) {
      return res.status(400).json({ mensagem: 'Dados e chave privada são obrigatórios!' });
    }

    const signature = await User.generateDigitalSignature(data, privateKey);
    res.status(200).json({ mensagem: 'Assinatura digital gerada com sucesso!', signature });
  } catch (error) {
    console.error('Erro ao gerar assinatura digital:', error);
    res.status(500).json({ erro: 'Erro ao gerar assinatura digital' });
  }
};

// Verificar assinatura digital
const verifySignature = async (req, res) => {
  try {
    const { data, signature, publicKey } = req.body;

    if (!data || !signature || !publicKey) {
      return res.status(400).json({ mensagem: 'Dados, assinatura e chave pública são obrigatórios!' });
    }

    const isValid = await User.verifyDigitalSignature(data, signature, publicKey);
    res.status(200).json({ mensagem: 'Validação concluída!', isValid });
  } catch (error) {
    console.error('Erro ao verificar assinatura digital:', error);
    res.status(500).json({ erro: 'Erro ao verificar assinatura digital' });
  }
};


module.exports = {
  registarUser,
  fazerLogin,
  pesquisarUsuarios,
  generateSignature,
  verifySignature
};