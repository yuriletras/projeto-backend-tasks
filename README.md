# Projeto Backend de Gerenciamento de Tarefas - Geração Tech

Este é um projeto de API RESTful para gerenciamento de tarefas, desenvolvido com Node.js, Express e MongoDB. Ele inclui funcionalidades de autenticação de usuários (registro e login) com JWT (JSON Web Tokens) e operações CRUD (Criar, Ler, Atualizar, Deletar) para tarefas.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express.js**: Framework web para Node.js.
* **MongoDB**: Banco de dados NoSQL para persistência dos dados.
* **Mongoose**: ODM (Object Data Modeling) para MongoDB, facilitando a interação com o banco.
* **JWT (JSON Web Tokens)**: Para autenticação e autorização de usuários.
* **Bcrypt.js**: Para criptografia segura de senhas.
* **Dotenv**: Para gerenciar variáveis de ambiente.
* **Express-Validator**: Para validação de dados de requisição.
* **Nodemon**: Ferramenta para desenvolvimento que reinicia o servidor automaticamente em cada alteração de código.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js**: [https://nodejs.org/](https://nodejs.org/) (versão LTS recomendada)
* **npm** (gerenciador de pacotes do Node.js): Geralmente vem junto com a instalação do Node.js.
* **MongoDB Community Server**: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
    * Certifique-se de que o **serviço MongoDB esteja em execução** antes de iniciar a aplicação. No Windows, você pode verificar isso em "Serviços" (`services.msc`) e iniciar o serviço "MongoDB Server" se estiver parado.
* **Postman** ou **Insomnia**: Ferramentas para testar APIs.
    * [Postman Download](https://www.postman.com/downloads/)
    * [Insomnia Download](https://insomnia.rest/download)

---

## 📋 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

1.  **Clone o repositório** (se estiver usando Git) ou baixe o código-fonte:
    ```bash
    git clone [https://www.reddit.com/r/github/comments/1dig74r/can_i_use_github_desktop_and_dont_worry_about_git/](https://www.reddit.com/r/github/comments/1dig74r/can_i_use_github_desktop_and_dont_worry_about_git/)
    cd projeto-backend-tasks # Navegue até a pasta do projeto
    ```
    *Se você não está usando Git, navegue até a pasta `projeto-backend-tasks` no seu terminal.*

2.  **Instale as dependências** do projeto:
    ```bash
    npm install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/task-manager
    JWT_SECRET=seuSegredoSuperSecretoAqui # Use uma string longa e aleatória para produção!
    NODE_ENV=development
    ```
    *Altere `seuSegredoSuperSecretoAqui` para uma string mais complexa e segura. É crucial para a segurança do JWT.*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor será iniciado na porta especificada (`3000` por padrão) e se conectará ao MongoDB. Você deverá ver as mensagens no console:
    ```
    MongoDB conectado com sucesso!
    Servidor rodando na porta 3000 em modo development
    ```

---

## 🧪 Testando a API com Postman

Com o servidor rodando e o MongoDB ativo, você pode testar as rotas da API usando o Postman (ou Insomnia).

A URL base para todas as requisições é `http://localhost:3000/api`.

### Autenticação

1.  **Registrar Usuário**
    * **URL:** `POST http://localhost:3000/api/auth/register`
    * **Body (raw JSON):**
        ```json
        {
            "username": "seu_usuario",
            "email": "seu.email@example.com",
            "password": "sua_senha"
        }
        ```
    * **Resposta esperada:** `201 Created` e um objeto com `_id`, `username`, `email` e um `token` JWT. **Copie este token!**

2.  **Fazer Login**
    * **URL:** `POST http://localhost:3000/api/auth/login`
    * **Body (raw JSON):**
        ```json
        {
            "email": "seu.email@example.com",
            "password": "sua_senha"
        }
        ```
    * **Resposta esperada:** `200 OK` e um objeto com `_id`, `username`, `email` e um novo `token` JWT.

### Tarefas (Requer Autenticação - JWT Token no Header `Authorization: Bearer <token>`)

Todas as rotas de tarefas exigem que você inclua um cabeçalho `Authorization` com o token JWT obtido no registro ou login.

* **Key:** `Authorization`
* **Value:** `Bearer SEU_TOKEN_AQUI`

1.  **Criar Nova Tarefa**
    * **URL:** `POST http://localhost:3000/api/tasks`
    * **Headers:** `Authorization: Bearer SEU_TOKEN_AQUI`
    * **Body (raw JSON):**
        ```json
        {
            "title": "Minha Primeira Tarefa",
            "description": "Exemplo de descrição de tarefa.",
            "status": "pending",
            "dueDate": "2025-08-30"
        }
        ```
    * **Resposta esperada:** `201 Created` e os detalhes da tarefa criada.

2.  **Obter Todas as Tarefas**
    * **URL:** `GET http://localhost:3000/api/tasks`
    * **Headers:** `Authorization: Bearer SEU_TOKEN_AQUI`
    * **Resposta esperada:** `200 OK` e um array de objetos de tarefas.

3.  **Obter Tarefa por ID**
    * **URL:** `GET http://localhost:3000/api/tasks/:id` (substitua `:id` pelo `_id` de uma tarefa existente)
    * **Headers:** `Authorization: Bearer SEU_TOKEN_AQUI`
    * **Resposta esperada:** `200 OK` e os detalhes da tarefa específica.

4.  **Atualizar Tarefa**
    * **URL:** `PUT http://localhost:3000/api/tasks/:id` (substitua `:id` pelo `_id` da tarefa a ser atualizada)
    * **Headers:** `Authorization: Bearer SEU_TOKEN_AQUI`
    * **Body (raw JSON):**
        ```json
        {
            "title": "Tarefa Atualizada",
            "status": "completed"
        }
        ```
    * **Resposta esperada:** `200 OK` e os detalhes da tarefa atualizada.

5.  **Excluir Tarefa**
    * **URL:** `DELETE http://localhost:3000/api/tasks/:id` (substitua `:id` pelo `_id` da tarefa a ser excluída)
    * **Headers:** `Authorization: Bearer SEU_TOKEN_AQUI`
    * **Resposta esperada:** `200 OK` e uma mensagem de confirmação (ex: `{ "message": "Tarefa removida" }`).

---

## 📁 Estrutura do Projeto
