const express = require('express');
const router = express.Router();
const geriruser = require('../controllers/geriruser');

router.post('/register', geriruser.registarUser);
router.post('/login', geriruser.fazerLogin);
router.get('/search', geriruser.pesquisarUsuarios);

router.post('/generate-signature', geriruser.generateSignature);
router.post('/verify-signature', geriruser.verifySignature);

module.exports = router;