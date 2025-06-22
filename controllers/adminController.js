const User = require('../models/user');
const Document = require('../models/Document');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
exports.adduser = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    // Lógica para adicionar um usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
exports.getDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ erro: 'Documento não encontrado' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    user.role = role;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};