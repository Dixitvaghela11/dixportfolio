import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOverChatbot, setIsOverChatbot] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trailRef = useRef<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Different spring configs for different elements (creates lag effect)
  const springConfigFast = { damping: 20, stiffness: 900 };
  const springConfigMedium = { damping: 25, stiffness: 700 };
  const springConfigSlow = { damping: 30, stiffness: 500 };
  
  const cursorXSpring = useSpring(cursorX, springConfigFast);
  const cursorYSpring = useSpring(cursorY, springConfigFast);
  
  const trailXSpring = useSpring(cursorX, springConfigSlow);
  const trailYSpring = useSpring(cursorY, springConfigSlow);
  
  const outerXSpring = useSpring(cursorX, springConfigMedium);
  const outerYSpring = useSpring(cursorY, springConfigMedium);

  useEffect(() => {
    // Check if we're on a touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add trail effect
      trailIdRef.current += 1;
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current
      });
      
      // Keep only last 5 trail points
      if (trailRef.current.length > 5) {
        trailRef.current.shift();
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerElements = () => {
      const elements = document.querySelectorAll('button, a, input, textarea, select, [role="button"], label, [class*="card"], [class*="Card"]');

      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsPointer(true);
          setIsHovering(true);
        });
        el.addEventListener('mouseleave', () => {
          setIsPointer(false);
          setIsHovering(false);
        });
      });

      return () => {
        elements.forEach(el => {
          el.removeEventListener('mouseenter', () => {
            setIsPointer(true);
            setIsHovering(true);
          });
          el.removeEventListener('mouseleave', () => {
            setIsPointer(false);
            setIsHovering(false);
          });
        });
      };
    };

    // Function to handle chatbot elements
    const handleChatbotElements = () => {
      const observer = new MutationObserver(() => {
        // Look for chatbot elements (common selectors for chatbase)
        const chatbotElements = document.querySelectorAll(
          '[id*="chatbase"], [class*="chatbase"], [data-chatbase], iframe[src*="chatbase"], iframe[src*="embed"]'
        );

        chatbotElements.forEach(el => {
          // Restore cursor for chatbot elements
          (el as HTMLElement).style.cursor = 'auto';
          (el as HTMLElement).style.pointerEvents = 'auto';
          (el as HTMLElement).style.zIndex = '10000';

          // Add hover listeners to hide custom cursor
          el.addEventListener('mouseenter', () => setIsOverChatbot(true));
          el.addEventListener('mouseleave', () => setIsOverChatbot(false));

          // Also handle any input elements within chatbot
          const inputs = el.querySelectorAll('input, textarea');
          inputs.forEach(input => {
            (input as HTMLElement).style.cursor = 'text';
            (input as HTMLElement).style.pointerEvents = 'auto';
            (input as HTMLElement).style.zIndex = '10001';
          });

          // Handle buttons and clickable elements
          const buttons = el.querySelectorAll('button, [role="button"], a');
          buttons.forEach(button => {
            (button as HTMLElement).style.cursor = 'pointer';
            (button as HTMLElement).style.pointerEvents = 'auto';
            (button as HTMLElement).style.zIndex = '10001';
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    const cleanup = handlePointerElements();
    const chatbotCleanup = handleChatbotElements();

    // Force the cursor to be hidden
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // Add CSS to specifically allow cursor and interactions in chatbot elements
    const style = document.createElement('style');
    style.textContent = `
      /* Chatbot cursor fixes */
      [id*="chatbase"], [class*="chatbase"], [data-chatbase],
      iframe[src*="chatbase"], iframe[src*="embed"],
      [id*="chatbase"] *, [class*="chatbase"] *, [data-chatbase] *,
      iframe[src*="chatbase"] *, iframe[src*="embed"] * {
        cursor: auto !important;
        pointer-events: auto !important;
        z-index: 10000 !important;
      }

      [id*="chatbase"] input, [class*="chatbase"] input, [data-chatbase] input,
      [id*="chatbase"] textarea, [class*="chatbase"] textarea, [data-chatbase] textarea {
        cursor: text !important;
        pointer-events: auto !important;
        z-index: 10001 !important;
      }

      [id*="chatbase"] button, [class*="chatbase"] button, [data-chatbase] button,
      [id*="chatbase"] [role="button"], [class*="chatbase"] [role="button"], [data-chatbase] [role="button"] {
        cursor: pointer !important;
        pointer-events: auto !important;
        z-index: 10001 !important;
      }

      /* Hide custom cursor over chatbot areas */
      [id*="chatbase"]:hover ~ .custom-cursor,
      [class*="chatbase"]:hover ~ .custom-cursor,
      [data-chatbase]:hover ~ .custom-cursor {
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cleanup();
      chatbotCleanup();
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      // Remove the chatbot cursor style
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Outer glow ring - slowest follow */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9989]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 0.3,
        }}
      >
        <motion.div
          className={`w-20 h-20 rounded-full border-2 ${
            theme === 'light'
              ? 'border-purple-500/40'
              : 'border-purple-400/40'
          }`}
          animate={{
            scale: isPointer ? 1.8 : isClicking ? 0.9 : 1.2,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          style={{
            boxShadow: theme === 'light' 
              ? '0 0 20px rgba(139, 92, 246, 0.3)' 
              : '0 0 20px rgba(139, 92, 246, 0.5)',
          }}
        />
      </motion.div>

      {/* Gradient trail effect - medium follow */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9989]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 0.4,
        }}
      >
        <motion.div
          className={`w-16 h-16 rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-600/30 to-blue-500/30'
              : 'bg-gradient-to-r from-purple-400/40 to-blue-400/40'
          }`}
          animate={{
            scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          style={{
            filter: 'blur(12px)',
          }}
        />
      </motion.div>

      {/* Main cursor ring - fast follow */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9990]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 1,
        }}
      >
        <motion.div
          className={`w-10 h-10 rounded-full border-2 ${
            theme === 'light'
              ? 'border-white/80'
              : 'border-white/90'
          }`}
          animate={{
            scale: isPointer ? 1.8 : isClicking ? 0.7 : 1,
            rotate: isHovering ? 360 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          style={{
            boxShadow: theme === 'light'
              ? '0 0 15px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(139, 92, 246, 0.3)'
              : '0 0 15px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.4)',
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>

      {/* Inner dot - fastest follow */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9991]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 1,
        }}
      >
        <motion.div
          className={`w-2.5 h-2.5 rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-500 to-blue-500'
              : 'bg-gradient-to-r from-purple-400 to-blue-400'
          }`}
          animate={{
            scale: isPointer ? 0 : isClicking ? 1.5 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          style={{
            boxShadow: theme === 'light'
              ? '0 0 10px rgba(139, 92, 246, 0.8)'
              : '0 0 10px rgba(139, 92, 246, 1)',
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9988]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                theme === 'light'
                  ? 'border-purple-500/60'
                  : 'border-purple-400/60'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      {isHovering && (
        <motion.div
          className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9987]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          <div
            className={`w-8 h-8 rounded-full ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-500/20'
                : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'
            }`}
            style={{
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor; 