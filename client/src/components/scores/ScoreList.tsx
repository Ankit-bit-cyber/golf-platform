import React, { useState } from 'react';
import { useScores, useUpdateScore, useDeleteScore } from '../../hooks/useScores';

export const ScoreList = () => {
  const { data: scores, isLoading, error } = useScores();
  const updateMutation = useUpdateScore();
  const deleteMutation = useDeleteScore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number | ''>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editError, setEditError] = useState<string>('');

  if (isLoading) return <p className="text-slate-500 animate-pulse">Loading scores...</p>;
  if (error) return <p className="text-red-500">Failed to load scores.</p>;
  if (!scores || scores.length === 0) return <p className="text-slate-500 p-4 bg-slate-50 rounded-lg text-center">No scores recorded yet. Add your first score above!</p>;

  const startEdit = (score: any) => {
    setEditingId(score.id);
    setEditValue(score.value);
    setEditDate(new Date(score.date).toISOString().split('T')[0]);
    setEditError('');
  };

  const handleSave = async (id: string, originalDateStr: string) => {
    try {
      const payload: any = { value: Number(editValue) };
      const originalIso = new Date(originalDateStr).toISOString().split('T')[0];
      if (editDate !== originalIso) {
        payload.date = new Date(editDate).toISOString();
      }
      
      await updateMutation.mutateAsync({ id, data: payload });
      setEditingId(null);
    } catch (err: any) {
      setEditError(err.response?.data?.error || 'Failed to update');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm rounded-tl-xl">Date</th>
              <th className="px-6 py-4 font-semibold text-sm">Score</th>
              <th className="px-6 py-4 font-semibold text-sm text-right rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: any) => (
              <tr key={score.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === score.id ? (
                    <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="border border-slate-300 px-3 py-1.5 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" />
                  ) : (
                    <span className="font-medium text-slate-800">{new Date(score.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === score.id ? (
                    <input type="number" min="1" max="45" value={editValue} onChange={e => setEditValue(Number(e.target.value))} className="border border-slate-300 px-3 py-1.5 rounded-lg w-24 outline-none focus:ring-2 focus:ring-blue-500" />
                  ) : (
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 w-10 h-10 rounded-full font-bold text-lg shadow-sm">
                      {score.value}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === score.id ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleSave(score.id, score.date)} className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition font-medium shadow-sm">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-sm bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg hover:bg-slate-300 transition font-medium">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-4 items-center">
                      <button onClick={() => startEdit(score)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">Edit</button>
                      <button onClick={() => deleteMutation.mutate(score.id)} className="text-sm font-semibold text-red-600 hover:text-red-800 transition">Delete</button>
                    </div>
                  )}
                  {editingId === score.id && editError && <p className="text-xs text-red-500 mt-2">{editError}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
