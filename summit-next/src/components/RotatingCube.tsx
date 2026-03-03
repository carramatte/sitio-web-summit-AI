'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

function Cube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2.2, 2.2, 2.2]} />
            <meshStandardMaterial
                color="#1B2E45"
                transparent
                opacity={0.15}
            />
            <Edges
                threshold={15}
                color="#C45E1A"
                linewidth={1.5}
            />
        </mesh>
    );
}

function InnerCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.4;
            meshRef.current.rotation.z += delta * 0.6;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial
                color="#C45E1A"
                transparent
                opacity={0.1}
            />
            <Edges
                threshold={15}
                color="#D4712E"
                linewidth={1}
            />
        </mesh>
    );
}

export default function RotatingCube() {
    return (
        <div className="cube-canvas">
            <Canvas
                camera={{ position: [3, 3, 3], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#C45E1A" />
                <Cube />
                <InnerCube />
            </Canvas>
        </div>
    );
}
