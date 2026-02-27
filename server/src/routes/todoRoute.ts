import { Router } from 'express';
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../controllers/todoController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/',       verifyToken, getTodos);
router.post('/',      verifyToken, createTodo);
router.patch('/:id/toggle',  verifyToken, toggleTodo);
router.delete('/:id', verifyToken, deleteTodo);

export default router;