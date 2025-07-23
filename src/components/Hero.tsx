import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, Float, Sphere, Torus, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/portfolioStore';

const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.3}
        speed={2}
        transparent
        opacity={0.8}
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  );
};

const FloatingGeometry = ({ position, geometry }: { position: [number, number, number], geometry: 'sphere' | 'torus' | 'box' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const GeometryComponent = () => {
    switch (geometry) {
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position} />;
      case 'torus':
        return <Torus ref={meshRef} args={[0.3, 0.1, 16, 32]} position={position} />;
      case 'box':
        return <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position} />;
      default:
        return null;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <GeometryComponent />
      <MeshDistortMaterial
        color="#8b5cf6"
        transparent
        opacity={0.6}
        distort={0.2}
        speed={1}
        roughness={0}
        metalness={0.2}
      />
    </Float>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { personalInfo } = usePortfolioStore();
  
  const scrollToNext = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <RotatingCube />
          <FloatingGeometry position={[3, 2, -2]} geometry="sphere" />
          <FloatingGeometry position={[-3, -1, -1]} geometry="torus" />
          <FloatingGeometry position={[2, -2, -3]} geometry="box" />
          <FloatingGeometry position={[-2, 2, -2]} geometry="sphere" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          
          {/* Floating particles */}
          {Array.from({ length: 100 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 30
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial 
                color={Math.random() > 0.5 ? "#06b6d4" : "#8b5cf6"} 
                transparent 
                opacity={0.4} 
              />
            </mesh>
          ))}
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 text-center px-4"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <TypewriterText text={`Hi, I'm ${personalInfo.name}`} delay={1.5} />
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <TypewriterText text={personalInfo.title} delay={3} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToNext()}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Explore My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              Download CV
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          <ChevronDown size={32} className="drop-shadow-lg" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;