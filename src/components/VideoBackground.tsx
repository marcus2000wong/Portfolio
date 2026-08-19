import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

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

    let hls: Hls | null = null;

    const isHls = src.includes('.m3u8');

    // MP4 / normal video
    if (!isHls) {
      video.src = src;
      video.load();

      video.play().catch((err) => {
        console.log('Autoplay handled:', err);
      });

      return;
    }

    // HLS video
    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.log('Autoplay handled:', err);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;

      video.addEventListener(
        'loadedmetadata',
        () => {
          video.play().catch((err) => {
            console.log('Autoplay handled:', err);
          });
        },
        { once: true }
      );
    }

    return () => {
      hls?.destroy();
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