const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const Utilizador = require('../models/user');
const User = require('../models/user');

const registarUser = async (req,res) => {
 try {
  const {nome, email, password, categoria} = req.body;

  //verificar se o email já está registado para outro
  const utilizadorExistente = await User.findOne(
    {
      where: {
        email: `${email}`
      }
    });

    if (utilizadorExistente) {
       return res.status(400).json({ mensagem: 'Email duplicado'}) 
    }

    const encPassword = await bcrypt.hash(password,10);

    const novoUser = await User.create({
      nome,
      email,
      password: encPassword,
      
    })
    res.status(201).json( {
      mensagem: "User criado",
      user: novoUser
    });

 } catch (error) {
    res.status(500).json({
      erro: error,
      mensagem: 'Erro ao criar user'
    })
 }
}

const fazerLogin = async(req,res) => {
  try {
     const {email, password} = req.body;
     const utilizadorExistente = await User.findOne(
      {
        where: {
          email: `${email}`
        }
      });
  
      if (!utilizadorExistente) {
         return res.status(400).json({ mensagem: 'Dados inválidos!'}) 
      }

      const passwordMatch = await bcrypt.compare(password,utilizadorExistente.password);
      if (!passwordMatch) {
        return res.status(401).json({ mensagem: 'Dados inválidos!'}) 
      }

      // GERAR UM TOKEN 
      const token = jwt.sign( {userId: utilizadorExistente.id},process.env.SECRET_KEY , 'BemLiBemnoBai', {expiresIn: '1h'}
       )
       res.status(200).json({mensagem: 'Login ok', token})

  } catch (erro) {
      res.status(500).json({erro: 'Erro do servidor'});
  }
}

const pesquisarUsuarios = async (req, res) => {
  try {
    const { nome, email } = req.query;
    const filtros = {};

    if (nome) filtros.nome = nome;
    if (email) filtros.email = email;

    const usuarios = await Utilizador.findAll({ where: filtros });
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
module.exports = {
 registarUser,
 fazerLogin,
 pesquisarUsuarios
};