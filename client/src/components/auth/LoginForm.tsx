import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await axiosInstance.post('/auth/login', values);
      const { user, accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm bg-white/90">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 tracking-tight">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Email</label>
          <input 
            type="email" 
            {...register('email')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="admin@golfplatform.com"
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
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 disabled:opacity-50 font-semibold shadow-sm transition-colors mt-2"
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
