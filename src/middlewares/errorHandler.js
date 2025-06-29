// src/middlewares/errorHandler.js

// Middleware para lidar com rotas não encontradas (404)
const notFound = (req, res, next) => {
    const error = new Error(`Não Encontrado - ${req.originalUrl}`); // Cria um erro com a URL da requisição
    res.status(404); // Define o status da resposta como 404 (Not Found)
    next(error); // Passa o erro para o próximo middleware de tratamento de erros
};

// Middleware de tratamento de erros geral
const errorHandler = (err, req, res, next) => {
    // Determina o código de status: se já foi definido (e não é 200), usa ele; senão, usa 500 (Erro Interno do Servidor)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode); // Define o status da resposta

    // Envia uma resposta JSON com a mensagem de erro
    res.json({
        message: err.message, // A mensagem de erro
        // Em ambiente de produção, não mostra o stack trace (para segurança)
        // Em desenvolvimento, mostra para ajudar na depuração
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler }; // Exporta ambos os middlewares