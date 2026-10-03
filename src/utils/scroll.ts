import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  globalLenis = instance;
  if (typeof window !== 'undefined') {
    (window as unknown as { __lenis?: Lenis | null }).__lenis = instance;
  }
};

export const getLenis = (): Lenis | null => {
  return globalLenis;
};

export interface ScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

/**
 * Smoothly scrolls to a target (selector, number, or DOM element) using
 * Lenis if active, falling back to native window.scrollTo.
 */
export const scrollTo = (
  target: string | number | HTMLElement,
  options?: ScrollOptions
) => {
  const lenis = globalLenis;
  const offset = options?.offset ?? -80;
  const duration = options?.duration ?? 1.2;
  const immediate = options?.immediate ?? false;

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration,
      immediate,
      easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      onComplete: options?.onComplete ? () => options.onComplete!() : undefined,
    });
    return;
  }

  // Fallback for native scrolling (e.g. reduced motion or before Lenis inits)
  if (typeof target === 'number') {
    window.scrollTo({
      top: target,
      behavior: immediate ? 'auto' : 'smooth',
    });
  } else {
    const el =
      typeof target === 'string'
        ? target.startsWith('#')
          ? document.getElementById(target.slice(1)) || document.querySelector(target)
          : document.querySelector(target)
        : target;

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: immediate ? 'auto' : 'smooth',
      });
    }
  }
};

/**
 * Recalculate Lenis scroll dimensions. Useful after route transitions,
 * dynamic chunk loads, or image renders.
 */
export const resizeLenis = () => {
  if (globalLenis) {
    globalLenis.resize();
  }
};
