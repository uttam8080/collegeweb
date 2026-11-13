import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Animate words sliding up from an overflow hidden container with 3D perspective
 */
export const animateWordsUp = (
  container: HTMLElement | null,
  options?: {
    stagger?: number;
    duration?: number;
    delay?: number;
    yOffset?: number | string;
    trigger?: HTMLElement | null;
  }
) => {
  if (!container) return;

  const words = container.querySelectorAll('.word-inner');
  if (!words.length) return;

  const tl = gsap.timeline({
    scrollTrigger: options?.trigger
      ? {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      : undefined,
  });

  tl.fromTo(
    words,
    {
      y: options?.yOffset ?? '110%',
      opacity: 0,
      rotateX: -20,
    },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: options?.duration ?? 0.85,
      stagger: options?.stagger ?? 0.04,
      ease: 'power3.out',
      delay: options?.delay ?? 0.05,
    }
  );

  return tl;
};

/**
 * Animate subtle text and elements fade up on scroll
 */
export const animateFadeUp = (
  elements: string | Element | Element[] | NodeListOf<Element>,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    distance?: number;
    trigger?: HTMLElement | null;
  }
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.distance ?? 28,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.06,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: options?.trigger
        ? {
            trigger: options.trigger,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

/**
 * React Hook: Automatically activates GSAP text and heading entrance animations
 * across every page container with ScrollTrigger and Lenis smooth scroll synchronization.
 */
export const usePageTextAnimations = (containerRef: RefObject<HTMLElement | null>, deps: any[] = []) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Kinetic heading reveals on scroll (h1, h2, h3, h4)
      const headings = containerRef.current?.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, .gsap-reveal-title, [data-animate="heading"]'
      );

      headings?.forEach((heading) => {
        // Skip elements that explicitly opt out or belong to headers/navs
        if (heading.hasAttribute('data-no-gsap')) return;
        if (heading.closest('nav') || heading.closest('header')) return;

        const rect = heading.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

        if (isAboveFold) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          );
        } else {
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 35,
              rotateX: -6,
              transformOrigin: '50% 100%',
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      });

      // 2. Subtitle, eyebrow pills, and descriptive paragraphs stagger entrance on scroll
      const textBlocks = containerRef.current?.querySelectorAll<HTMLElement>(
        'p, .gsap-fade-up, .gsap-badge, .gsap-text, blockquote'
      );

      textBlocks?.forEach((block) => {
        if (block.hasAttribute('data-no-gsap')) return;
        // Don't animate navigation, headers, footers, buttons, or ticker items
        if (
          block.closest('nav') || 
          block.closest('header') || 
          block.closest('footer') || 
          block.closest('button') ||
          block.closest('.ticker-track')
        ) {
          return;
        }

        const rect = block.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

        if (isAboveFold) {
          gsap.fromTo(
            block,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
          );
        } else {
          gsap.fromTo(
            block,
            {
              opacity: 0,
              y: 22,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      });

      // 3. Refresh ScrollTrigger after DOM settle for Lenis accuracy
      const timer1 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      const timer2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 450);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, deps);
};
