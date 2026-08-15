import React, { useEffect, useRef } from 'react';

type ParticleShape = 'circle' | 'square' | 'triangle' | 'cross';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  shape: ParticleShape;
  alpha: number;
  blue: boolean;
};

const shapes: ParticleShape[] = ['circle', 'square', 'triangle', 'cross'];

export const ContactParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const pointer = { x: -1000, y: -1000, active: false };
    let particles: Particle[] = [];
    let frame = 0;
    let previousTime = performance.now();
    let width = 0;
    let height = 0;
    let visible = false;
    let hasEntered = false;

    const seedParticles = () => {
      const count = Math.min(290, Math.max(150, Math.floor((width * height) / 5800)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: hasEntered ? Math.random() * height : -24 - Math.random() * height * 0.75,
        vx: (Math.random() - 0.5) * 0.82,
        vy: 0.8 + Math.random() * 2.1,
        size: 18 + Math.random() * 28.8,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.012,
        shape: shapes[index % shapes.length],
        alpha: 0.45 + Math.random() * 0.48,
        blue: Math.random() > 0.8,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height;
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    const drawParticle = (particle: Particle) => {
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.blue ? '#8f9aff' : '#ffffff';
      context.strokeStyle = particle.blue ? '#8f9aff' : '#ffffff';
      context.lineWidth = Math.max(1, particle.size * 0.42);

      if (particle.shape === 'circle') {
        context.beginPath();
        context.arc(0, 0, particle.size, 0, Math.PI * 2);
        context.fill();
      } else if (particle.shape === 'square') {
        context.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
      } else if (particle.shape === 'triangle') {
        context.beginPath();
        context.moveTo(0, -particle.size * 1.25);
        context.lineTo(particle.size * 1.15, particle.size);
        context.lineTo(-particle.size * 1.15, particle.size);
        context.closePath();
        context.fill();
      } else {
        context.beginPath();
        context.moveTo(-particle.size * 1.35, 0);
        context.lineTo(particle.size * 1.35, 0);
        context.moveTo(0, -particle.size * 1.35);
        context.lineTo(0, particle.size * 1.35);
        context.stroke();
      }
      context.restore();
    };

    const animate = (time: number) => {
      if (!visible) return;
      const delta = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.vy = Math.min(particle.vy + 0.038 * delta, 6.9);

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const radius = 116;
          if (distance < radius) {
            const force = ((radius - distance) / radius) * 1.42 * delta;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= 0.993;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.rotation += particle.spin * delta;

        const inset = particle.size * 1.5;
        if (particle.x < inset) {
          particle.x = inset;
          particle.vx = Math.abs(particle.vx) * 0.72;
        } else if (particle.x > width - inset) {
          particle.x = width - inset;
          particle.vx = -Math.abs(particle.vx) * 0.72;
        }

        const floor = height - inset;
        if (particle.y > floor) {
          particle.y = floor;
          particle.vy = particle.vy < 0.8 ? 0 : particle.vy * -0.16;
          particle.vx *= 0.68;
        }

        drawParticle(particle);
      }
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const minimumDistance = (particle.size + other.size) * 1.08;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > 0 && distanceSquared < minimumDistance * minimumDistance) {
            const distance = Math.sqrt(distanceSquared);
            const overlap = (minimumDistance - distance) * 0.5;
            const normalX = dx / distance;
            const normalY = dy / distance;
            particle.x -= normalX * overlap;
            particle.y -= normalY * overlap;
            other.x += normalX * overlap;
            other.y += normalY * overlap;
            const impulse = (other.vx - particle.vx) * normalX + (other.vy - particle.vy) * normalY;
            if (impulse < 0) {
              particle.vx += impulse * normalX * 0.08;
              particle.vy += impulse * normalY * 0.08;
              other.vx -= impulse * normalX * 0.08;
              other.vy -= impulse * normalY * 0.08;
            }
          }
        }
      }
      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!hasEntered) {
            hasEntered = true;
            particles.forEach((particle) => {
              particle.y = -24 - Math.random() * height * 0.75;
              particle.vy = 0.9 + Math.random() * 2.55;
            });
          }
          previousTime = performance.now();
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.18 },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onPointerLeave, { passive: true });
    resize();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true" />;
};
