import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  duration?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  immediate?: boolean;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  as = 'h2',
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  highlightWords = [],
  highlightClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-amber-600 to-[#D4AF37]',
  immediate = false,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word-inner');
    if (!words.length) return;

    let ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          words,
          {
            y: '115%',
            opacity: 0,
            rotateZ: 2,
          },
          {
            y: '0%',
            opacity: 1,
            rotateZ: 0,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
          }
        );
      } else {
        gsap.fromTo(
          words,
          {
            y: '115%',
            opacity: 0,
            rotateZ: 2,
          },
          {
            y: '0%',
            opacity: 1,
            rotateZ: 0,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration, immediate, stagger]);

  const words = text.split(' ');

  const content = words.map((word, index) => {
    // Check if word or clean word matches highlight
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
    const isHighlighted = highlightWords.some(
      (hw) => hw.toLowerCase() === word.toLowerCase() || hw.toLowerCase() === cleanWord.toLowerCase()
    );

    return (
      <span
        key={index}
        className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0 py-0.5"
      >
        <span
          className={`word-inner inline-block will-change-transform ${
            isHighlighted ? highlightClassName : ''
          }`}
        >
          {word}
        </span>
      </span>
    );
  });

  if (as === 'h1') return <h1 ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`${className} tracking-tight`}>{content}</h1>;
  if (as === 'h3') return <h3 ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`${className} tracking-tight`}>{content}</h3>;
  if (as === 'h4') return <h4 ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`${className} tracking-tight`}>{content}</h4>;
  if (as === 'p') return <p ref={containerRef as unknown as React.RefObject<HTMLParagraphElement>} className={`${className} tracking-tight`}>{content}</p>;
  if (as === 'span') return <span ref={containerRef as unknown as React.RefObject<HTMLSpanElement>} className={`${className} tracking-tight`}>{content}</span>;
  return <h2 ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`${className} tracking-tight`}>{content}</h2>;
};

interface FadeInTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  immediate?: boolean;
}

export const FadeInText: React.FC<FadeInTextProps> = ({
  children,
  className = '',
  delay = 0.1,
  duration = 0.7,
  yOffset = 20,
  immediate = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset },
          { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, duration, immediate, yOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
