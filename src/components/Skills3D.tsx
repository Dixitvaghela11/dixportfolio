import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, OrbitControls, Preload, useTexture, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
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

// Loading component
const CanvasLoader = () => (
  <Html center>
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-white text-sm">Loading 3D Skills...</span>
    </div>
  </Html>
);

// Individual skill ball component
const SkillBall = ({ skill, position }: { skill: Skill; position: [number, number, number] }) => {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Load texture
  const texture = useTexture(skill.icon);
  
  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {/* Icosahedron geometry */}
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.8}
        />
        
        {/* Tooltip on hover */}
        {hovered && (
          <Html distanceFactor={10}>
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              {skill.name}
            </div>
          </Html>
        )}
        
        {/* Modal on click */}
        {clicked && (
          <Html distanceFactor={15}>
            <div className="bg-gray-900/95 text-white p-3 rounded-lg shadow-lg max-w-xs">
              <h3 className="font-bold text-sm mb-1">{skill.name}</h3>
              <p className="text-xs text-gray-300">{skill.description}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setClicked(false);
                }}
                className="mt-2 text-xs text-purple-400 hover:text-purple-300"
              >
                Close
              </button>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

// Main 3D scene component
const SkillsScene = () => {
  // Generate positions for skills in a sphere formation
  const generateSpherePositions = (count: number, radius: number = 8) => {
    const positions: [number, number, number][] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y) * radius;
      const theta = goldenAngle * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      positions.push([x, y * radius, z]);
    }
    
    return positions;
  };

  const positions = generateSpherePositions(skills.length);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {/* Skills */}
      {skills.map((skill, index) => (
        <SkillBall
          key={skill.name}
          skill={skill}
          position={positions[index]}
        />
      ))}
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
const Skills3D = () => {
  return (
    <section id="skills-3d" className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Title */}
      <div className="absolute top-16 left-0 right-0 z-10">
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
          className="text-center text-gray-400 mt-4 text-sm md:text-base"
        >
          Hover over the skills to see details • Click to learn more
        </motion.p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <SkillsScene />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-xs md:text-sm"
        >
          <p>Drag to rotate • Auto-rotating enabled</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills3D;
