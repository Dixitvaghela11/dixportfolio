import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if we're on a touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handlePointerElements = () => {
      const elements = document.querySelectorAll('button, a, input, textarea, select, [role="button"], label');
      
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsPointer(true));
        el.addEventListener('mouseleave', () => setIsPointer(false));
      });

      return () => {
        elements.forEach(el => {
          el.removeEventListener('mouseenter', () => setIsPointer(true));
          el.removeEventListener('mouseleave', () => setIsPointer(false));
        });
      };
    };

    window.addEventListener('mousemove', moveCursor);
    const cleanup = handlePointerElements();

    // Force the cursor to be hidden
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cleanup();
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Large outer circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`w-full h-full rounded-full bg-white opacity-30`}
          animate={{
            scale: isPointer ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Small inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white"
          animate={{
            scale: isPointer ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Gradient trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full opacity-20 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-purple-600 to-blue-500' 
              : 'bg-gradient-to-r from-purple-400 to-blue-400'
          }`}
          animate={{
            scale: isPointer ? 1.2 : 0.8,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(8px)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor; 