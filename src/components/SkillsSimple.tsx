import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  { name: "Docker", icon: '/skills/docker.svg', description: 'Containerization platform' },
  { name: "Laravel", icon: '/skills/laravel.svg', description: 'PHP web framework' },
  { name: "PHP", icon: '/skills/php.svg', description: 'Server-side scripting language' }
];

// Individual Hexagon Skill Component
const HexagonSkill = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1,
        rotateY: 15,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
      style={{
        perspective: '1000px'
      }}
    >
      {/* Hexagon Container */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
        {/* Outer hexagon with gradient border */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-lg transition-all duration-300 ${
            isHovered ? 'shadow-2xl shadow-purple-500/50' : ''
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
        
        {/* Inner hexagon - main background */}
        <div 
          className={`absolute inset-1 bg-gray-800 transition-all duration-300 ${
            isHovered ? 'bg-gray-700' : ''
          }`}
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
            className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain filter drop-shadow-lg transition-all duration-300 ${
              isHovered ? 'scale-110 brightness-110' : ''
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">${skill.name.substring(0, 2).toUpperCase()}</div>`;
              }
            }}
          />
        </div>
        
        {/* Animated glow effect */}
        <div 
          className={`absolute -inset-2 bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-cyan-400/30 blur-lg transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
        
        {/* Floating particles effect */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Skill name */}
      <div className={`text-xs font-medium text-center mt-3 transition-all duration-300 ${
        isHovered ? 'text-white scale-105' : 'text-gray-300'
      }`}>
        {skill.name}
      </div>
      
      {/* Tooltip */}
      {showTooltip && skill.description && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-purple-500/30 backdrop-blur-sm z-20 max-w-48"
        >
          <div className="font-semibold text-purple-300">{skill.name}</div>
          <div className="text-gray-300 text-xs mt-1">{skill.description}</div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Skills Component
const SkillsSimple = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div 
              className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-500"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
            Technical Skills
          </span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <HexagonSkill key={skill.name} skill={skill} index={index} />
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 mt-12 text-sm md:text-base"
        >
          Hover over skills to see detailed descriptions
        </motion.p>
      </div>
    </section>
  );
};

export default SkillsSimple;
