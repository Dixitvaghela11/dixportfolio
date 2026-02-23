import { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface ChatbotProps {
  isVisible?: boolean;
}

const Chatbot = ({ isVisible = true }: ChatbotProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize chatbot when component mounts
    if (isVisible && window.chatbase) {
      // Configure chatbot settings to disable chat history
      window.chatbase('init', {
        // Disable chat history and recent conversations
        enableHistory: false,
        showRecentChats: false,
        persistConversation: false,
        clearOnRefresh: true
      });
    }

    // Find all chatbot containers
    const chatbotSelectors = [
      '[id*="chatbase"]',
      '[class*="chatbase"]',
      '[data-chatbase]',
      'iframe[src*="chatbase"]',
      'iframe[src*="embed"]'
    ];

    // Function to hide bubble button
    const hideBubbleButton = () => {
      const bubbleButtonSelectors = [
        'button[class*="trigger"]',
        'button[class*="bubble"]',
        '[id*="chatbase-bubble-button"]',
        '[class*="chatbase-bubble-button"]',
        'button:first-child'
      ];

      chatbotSelectors.forEach(containerSelector => {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
          bubbleButtonSelectors.forEach(selector => {
            const buttons = container.querySelectorAll(selector);
            buttons.forEach(button => {
              const htmlEl = button as HTMLElement;
              htmlEl.style.display = 'none';
              htmlEl.style.visibility = 'hidden';
              htmlEl.style.opacity = '0';
              htmlEl.style.height = '0';
              htmlEl.style.width = '0';
              htmlEl.style.overflow = 'hidden';
              htmlEl.style.pointerEvents = 'none';
            });
          });

          // Also check for direct button children
          const directButtons = container.querySelectorAll(':scope > button');
          directButtons.forEach(button => {
            const htmlEl = button as HTMLElement;
            htmlEl.style.display = 'none';
            htmlEl.style.visibility = 'hidden';
            htmlEl.style.opacity = '0';
            htmlEl.style.height = '0';
            htmlEl.style.width = '0';
            htmlEl.style.overflow = 'hidden';
            htmlEl.style.pointerEvents = 'none';
          });
        });
      });

      // Also check for buttons outside containers
      const allBubbleButtons = document.querySelectorAll(
        '[id*="chatbase-bubble-button"], [class*="chatbase-bubble-button"], [id*="chatbase"] > button, [class*="chatbase"] > button'
      );
      allBubbleButtons.forEach(button => {
        const htmlEl = button as HTMLElement;
        htmlEl.style.display = 'none';
        htmlEl.style.visibility = 'hidden';
        htmlEl.style.opacity = '0';
        htmlEl.style.height = '0';
        htmlEl.style.width = '0';
        htmlEl.style.overflow = 'hidden';
        htmlEl.style.pointerEvents = 'none';
      });
    };

    // Function to hide history-related elements
    const hideHistoryElements = () => {
      // Comprehensive selectors for history elements
      const historySelectors = [
        '[class*="history"]',
        '[class*="recent"]',
        '[id*="history"]',
        '[id*="recent"]',
        '[data-testid*="history"]',
        '[data-testid*="recent"]',
        '[aria-label*="recent"]',
        '[aria-label*="history"]',
        '[aria-label*="Reset"]',
        '[aria-label*="reset"]',
        '[title*="history"]',
        '[title*="recent"]',
        '[title*="reset"]',
        'button[class*="reset"]',
        'button[class*="clear"]',
        '[class*="reset"]',
        '[class*="clear"]'
      ];

      chatbotSelectors.forEach(containerSelector => {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
          // Hide elements matching history selectors
          historySelectors.forEach(selector => {
            const elements = container.querySelectorAll(selector);
            elements.forEach(el => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'none';
              htmlEl.style.visibility = 'hidden';
              htmlEl.style.opacity = '0';
              htmlEl.style.height = '0';
              htmlEl.style.width = '0';
              htmlEl.style.overflow = 'hidden';
            });
          });

          // Check all elements for text content related to history/reset
          const allElements = container.querySelectorAll('*');
          allElements.forEach(elem => {
            const text = elem.textContent?.toLowerCase() || '';
            const ariaLabel = elem.getAttribute('aria-label')?.toLowerCase() || '';
            const title = elem.getAttribute('title')?.toLowerCase() || '';
            
            const historyKeywords = [
              'recent chat',
              'view recent',
              'chat history',
              'conversation history',
              'reset conversation',
              'clear chat',
              'past chats',
              'show past',
              'previous chat'
            ];

            const shouldHide = historyKeywords.some(keyword => 
              text.includes(keyword) || ariaLabel.includes(keyword) || title.includes(keyword)
            );

            if (shouldHide) {
              const htmlEl = elem as HTMLElement;
              htmlEl.style.display = 'none';
              htmlEl.style.visibility = 'hidden';
              htmlEl.style.opacity = '0';
              htmlEl.style.height = '0';
              htmlEl.style.width = '0';
              htmlEl.style.overflow = 'hidden';
            }
          });

          // Force cursor styles on chatbot elements
          (container as HTMLElement).style.setProperty('cursor', 'auto', 'important');

          // Handle input elements specifically
          const inputs = container.querySelectorAll('input, textarea');
          inputs.forEach(input => {
            (input as HTMLElement).style.setProperty('cursor', 'text', 'important');
          });

          // Handle buttons and clickable elements
          const clickables = container.querySelectorAll('button, [role="button"], a');
          clickables.forEach(clickable => {
            (clickable as HTMLElement).style.setProperty('cursor', 'pointer', 'important');
          });
        });
      });
    };

    // Function to apply theme styles to chatbot
    const applyThemeStyles = () => {
      const chatbotSelectors = [
        '[id*="chatbase"]',
        '[class*="chatbase"]',
        '[data-chatbase]'
      ];

      chatbotSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const htmlEl = el as HTMLElement;
          
          if (theme === 'dark') {
            // Dark theme styles
            htmlEl.style.setProperty('--chatbot-bg', '#1a1a1a', 'important');
            htmlEl.style.setProperty('--chatbot-text', '#ffffff', 'important');
            htmlEl.style.setProperty('--chatbot-border', '#333333', 'important');
          } else {
            // Light theme styles
            htmlEl.style.setProperty('--chatbot-bg', '#ffffff', 'important');
            htmlEl.style.setProperty('--chatbot-text', '#1a1a1a', 'important');
            htmlEl.style.setProperty('--chatbot-border', '#e5e5e5', 'important');
          }

          // Apply theme class to chatbot container
          if (theme === 'dark') {
            htmlEl.classList.add('dark-theme');
            htmlEl.classList.remove('light-theme');
          } else {
            htmlEl.classList.add('light-theme');
            htmlEl.classList.remove('dark-theme');
          }
        });
      });
    };

    // MutationObserver to watch for chatbot elements
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        hideBubbleButton();
        hideHistoryElements();
        applyThemeStyles();
      }, 100);
    });

    // Initial execution
    setTimeout(() => {
      hideBubbleButton();
      hideHistoryElements();
      applyThemeStyles();
    }, 500);

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      observer.disconnect();
    };
  }, [isVisible, theme]);

  // The chatbot will be automatically injected by the script in index.html
  // This component serves as a React wrapper for control and customization
  return null;
};

export default Chatbot;
