"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Component for the central dynamic double-layer Torus Knot
function CentralTorusKnot({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const solidRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && solidRef.current && wireframeRef.current) {
      const time = state.clock.getElapsedTime();

      // Constant subtle rotation
      solidRef.current.rotation.y = time * 0.15;
      solidRef.current.rotation.x = time * 0.1;
      
      // Wireframe rotates slightly faster and in opposite direction for visual complexity
      wireframeRef.current.rotation.y = -time * 0.22;
      wireframeRef.current.rotation.z = time * 0.15;

      // Mouse Parallax/Follow lerp
      const targetX = mouse.current.x * 0.6;
      const targetY = mouse.current.y * 0.6;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid Refractive Glass/Metal Inner Mesh */}
      <mesh ref={solidRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.2, 0.35, 120, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#38BDF8" // Accent color (Cyan-blue)
          emissive="#0B0F19"
          roughness={0.15}
          metalness={0.7}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.45} // Semi-transparent glass
          thickness={0.8} // Thickness of the glass
          ior={1.5} // Index of refraction
        />
      </mesh>

      {/* Wireframe Outer Cyber Layer */}
      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[1.24, 0.36, 120, 16, 2, 3]} />
        <meshBasicMaterial
          color="#7C3AED" // Secondary color (Purple)
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Custom particle field drifting and reacting to the mouse
function ParticleField({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;

  // Generate random particles in a spherical distribution
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const colorsList = [
      new THREE.Color("#00E5FF"), // Bright Cyan
      new THREE.Color("#2563EB"), // Primary Blue
      new THREE.Color("#7C3AED"), // Secondary Purple
    ];

    for (let i = 0; i < count; i++) {
      // Generate coordinates in a shell around the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.5 + Math.random() * 6.5; // Radius range 2.5 - 9.0

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random color matching our palette
      const clr = colorsList[Math.floor(Math.random() * colorsList.length)];
      cols[i * 3] = clr.r;
      cols[i * 3 + 1] = clr.g;
      cols[i * 3 + 2] = clr.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle self-rotation
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = time * 0.008;

      // Mouse interactive drift (slower than the main shapes)
      const targetX = mouse.current.x * 0.25;
      const targetY = mouse.current.y * 0.25;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.03);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Orbiting geometric polyhedra accents
interface FloatingOrbProps {
  position: [number, number, number];
  geometryType: "icosahedron" | "octahedron";
  size: number;
  color: string;
  speed: number;
  offset: number;
  mouse: React.RefObject<{ x: number; y: number }>;
}

function FloatingOrb({ position, geometryType, size, color, speed, offset, mouse }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      
      // Floating sinusoidal motion
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.35;
      meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.25;
      
      // Self-rotation
      meshRef.current.rotation.x = t * 0.25;
      meshRef.current.rotation.y = t * 0.35;

      // Mouse influence
      const targetX = mouse.current.x * 0.45;
      const targetY = mouse.current.y * 0.45;
      meshRef.current.position.x += THREE.MathUtils.lerp(0, targetX - meshRef.current.position.x * 0.02, 0.05);
      meshRef.current.position.y += THREE.MathUtils.lerp(0, targetY - meshRef.current.position.y * 0.02, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometryType === "icosahedron" ? (
        <icosahedronGeometry args={[size, 0]} />
      ) : (
        <octahedronGeometry args={[size, 0]} />
      )}
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.15}
      />
    </mesh>
  );
}

// Spotlight and point lights that react to mouse coordinate changes
function MovingLights({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Translate mouse coordinates to 3D light positioning
      const targetX = mouse.current.x * 5.5;
      const targetY = mouse.current.y * 5.5;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.08);
    }
  });

  return (
    <>
      {/* Cursor-tracking light for dynamic specular highlights */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 3.5]}
        intensity={6.0}
        distance={15}
        color="#00E5FF" // cyan glow
      />

      {/* Warm accent background point lights */}
      <pointLight
        position={[4, -3, 1]}
        intensity={5.0}
        distance={10}
        color="#7C3AED" // purple glow
      />
      <pointLight
        position={[-4, 3, 1]}
        intensity={5.0}
        distance={10}
        color="#2563EB" // blue glow
      />
    </>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinate system: x in [-1, 1], y in [-1, 1]
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lights setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 2]} intensity={2.0} color="#ffffff" />
        
        <MovingLights mouse={mouse} />
        
        <group position={[0.5, -0.2, -1.5]}>
          <CentralTorusKnot mouse={mouse} />
          
          {/* Drifting particle field */}
          <ParticleField mouse={mouse} />

          {/* Left top floating orb (purple octahedron) */}
          <FloatingOrb
            position={[-3.2, 1.8, -1.0]}
            geometryType="octahedron"
            size={0.35}
            color="#7C3AED"
            speed={1.2}
            offset={0}
            mouse={mouse}
          />

          {/* Right bottom floating orb (cyan icosahedron) */}
          <FloatingOrb
            position={[3.0, -1.8, -0.5]}
            geometryType="icosahedron"
            size={0.45}
            color="#00E5FF"
            speed={1.6}
            offset={Math.PI / 3}
            mouse={mouse}
          />

          {/* Far background deep blue floating orb */}
          <FloatingOrb
            position={[-1.5, -2.2, -2.5]}
            geometryType="octahedron"
            size={0.25}
            color="#2563EB"
            speed={0.8}
            offset={Math.PI}
            mouse={mouse}
          />
        </group>
      </Canvas>
    </div>
  );
}
