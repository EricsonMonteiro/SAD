const express = require('express');

const adminController = require('../controllers/adminController');
//const verificarToken = require("../utils/verificarToken");

const router = express.Router();

router.post('/add-user', adminController.adduser);

module.exports = router;