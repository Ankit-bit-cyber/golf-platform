import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useUser';

export const DashboardHome = () => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <div className="p-12 animate-pulse text-center">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-lg text-slate-600 mb-10">Manage your subscription, submit scores, and track your sweepstakes progress organically natively.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/scores" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Score Matrix</h3>
                    <p className="text-sm text-slate-500">Record your rounds natively seamlessly</p>
                </Link>
                
                <Link to="/draws" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:amber-300 transition-all group">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Draw Tracking</h3>
                    <p className="text-sm text-slate-500">Review historic sweepstakes dynamically</p>
                </Link>
                
                <Link to="/dashboard/winnings" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Prize Verification</h3>
                    <p className="text-sm text-slate-500">Manage uploaded proofs automatically</p>
                </Link>

                <Link to="/dashboard/charity" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Charity Metrics</h3>
                    <p className="text-sm text-slate-500">Configure proportional thresholds explicitly</p>
                </Link>
                
                <Link to="/dashboard/subscription" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-800 transition-all group col-span-full mt-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-1">Membership Settings</h3>
                        <p className="text-sm text-slate-500">Upgrade parameters natively tracking explicit offsets globally organically securely.</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                </Link>
            </div>
        </div>
    )
}
