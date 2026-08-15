import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  type: 'star' | 'terrain' | 'figure1' | 'figure2' | 'touchPoint';
}

export const ParticleHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // --- INITIALIZE STIPPLED ARTWORK PARTICLES ---
    const initParticles = () => {
      particles.length = 0;

      const scale = Math.min(width, height) / 750;
      const centerX = width * 0.5;
      const centerY = height * 0.44;

      // 1. STARFIELD / COSMIC DUST
      for (let i = 0; i < 350; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.8,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.3 + 0.4,
          alpha: Math.random() * 0.5 + 0.15,
          baseAlpha: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
          type: 'star',
        });
      }

      // 2. UNDULATING DUNE / TERRAIN SWEEPS
      // Sweeping particle lines forming curved landscape
      const numLines = 45;
      const pointsPerLine = 120;

      for (let line = 0; line < numLines; line++) {
        const lineNorm = line / numLines; // 0 (back) to 1 (front)
        
        for (let pt = 0; pt < pointsPerLine; pt++) {
          const ptNorm = pt / pointsPerLine; // 0 (left) to 1 (right)

          // Curve equation for flowing mountain / dune contour
          const x = (ptNorm * 1.2 - 0.1) * width;
          const baseY = height * 0.52 + lineNorm * (height * 0.45);

          // Flowing wave profile
          const wave1 = Math.sin(ptNorm * Math.PI * 2.2 + lineNorm * 1.8) * (45 * scale);
          const wave2 = Math.cos(ptNorm * Math.PI * 4.5) * (18 * scale);
          const hillSlope = Math.pow(1 - ptNorm, 2) * (-90 * scale);

          const y = baseY + wave1 + wave2 + hillSlope;

          // Variable density & stipple noise
          const alpha = (1 - lineNorm * 0.4) * (Math.random() * 0.5 + 0.3);

          particles.push({
            x: x + (Math.random() - 0.5) * 3,
            y: y + (Math.random() - 0.5) * 3,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.3 + 0.6,
            alpha,
            baseAlpha: alpha,
            phase: ptNorm * 5 + lineNorm * 3,
            type: 'terrain',
          });
        }
      }

      // 3. TWO HUMANOID FIGURES (POINT CLOUD STIPPLING)
      // Figure 1 (Left): Reaching Right
      // Figure 2 (Right): Reaching Left
      // Touch Point: Middle where their extended hands meet

      const touchPointX = centerX;
      const touchPointY = centerY - 15 * scale;

      const generateHumanPoint = (
        figureType: 'figure1' | 'figure2',
        isLeftPerson: boolean
      ) => {
        const count = 1200;
        const figScale = scale * 1.1;
        const figCenterX = isLeftPerson ? touchPointX - 110 * figScale : touchPointX + 110 * figScale;
        const figCenterY = touchPointY + 80 * figScale;

        for (let i = 0; i < count; i++) {
          const randPart = Math.random();
          let rx = 0;
          let ry = 0;
          let pSize = Math.random() * 1.5 + 0.7;
          let pAlpha = Math.random() * 0.7 + 0.25;

          const dir = isLeftPerson ? 1 : -1;

          if (randPart < 0.12) {
            // Head
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * (15 * figScale);
            rx = Math.cos(angle) * radius;
            ry = -160 * figScale + Math.sin(angle) * radius;
          } else if (randPart < 0.22) {
            // Neck & Shoulders
            rx = (Math.random() - 0.5) * (34 * figScale);
            ry = -135 * figScale + (Math.random() - 0.5) * (10 * figScale);
          } else if (randPart < 0.55) {
            // Torso / Body
            const bodyYRatio = (ry + 130 * figScale) / (80 * figScale);
            const bodyWidth = (1 - bodyYRatio * 0.3) * (36 * figScale);
            rx = (Math.random() - 0.5) * bodyWidth;
            ry = -130 * figScale + Math.random() * (75 * figScale);
          } else if (randPart < 0.78) {
            // Legs / Stance
            const isLeftLeg = Math.random() > 0.5;
            const legOffsetX = isLeftLeg ? -9 * figScale : 9 * figScale;
            rx = legOffsetX + (Math.random() - 0.5) * (16 * figScale);
            ry = -55 * figScale + Math.random() * (120 * figScale);
          } else {
            // Extended Arm reaching to touch point
            const armProgress = Math.random(); // 0 at shoulder, 1 at touch point
            const shoulderX = 14 * figScale * dir;
            const shoulderY = -128 * figScale;

            const targetX = touchPointX - figCenterX;
            const targetY = touchPointY - figCenterY;

            rx = shoulderX + (targetX - shoulderX) * armProgress + (Math.random() - 0.5) * (10 * figScale * (1 - armProgress * 0.7));
            ry = shoulderY + (targetY - shoulderY) * armProgress + (Math.random() - 0.5) * (10 * figScale * (1 - armProgress * 0.7));

            if (armProgress > 0.85) {
              pAlpha = Math.random() * 0.4 + 0.6;
              pSize = Math.random() * 1.8 + 1.0;
            }
          }

          const px = figCenterX + rx;
          const py = figCenterY + ry;

          particles.push({
            x: px + (Math.random() - 0.5) * 3,
            y: py + (Math.random() - 0.5) * 3,
            baseX: px,
            baseY: py,
            vx: 0,
            vy: 0,
            size: pSize,
            alpha: pAlpha,
            baseAlpha: pAlpha,
            phase: Math.random() * Math.PI * 2,
            type: figureType,
          });
        }
      };

      generateHumanPoint('figure1', true);
      generateHumanPoint('figure2', false);

      // 4. ENERGY TOUCH POINT PARTICLES AT HAND CONTACT
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.sqrt(Math.random()) * (18 * scale);
        const px = touchPointX + Math.cos(angle) * dist;
        const py = touchPointY + Math.sin(angle) * dist;

        particles.push({
          x: px,
          y: py,
          baseX: px,
          baseY: py,
          vx: Math.cos(angle) * (Math.random() * 0.4),
          vy: Math.sin(angle) * (Math.random() * 0.4),
          size: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.8 + 0.2,
          baseAlpha: Math.random() * 0.8 + 0.2,
          phase: Math.random() * Math.PI * 2,
          type: 'touchPoint',
        });
      }
    };

    initParticles();

    // --- ANIMATION ENGINE ---
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.018;

      ctx.clearRect(0, 0, width, height);

      // Deep dark cosmic background fill
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.type === 'star') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height * 0.8;
          if (p.y > height * 0.8) p.y = 0;

          p.alpha = p.baseAlpha + Math.sin(time * 1.8 + p.phase) * 0.25;
        } else if (p.type === 'terrain') {
          // Gently wave landscape terrain up and down
          const waveOffsetY = Math.sin(time + p.phase) * 2.0;
          const targetY = p.baseY + waveOffsetY;

          // Interactive mouse force
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 30;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 0.1;
            p.vy -= Math.sin(angle) * force * 0.1;
          }

          p.vx += (p.baseX - p.x) * 0.05;
          p.vy += (targetY - p.y) * 0.05;
          p.vx *= 0.86;
          p.vy *= 0.86;

          p.x += p.vx;
          p.y += p.vy;

          p.alpha = Math.max(0.05, p.baseAlpha + Math.sin(time * 1.2 + p.phase) * 0.12);
        } else if (p.type === 'touchPoint') {
          // Radiating spark effect at touch point
          const pulse = Math.sin(time * 3 + p.phase);
          p.x = p.baseX + Math.cos(p.phase) * pulse * 4;
          p.y = p.baseY + Math.sin(p.phase) * pulse * 4;

          p.alpha = Math.max(0.1, p.baseAlpha + pulse * 0.3);
        } else {
          // Human Figures stippled particle shimmer & living breath
          const breatheX = Math.sin(time * 1.1 + p.phase) * 1.0;
          const breatheY = Math.cos(time * 1.1 + p.phase) * 1.0;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 38;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 0.12;
            p.vy -= Math.sin(angle) * force * 0.12;
          }

          p.vx += (p.baseX + breatheX - p.x) * 0.08;
          p.vy += (p.baseY + breatheY - p.y) * 0.08;
          p.vx *= 0.82;
          p.vy *= 0.82;

          p.x += p.vx;
          p.y += p.vy;

          p.alpha = Math.max(0.1, Math.min(1.0, p.baseAlpha + Math.sin(time * 2.5 + p.phase) * 0.2));
        }

        // Render stippled point
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.3, p.size), 0, Math.PI * 2);

        if (p.type === 'touchPoint') {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 6;
        } else if (p.type === 'terrain') {
          ctx.fillStyle = `rgba(240, 245, 255, ${Math.max(0, p.alpha)})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
};
