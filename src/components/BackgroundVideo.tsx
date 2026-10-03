import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/final.mp4';
const POSTER_URL = '/video-poster.webp';
const MODEL_URL = '/neha-model.webp';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(1.43);
  const currentSeekTimeRef = useRef<number>(1.43);
  const mouseXRatioRef = useRef<number>(0.5);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
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
        const t = window.setTimeout(start, 1000);
        cleanupIdle = () => window.clearTimeout(t);
      }
    }
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) start();
    };
    mq.addEventListener('change', onChange);
    return () => {
      cleanupIdle?.();
      mq.removeEventListener('change', onChange);
    };
  }, []);

  // Smooth mouse tracking with requestAnimationFrame interpolation
  useEffect(() => {
    if (!shouldLoad) return;

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth || 1;
      // Map horizontal cursor position (0 to 1) directly across screen width
      const ratio = Math.min(Math.max(e.clientX / width, 0), 1);
      mouseXRatioRef.current = ratio;
    };

    const handleMouseLeave = () => {
      // Return gaze smoothly to center when cursor leaves the window
      mouseXRatioRef.current = 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Continuous smooth interpolation loop
    let running = true;
    const tick = () => {
      if (!running) return;
      const video = videoRef.current;
      if (video && !isNaN(video.duration) && video.duration > 0) {
        // Target time: 0 (left) to duration (right)
        const target = mouseXRatioRef.current * video.duration;
        targetTimeRef.current = target;

        // Smooth damping towards target
        const diff = target - currentSeekTimeRef.current;
        if (Math.abs(diff) > 0.003) {
          currentSeekTimeRef.current += diff * 0.18;

          if (!isSeekingRef.current) {
            isSeekingRef.current = true;
            const seekTarget = currentSeekTimeRef.current;
            if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
              (video as unknown as { fastSeek: (t: number) => void }).fastSeek(seekTarget);
            } else {
              video.currentTime = seekTarget;
            }
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldLoad]);

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    // Catch up if there is still a noticeable lag
    if (Math.abs(video.currentTime - currentSeekTimeRef.current) > 0.02) {
      isSeekingRef.current = true;
      if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
        (video as unknown as { fastSeek: (t: number) => void }).fastSeek(currentSeekTimeRef.current);
      } else {
        video.currentTime = currentSeekTimeRef.current;
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && !isNaN(video.duration)) {
      // Start in the center (matching poster)
      const centerTime = video.duration * 0.5;
      targetTimeRef.current = centerTime;
      currentSeekTimeRef.current = centerTime;
      video.currentTime = centerTime;
    }
  };

  return (
    <>
      {/* Instant lightweight poster — paints in ~100KB while video defers. */}
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
      {/* Static model for phones/tablets — keeps character centered at every screen size */}
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
          preload="auto"
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

export default BackgroundVideo;
