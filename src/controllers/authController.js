// src/controllers/authController.js
const User = require('../models/User'); // Importa o modelo de Usuário que criamos
const jwt = require('jsonwebtoken');   // Importa a biblioteca para trabalhar com JWTs

// Função auxiliar para gerar um token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Define o tempo de expiração do token (1 hora)
    });
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public (Não precisa de autenticação para registrar)
const registerUser = async (req, res) => {
    // Extrai username, email e password do corpo da requisição
    const { username, email, password } = req.body;

    // 1. Verificar se o usuário com o email já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        // Se existir, retorna um erro 400 (Bad Request)
        return res.status(400).json({ message: 'Usuário com este email já existe' });
    }

    // 2. Se não existir, tenta criar um novo usuário no banco de dados
    const user = await User.create({
        username,
        email,
        password, // A senha será hashed automaticamente pelo middleware do Mongoose (UserSchema.pre('save'))
    });

    // 3. Verifica se o usuário foi criado com sucesso
    if (user) {
        // Se sim, retorna os dados do usuário e um token JWT
        res.status(201).json({ // Status 201: Created
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Gera e envia o token
        });
    } else {
        // Se algo deu errado na criação (dados inválidos, etc.)
        res.status(400).json({ message: 'Dados de usuário inválidos' });
    }
};

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Public (Não precisa de autenticação para fazer login)
const loginUser = async (req, res) => {
    // Extrai email e password do corpo da requisição
    const { email, password } = req.body;

    // 1. Encontrar o usuário pelo email
    const user = await User.findOne({ email });

    // 2. Verificar se o usuário existe E se a senha fornecida corresponde à senha hashed
    if (user && (await user.matchPassword(password))) {
        // Se sim, retorna os dados do usuário e um novo token JWT
        res.json({ // Status 200: OK
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Gera e envia o token
        });
    } else {
        // Se o email não for encontrado ou a senha estiver incorreta
        res.status(401).json({ message: 'Email ou senha inválidos' }); // Status 401: Unauthorized
    }
};

// Exporta as funções para serem usadas pelas rotas
module.exports = { registerUser, loginUser };