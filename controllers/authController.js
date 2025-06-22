const User = require('../models/user');
const jwt = require('jsonwebtoken');

class AuthController {
  static async register(req, res) {
    try {
      const user = await User.create(req.body);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const isValid = await User.comparePassword(email, password);
    if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas' });
    
    const user = await User.findByEmail(email);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
}

module.exports = AuthController;