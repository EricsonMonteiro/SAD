const express = require('express');
const router = express.Router();
const geriruser = require('../controllers/geriruser');
router.post('/registar',
    geriruser.registarUser);
router.post('/login',
    geriruser.fazerLogin);
 
 module.exports = router;