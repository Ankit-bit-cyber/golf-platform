import React from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900">Golf Platform</h1>
      </div>
      <LoginForm />
      <p className="mt-4 text-sm text-slate-600">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
};
