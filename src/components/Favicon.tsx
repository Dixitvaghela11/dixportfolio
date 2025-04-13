import React, { useEffect } from 'react';

const Favicon = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 32, 32);
      gradient.addColorStop(0, '#9333ea'); // purple-600
      gradient.addColorStop(1, '#3b82f6'); // blue-500

      // Draw circle background
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DV', 16, 16);

      // Create favicon link element
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL("image/x-icon");

      // Add to document head
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, []);

  return null;
};

export default Favicon; 