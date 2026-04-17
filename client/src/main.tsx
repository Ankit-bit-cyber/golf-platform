import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.options.meta?.successMessage) {
                toast.success(mutation.options.meta.successMessage as string);
            } else {
                toast.success('System action resolved logically smoothly constraints gracefully!');
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || error.message || 'Logical bounds rejected implicitly structurally.');
        }
    }),
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
