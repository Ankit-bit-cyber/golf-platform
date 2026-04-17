import React from 'react';
import { ScoreEntryForm } from '../../components/scores/ScoreEntryForm';
import { ScoreList } from '../../components/scores/ScoreList';

export const ScoresPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Scores Management</h1>
        <p className="text-lg text-slate-600">Track and log your performance. The system securely maintains a rolling window of your 5 most recent scores.</p>
      </div>
      
      <div className="grid gap-10">
        <section>
          <ScoreEntryForm />
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Score History</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">Rolling 5 Maximum</span>
          </div>
          <ScoreList />
        </section>
      </div>
    </div>
  );
};
