"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Animated Ocean Wave Surface ──────────────────────────────────────────────
// Reduced to 16×10 = 160 vertices (was 40×28 = 1120) for ~7× CPU speedup
function OceanSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  const phases = useMemo(() => {
    const g = new THREE.PlaneGeometry(22, 14, 16, 10);
    const count = g.attributes.position.count;
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random() * Math.PI * 2;
    g.dispose();
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const geo = geomRef.current;
    if (!geo) return;
    const t = clock.getElapsedTime();
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.28 + t * 0.55 + phases[i]) * 0.18 +
        Math.cos(y * 0.3 + t * 0.4 + phases[i] * 0.5) * 0.13;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -2.4, -1.5]}
      rotation={[-Math.PI / 2.6, 0, 0]}
    >
      <planeGeometry ref={geomRef} args={[22, 14, 16, 10]} />
      <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

// ── Star / Space Constellation ────────────────────────────────────────────────
// Reduced to 800 particles (was 1800)
function StarField({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00E5FF"),
      new THREE.Color("#2563EB"),
      new THREE.Color("#7C3AED"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3.5 + Math.random() * 8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = t * 0.007;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.current.x * 0.2, 0.025);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.current.y * 0.2, 0.025);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Glowing Tech Circuit Nodes ────────────────────────────────────────────────
// Fixed: single array ref instead of calling useRef inside a loop
function TechNodes({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  // Array of mutable refs (not calling useRef in a loop)
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: [number, number, number][] = [
      [  1.2,  0.4,  0   ],
      [  2.0, -0.3,  0.5 ],
      [  1.5,  1.1, -0.4 ],
      [  0.6, -0.8,  0.3 ],
      [  2.6,  0.7, -0.2 ],
      [  1.8, -1.0, -0.5 ],
      [  3.0, -0.1,  0.3 ],
      [  0.9,  1.6,  0.1 ],
    ];
    const lineVerts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [ax, ay, az] = nodes[i];
        const [bx, by, bz] = nodes[j];
        const dist = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2 + (bz - az) ** 2);
        if (dist < 1.6) lineVerts.push(ax, ay, az, bx, by, bz);
      }
    }
    return { nodePositions: nodes, linePositions: new Float32Array(lineVerts) };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodeRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const s = 1 + Math.sin(t * 1.8 + i * 0.9) * 0.18;
        mesh.scale.setScalar(s);
      }
    });
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.35, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.35, 0.04);
    }
  });

  return (
    <group ref={groupRef} position={[1.6, 0.2, -1.5]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {nodePositions.map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          ref={(el) => { nodeRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#00E5FF" : i % 3 === 1 ? "#7C3AED" : "#2563EB"}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Subtle Floating Rings (Space orbital paths) ───────────────────────────────
function OrbitalRings({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (r1.current) r1.current.rotation.z = t * 0.07;
    if (r2.current) r2.current.rotation.x = -t * 0.05;
    if (r3.current) r3.current.rotation.y = t * 0.04;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.45, 0.045);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.45, 0.045);
    }
  });

  return (
    <group ref={groupRef} position={[-1.2, 0.1, -2]}>
      <mesh ref={r1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.0, 0.007, 12, 80]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r2} rotation={[0, Math.PI / 5, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.005, 12, 80]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.004, 12, 80]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ── Drifting Bubbles ──────────────────────────────────────────────────────────
// Reduced to 6 bubbles; fixed single array-ref pattern
function OceanBubbles({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const bubbles = useMemo(() =>
    Array.from({ length: 6 }, () => ({
      pos: [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.09,
      speed: 0.25 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    })),
  []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const b = bubbles[i];
      const drift = ((t * b.speed + b.phase) % (Math.PI * 2)) / (Math.PI * 2);
      mesh.position.y = b.pos[1] + drift * 3.5 - 0.5;
      mesh.position.x = b.pos[0] + Math.sin(t * 0.4 + b.phase) * 0.2;
    });
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.current.x * 0.3, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.current.y * 0.3, 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh
          key={i}
          position={b.pos}
          ref={(el) => { meshRefs.current[i] = el; }}
        >
          <sphereGeometry args={[b.size, 8, 8]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            transparent
            opacity={0.1}
            roughness={0}
            metalness={0}
            transmission={0.9}
            clearcoat={1}
            ior={1.33}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Mouse-reactive lights ─────────────────────────────────────────────────────
function MovingLights({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouse.current.x * 5, 0.08);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouse.current.y * 5, 0.08);
  });
  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 3.5]} intensity={5} distance={14} color="#00E5FF" />
      <pointLight position={[ 4, -3, 1]} intensity={4} distance={9} color="#7C3AED" />
      <pointLight position={[-4,  3, 1]} intensity={4} distance={9} color="#2563EB" />
    </>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  // Pause WebGL rendering when the hero is not visible (saves GPU when scrolled away)
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // IntersectionObserver: stop the render loop when the canvas is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        // Pause the render loop when off-screen; adaptive DPR caps GPU load
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 2]} intensity={1.5} color="#ffffff" />
        <MovingLights mouse={mouse} />

        {/* Sea: undulating ocean grid */}
        <OceanSurface />
        {/* Space: deep star constellation */}
        <StarField mouse={mouse} />
        {/* Space: thin orbital ring paths */}
        <OrbitalRings mouse={mouse} />
        {/* Technology: neural-network node cluster */}
        <TechNodes mouse={mouse} />
        {/* Sea: rising transparent bubbles */}
        <OceanBubbles mouse={mouse} />
      </Canvas>
    </div>
  );
}
