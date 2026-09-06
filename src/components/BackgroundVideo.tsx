import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/final.mp4';
const POSTER_URL = '/video-poster.webp';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const prevXRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Defer video load until browser is idle + skip on data-saver /
  // reduced-motion. NOTE: mobile is NOT skipped anymore — the video's first
  // frame IS the hero avatar, and the old black 2KB poster left phones with
  // a blank hero. Metadata + first frame is cheap; mouse-scrub stays
  // desktop-only (pointer:fine) below.
  useEffect(() => {
    const saveData =
      (navigator as unknown as { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (saveData || reduced) return;

    const start = () => setShouldLoad(true);
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback!(start, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    // Touch devices have no hover — scrubbing would fight native scroll,
    // so only enable mouse-scrub where a fine pointer exists.
    if (!window.matchMedia('(pointer: fine)').matches) return;
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
          .hero-media centers the avatar on phones (50% 28%) and keeps the
          desktop 70% framing — see index.css. */}
      <img
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="hero-media fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />
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
          className="hero-media fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}
    </>
  );
};
