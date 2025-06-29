// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importa a biblioteca para criptografia de senhas

// Define o Schema (estrutura) para o usuário
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Campo obrigatório
        unique: true,   // Valor deve ser único (não pode ter dois usuários com o mesmo username)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor, insira um email válido'], // Valida o formato do e-mail
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Define a data atual como padrão na criação
    },
});

// --- MIDDLEWARE (HOOK) DO MONGOOSE ---
// Este código será executado ANTES de salvar um usuário no banco de dados
UserSchema.pre('save', async function (next) {
    // Verifica se a senha foi modificada (só criptografa se ela mudou)
    if (!this.isModified('password')) {
        return next(); // Se não mudou, passa para o próximo middleware/ação
    }

    // Gera um "sal" (valor aleatório) para a criptografia
    const salt = await bcrypt.genSalt(10);
    // Faz o hash da senha usando o sal gerado
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Continua o processo de salvamento
});

// --- MÉTODO CUSTOMIZADO PARA O SCHEMA ---
// Adiciona um método para comparar uma senha fornecida com a senha criptografada
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // Compara a senha digitada pelo usuário com a senha salva (criptografada)
    return await bcrypt.compare(enteredPassword, this.password);
};

// Exporta o Modelo 'User' baseado no UserSchema
module.exports = mongoose.model('User', UserSchema);