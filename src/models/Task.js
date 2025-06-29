// src/models/Task.js
const mongoose = require('mongoose');

// Define o Schema (estrutura) para a tarefa
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Título da tarefa é obrigatório
        trim: true,     // Remove espaços em branco do início/fim
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // O status só pode ser um desses valores
        default: 'pending', // Valor padrão para o status
    },
    dueDate: {
        type: Date,
        required: false, // Data de vencimento é opcional
    },
    user: { // Campo de relacionamento: associa a tarefa a um usuário
        type: mongoose.Schema.Types.ObjectId, // Indica que é um ID de objeto do MongoDB
        ref: 'User',                           // Referencia o Modelo 'User'
        required: true,                        // Toda tarefa precisa ter um usuário associado
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Exporta o Modelo 'Task' baseado no TaskSchema
module.exports = mongoose.model('Task', TaskSchema);