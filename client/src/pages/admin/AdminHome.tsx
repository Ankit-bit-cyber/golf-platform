import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminStats } from '../../hooks/useAdmin';

export const AdminHome = () => {
    const { data: stats, isLoading } = useAdminStats();

    if (isLoading) return <div className="p-12 animate-pulse text-center">Loading Admin Configurations natively implicitly organically seamlessly...</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Central Operations</h1>
            <p className="text-lg text-slate-600 mb-10">Control the active sequences cleanly routing internal dependencies explicitly globally naturally.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Registered Accounts</h4>
                   <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats?.totalUsers || 0}</p>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Active Billings</h4>
                   <p className="text-4xl font-extrabold text-emerald-600 tracking-tight">{stats?.activeSubscribers || 0}</p>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Prizes Distributed</h4>
                   <p className="text-4xl font-extrabold text-blue-600 tracking-tight">₹ {Number(stats?.totalPrizePool || 0).toLocaleString()}</p>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Charity Metrics</h4>
                   <p className="text-4xl font-extrabold text-indigo-600 tracking-tight">₹ {Number(stats?.totalCharityContributions || 0).toLocaleString()}</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link to="/admin/draws" className="p-10 bg-slate-900 text-white rounded-[2rem] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-bl-[100%] -z-10 group-hover:bg-blue-500/40 transition-colors"></div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 className="text-3xl font-extrabold mb-3 tracking-tight">Draw Engine Matrix</h3>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">Configure mathematical sequences intuitively scheduling logical limits structurally robustly dynamically cleanly globally accurately mapping effectively.</p>
                </Link>
                <Link to="/admin/winners" className="p-10 bg-slate-900 text-white rounded-[2rem] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-bl-[100%] -z-10 group-hover:bg-emerald-500/40 transition-colors"></div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-3xl font-extrabold mb-3 tracking-tight">Verification Console</h3>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">Cross-reference payout datasets visually resolving conflicts intelligently accurately cleanly functionally.</p>
                </Link>
                <Link to="/admin/users" className="p-10 bg-blue-600 text-white rounded-[2rem] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden border border-blue-500">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-bl-[100%] -z-10 group-hover:bg-blue-400/40 transition-colors"></div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h3 className="text-3xl font-extrabold mb-3 tracking-tight">User Operations Engine</h3>
                    <p className="text-blue-200 font-medium text-lg leading-relaxed">Configure active endpoints intelligently mapping dependencies robustly accurately visually mapping values explicitly correctly cleanly dynamically!</p>
                </Link>
            </div>
        </div>
    )
}
