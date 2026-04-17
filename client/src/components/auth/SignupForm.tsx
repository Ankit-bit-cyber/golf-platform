import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  plan: z.enum(['MONTHLY', 'YEARLY']),
  charity_id: z.string().uuid('Please select a charity').optional(),
});

type SignupValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [charities, setCharities] = useState<any[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { plan: 'MONTHLY' }
  });

  useEffect(() => {
    axiosInstance.get('/charities').then((res) => {
      setCharities(res.data);
    }).catch(console.error);
  }, []);

  const onSubmit = async (values: SignupValues) => {
    try {
      const response = await axiosInstance.post('/auth/register', values);
      const { user, accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm bg-white/90">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 tracking-tight">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Full Name</label>
          <input 
            {...register('name')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Email</label>
          <input 
            type="email" 
            {...register('email')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Password</label>
          <input 
            type="password" 
            {...register('password')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Select Charity</label>
          <select 
            {...register('charity_id')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white transition-all appearance-none"
          >
            <option value="">Select a charity...</option>
            {charities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.charity_id && <p className="text-sm text-red-500 mt-1">{errors.charity_id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Subscription Plan</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-3 border-2 border-slate-100 p-4 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-slate-300 flex-1 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <input type="radio" value="MONTHLY" {...register('plan')} className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-2" />
              <span className="font-medium text-slate-700">Monthly <span className="text-slate-400 block text-sm font-normal">($10/mo)</span></span>
            </label>
            <label className="flex items-center space-x-3 border-2 border-slate-100 p-4 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-slate-300 flex-1 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <input type="radio" value="YEARLY" {...register('plan')} className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-2" />
              <span className="font-medium text-slate-700">Yearly <span className="text-slate-400 block text-sm font-normal">($100/mo)</span></span>
            </label>
          </div>
          {errors.plan && <p className="text-sm text-red-500 mt-1">{errors.plan.message}</p>}
        </div>

        {error && <p className="text-sm text-red-500 font-medium p-3 bg-red-50/80 rounded-md border border-red-100">{error}</p>}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 disabled:opacity-50 font-semibold shadow-sm transition-colors mt-4 text-lg"
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};
