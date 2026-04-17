import React, { useState } from 'react';
import { useAddScore } from '../../hooks/useScores';

export const ScoreEntryForm = () => {
  const [value, setValue] = useState<number | ''>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string>('');
  
  const addScoreMutation = useAddScore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (value === '' || value < 1 || value > 45) {
      setError('Score must be between 1 and 45.');
      return;
    }

    try {
      const fullIsoDate = new Date(date).toISOString();
      await addScoreMutation.mutateAsync({ value: Number(value), date: fullIsoDate });
      setValue('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add score.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Score</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex-1 w-full relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Score (1-45)</label>
          <input 
            type="number" 
            min="1" max="45"
            value={value}
            onChange={e => setValue(e.target.value === '' ? '' : parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
            placeholder="e.g. 18"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
          <input 
            type="date" 
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={addScoreMutation.isPending}
          className="w-full md:w-auto px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-4 md:mt-0 shadow-sm"
        >
          {addScoreMutation.isPending ? 'Adding...' : 'Add Score'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
};
