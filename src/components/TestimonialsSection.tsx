import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { AnimatedHeading } from './AnimatedText';
import { gsap } from '../utils/animations';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            Community Voices · Sample Scholar Perspectives
          </span>
          <AnimatedHeading
            text="Loved by Students & Researchers Worldwide"
            as="h2"
            className="text-3xl sm:text-4xl font-serif font-bold text-[#172554] tracking-tight"
          />
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Hear how educators, students, and independent thinkers experience the depth of Indian heritage through BharatGyan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="testimonial-card p-7 rounded-2xl border border-stone-200 bg-[#FAF9F5] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">
                    {item.role} · {item.institution}
                  </p>
                  <span className="text-[10px] text-amber-800 font-medium">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
