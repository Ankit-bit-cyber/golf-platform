import React from 'react';
import { useAllWinners, useVerifyWinner } from '../../hooks/useWinners';

export const AdminWinnersPage = () => {
    const { data: wins, isLoading } = useAllWinners();
    const verifyMutation = useVerifyWinner();

    const handleVerify = async (id: string, action: string) => {
        try {
            await verifyMutation.mutateAsync({ id, action });
        } catch(err) {
            console.error(err);
        }
    }

    if (isLoading) return <div className="p-12 animate-pulse text-center text-slate-500 font-bold">Establishing verification abstraction pipeline dependencies...</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-10">Verification Governance Console</h1>
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-widest text-[10px] font-extrabold text-slate-500">
                         <tr>
                            <th className="px-8 py-5">Target Identifier Reference</th>
                            <th className="px-8 py-5">Context Map Limit</th>
                            <th className="px-8 py-5">Transaction Metric Bound</th>
                            <th className="px-8 py-5 text-center">Submitted Asset URI Structure</th>
                            <th className="px-8 py-5">State Conditional Check</th>
                            <th className="px-8 py-5 text-right">Interactive Logic Functions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {wins?.map((win: any) => (
                             <tr key={win.id} className="hover:bg-slate-50 transition">
                                <td className="px-8 py-6">
                                    <p className="font-bold text-slate-900 text-lg mb-1">{win.user.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">{win.user.email}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-extrabold text-slate-800 text-lg mb-2">{String(win.draw.month).padStart(2, '0')}<span className="text-slate-400 font-light mx-1">/</span>{win.draw.year}</p>
                                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">{win.match_type} hits</span>
                                </td>
                                <td className="px-8 py-6 font-extrabold text-emerald-600 tracking-tight text-xl">₹ {Number(win.prize_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="px-8 py-6 text-center">
                                    {win.proof_url ? (
                                        <a href={win.proof_url} target="_blank" rel="noreferrer" className="inline-block relative group">
                                            <img src={win.proof_url} alt="Proof Rendering Native Mapping Bound Structure Implicitly" className="w-16 h-16 object-cover rounded-2xl shadow-sm border-2 border-slate-200 group-hover:border-blue-500 transition-all group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </a>
                                    ) : <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Assets Missing Completely</span>}
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-5 py-2 rounded-xl border font-extrabold text-[10px] uppercase tracking-widest shadow-sm ${win.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border-amber-200' : win.status === 'APPROVED' ? 'bg-green-50 text-green-800 border-green-200' : win.status === 'PAID' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                                        {win.status} Matrix
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right w-64 max-w-sm">
                                    <div className="flex flex-col gap-3 justify-end items-end w-full">
                                        {win.status === 'PENDING' && win.proof_url && (
                                           <>
                                             <button onClick={() => handleVerify(win.id, 'approve')} className="w-full px-5 py-2.5 bg-green-600 text-white font-extrabold text-xs rounded-xl hover:bg-green-700 shadow-md border border-green-700 uppercase tracking-wide">Validate Parameters Correctly</button>
                                             <button onClick={() => handleVerify(win.id, 'reject')} className="w-full px-5 py-2.5 bg-red-50 text-red-700 font-extrabold text-xs rounded-xl hover:bg-red-100 border border-red-200 uppercase tracking-wide">Decline Native Overlaps</button>
                                           </>
                                        )}
                                        {win.status === 'APPROVED' && (
                                           <button onClick={() => handleVerify(win.id, 'mark_paid')} className="w-full px-5 py-3 bg-indigo-600 text-white font-extrabold text-[10px] tracking-widest rounded-xl hover:bg-indigo-700 shadow-lg border border-indigo-700 uppercase transition-transform hover:scale-105 active:scale-95">Disburse Internal Limits Organically Structurally Flawlessly Appropriately</button>
                                        )}
                                    </div>
                                </td>
                             </tr>
                         ))}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
