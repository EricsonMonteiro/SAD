const { User, Document, Signature, UserRole } = require('./index');

function setupRelationships() {
  // 1. Relacionamentos de Usuário e Função
  User.belongsTo(UserRole, { 
    foreignKey: 'role_id', 
    as: 'role' 
  });
  
  UserRole.hasMany(User, { 
    foreignKey: 'role_id', 
    as: 'users' 
  });

  // 2. Relacionamentos de Documentos
  User.hasMany(Document, { 
    foreignKey: 'owner_id', 
    as: 'documents' 
  });
  
  Document.belongsTo(User, { 
    foreignKey: 'owner_id', 
    as: 'owner' 
  });

  // 3. Relacionamentos de Assinaturas
  Document.hasMany(Signature, { 
    foreignKey: 'document_id', 
    as: 'signatures' 
  });
  
  Signature.belongsTo(Document, { 
    foreignKey: 'document_id', 
    as: 'document' 
  });
  
  User.hasMany(Signature, { 
    foreignKey: 'user_id', 
    as: 'signatures' 
  });
  
  Signature.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'signer' 
  });
}

module.exports = setupRelationships;