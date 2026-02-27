import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { Todo, User } from '../types';
import TodoForm from '../components/todoForm';
import TodoItem from '../components/todoItem';

export default function Todos() {
  const [todos,   setTodos]   = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const userStr = localStorage.getItem('user');
  const user: User | null = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const res = await api.get<Todo[]>('/todos');
        setTodos(res.data);
      } catch {
        alert('Failed to load todos. Please login again.');
        navigate('/login');
      }
      setLoading(false);
    };
    fetchTodos();
  }, [navigate]);

  const handleAdd = (todo: Todo): void => {
    setTodos(prev => [todo, ...prev]);
  };

  const handleToggle = (updated: Todo): void => {
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
  };

  const handleDelete = (id: string): void => {
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const completed  = todos.filter(t =>  t.completed).length;
  const incomplete = todos.filter(t => !t.completed).length;

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-blue-600'>My Todo List</h1>
        <div className='flex items-center gap-4'>
          {user && <span className='text-gray-600 text-sm'>👋 {user.name}</span>}
          <button onClick={handleLogout}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold'>
            Logout
          </button>
        </div>
      </nav>

      <div className='max-w-2xl mx-auto p-6'>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-4 mb-6'>
          <div className='bg-white p-4 rounded-xl shadow text-center'>
            <p className='text-2xl font-bold text-blue-600'>{todos.length}</p>
            <p className='text-gray-500 text-sm'>Total</p>
          </div>
          <div className='bg-white p-4 rounded-xl shadow text-center'>
            <p className='text-2xl font-bold text-orange-500'>{incomplete}</p>
            <p className='text-gray-500 text-sm'>Remaining</p>
          </div>
          <div className='bg-white p-4 rounded-xl shadow text-center'>
            <p className='text-2xl font-bold text-green-500'>{completed}</p>
            <p className='text-gray-500 text-sm'>Completed</p>
          </div>
        </div>

        <TodoForm onAdd={handleAdd} />

        {loading ? (
          <p className='text-center text-gray-500'>Loading todos...</p>
        ) : todos.length === 0 ? (
          <div className='text-center text-gray-400 py-12'>
            <p className='text-4xl mb-3'>📝</p>
            <p className='font-semibold'>No todos yet!</p>
            <p className='text-sm'>Add your first todo above</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}