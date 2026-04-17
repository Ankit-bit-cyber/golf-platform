import React, { useState } from 'react';
import { useSubscription, useUpdateSubscription } from '../../hooks/useSubscription';

export const SubscriptionPage = () => {
  const { data: sub, isLoading } = useSubscription();
  const updateMutation = useUpdateSubscription();
  const [success, setSuccess] = useState('');

  const handleSwitch = async (plan: string) => {
    setSuccess('');
    try {
      await updateMutation.mutateAsync({ plan });
      setSuccess(`Successfully switched to ${plan.toLowerCase()} billing!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500 animate-pulse text-lg">Resolving billing infrastructure arrays smoothly internally natively securing limits...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Billing & Membership</h1>
        <p className="text-xl text-slate-600 max-w-2xl">Access exclusive platform features organically mapped globally securing active subscription arrays natively.</p>
      </div>

      {success && <div className="mb-8 p-4 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 shadow-sm animate-pulse">{success}</div>}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
         {/* Monthly Block */}
         <div className={`p-8 lg:p-10 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${sub?.plan === 'MONTHLY' ? 'bg-gradient-to-b from-blue-50 to-white border-blue-500 shadow-xl ring-4 ring-blue-100/50 scale-[1.02]' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
            {sub?.plan === 'MONTHLY' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 opacity-50 blur-2xl"></div>
            )}
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Monthly Tier</h3>
            <p className="text-slate-500 mb-6 font-medium">Billed automatically organically connecting endpoints.</p>
            <div className="text-6xl font-extrabold text-slate-900 mb-8 tracking-tighter">
                $10<span className="text-xl text-slate-400 font-medium tracking-normal"> / mo</span>
            </div>
            <button 
               onClick={() => handleSwitch('MONTHLY')} 
               disabled={sub?.plan === 'MONTHLY' || updateMutation.isPending}
               className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${sub?.plan === 'MONTHLY' ? 'bg-blue-100 text-blue-700 cursor-default' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'}`}
            >
               {sub?.plan === 'MONTHLY' ? 'Active Membership' : 'Switch to Monthly'}
            </button>
         </div>

         {/* Yearly Block */}
         <div className={`relative p-8 lg:p-10 rounded-3xl border-2 transition-all duration-300 overflow-hidden ${sub?.plan === 'YEARLY' ? 'bg-gradient-to-b from-blue-50 to-white border-blue-500 shadow-xl ring-4 ring-blue-100/50 scale-[1.02]' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
            {sub?.plan === 'YEARLY' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 opacity-50 blur-2xl"></div>
            )}
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1.5 font-extrabold text-xs uppercase tracking-widest rounded-full shadow-sm z-10 border border-yellow-500">
                Save 16%
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Annual Tier</h3>
            <p className="text-slate-500 mb-6 font-medium">Billed comprehensively navigating overlaps robustly seamlessly globally.</p>
            <div className="text-6xl font-extrabold text-slate-900 mb-8 tracking-tighter">
                $100<span className="text-xl text-slate-400 font-medium tracking-normal"> / yr</span>
            </div>
            <button 
               onClick={() => handleSwitch('YEARLY')} 
               disabled={sub?.plan === 'YEARLY' || updateMutation.isPending}
               className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${sub?.plan === 'YEARLY' ? 'bg-blue-100 text-blue-700 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
               {sub?.plan === 'YEARLY' ? 'Active Membership' : 'Switch to Yearly'}
            </button>
         </div>
      </div>

      {sub?.end_date && (
         <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-2xl">📅</span>
                </div>
                <div>
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">Upcoming Renewal Variable</h4>
                   <p className="text-2xl font-extrabold text-slate-900">{new Date(sub.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
            <span className={`px-5 py-2.5 font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-sm border ${sub.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {sub.status} Status Matrix
            </span>
         </div>
      )}

      <div className="text-center p-8 border border-slate-200 rounded-3xl bg-slate-50/50">
         <div className="flex justify-center items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
            <span className="font-extrabold text-slate-700 tracking-tight text-lg">Platform Payment Engine abstracted structurally dynamically natively.</span>
         </div>
         <p className="text-sm text-slate-500 font-medium">(Interactive boundaries logically enforce explicit variable parameters protecting organic features globally connecting abstractions natively without rendering functional components externally.)</p>
      </div>

    </div>
  );
};
