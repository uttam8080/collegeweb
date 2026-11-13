import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/** Utility for clean class merging */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}

/** Hook to handle media queries for responsive columns */
export const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const match = queries.findIndex(q => window.matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

/** Hook to measure element size via ResizeObserver */
export const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

/** Utility to ensure images are loaded before layout/animation */
const preloadImages = async (urls: string[]): Promise<void> => {
  const validUrls = urls.filter(Boolean);
  if (validUrls.length === 0) return;
  await Promise.all(
    validUrls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string;
  img?: string;
  url?: string;
  height: number;
  title?: string;
  [key: string]: any;
}

export interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryGalleryProps<T extends MasonryItem = MasonryItem> {
  /** Array of items to display in the gallery */
  items: T[];
  /** GSAP easing function */
  ease?: string;
  /** Duration of movement animations */
  duration?: number;
  /** Stagger delay between item animations */
  stagger?: number;
  /** Direction from which items enter the screen */
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  /** Whether to scale items on hover */
  scaleOnHover?: boolean;
  /** Scale factor for hover state */
  hoverScale?: number;
  /** Whether to apply a blur-to-focus entry effect */
  blurToFocus?: boolean;
  /** Whether to show a color overlay on hover */
  colorShiftOnHover?: boolean;
  /** Custom column count override or responsive breakpoints */
  columnOverride?: number;
  /** CSS class for the container */
  className?: string;
  /** CSS class for individual item containers */
  itemClassName?: string;
  /** Click handler for items */
  onItemClick?: (item: T) => void;
  /** Custom render function for rich item content (e.g., Company cards) */
  renderItem?: (item: T, isHovered: boolean) => React.ReactNode;
}

export const MasonryGallery = <T extends MasonryItem = MasonryItem>({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  colorShiftOnHover = false,
  columnOverride,
  className,
  itemClassName,
  onItemClick,
  renderItem
}: MasonryGalleryProps<T>) => {
  const responsiveColumns = useMedia(
    ['(min-width: 1440px)', '(min-width: 1024px)', '(min-width: 640px)', '(min-width: 440px)'],
    [4, 3, 2, 2],
    1
  );

  const columns = columnOverride || responsiveColumns;

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hasMounted = useRef(false);

  // Initial animation calculations
  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y + 120 };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as any;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: item.y - 200 };
      case 'bottom':
        return { x: item.x, y: item.y + 200 };
      case 'left':
        return { x: item.x - 200, y: item.y };
      case 'right':
        return { x: item.x + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: item.y
        };
      default:
        return { x: item.x, y: item.y + 120 };
    }
  };

  // Preload logic
  useEffect(() => {
    const urls = items.map(i => i.img).filter(Boolean) as string[];
    if (urls.length > 0) {
      preloadImages(urls).then(() => setImagesReady(true));
    } else {
      setImagesReady(true);
    }
  }, [items]);

  // Layout calculation
  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as (T & GridItem)[], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 20; // 20px gap for elegant breathing room
    const totalGaps = (columns - 1) * gap;
    const columnWidth = Math.max((width - totalGaps) / columns, 100);

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      // Height calculation respecting aspect ratio or natural item height
      const height = child.height ? (child.height / 360) * columnWidth : columnWidth * 1.1;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridItems, containerHeight: Math.max(...colHeights, 300) };
  }, [columns, items, width]);

  // Animation logic
  useLayoutEffect(() => {
    if (!imagesReady || !grid.length || !containerRef.current) return;

    grid.forEach((item, index) => {
      const escapedId = CSS.escape ? CSS.escape(item.id) : item.id;
      const element = containerRef.current?.querySelector(`[data-key="${escapedId}"]`) as HTMLElement | null;
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(20px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 1.0,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(element, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    if (grid.length > 0) hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    setHoveredId(id);
    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.35 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    setHoveredId(null);
    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.35 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full transition-all duration-300', className)}
      style={{ height: `${containerHeight}px`, minHeight: '400px' }}
    >
      {grid.map(item => {
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            data-key={item.id}
            className={cn(
              'absolute top-0 left-0 overflow-hidden cursor-pointer rounded-2xl transition-shadow hover:shadow-2xl',
              itemClassName
            )}
            style={{
              willChange: 'transform, width, height, opacity, filter',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)'
            }}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item);
              } else if (item.url) {
                window.open(item.url, '_blank', 'noopener');
              }
            }}
            onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
          >
            {renderItem ? (
              renderItem(item, isHovered)
            ) : (
              <>
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: item.img ? `url(${item.img})` : undefined }}
                >
                  {colorShiftOnHover && (
                    <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-teal-500/30 to-indigo-500/30 opacity-0 pointer-events-none transition-opacity" />
                  )}
                </div>
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium uppercase tracking-wider">{item.title}</p>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MasonryGallery;
