import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  overlayOpacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  overlayOpacity = 0.2,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    video.src = src;
    video.load();
    void video.play().catch(() => undefined);

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [src]);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
