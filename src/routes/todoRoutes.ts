import { Router } from 'express';
import { Todo } from '../models/Todo';

const router = Router();

// Obtener todas las tareas
router.get('/todos', async (req, res) => {
    const todos = await Todo.findAll();
    res.json(todos);
});

// Obtener una tarea por su ID
router.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Crear una nueva tarea
router.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
});

// Actualizar una tarea existente por su ID
router.put('/todos/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        await todo.save();
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Eliminar una tarea por su ID
router.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        await todo.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

export default router;
