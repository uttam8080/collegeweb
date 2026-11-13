import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#07130b] text-white p-6 font-sans">
          <div className="max-w-lg w-full bg-[#0b2214] border border-emerald-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
              TAT
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              TEKKZY College of Technology
            </h1>
            <p className="text-sm text-emerald-200/80 mb-6">
              A temporary rendering issue occurred. Click below to return to the homepage.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/#home';
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-semibold text-sm shadow-lg transition-all cursor-pointer"
            >
              Return to Campus Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

