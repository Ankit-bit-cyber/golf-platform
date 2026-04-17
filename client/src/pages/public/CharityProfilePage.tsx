import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharity } from '../../hooks/useCharities';

export const CharityProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: charity, isLoading, error } = useCharity(id!);

  if (isLoading) return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-slate-500 animate-pulse">Loading profile...</div>;
  if (error || !charity) return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-red-500 font-medium">Error: Charity not found.</div>;

  const events = charity.events || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/charities" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition mb-6 inline-block">&larr; Back to all charities</Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {charity.image_url && (
          <div className="w-full h-80 bg-slate-100 overflow-hidden">
            <img src={charity.image_url} alt={charity.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{charity.name}</h1>
              {charity.website && (
                <a href={charity.website} target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-600 font-medium hover:underline text-lg">
                  Visit Official Website <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              )}
            </div>
            <Link to="/signup" className="shrink-0 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition hover:shadow-lg text-center text-lg">
              Support This Charity
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">About the Cause</h3>
              <div className="prose prose-slate prose-lg text-slate-700 leading-relaxed font-normal">
                {charity.description.split('\n').map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Upcoming Events
                </h3>
                {events.length > 0 ? (
                  <ul className="space-y-4">
                    {events.map((event: any, idx: number) => (
                      <li key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-slate-900 mb-1">{event.title}</h4>
                        <span className="text-sm text-slate-500 font-medium">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 text-sm">No upcoming events listed.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
