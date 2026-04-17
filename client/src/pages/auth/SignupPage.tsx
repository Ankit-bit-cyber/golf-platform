import React from 'react';
import { SignupForm } from '../../components/auth/SignupForm';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900">Golf Platform</h1>
      </div>
      <SignupForm />
      <p className="mt-4 text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
};
