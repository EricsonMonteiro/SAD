const crypto = require('crypto');
const fs = require('fs');

module.exports = {
  // Gera hash SHA-256 de arquivos
  generateFileHash: (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  },

  // Valida assinatura digital (exemplo simplificado)
  validateSignature: (data, signature, certificate) => {
    // Implementação real exigiria bibliotecas como 'node-forge'
    return true; // Placeholder
  }
};