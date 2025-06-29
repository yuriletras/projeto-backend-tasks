// src/routes/authRoutes.js
const express = require('express'); // Importa o Express para criar o router
const { registerUser, loginUser } = require('../controllers/authController'); // Importa as funções do controlador de autenticação
const { body } = require('express-validator'); // Importa a função 'body' do express-validator para validação

const router = express.Router(); // Cria uma nova instância de Router do Express

// Rota para REGISTRAR um novo usuário (POST /api/auth/register)
router.post(
    '/register', // Caminho da rota
    [ // Array de middlewares de validação usando express-validator
        body('username').notEmpty().withMessage('Nome de usuário é obrigatório'),
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    ],
    registerUser // Função do controlador que será executada se as validações passarem
);

// Rota para FAZER LOGIN (POST /api/auth/login)
router.post(
    '/login', // Caminho da rota
    [ // Array de middlewares de validação
        body('email').isEmail().withMessage('Email inválido'),
        body('password').notEmpty().withMessage('Senha é obrigatória'),
    ],
    loginUser // Função do controlador
);

module.exports = router; // Exporta o router para ser usado no app.js