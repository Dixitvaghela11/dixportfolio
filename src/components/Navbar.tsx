import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'light'
            ? 'bg-white/90 shadow-lg backdrop-blur-lg'
            : 'bg-gray-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo - adjusted with better spacing */}
          <motion.a 
            href="#home" 
            className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dix Vaghela
          </motion.a>

          {/* Desktop navigation - centered and balanced */}
          <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 flex-grow mx-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`relative px-3 py-2 rounded-md text-sm lg:text-base ${
                  activeSection === item.id
                    ? 'text-purple-500 dark:text-purple-400 font-medium'
                    : theme === 'light' 
                      ? 'text-gray-800 hover:text-purple-600'
                      : 'text-gray-300 hover:text-purple-400'
                } transition-colors duration-300 nav-link`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Theme toggle and mobile menu button - aligned right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 rounded-md ${
                theme === 'light' 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu - improved styling */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              theme === 'light' 
                ? 'bg-white/95 shadow-md' 
                : 'bg-gray-900/95 backdrop-blur-lg'
            }`}
          >
            <div className="container mx-auto px-4 py-3 max-w-6xl">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`block py-3 px-4 rounded-md ${
                    activeSection === item.id
                      ? 'text-purple-500 font-medium bg-purple-50 dark:bg-purple-900/20'
                      : theme === 'light' 
                        ? 'text-gray-800 hover:bg-gray-50' 
                        : 'text-gray-300 hover:bg-gray-800/50'
                  } transition-all duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
