// src/controllers/taskController.js
const Task = require('../models/Task'); // Importa o modelo de Tarefa

// @desc    Obter todas as tarefas do usuário logado
// @route   GET /api/tasks
// @access  Private (Requer autenticação)
const getTasks = async (req, res) => {
    // Encontra todas as tarefas que pertencem ao usuário logado (req.user.id é definido pelo authMiddleware)
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks); // Retorna as tarefas como JSON
};

// @desc    Obter uma tarefa específica pelo ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    // Tenta encontrar a tarefa pelo ID fornecido na URL (req.params.id)
    const task = await Task.findById(req.params.id);

    // Verifica se a tarefa existe E se ela pertence ao usuário logado
    if (task && task.user.toString() === req.user.id.toString()) {
        res.json(task); // Retorna a tarefa encontrada
    } else {
        // Se a tarefa não for encontrada ou não pertencer ao usuário
        res.status(404).json({ message: 'Tarefa não encontrada ou você não tem permissão para acessá-la' });
    }
};

// @desc    Criar nova tarefa
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    // Extrai os dados da tarefa do corpo da requisição
    const { title, description, status, dueDate } = req.body;

    // Validação básica: o título é obrigatório
    if (!title) {
        return res.status(400).json({ message: 'O título é obrigatório para a tarefa' });
    }

    // Cria uma nova instância de tarefa usando o Modelo Task
    const task = new Task({
        title,
        description,
        status,
        dueDate,
        user: req.user.id, // Associa a tarefa ao ID do usuário logado (definido pelo authMiddleware)
    });

    // Salva a nova tarefa no banco de dados
    const createdTask = await task.save();
    res.status(201).json(createdTask); // Retorna a tarefa criada com status 201 (Created)
};

// @desc    Atualizar uma tarefa existente
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    // Extrai os campos a serem atualizados do corpo da requisição
    const { title, description, status, dueDate } = req.body;
    // Encontra a tarefa pelo ID
    const task = await Task.findById(req.params.id);

    // Verifica se a tarefa existe E se ela pertence ao usuário logado
    if (task && task.user.toString() === req.user.id.toString()) {
        // Atualiza os campos apenas se novos valores forem fornecidos, caso contrário, mantém os existentes
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        // Salva as alterações no banco de dados
        const updatedTask = await task.save();
        res.json(updatedTask); // Retorna a tarefa atualizada
    } else {
        // Se a tarefa não for encontrada ou não pertencer ao usuário
        res.status(404).json({ message: 'Tarefa não encontrada ou você não tem permissão para atualizá-la' });
    }
};

// @desc    Deletar uma tarefa
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    // Encontra a tarefa pelo ID
    const task = await Task.findById(req.params.id);

    // Verifica se a tarefa existe E se ela pertence ao usuário logado
    if (task && task.user.toString() === req.user.id.toString()) {
        // Deleta a tarefa do banco de dados
        await Task.deleteOne({ _id: task._id }); // Usar deleteOne é a forma mais robusta de deletar um documento pelo _id
        res.json({ message: 'Tarefa removida com sucesso' }); // Retorna uma mensagem de sucesso
    } else {
        // Se a tarefa não for encontrada ou não pertencer ao usuário
        res.status(404).json({ message: 'Tarefa não encontrada ou você não tem permissão para deletá-la' });
    }
};

// Exporta todas as funções de controlador de tarefas
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};