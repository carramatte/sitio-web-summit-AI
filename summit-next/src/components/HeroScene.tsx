'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PulsingLight = () => {
    const lightRef = useRef<THREE.SpotLight>(null);

    useFrame(({ clock }) => {
        if (lightRef.current) {
            // Pulso suave
            lightRef.current.intensity = 15 + Math.sin(clock.elapsedTime * 2) * 5;
        }
    });

    return (
        <spotLight
            ref={lightRef}
            color="#C45E1A"
            position={[0, 5, 2]}
            angle={0.6}
            penumbra={0.5}
            intensity={15}
            castShadow
        />
    );
};

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-auto">
            <Canvas
                shadows
                camera={{ position: [0, 2, 8], fov: 55 }}
                gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
            >
                <color attach="background" args={['#0D1B2A']} />
                <fog attach="fog" args={['#0D1B2A', 10, 30]} />

                <ambientLight intensity={0.5} />
                <PointLight color="#D4712E" position={[2, 3, 4]} intensity={2.5} />
                <PulsingLight />

                {/* Montañas de fondo */}
                <mesh position={[-5, -1, -10]} castShadow receiveShadow>
                    <coneGeometry args={[4, 8, 4]} />
                    <meshStandardMaterial color="#112236" roughness={0.8} />
                </mesh>

                <mesh position={[6, -2, -12]} castShadow receiveShadow>
                    <coneGeometry args={[5, 10, 4]} />
                    <meshStandardMaterial color="#1B2E45" roughness={0.8} />
                </mesh>

                <mesh position={[-8, -3, -15]} castShadow receiveShadow>
                    <coneGeometry args={[6, 12, 4]} />
                    <meshStandardMaterial color="#152840" roughness={0.9} />
                </mesh>

                {/* Pico central acentuado */}
                <mesh position={[0, -0.5, -5]} castShadow receiveShadow>
                    <coneGeometry args={[3.5, 7, 4]} />
                    <meshStandardMaterial
                        color="#1B2E45"
                        emissive="#C45E1A"
                        emissiveIntensity={1.2}
                        wireframe={true} // Un toque cyberpunk
                    />
                </mesh>

                {/* Suelo reflectante */}
                <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[50, 50]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={1024}
                        mixBlur={1}
                        mixStrength={40}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#0a1520"
                        metalness={0.5}
                        mirror={0.5}
                    />
                </mesh>

                <Sparkles
                    color="#C45E1A"
                    count={120}
                    speed={0.3}
                    opacity={0.8}
                    size={2}
                    scale={[10, 5, 10]}
                    position={[0, 0, -2]}
                />

                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.4}
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                />
            </Canvas>
        </div>
    );
}

const PointLight = ({ color, position, intensity }: any) => {
    return <pointLight color={color} position={position} intensity={intensity} />;
};
