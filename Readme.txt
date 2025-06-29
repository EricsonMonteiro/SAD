# Software de Assinatura Digital

## Descrição
Este projeto é um sistema de assinatura digital desenvolvido em Node.js. Ele permite que os usuários registrem contas, façam login, gerem assinaturas digitais e verifiquem a validade dessas assinaturas. O sistema utiliza PostgreSQL como banco de dados e implementa funcionalidades de segurança como autenticação JWT.

## Estrutura do Projeto

- **main.js**: Arquivo principal que inicializa o servidor e configura as rotas.
- **package.json**: Contém as dependências do projeto.
- **controllers/**: Contém os controladores responsáveis pela lógica de negócios.
  - `adminController.js`: Gerencia funcionalidades administrativas.
  - `authController.js`: Gerencia autenticação e registro de usuários.
  - `documentController.js`: Gerencia upload e pesquisa de documentos.
  - `geriruser.js`: Gerencia usuários e suas assinaturas digitais.
- **models/**: Contém os modelos do banco de dados.
  - `user.js`: Modelo de usuário.
  - `Document.js`: Modelo de documento.
  - `Signature.js`: Modelo de assinatura.
  - `relacionamentos.js`: Configura os relacionamentos entre os modelos.
- **routes/**: Contém as rotas da aplicação.
  - `users.js`: Rotas relacionadas a usuários.
  - `documents.js`: Rotas relacionadas a documentos.
  - `admin.js`: Rotas administrativas.
  - `auth.js`: Rotas de autenticação.
- **utils/**: Contém utilitários.
  - `config.js`: Configurações do ambiente.
  - `crypto.js`: Funções relacionadas à criptografia.
  - `database.js`: Configuração e inicialização do banco de dados.

## Funcionalidades

1. **Registro de Usuários**:
   - Endpoint: `POST /users/register`
   - Permite que novos usuários se registrem.

   ex: 
   {
  "name": "Ericson ",
  "email": "monteiro@gmail.com",
  "password": "2222",
  "nif": "222222222",
  "role": "user"
}

2. **Login de Usuários**:
   - Endpoint: `POST /users/login`
   - Autentica usuários e retorna um token JWT.
   ex:
   {
  "email": "monteiro@gmail.com",
  "password": "2222"
}
Mas essa parte nao funciona corretamente porque nao consegui corrigir a parte da senha
que esta com problema na parte de criptografia.

3. **Assinatura Digital**:
   - Gerar assinatura:
     - Endpoint: `POST /users/generate-signature`
     - Gera uma assinatura digital com base nos dados e na chave privada fornecidos.
   - Verificar assinatura:
     - Endpoint: `POST /users/verify-signature`
     - Verifica a validade de uma assinatura digital.

4. **Gerenciamento de Documentos**:
   - Upload de documentos.
   - Pesquisa de documentos.

5. **Administração**:
   - Gerenciamento de usuários e funções administrativas.

## Configuração

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```plaintext
   PORT=3003
   DBNAME=Assinatura_Digital
   DBUSER=postgres
   DBPASSWORD=dree
   DBHOST=localhost
   DBPORT=5432
   JWT_SECRET=seu_segredo_jwt
   ```

4. Inicialize o banco de dados:
   ```bash
   node main.js
   ```

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express**: Framework web.
- **PostgreSQL**: Banco de dados.
- **Sequelize**: ORM para interagir com o banco de dados.
- **JWT**: Autenticação baseada em tokens.
- **Crypto**: Geração e verificação de assinaturas digitais.

## Autor
Ericson Monteiro

