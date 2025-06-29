// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken'); // Importa a biblioteca para JWT
const User = require('../models/User'); // Importa o Modelo de Usuário

// Middleware de proteção para rotas que exigem autenticação
const protect = async (req, res, next) => {
    let token; // Variável para armazenar o token

    // 1. Verifica se o token está presente no cabeçalho da requisição
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obter o token do cabeçalho (ex: "Bearer SEU_TOKEN_AQUI")
            token = req.headers.authorization.split(' ')[1]; // Pega a segunda parte (o token em si)

            // 2. Verificar a validade do token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica e verifica o token com a chave secreta

            // 3. Encontrar o usuário pelo ID contido no token e anexá-lo à requisição
            // .select('-password') remove a senha do objeto de usuário retornado
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Se tudo estiver ok, passa para o próximo middleware/controlador
            next();
        } catch (error) {
            // Se o token for inválido ou expirado
            console.error(error);
            res.status(401).json({ message: 'Não autorizado, token falhou' });
        }
    }

    // Se nenhum token foi fornecido
    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token' });
    }
};

module.exports = protect; // Exporta o middleware