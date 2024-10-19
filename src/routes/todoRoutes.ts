import { Router, Request, Response } from 'express';
import { Todo } from '../models/Todo'; // Asegúrate de que la ruta al modelo sea correcta

const router = Router();

// Crear una nueva tarea
router.post('/todos', async (req: Request, res: Response) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la tarea' });
    }
});

// Obtener todas las tareas
router.get('/todos', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las tareas' });
    }
});

// Obtener una tarea por ID
router.get('/todos/:id', async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la tarea' });
    }
});

// Actualizar una tarea
router.put('/todos/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await Todo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTodo = await Todo.findByPk(req.params.id);
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la tarea' });
    }
});

// Eliminar una tarea
router.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Todo.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la tarea' });
    }
});

export default router;
