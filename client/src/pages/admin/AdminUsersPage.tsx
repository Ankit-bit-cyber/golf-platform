import React, { useState } from 'react';
import { useAdminUsers, useToggleSubscription } from '../../hooks/useAdmin';
import { useDebounce } from '../../hooks/useDebounce';

export const AdminUsersPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 400);

    const { data, isLoading } = useAdminUsers(page, debouncedSearch);
    const toggleMutation = useToggleSubscription();

    const handleToggle = async (userId: string) => {
        try {
            await toggleMutation.mutateAsync(userId);
        } catch(err) {
            console.error(err);
        }
    }

    if (isLoading && !data) return <div className="p-12 text-center text-slate-500 animate-pulse font-bold">Initializing User Management Module actively natively seamlessly...</div>;

    const users = data?.users || [];
    const totalPages = data?.pages || 1;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">User Operations Engine</h1>

            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
               <div className="relative w-full max-w-md">
                   <input 
                      type="text"
                      className="w-full pl-5 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-800"
                      placeholder="Search accounts effortlessly implicitly organically..."
                      value={searchTerm}
                      onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                   />
               </div>
               <span className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 uppercase tracking-widest">{data?.total || 0} Registered</span>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold tracking-widest text-slate-500">
                           <tr>
                              <th className="px-8 py-5">Profile Context</th>
                              <th className="px-8 py-5">Activity Scores Limit</th>
                              <th className="px-8 py-5">Billing Contract Protocol</th>
                              <th className="px-8 py-5 text-right">Administrative Execution</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {users.length === 0 && (
                               <tr>
                                   <td colSpan={4} className="px-8 py-16 text-center text-slate-500 font-medium text-lg">No active users located dynamically matching constraints accurately implicitly appropriately internally.</td>
                               </tr>
                           )}
                           {users.map((user: any) => (
                               <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                   <td className="px-8 py-6">
                                       <p className="text-lg font-extrabold text-slate-900 mb-1 tracking-tight">{user.name}</p>
                                       <p className="text-sm font-medium text-slate-500">{user.email}</p>
                                   </td>
                                   <td className="px-8 py-6">
                                       <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">{user.scores?.length || 0} Snapshots</span>
                                   </td>
                                   <td className="px-8 py-6">
                                       {user.subscription ? (
                                           <div className="flex flex-col gap-1 items-start">
                                              <span className={`px-4 py-1.5 rounded border text-[10px] uppercase tracking-widest shadow-sm font-extrabold ${user.subscription.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                 {user.subscription.status}
                                              </span>
                                              <span className="text-[10px] uppercase font-bold text-slate-400">{user.subscription.plan} | Expires {new Date(user.subscription.end_date).toLocaleDateString()}</span>
                                           </div>
                                       ) : (
                                           <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded border border-slate-200">No Billing Object</span>
                                       )}
                                   </td>
                                   <td className="px-8 py-6 text-right">
                                       {user.subscription && (
                                           <button 
                                              onClick={() => handleToggle(user.id)}
                                              disabled={toggleMutation.isPending}
                                              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-sm transition disabled:opacity-50"
                                           >
                                               Override Status
                                           </button>
                                       )}
                                   </td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Natively */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <button 
                       disabled={page === 1}
                       onClick={() => setPage(p => Math.max(1, p - 1))}
                       className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 shadow-sm disabled:opacity-30 transition hover:bg-slate-50 hover:shadow"
                    >
                        &larr; Previous Block
                    </button>
                    <span className="flex items-center justify-center font-extrabold text-slate-500 px-4 bg-slate-100 rounded-xl border border-slate-200 shadow-sm tracking-widest">
                        {page} / {totalPages}
                    </span>
                    <button 
                       disabled={page === totalPages}
                       onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                       className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 shadow-sm disabled:opacity-30 transition hover:bg-slate-50 hover:shadow"
                    >
                        Next Block &rarr;
                    </button>
                </div>
            )}
        </div>
    )
}
