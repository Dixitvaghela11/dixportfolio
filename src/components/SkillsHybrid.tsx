import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillsCSS3D from './SkillsCSS3D';

interface Skill {
  name: string;
  icon: string;
  description?: string;
}

const skills: Skill[] = [
  { name: "HTML5", icon: '/skills/html.svg', description: 'Markup language for web pages' },
  { name: "CSS3", icon: '/skills/css.svg', description: 'Styling language for web design' },
  { name: "JavaScript", icon: '/skills/javascript.svg', description: 'Programming language for web development' },
  { name: "TypeScript", icon: '/skills/typescript.svg', description: 'Typed superset of JavaScript' },
  { name: "React", icon: '/skills/react.svg', description: 'JavaScript library for building UIs' },
  { name: "Next.js", icon: '/skills/nextJS.svg', description: 'React framework for production' },
  { name: "Tailwind CSS", icon: '/skills/tailwind.svg', description: 'Utility-first CSS framework' },
  { name: "Node.js", icon: '/skills/nodejs.svg', description: 'JavaScript runtime for server-side' },
  { name: "MongoDB", icon: '/skills/mongoDB.svg', description: 'NoSQL database' },
  { name: "Git", icon: '/skills/git.svg', description: 'Version control system' },
  { name: "Figma", icon: '/skills/figma.svg', description: 'Design and prototyping tool' },
  { name: "Docker", icon: '/skills/docker.svg', description: 'Containerization platform' }
];

// 2D Fallback Component
const Skills2D = () => {
  const HexagonSkill = ({ skill, index }: { skill: Skill; index: number }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="relative group cursor-pointer"
      title={skill.description}
    >
      {/* Hexagon Container */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
        {/* Outer hexagon - dark background */}
        <div 
          className="absolute inset-0 bg-gray-600 shadow-lg"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
        
        {/* Inner hexagon - lighter background */}
        <div 
          className="absolute inset-1 bg-gray-500 group-hover:bg-gray-400 transition-colors duration-300"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
        
        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-sm font-bold text-white bg-gray-700 rounded">${skill.name.substring(0, 2).toUpperCase()}</div>`;
              }
            }}
          />
        </div>
        
        {/* Hover glow effect */}
        <div 
          className="absolute -inset-1 bg-blue-400/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      </div>
      
      {/* Skill name */}
      <div className="text-xs font-medium text-center text-gray-300 mt-2">
        {skill.name}
      </div>
    </motion.div>
  );

  return (
    <section id="skills-2d" className="py-20 bg-gray-900 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Technical Skills
          </span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <HexagonSkill key={skill.name} skill={skill} index={index} />
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-12 text-sm"
        >
          Hover over skills to see details
        </motion.p>
      </div>
    </section>
  );
};

// Error Boundary Hook
const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('3D Skills Error:', error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('3D Skills Promise Rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return { hasError, setHasError };
};

// Main Hybrid Component
const SkillsHybrid = () => {
  const { hasError, setHasError } = useErrorBoundary();
  const [use3D, setUse3D] = useState(true);

  // Check for CSS 3D support
  useEffect(() => {
    const testElement = document.createElement('div');
    testElement.style.transform = 'translateZ(0)';
    const has3DSupport = testElement.style.transform !== '';

    if (!has3DSupport) {
      setUse3D(false);
    }
  }, []);

  if (hasError || !use3D) {
    return <Skills2D />;
  }

  return (
    <Suspense fallback={<Skills2D />}>
      <div onError={() => setHasError(true)}>
        <SkillsCSS3D />
      </div>
    </Suspense>
  );
};

export default SkillsHybrid;
