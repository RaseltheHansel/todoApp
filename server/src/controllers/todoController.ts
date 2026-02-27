import type { Response } from 'express';
import Todo from '../models/Todo';
import type { AuthRequest } from '../types';

// GET /api/todos
export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// POST /api/todos
export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body as {
      title: string;
      description?: string;
    };

    if (!title || title.trim() === '') {
      res.status(400).json({ message: 'Title is required.' });
      return;
    }

    const todo = new Todo({
      user:        req.userId,
      title:       title.trim(),
      description: description ?? '',
      completed:   false,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// PATCH /api/todos/:id/toggle
export const toggleTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findOne({
      _id:  req.params.id,
      user: req.userId,
    });

    if (!todo) {
      res.status(404).json({ message: 'Todo not found.' });
      return;
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// DELETE /api/todos/:id
export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id:  req.params.id,
      user: req.userId,
    });

    if (!todo) {
      res.status(404).json({ message: 'Todo not found.' });
      return;
    }

    res.json({ message: 'Todo deleted successfully.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};