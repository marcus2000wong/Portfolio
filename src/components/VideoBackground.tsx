import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  overlayOpacity?: number;
  deferMs?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  overlayOpacity = 0.2,
  deferMs = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const loadVideo = () => {
      video.src = src;
      video.load();
      void video.play().catch(() => undefined);
    };
    const timer = deferMs > 0 ? window.setTimeout(loadVideo, deferMs) : 0;
    if (!timer) loadVideo();

    return () => {
      if (timer) window.clearTimeout(timer);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [deferMs, src]);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload={deferMs > 0 ? 'metadata' : 'auto'}
        className="h-full w-full object-cover scale-105 opacity-90"
      />

      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};
