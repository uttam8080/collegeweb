import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Animate words sliding up from an overflow hidden container
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
 * Animate subtle text fade up on scroll
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
      y: options?.distance ?? 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.75,
      stagger: options?.stagger ?? 0.08,
      delay: options?.delay ?? 0,
      ease: 'power2.out',
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
