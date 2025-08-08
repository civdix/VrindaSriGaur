// components/backgrounds/dark-ocean-canvas.tsx
import React, { useRef, useEffect } from 'react';

type Options = {
  moonScale: number;
  riseDuration: number;
  xRatio?: number;
};

const DarkOceanCanvas: React.FC<Options> = ({ moonScale, riseDuration, xRatio }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const isWide = w > h;
      const chosenRatio = typeof xRatio === 'number' ? xRatio : (isWide ? 0.14 : 0.5);
      const moonX = w * chosenRatio;
      const horizon = h * 0.6;
      const R = w * moonScale;
      const bigR = R * 2;

      ctx.clearRect(0, 0, w, h);

      let globalGlow = ctx.createRadialGradient(moonX, horizon * 0.42, R * 0.8, moonX, horizon * 0.42, bigR);
      globalGlow.addColorStop(0.0, 'rgba(255,255,255,0.09)');
      globalGlow.addColorStop(0.35, 'rgba(255,255,255,0.05)');
      globalGlow.addColorStop(0.7, 'rgba(255,255,255,0.02)');
      globalGlow.addColorStop(1.0, 'rgba(255,255,255,0.00)');
      ctx.fillStyle = globalGlow;
      ctx.fillRect(0, 0, w, h);

      const haze = ctx.createLinearGradient(0, horizon - 18, 0, horizon + 18);
      haze.addColorStop(0, 'rgba(255,255,255,0.03)');
      haze.addColorStop(0.5, 'rgba(255,255,255,0.06)');
      haze.addColorStop(1, 'rgba(255,255,255,0.02)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, horizon - 18, w, 36);

      const moonY = h * 0.4;
      ctx.beginPath();
      ctx.arc(moonX, moonY, R, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();

      ctx.globalAlpha = 0.82;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.quadraticCurveTo(w * 0.2, horizon - 20, w * 0.5, horizon - 20);
      ctx.quadraticCurveTo(w * 0.8, horizon - 20, w, horizon);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();

      ctx.globalAlpha = 1;
      const top = Math.max(horizon + 8, moonY + R * 0.12);
      ctx.drawImage(canvas, 0, top, w, h - top, 0, 0, w, h - top);
    };

    draw();
  }, [moonScale, riseDuration, xRatio]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export default DarkOceanCanvas;

// components/hero.tsx
import React from 'react';
import DarkOceanCanvas from './backgrounds/dark-ocean-canvas';
import Petals from './petals';
import Content from './content';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[100svh] w-full overflow-visible" id="hero">
      <DarkOceanCanvas moonScale={0.26} riseDuration={7} xRatio={0.12} />
      <Petals />
      <Content />
    </div>
  );
};

export default Hero;

// components/experience-timeline.tsx
import React from 'react';
import Card from './card';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-visible">
        <Card className="group overflow-visible border-l-4 border-l-pink-300 dark:border-l-indigo-400 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
          {/* Card content here */}
        </Card>
      </div>
      <div className="overflow-visible">
        <Card className="group overflow-visible border-l-4 border-l-pink-300 dark:border-l-indigo-400 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
          {/* Card content here */}
        </Card>
      </div>
      {/* More cards here */}
    </div>
  );
};

export default ExperienceTimeline;

// components/projects-section.tsx
import React from 'react';
import Card from './card';

const ProjectsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="overflow-visible">
        <Card className="group h-full overflow-visible transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
          {/* Card content here */}
        </Card>
      </div>
      <div className="overflow-visible">
        <Card className="group h-full overflow-visible transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
          {/* Card content here */}
        </Card>
      </div>
      {/* More cards here */}
    </div>
  );
};

export default ProjectsSection;
