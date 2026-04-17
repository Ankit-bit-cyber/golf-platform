import React from 'react';
import { Link } from 'react-router-dom';
import { useCharities } from '../../hooks/useCharities';

export const LandingPage = () => {
  const { data: featuredCharities, isLoading } = useCharities(true);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587334274328-64186a80aee6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Golf With Purpose.</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join the premium golf community where every subscription contributes directly to charities making a real difference in the world.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-slate-100 transition text-lg">
              Get Started
            </Link>
            <Link to="/charities" className="px-8 py-4 bg-blue-800 border border-blue-700 text-white font-bold rounded-full shadow hover:bg-blue-700 transition text-lg">
              View Charities
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Charities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Featured Charitable Partners</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Your membership fuels organizations striving to change lives. Here are a few featured funds currently active on our platform.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><p className="text-slate-400 animate-pulse font-medium">Loading featured charities...</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCharities?.map((charity: any) => (
              <Link key={charity.id} to={`/charities/${charity.id}`} className="block group">
                <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  {charity.image_url ? (
                    <img src={charity.image_url} alt={charity.name} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-48 w-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 font-medium">No Image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{charity.name}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{charity.description}</p>
                  </div>
                </div>
              </Link>
            ))}
            {featuredCharities?.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">More featured charities coming soon!</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
