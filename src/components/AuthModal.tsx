import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User as UserIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validations
    if (mode === 'signup' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setSuccessMsg(mode === 'login' ? 'Welcome back to BharatGyan!' : 'Account created successfully!');
    setTimeout(() => {
      onSuccess({
        name: name.trim() || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
        email: email.trim()
      });
      onClose();
    }, 700);
  };

  const handleGuestLogin = () => {
    setError(null);
    setSuccessMsg('Signing in as Guest Scholar...');
    setTimeout(() => {
      onSuccess({
        name: 'Aryavart Scholar',
        email: 'scholar@bharatgyan.org'
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#172554] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-200">BharatGyan Portal</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-xl font-bold mt-2 font-serif text-white">
            {mode === 'login' ? 'Sign in to Your Learning Journey' : 'Create Your Free Scholar Account'}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Track module completions, save bookmarks, and test your knowledge.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-[#FF9933] text-[#172554] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'signup'
                ? 'border-[#FF9933] text-[#172554] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#172554] focus:ring-1 focus:ring-[#172554]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#172554] focus:ring-1 focus:ring-[#172554]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your email.')}
                    className="text-[11px] text-amber-700 hover:text-amber-900"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#172554] focus:ring-1 focus:ring-[#172554]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#FF9933] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#e88420] transition-colors shadow-xs"
            >
              {mode === 'login' ? 'Sign In' : 'Create Free Account'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-stone-400">or quick access</span>
            </div>
          </div>

          {/* Guest 1-Click Login */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-2 px-4 border border-stone-300 bg-stone-50 hover:bg-stone-100 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue as Guest Scholar (1-Click Demo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
