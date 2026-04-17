import React, { useRef, useState } from 'react';
import { useMyWins, useSubmitProof } from '../../hooks/useWinners';

export const WinningsPage = () => {
  const { data: wins, isLoading } = useMyWins();
  const uploadMutation = useSubmitProof();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);

  const handleUploadClick = (id: string) => {
      setActiveWinId(id);
      fileInputRef.current?.click();
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activeWinId) {
          try {
              await uploadMutation.mutateAsync({ id: activeWinId, file });
          } catch(err) {
              console.error(err);
              alert('Failed to upload proof object natively implicitly. Ensure size bounds < 5MB accurately gracefully map correctly.');
          }
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
      setActiveWinId(null);
  }

  if (isLoading) return <div className="p-12 animate-pulse text-center text-slate-500 font-bold">Initializing payout datasets implicitly natively robustly reliably comprehensively...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Prize Dispensary Array</h1>
      <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
      
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
           <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
              <tr>
                 <th className="px-8 py-5">Draw Epoch Context</th>
                 <th className="px-8 py-5">Match Complexity</th>
                 <th className="px-8 py-5">Disbursement Scaling</th>
                 <th className="px-8 py-5">Pipeline Condition</th>
                 <th className="px-8 py-5 text-right">Interactable Bounds</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {wins?.length === 0 && (
                  <tr>
                      <td colSpan={5} className="px-8 py-16 text-center text-slate-500 font-medium text-lg">No procedural disbursements resolved automatically yet. Map logic bounds efficiently!</td>
                  </tr>
              )}
              {wins?.map((win: any) => (
                  <tr key={win.id} className="hover:bg-slate-50/50 transition">
                     <td className="px-8 py-6 font-extrabold text-slate-900 text-lg">{win.draw.month} <span className="text-slate-400 font-light mx-1">/</span> {win.draw.year}</td>
                     <td className="px-8 py-6">
                        <span className="font-extrabold text-[10px] uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded border border-indigo-200">
                           {win.match_type} Matrix Hits
                        </span>
                     </td>
                     <td className="px-8 py-6 font-extrabold text-emerald-600 text-xl tracking-tight">₹ {Number(win.prize_amount).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })}</td>
                     <td className="px-8 py-6">
                         <span className={`px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-sm border uppercase tracking-wider ${win.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border-amber-200' : win.status === 'APPROVED' ? 'bg-green-50 text-green-800 border-green-200' : win.status === 'PAID' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                            {win.status === 'PENDING' && !win.proof_url ? 'PENDING DOCS' : win.status}
                         </span>
                     </td>
                     <td className="px-8 py-6 text-right">
                         {(win.status === 'PENDING' || win.status === 'REJECTED') && !win.proof_url ? (
                             <button
                               onClick={() => handleUploadClick(win.id)}
                               disabled={uploadMutation.isPending && activeWinId === win.id}
                               className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-md transition disabled:opacity-50"
                             >
                                 {uploadMutation.isPending && activeWinId === win.id ? 'Uploading Buffer...' : 'Upload Validation Screenshot'}
                             </button>
                         ) : win.proof_url ? (
                             <span className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg">Assets Synced Successfully</span>
                         ) : <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Locked State Matrix</span>}
                     </td>
                  </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  )
}
