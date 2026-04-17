import React, { useState, useEffect } from 'react';
import { useCurrentUser, useUpdateUserCharity } from '../../hooks/useUser';
import { useCharities } from '../../hooks/useCharities';

export const CharityPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: charities, isLoading: isCharitiesLoading } = useCharities();
  const updateMutation = useUpdateUserCharity();

  const [selectedCharity, setSelectedCharity] = useState<string>('');
  const [contributionPct, setContributionPct] = useState<number>(10);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setSelectedCharity(user.charity_id || '');
      setContributionPct(user.charity_pct || 10);
    }
  }, [user]);

  const handleSave = async () => {
    setSuccessMsg('');
    setErrorMsg('');
    try {
      if (!selectedCharity) throw new Error('Please select a charity');
      await updateMutation.mutateAsync({ charity_id: selectedCharity, charity_pct: contributionPct });
      setSuccessMsg('Charity preferences updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || 'Failed to update preferences');
    }
  };

  if (isUserLoading || isCharitiesLoading) return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-slate-500 animate-pulse">Loading preferences...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 lg:mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Charitable Giving</h1>
        <p className="text-lg text-slate-600">You control how much of your subscription goes directly to your selected cause. Configure your contributions natively here.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200">
        
        <div className="mb-10">
          <label className="block text-xl font-bold text-slate-800 mb-4">Supported Charity</label>
          <select 
            value={selectedCharity} 
            onChange={e => setSelectedCharity(e.target.value)}
            className="w-full text-lg px-5 py-4 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer bg-white"
          >
            <option value="" disabled>Select a charity...</option>
            {charities?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-12">
          <label className="flex items-end justify-between font-bold text-slate-800 mb-4">
            <span className="text-xl">Contribution Percentage</span>
            <span className="text-3xl text-blue-600">{contributionPct}%</span>
          </label>
          
          <div className="relative pt-6 pb-2">
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5"
              value={contributionPct}
              onChange={e => setContributionPct(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-400 mt-3 px-1">
              <span>10% (Minimum)</span>
              <span>100% (Maximum)</span>
            </div>
          </div>
          <p className="mt-4 text-slate-500 text-sm">Every month, {contributionPct}% of your net subscription fee will explicitly be donated to your active charity.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-slate-100">
          <button 
            onClick={handleSave}
            disabled={updateMutation.isPending || !selectedCharity}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors shrink-0"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Preferences'}
          </button>
          
          {successMsg && <p className="text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg flex-1">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 font-medium px-4 py-2 bg-red-50 rounded-lg flex-1">{errorMsg}</p>}
        </div>

      </div>
    </div>
  );
};
