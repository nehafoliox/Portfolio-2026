import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/final.mp4';
const POSTER_URL = '/video-poster.webp';
const MODEL_URL = '/neha-model.webp';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const prevXRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Desktop-xl loads the interactive video (deferred until idle).
  // Phones/tablets show the static model image instead, so the video is
  // never fetched there. Skip entirely on data-saver / reduced-motion.
  useEffect(() => {
    const saveData =
      (navigator as unknown as { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (saveData || reduced) return;
    const mq = window.matchMedia('(min-width: 1280px)');

    const start = () => setShouldLoad(true);
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let cleanupIdle: (() => void) | undefined;
    if (mq.matches) {
      if (typeof w.requestIdleCallback === 'function') {
        const id = w.requestIdleCallback!(start, { timeout: 2500 });
        cleanupIdle = () => w.cancelIdleCallback?.(id);
      } else {
        const t = window.setTimeout(start, 1200);
        cleanupIdle = () => window.clearTimeout(t);
      }
    }
    // Handle resize/rotation into desktop range after initial load.
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) start();
    };
    mq.addEventListener('change', onChange);
    return () => {
      cleanupIdle?.();
      mq.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      
      const newTarget = targetTimeRef.current + timeOffset;
      targetTimeRef.current = Math.min(Math.max(newTarget, 0), video.duration);

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldLoad]);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.005) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      targetTimeRef.current = videoRef.current.currentTime || 0;
    }
  };

  return (
    <>
      {/* Instant lightweight poster — paints in ~2KB while video defers.
          Desktop-only; behavior unchanged. */}
      <img
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none hidden xl:block"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />
      {/* Static model for phones/tablets — flex-centered container +
          object-cover/object-center keeps the character centered at every
          screen size. Never fetched on desktop thanks
          to the media-gated source. */}
      <picture
        aria-hidden="true"
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none xl:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <source media="(max-width: 1279.5px)" srcSet={MODEL_URL} />
        <img
          src={MODEL_URL}
          alt=""
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-center"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </picture>
      {shouldLoad && (
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="metadata"
          poster={POSTER_URL}
          onSeeked={handleSeeked}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setReady(true)}
          className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none hidden xl:block"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            objectFit: 'cover',
            objectPosition: '70% center',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}
    </>
  );
};
