const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/documentController');
const UserController = require('../controllers/geriruser');
const multer = require('multer');
const upload = multer({ dest: process.env.UPLOAD_DIR });

router.post('/', upload.single('file'), DocumentController.upload);
router.get('/search', DocumentController.pesquisarDocumentos);
router.post('/register', UserController.registarUser);

module.exports = router;