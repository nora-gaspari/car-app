# Projeto Full Stack - Catálogo de Veículos

Este é um projeto web full stack desenvolvido como parte da disciplina de Programação Web Full Stack. A aplicação permite que usuários gerenciem um catálogo de veículos, com funcionalidades de login, busca e inserção.

## Funcionalidades

- **Autenticação de Usuários:** Sistema de login seguro com JWT.
- **Busca de Veículos:** Filtros avançados por marca, modelo, ano, cor e preço, com paginação.
- **Inserção de Veículos:** Formulário para adicionar novos veículos ao catálogo.
- **Garagem Pessoal:** Funcionalidade para salvar veículos favoritos.

## Tecnologias Utilizadas

- **Frontend:** React.js, Material-UI (MUI)
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB com Mongoose
- **Autenticação:** JSON Web Tokens (JWT), bcryptjs

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/ )
- [MongoDB](https://www.mongodb.com/try/download/community )

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <pasta-do-projeto>
    ```

2.  **Configure o Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:
      ```
      MONGODB_URI=mongodb://localhost:27017/car-app
      JWT_SECRET=your-super-secret-jwt-key-here
      PORT=5000
      NODE_ENV=development
      ```
    - Popule o banco de dados com dados de teste (execute apenas uma vez):
      ```bash
      node seed.js
      ```

3.  **Configure o Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Inicie a Aplicação:**
    - No terminal do **backend**, execute:
      ```bash
      npm run dev
      ```
    - Em **outro terminal**, na pasta do **frontend**, execute:
      ```bash
      npm start
      ```

A aplicação estará disponível em `http://localhost:3000`.

## Usuários de Teste

- **Usuário:** `admin` / **Senha:** `admin123`
- **Usuário:** `user1` / **Senha:** `user123`
- **Usuário:** `user2` / **Senha:** `user456`

