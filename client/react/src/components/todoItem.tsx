import type { Todo } from '../types';
import api from '../api/axios';

interface Props {
  todo:     Todo;
  onToggle: (updated: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const handleToggle = async (): Promise<void> => {
    try {
      const res = await api.patch<Todo>('/todos/' + todo._id + '/toggle');
      onToggle(res.data);
    } catch {
      alert('Failed to update todo.');
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!confirm('Delete this todo?')) return;
    try {
      await api.delete('/todos/' + todo._id);
      onDelete(todo._id);
    } catch {
      alert('Failed to delete todo.');
    }
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border mb-3 ${
      todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
    }`}>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={handleToggle}
        className='mt-1 w-4 h-4 cursor-pointer accent-blue-600'
      />
      <div className='flex-1'>
        <p className={`font-semibold ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
        }`}>
          {todo.title}
        </p>
        {todo.description && (
          <p className='text-sm text-gray-500 mt-1'>{todo.description}</p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className='text-red-400 hover:text-red-600 font-bold text-lg leading-none'
      >
        ×
      </button>
    </div>
  );
}