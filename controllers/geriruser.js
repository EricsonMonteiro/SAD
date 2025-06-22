const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilizador = 
require('../models/user');

const registarUser = async (req,res) => {
 try {
  const {nome, email, password, categoria} = req.body;

  //verificar se o email já está registado para outro
  const utilizadorExistente = await Utilizador.findOne(
    {
      where: {
        email: `${email}`
      }
    });

    if (utilizadorExistente) {
       return res.status(400).json({ mensagem: 'Email duplicado'}) 
    }

    const encPassword = await bcrypt.hash(password,10);

    const novoUser = await Utilizador.create({
      nome,
      email,
      password: encPassword,
      id_categoria: categoria
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
     const utilizadorExistente = await Utilizador.findOne(
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
module.exports = {
 registarUser,
 fazerLogin 
};