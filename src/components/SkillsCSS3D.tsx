import React, { useEffect, useRef, useState } from 'react';
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
  { name: "Docker", icon: '/skills/docker.svg', description: 'Containerization platform' }
];

// Individual 3D Skill Ball Component
const SkillBall3D = ({ skill, index, position }: { 
  skill: Skill; 
  index: number; 
  position: { x: number; y: number; z: number } 
}) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 1,
        y: prev.y + 2
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const ballStyle: React.CSSProperties = {
    position: 'absolute',
    width: '80px',
    height: '80px',
    left: '50%',
    top: '50%',
    transform: `
      translate(-50%, -50%)
      translate3d(${position.x}px, ${position.y}px, ${position.z}px)
      rotateX(${rotation.x}deg)
      rotateY(${rotation.y}deg)
      scale(${isHovered ? 1.2 : 1})
    `,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    animation: `float-${index} 3s ease-in-out infinite`,
    animationDelay: `${index * 0.2}s`
  };

  return (
    <>
      <style>
        {`
          @keyframes float-${index} {
            0%, 100% { transform: translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(0px) scale(${isHovered ? 1.2 : 1}); }
            50% { transform: translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-20px) scale(${isHovered ? 1.2 : 1}); }
          }
        `}
      </style>
      <div
        ref={ballRef}
        style={ballStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={skill.description}
      >
        {/* 3D Ball using CSS */}
        <div className="relative w-full h-full">
          {/* Ball faces */}
          {[...Array(6)].map((_, faceIndex) => (
            <div
              key={faceIndex}
              className="absolute w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border border-gray-500 flex items-center justify-center"
              style={{
                transform: `rotateY(${faceIndex * 60}deg) translateZ(40px)`,
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 object-contain filter drop-shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-white text-xs font-bold">${skill.name.substring(0, 2).toUpperCase()}</div>`;
                  }
                }}
              />
            </div>
          ))}
          
          {/* Glow effect */}
          <div 
            className={`absolute inset-0 rounded-full bg-blue-400/30 blur-md transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'translateZ(-10px)' }}
          />
        </div>
        
        {/* Tooltip */}
        {isHovered && (
          <div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-purple-500/30 z-10"
            style={{ transform: 'translateZ(100px) translateX(-50%)' }}
          >
            {skill.name}
          </div>
        )}
      </div>
    </>
  );
};

// Main CSS 3D Skills Component
const SkillsCSS3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate sphere positions
  const generateSpherePositions = (count: number, radius: number = 200) => {
    const positions = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y) * radius;
      const theta = goldenAngle * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      positions.push({ x, y: y * radius, z });
    }
    
    return positions;
  };

  const positions = generateSpherePositions(skills.length);

  // Mouse tracking for interactive rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / rect.width * 50,
          y: (e.clientY - centerY) / rect.height * 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills-css3d" className="relative w-full h-screen bg-black overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {/* Title */}
      <div className="absolute top-16 left-0 right-0 z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-white"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Technical Skills
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mt-4 text-sm md:text-base px-4"
        >
          Hover over the skills to see details • Pure CSS 3D
        </motion.p>
      </div>

      {/* 3D Skills Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {skills.map((skill, index) => (
            <SkillBall3D
              key={skill.name}
              skill={skill}
              index={index}
              position={positions[index]}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-xs md:text-sm"
        >
          <p>Move your mouse to rotate • Hover over skills for details</p>
          <p className="mt-1 text-xs text-gray-600">
            {skills.length} skills displayed in CSS 3D space
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsCSS3D;
