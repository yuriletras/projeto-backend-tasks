// src/app.js
const express = require('express');        // Importa o framework Express
const dotenv = require('dotenv');          // Importa dotenv para carregar variáveis de ambiente
const connectDB = require('./config/db');  // Importa a função de conexão com o banco de dados
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const taskRoutes = require('./routes/taskRoutes'); // Importa as rotas de tarefas
const { notFound, errorHandler } = require('./middlewares/errorHandler'); // Importa os middlewares de erro

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao banco de dados MongoDB
connectDB();

const app = express(); // Inicializa o aplicativo Express

// Middleware para analisar o corpo das requisições como JSON
// Isso é essencial para que sua API consiga ler dados enviados no formato JSON (ex: em requisições POST/PUT)
app.use(express.json());

// --- Rotas da API ---
// Quando uma requisição chegar para /api/auth, use as rotas definidas em authRoutes
app.use('/api/auth', authRoutes);
// Quando uma requisição chegar para /api/tasks, use as rotas definidas em taskRoutes
app.use('/api/tasks', taskRoutes);

// --- Middlewares de Erro ---
// Este middleware (notFound) deve vir DEPOIS de todas as rotas válidas.
// Se nenhuma rota acima corresponder à requisição, ele será acionado.
app.use(notFound);
// Este middleware (errorHandler) deve vir POR ÚLTIMO na fila.
// Ele captura e processa quaisquer erros que ocorram nos middlewares/rotas anteriores.
app.use(errorHandler);

// Define a porta em que o servidor vai escutar. Pega do .env, ou usa 5000 como fallback.
const PORT = process.env.PORT || 5000;

// Inicia o servidor Express
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`);
});