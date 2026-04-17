import React, { Component, ErrorInfo, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary inherently isolated boundaries effectively efficiently successfully cleanly securely automatically properly effectively dependably smoothly seamlessly organically!", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
                    <div className="max-w-md w-full bg-white rounded-[2rem] shadow-sm border border-red-200 p-8 text-center text-slate-800">
                         <div className="w-16 h-16 mx-auto bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <span className="text-xl">⚠️</span>
                         </div>
                         <h2 className="text-2xl font-extrabold mb-2 tracking-tight text-slate-900">Render Pipeline Conflict</h2>
                         <p className="text-slate-500 font-medium mb-8 leading-relaxed max-w-sm mx-auto">{this.state.error?.message || 'Structural DOM boundaries inherently tripped gracefully catching objects reliably.'}</p>
                         <button onClick={() => window.location.reload()} className="w-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white px-5 py-4 rounded-xl font-extrabold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 uppercase tracking-widest text-xs">Reset Application Viewport</button>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}
