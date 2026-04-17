import React, { useState } from 'react';
import { useDraws, useCreateDraw, useSimulateDraw, usePublishDraw } from '../../hooks/useDraws';

export const AdminDrawsPage = () => {
  const { data: draws, isLoading } = useDraws();
  const createMutation = useCreateDraw();
  const simulateMutation = useSimulateDraw();
  const publishMutation = usePublishDraw();

  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [type, setType] = useState<string>('RANDOM');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await createMutation.mutateAsync({ month: Number(month), year: Number(year), draw_type: type });
    } catch(err:any) {
      setErrorMsg(err.response?.data?.error || 'Failed to create database draw context');
    }
  };

  if (isLoading) return <div className="p-12 animate-pulse text-slate-500 text-center text-lg">Querying Active Environment Engine states...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">System Draw Engine <span className="text-blue-600 font-medium">| Admin Console</span></h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
        <h2 className="text-xl font-bold mb-6 text-slate-800">Initialize New Draw Matrix</h2>
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-6 items-end">
           <div className="flex-1 w-full relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">Month Period (1-12)</label>
            <input type="number" min="1" max="12" value={month} onChange={e => setMonth(Number(e.target.value))} className="w-full px-5 py-3 border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all rounded-xl shadow-sm" required />
           </div>
           <div className="flex-1 w-full relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">Fiscal Year</label>
            <input type="number" min="2025" value={year} onChange={e => setYear(Number(e.target.value))} className="w-full px-5 py-3 border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all rounded-xl shadow-sm" required />
           </div>
           <div className="flex-[1.5] w-full relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">Computational Path Generation Settings</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full px-5 py-3 border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all rounded-xl shadow-sm bg-white appearance-none">
                <option value="RANDOM">Classic Random Distribution Matrix Array</option>
                <option value="ALGORITHM">Inverse Suspense Active Algorithmic Weighting Core Analytics</option>
            </select>
           </div>
           <button type="submit" disabled={createMutation.isPending} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition disabled:opacity-50 h-[50px] shrink-0 text-sm whitespace-nowrap">
             Generate Draft Object
           </button>
        </form>
        {errorMsg && <p className="text-red-500 font-medium text-sm mt-4 p-3 bg-red-50 rounded-lg border border-red-100">{errorMsg}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs">
                 <tr>
                   <th className="px-8 py-4 font-bold">Execution Period Frame</th>
                   <th className="px-8 py-4 font-bold">Generation Modality</th>
                   <th className="px-8 py-4 font-bold">Pipeline Status Gate</th>
                   <th className="px-8 py-4 font-bold">Compiled Winning Sequence Variables</th>
                   <th className="px-8 py-4 font-bold text-right">Administrative Interventions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {draws?.map((draw: any) => (
                    <tr key={draw.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-900 text-lg">{String(draw.month).padStart(2, '0')} / {draw.year}</td>
                        <td className="px-8 py-6">
                           <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100 tracking-wide">{draw.draw_type}</span>
                        </td>
                        <td className="px-8 py-6">
                            <span className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase shadow-sm border ${draw.status === 'PUBLISHED' ? 'bg-green-100 text-green-800 border-green-200' : draw.status === 'SIMULATED' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                {draw.status}
                            </span>
                        </td>
                        <td className="px-8 py-6">
                            {draw.winning_nums?.length > 0 ? (
                               <div className="flex gap-2 items-center">
                                   {draw.winning_nums.map((n: number, i: number) => <span key={i} className="w-9 h-9 flex items-center justify-center bg-yellow-400 border border-yellow-500 text-yellow-900 font-extrabold rounded-full text-sm shadow-sm">{n}</span>)}
                               </div>
                            ) : <span className="text-slate-400 text-sm font-medium italic">Engine Not Fired</span>}
                        </td>
                        <td className="px-8 py-6 text-right">
                            {draw.status === 'DRAFT' && (
                                <button onClick={() => simulateMutation.mutate(draw.id)} disabled={simulateMutation.isPending} className="text-sm font-bold bg-amber-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-amber-600 transition disabled:opacity-50">Execute Simulation Array</button>
                            )}
                            {draw.status === 'SIMULATED' && (
                                <button onClick={() => publishMutation.mutate(draw.id)} disabled={publishMutation.isPending} className="text-sm font-bold bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition disabled:opacity-50">OVERRIDE PUBLISH SYSTEM</button>
                            )}
                            {draw.status === 'PUBLISHED' && (
                               <span className="text-sm font-extrabold text-slate-300 uppercase tracking-widest">Locked Execution Context</span>
                            )}
                        </td>
                    </tr>
                 ))}
               </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
