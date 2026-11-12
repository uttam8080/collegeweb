import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { AnimatedHeading } from './AnimatedText';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid academic or personal email address.');
      return;
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#172554] text-white relative overflow-hidden">
      {/* Subtle jaali pattern overlay */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-2">
          Weekly Indic Digest
        </span>
        <AnimatedHeading
          text="Stay Connected with Ancient Wisdom & Living Heritage"
          as="h2"
          className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight"
          highlightWords={['Wisdom', 'Heritage']}
          highlightClassName="text-amber-300"
        />
        <p className="text-sm sm:text-base text-stone-300 mt-3 max-w-xl mx-auto leading-relaxed">
          Receive curated weekly dispatches exploring newly translated manuscripts, historical archeological findings, and interactive lesson releases.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-400 text-emerald-200 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Namaste! You are subscribed to the BharatGyan weekly digest.</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 placeholder:text-stone-400 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF9933]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF9933] hover:bg-[#ea8422] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-amber-300 text-left pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}

          <p className="text-[11px] text-stone-400 mt-3">
            Zero spam. Unsubscribe anytime. Strictly educational dispatches.
          </p>
        </form>
      </div>
    </section>
  );
};
