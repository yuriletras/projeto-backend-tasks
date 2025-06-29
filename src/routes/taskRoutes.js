// src/routes/taskRoutes.js
const express = require('express');
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController'); // Importa todas as funções do controlador de tarefas
const protect = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação
const { body } = require('express-validator'); // Para validação de requisições de tarefas

const router = express.Router(); // Cria uma nova instância de Router do Express

// Todas as rotas de tarefas são PROTEGIDAS (precisam de autenticação)
// Rota base para obter todas as tarefas e criar uma nova tarefa
router.route('/')
    .get(protect, getTasks) // GET /api/tasks -> Requer proteção, chama getTasks
    .post(
        protect, // Requer proteção
        [ // Validação para a criação de tarefa: título é obrigatório
            body('title').notEmpty().withMessage('O título da tarefa é obrigatório'),
        ],
        createTask // POST /api/tasks -> Chama createTask
    );

// Rotas para operações com ID específico (obter, atualizar, deletar)
router.route('/:id')
    .get(protect, getTaskById)    // GET /api/tasks/:id -> Requer proteção, chama getTaskById
    .put(protect, updateTask)     // PUT /api/tasks/:id -> Requer proteção, chama updateTask
    .delete(protect, deleteTask); // DELETE /api/tasks/:id -> Requer proteção, chama deleteTask

module.exports = router; // Exporta o router