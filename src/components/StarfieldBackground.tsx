
import React, { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create stars
    const stars: { x: number; y: number; radius: number; color: string; velocity: number }[] = [];
    for (let i = 0; i < 150; i++) {
      const radius = Math.random() * 1.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
        velocity: radius * 0.1
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        
        // Move star
        star.y += star.velocity;
        
        // Reset position if star goes out of canvas
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full z-0 theme-transition ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 via-purple-950/20 to-gray-950' 
          : 'bg-gradient-to-b from-gray-100 via-purple-50/20 to-white'
      }`}
    />
  );
};

export default StarfieldBackground;
