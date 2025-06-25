const Document = require('../models/Document');

class DocumentController {
  static async upload(req, res) {
    try {
      const { title, ownerId } = req.body;
      const fileHash = req.file ? req.file.hash : null; // Supondo que multer + crypto gerem o hash
      const document = await Document.create({ title, filePath: req.file.path, fileHash, ownerId });
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async pesquisarDocumentos(req, res) {
    try {
      const { title, author } = req.query;
      const filtros = {};

      if (title) filtros.title = title;
      if (author) filtros.author = author;

      const documentos = await Document.findAll({ where: filtros });
      res.status(200).json(documentos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = DocumentController;