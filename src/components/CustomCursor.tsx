import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOverChatbot, setIsOverChatbot] = useState(false);
  
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
      {/* Large outer circle */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9990] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 1,
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
        className="custom-cursor fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9990] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 1,
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
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9989]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOverChatbot ? 0 : 1,
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