const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/documentController');
const multer = require('multer');
const upload = multer({ dest: process.env.UPLOAD_DIR });

router.post('/', upload.single('file'), DocumentController.upload);

module.exports = router;