"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Component for the central Water Planet (representing sea/water and space rings)
function CentralCelestialWaterSphere({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && sphereRef.current && ringRef.current && ringOuterRef.current) {
      const time = state.clock.getElapsedTime();

      // Gentle water ripple/bubble expansion-contraction
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.02;
      sphereRef.current.scale.set(pulse, pulse, pulse);
      
      // Gentle sphere rotation
      sphereRef.current.rotation.y = time * 0.08;
      
      // Planetary rings rotating at different speeds
      ringRef.current.rotation.z = -time * 0.05;
      ringOuterRef.current.rotation.z = time * 0.03;

      // Mouse Parallax/Follow lerp
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.5;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Water Sphere (Laut: index of refraction of water 1.33) */}
      <mesh ref={sphereRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#38BDF8" // Accent color (Cyan-blue)
          emissive="#081020"
          roughness={0.05}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.8} // highly transparent like water
          thickness={1.2}
          ior={1.333} // IOR of water
        />
      </mesh>

      {/* Planetary Ring 1 (Angkasa - Saturn-like inner ring) */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[1.6, 1.9, 64]} />
        <meshBasicMaterial
          color="#7C3AED" // Purple
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      {/* Planetary Ring 2 (Angkasa - outer thin line ring) */}
      <mesh ref={ringOuterRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[2.0, 2.03, 64]} />
        <meshBasicMaterial
          color="#00E5FF" // Cyan
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
    </group>
  );
}

// A flat grid representing the undulating surface of the sea (Laut)
function OceanWavesGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    if (gridRef.current && geomRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the plane grid slowly
      gridRef.current.rotation.z = time * 0.01;

      // Deform plane vertices to create rolling sea wave ripples
      const position = geomRef.current.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Simple wave noise equation
        const z = Math.sin(x * 0.4 + time * 0.8) * 0.15 + 
                  Math.cos(y * 0.4 + time * 1.0) * 0.15;
        position.setZ(i, z);
      }
      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={gridRef} position={[0, -2.0, -1]} rotation={[-Math.PI / 2.1, 0, 0]}>
      <planeGeometry ref={geomRef} args={[12, 10, 24, 20]} />
      <meshBasicMaterial
        color="#2563EB" // Blue
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
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

// Small orbiting moon/planet (Angkasa)
function OrbitingMoon({ position, size, color, speed, offset, mouse }: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  offset: number;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      
      // Orbiting around the center water sphere in X-Z plane
      const radius = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = position[1] + Math.sin(t * 2.0) * 0.15; // slight bobbing
      
      // Self rotation
      meshRef.current.rotation.y = t * 0.5;

      // Mouse parallax shift
      const targetX = mouse.current.x * 0.4;
      const targetY = mouse.current.y * 0.4;
      meshRef.current.position.x += THREE.MathUtils.lerp(0, targetX, 0.05);
      meshRef.current.position.y += THREE.MathUtils.lerp(0, targetY, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.2}
        metalness={0.8}
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
          {/* Central Water Orb representing "Ocean" and "Planets/Saturn" */}
          <CentralCelestialWaterSphere mouse={mouse} />
          
          {/* Undulating Sea Surface Grid */}
          <OceanWavesGrid />
          
          {/* Drifting particle field (Stars/Space) */}
          <ParticleField mouse={mouse} />

          {/* Left orbiting moon (purple) */}
          <OrbitingMoon
            position={[-2.6, 0.8, 0]}
            size={0.16}
            color="#7C3AED"
            speed={1.1}
            offset={0}
            mouse={mouse}
          />

          {/* Right orbiting moon (cyan) */}
          <OrbitingMoon
            position={[3.2, -0.6, 0]}
            size={0.22}
            color="#00E5FF"
            speed={0.8}
            offset={Math.PI}
            mouse={mouse}
          />

          {/* Far orbiting mini moon (deep blue) */}
          <OrbitingMoon
            position={[0, -1.2, -3.0]}
            size={0.12}
            color="#2563EB"
            speed={1.5}
            offset={Math.PI / 2}
            mouse={mouse}
          />
        </group>
      </Canvas>
    </div>
  );
}
