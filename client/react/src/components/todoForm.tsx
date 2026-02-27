import { useState } from 'react';
import type { FormEvent } from 'react';
import api from '../api/axios';
import type { Todo } from '../types';

interface Props {
  onAdd: (todo: Todo) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title,       setTitle]       = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading,     setLoading]     = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await api.post<Todo>('/todos', { title, description });
      onAdd(res.data);
      setTitle('');
      setDescription('');
    } catch {
      alert('Failed to create todo.');
    }
    setLoading(false);
  };

  const inputClass = 'w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 text-sm';

  return (
    <form onSubmit={handleSubmit} className='bg-white p-4 rounded-2xl shadow mb-6 space-y-3'>
      <h2 className='font-bold text-gray-700'>Add New Todo</h2>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type='text'
        placeholder='Description (optional)'
        value={description}
        onChange={e => setDescription(e.target.value)}
        className={inputClass}
      />
      <button type='submit' disabled={loading}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg font-bold text-sm'>
        {loading ? 'Adding...' : '+ Add Todo'}
      </button>
    </form>
  );
}