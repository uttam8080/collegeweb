import React, { useState } from 'react';
import { ShlokaInsight } from '../types';
import { Volume2, VolumeX, Copy, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  shloka: ShlokaInsight;
}

export const ShlokaPlayer: React.FC<Props> = ({ shloka }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      soundEngine.playDrone(8, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shloka.sanskrit}\n\n${shloka.transliteration}\n\nTranslation: ${shloka.translation} (${shloka.source})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] p-6 sm:p-8 shadow-xs relative overflow-hidden">
      {/* Decorative Corner Mandala Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#d4af3720_1px,transparent_1px)] [background-size:12px_12px] rounded-bl-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-4 mb-6">
        <div className="text-xs font-semibold text-amber-800 tracking-wide uppercase">
          <span>Classical Shloka &amp; Philosophical Insight</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg hover:border-stone-300 transition-colors"
            title="Copy Sanskrit verse & translation"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Verse'}</span>
          </button>

          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isPlaying
                ? 'bg-[#172554] text-white shadow-xs'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Meditative Drone' : 'Recite & Listen'}</span>
          </button>
        </div>
      </div>

      {/* Sanskrit Verse Card */}
      <div className="text-center py-2">
        <p className="text-2xl sm:text-3xl font-serif text-[#172554] leading-relaxed tracking-wide whitespace-pre-line mb-4 font-medium">
          {shloka.sanskrit}
        </p>

        {/* Animated Sound Wave if playing */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1 mb-4 h-5">
            <span className="w-1 bg-[#D4AF37] h-3 animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
            <span className="w-1 bg-[#FF9933] h-5 animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
            <span className="w-1 bg-[#172554] h-2 animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
            <span className="w-1 bg-[#D4AF37] h-4 animate-bounce rounded-full" style={{ animationDelay: '450ms' }} />
            <span className="w-1 bg-[#138808] h-3 animate-bounce rounded-full" style={{ animationDelay: '200ms' }} />
            <span className="text-[11px] font-mono text-amber-800 ml-2">Indian Tanpura C# Drone Resonance Active</span>
          </div>
        )}

        {/* Transliteration */}
        <p className="text-xs sm:text-sm font-mono text-stone-600 italic tracking-wide max-w-xl mx-auto mb-5">
          {shloka.transliteration}
        </p>

        {/* Translation */}
        <div className="bg-white/80 border border-amber-200/80 rounded-xl p-4 max-w-2xl mx-auto text-left mb-4 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">Authentic Translation:</span>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            "{shloka.translation}"
          </p>
          <span className="text-xs text-stone-500 block text-right mt-1.5 font-serif italic">
            — {shloka.source}
          </span>
        </div>

        {/* Philosophical Context */}
        <p className="text-xs text-stone-600 max-w-2xl mx-auto text-left leading-relaxed">
          <strong className="text-stone-800">Philosophical Context:</strong> {shloka.philosophicalContext}
        </p>
      </div>
    </div>
  );
};
