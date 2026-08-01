"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#2563EB"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#050816"
        />
      </Sphere>
    </Float>
  );
}

function SmallSpheres() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} position={[-4, 2, -2]}>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial color="#38BDF8" distort={0.2} speed={3} roughness={0.1} />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[3, -2, -1]}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#7C3AED" distort={0.3} speed={2} roughness={0.3} />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#00E5FF" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <group position={[0, 0, -2]}>
          <AnimatedSphere />
          <SmallSpheres />
        </group>
      </Canvas>
    </div>
  );
}
