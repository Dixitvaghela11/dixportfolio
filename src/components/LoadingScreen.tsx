import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'
      }`}
    >
      <div className="relative">
        {/* Main logo/text animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Dixit Vaghela
          </h1>
          
          {/* Loading bar */}
          <div className="w-48 h-1 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
          
          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`mt-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            Loading amazing things...
          </motion.p>
        </motion.div>

        {/* Floating tech icons */}
        <div className="absolute inset-0 -z-10">
          {['react', 'laravel', 'php', 'dotnet', 'sql'].map((tech, index) => (
            <motion.div
              key={tech}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{ 
                x: Math.cos(index * (Math.PI / 2.5)) * 80,
                y: Math.sin(index * (Math.PI / 2.5)) * 80,
                opacity: 0.5
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 