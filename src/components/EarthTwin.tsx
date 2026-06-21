'use client';

import { useEffect, useRef } from 'react';

interface EarthTwinProps {
  score: number; // 0 - 100
}

export default function EarthTwin({ score }: EarthTwinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    const size = 320;
    
    // Set canvas sizes
    canvas.width = size;
    canvas.height = size;

    const center = size / 2;
    const radius = size * 0.35; // ~110px

    const drawEarth = () => {
      ctx.clearRect(0, 0, size, size);

      // 1. Draw outer atmospheric glow depending on score
      // High score: neon emerald green and bright sky blue
      // Low score: toxic orange/brown and dim grey
      const scoreRatio = score / 100;
      
      const glowGrad = ctx.createRadialGradient(center, center, radius - 10, center, center, radius + 40);
      if (score >= 70) {
        // Healthy atmosphere
        glowGrad.addColorStop(0, 'rgba(0, 255, 157, 0.25)');
        glowGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)');
        glowGrad.addColorStop(1, 'rgba(0, 255, 157, 0)');
      } else if (score >= 45) {
        // Average atmosphere
        glowGrad.addColorStop(0, 'rgba(52, 211, 153, 0.15)');
        glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.05)');
        glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      } else {
        // Polluted atmosphere
        glowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
        glowGrad.addColorStop(0.6, 'rgba(120, 53, 15, 0.1)');
        glowGrad.addColorStop(1, 'rgba(120, 53, 15, 0)');
      }

      ctx.beginPath();
      ctx.arc(center, center, radius + 40, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // 2. Draw Sphere Background (Ocean)
      const oceanGrad = ctx.createRadialGradient(center - 20, center - 20, 10, center, center, radius);
      if (score >= 70) {
        oceanGrad.addColorStop(0, '#1e40af'); // deep blue
        oceanGrad.addColorStop(0.8, '#1e3a8a');
        oceanGrad.addColorStop(1, '#0f172a');
      } else if (score >= 45) {
        oceanGrad.addColorStop(0, '#2563eb');
        oceanGrad.addColorStop(0.8, '#1e3a8a');
        oceanGrad.addColorStop(1, '#1e293b');
      } else {
        oceanGrad.addColorStop(0, '#57534e'); // grey/brown ocean
        oceanGrad.addColorStop(0.8, '#44403c');
        oceanGrad.addColorStop(1, '#1c1917');
      }

      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Save before clipping for continents
      ctx.save();
      
      // Clip to Earth boundary
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.clip();

      // 3. Draw continents moving across the face (simulating rotation)
      rotation += 0.3; // Speed of rotation
      if (rotation >= 360) rotation = 0;

      // Select continent color
      let landColor = '#10b981'; // vibrant green
      if (score < 45) landColor = '#78716c'; // dead brown
      else if (score < 70) landColor = '#059669'; // medium green

      ctx.fillStyle = landColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = landColor;

      // We'll draw 3 dummy continent panels that slide horizontally
      const panelWidth = radius * 2.8;
      const xStart = -radius * 1.5 + (rotation % (radius * 3));

      // Continent 1
      drawContinent(ctx, xStart, center - 30, radius * 0.7);
      // Continent 2
      drawContinent(ctx, xStart + radius * 1.6, center + 20, radius * 0.6);
      // Continent 3 (wraps around)
      drawContinent(ctx, xStart - radius * 1.6, center + 10, radius * 0.5);

      ctx.restore(); // Remove clip and shadows

      // 4. Draw atmospheric cloud cover (semi-transparent white bands)
      const cloudAlpha = score >= 70 ? 0.2 : 0.08; // less cloud cover or thicker grey clouds if polluted
      ctx.fillStyle = score >= 70 ? `rgba(255, 255, 255, ${cloudAlpha})` : `rgba(180, 160, 150, 0.12)`;
      
      // Draw standard swirling cloud strips
      ctx.beginPath();
      ctx.ellipse(center, center - radius * 0.3, radius * 0.9, radius * 0.1, 0.05, 0, Math.PI * 2);
      ctx.ellipse(center - 10, center + radius * 0.4, radius * 0.85, radius * 0.08, -0.05, 0, Math.PI * 2);
      ctx.fill();

      // 5. Draw 3D Spherical Shadow overlay (Gives standard sphere 3D depth)
      const shadowGrad = ctx.createRadialGradient(center - radius * 0.4, center - radius * 0.4, radius * 0.5, center, center, radius);
      shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');

      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // 6. Draw clean orbit path ring (for futuristic overlay)
      ctx.beginPath();
      ctx.ellipse(center, center, radius + 25, radius * 0.4, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = score >= 70 ? 'rgba(0, 255, 157, 0.15)' : 'rgba(239, 68, 68, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(drawEarth);
    };

    // Simple helper to draw irregular continent shapes
    const drawContinent = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      // add extra intersecting blobs for organic look
      c.arc(x + r * 0.4, y - r * 0.2, r * 0.7, 0, Math.PI * 2);
      c.arc(x - r * 0.3, y + r * 0.3, r * 0.6, 0, Math.PI * 2);
      c.fill();
    };

    drawEarth();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        <canvas ref={canvasRef} className="w-80 h-80 drop-shadow-[0_0_35px_rgba(0,255,157,0.15)]" />
        
        {/* Glow status indicator ring */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-105" />
      </div>

      <div className="text-center mt-4">
        <span className="text-xs uppercase tracking-widest text-foreground/45 font-bold">Digital Twin Index</span>
        <h3 className="text-lg font-extrabold text-white mt-1">
          {score >= 70 ? '🟢 Flourishing Earth' : score >= 45 ? '🟡 Transitioning Earth' : '🔴 Threatened Earth'}
        </h3>
        <p className="text-xs text-foreground/50 mt-0.5">
          Health Status: {score}% Sustainability Rating
        </p>
      </div>
    </div>
  );
}
