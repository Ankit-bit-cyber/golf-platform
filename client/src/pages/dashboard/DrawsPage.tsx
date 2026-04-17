// import React from 'react';
import { useMyResults } from '../../hooks/useDraws';

export const DrawsPage = () => {
  const { data: results, isLoading, error } = useMyResults();

  if (isLoading) return <div className="max-w-5xl mx-auto py-12 px-4 text-center text-slate-400 animate-pulse text-lg font-medium">Scraping historical engine outputs connecting your matrices natively...</div>;
  if (error) return <div className="max-w-5xl mx-auto py-12 px-4 text-center text-red-500 font-bold border border-red-200 bg-red-50 rounded-xl">Connection fault resolving draw history results. Refractoring parameters dynamically failed.</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Historical Sweepstakes</h1>
        <p className="text-lg text-slate-600">Track and analyze previous published algorithmic outcomes mathematically mapped transparently against your locked transactional structural core snapshotted arrays!</p>
      </div>

      <div className="grid gap-10">
        {results?.length === 0 && (
          <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl text-slate-400">📊</span></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Draw History Detected</h3>
            <p className="text-slate-500 max-w-md mx-auto">Participate dynamically actively filling Score schemas triggering mappings against our procedural Engine correctly mapped to the server algorithm schedules.</p>
          </div>
        )}

        {results?.map((res: any, idx: number) => {
          const { draw, scores, winner } = res;
          if (draw.status !== 'PUBLISHED') return null;

          return (
            <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row transition hover:-translate-y-1 hover:shadow-md duration-300">

              <div className="bg-slate-900 p-10 lg:w-72 border-b lg:border-b-0 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
                <h3 className="relative text-xs font-extrabold text-blue-400 uppercase tracking-[0.3em] mb-2 z-10 w-full">Draw Epoch Segment</h3>
                <p className="relative text-5xl font-extrabold text-white z-10 w-full break-normal">{draw.month} <span className="text-slate-500 font-light mx-1">/</span> {draw.year}</p>
                <span className="relative mt-6 px-4 py-1.5 bg-blue-600 text-blue-50 text-xs font-bold rounded-full uppercase tracking-wider z-10 w-full shadow border border-blue-500 block max-w-max">Results Published</span>
              </div>

              <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center gap-10">

                <div className="flex flex-col gap-3">
                  <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Master Server Sequenced Results</label>
                  <div className="flex flex-wrap gap-3">
                    {draw.winning_nums.map((n: number, i: number) => (
                      <span key={`w-${i}`} className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-950 font-extrabold rounded-full shadow border border-yellow-400 text-xl">{n}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center">
                    Your Snapshot Variables
                    <span className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] tracking-normal capitalize border border-slate-200">Immutable Integrity</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {scores.map((s: number, i: number) => {
                      const isMatch = draw.winning_nums.includes(s);
                      return (
                        <span key={`s-${i}`} className={`relative w-12 h-12 flex items-center justify-center font-extrabold rounded-full border shadow-sm text-xl transition-all ${isMatch ? 'bg-blue-600 text-white border-blue-700 ring-4 ring-blue-100 z-10 scale-110' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          {s}
                        </span>
                      )
                    })}
                  </div>
                </div>

              </div>

              <div className={`p-10 lg:w-80 flex flex-col justify-center items-center text-center ${winner ? 'bg-emerald-50 border-t lg:border-t-0 lg:border-l border-emerald-100 relative' : 'bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100'}`}>
                {winner ? (
                  <>
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                    <span className="text-6xl mb-4 relative z-10 drop-shadow-md">🏆</span>
                    <h4 className="text-2xl font-extrabold text-emerald-900 relative z-10 tracking-tight">Prize Locked!</h4>
                    <p className="text-sm text-emerald-700 font-bold mb-5 mt-1 relative z-10">Algorithms verified {winner.match_type.toLowerCase()} accurate procedural overlaps organically.</p>
                    <span className="px-5 py-3 bg-emerald-600 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 text-xl relative z-10 border border-emerald-500 w-full tracking-wide">
                      ₹ {Number(winner.prize_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-full border border-slate-200 flex items-center justify-center mb-5 shadow-sm"><span className="text-slate-300 text-2xl">⏳</span></div>
                    <h4 className="text-xl font-bold text-slate-800">Missed Connection</h4>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">Your scores did not intersect correctly across this month's generated sequences natively. Try updating frequency logs dynamically.</p>
                  </>
                )}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
};
