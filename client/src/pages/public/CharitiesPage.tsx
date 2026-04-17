import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCharities } from '../../hooks/useCharities';
import { useDebounce } from '../../hooks/useDebounce';

export const CharitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: charities, isLoading } = useCharities(undefined, debouncedSearch);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Charity Partners</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Discover the incredible organizations supported by the Golf Platform community.</p>
        <div className="mt-8 max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search charities by name or description..."
            className="w-full px-6 py-3 border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 transition"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center"><p className="text-slate-500 animate-pulse">Loading charities...</p></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {charities?.map((charity: any) => (
            <div key={charity.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition hover:shadow-lg">
              {charity.image_url ? (
                <img src={charity.image_url} alt={charity.name} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 w-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400 font-medium">No Image</span>
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{charity.name}</h3>
                <p className="text-slate-600 text-sm flex-1 mb-6 line-clamp-3">{charity.description}</p>
                <Link to={`/charities/${charity.id}`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 text-sm mt-auto">
                  View full profile <span className="ml-1">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
          {charities?.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 text-lg">No charities found matching "{searchTerm}".</div>
          )}
        </div>
      )}
    </div>
  );
};
