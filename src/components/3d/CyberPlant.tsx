import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

export default function CyberPlant() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group>
            {/* Central Stem - Abstract representation */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#00FF9D"
                    wireframe
                    emissive="#00FF9D"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Floating Particles/Nodes */}
            {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 2 + Math.random();
                const y = (Math.random() - 0.5) * 4;

                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
                        scale={0.05}
                    >
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial
                            color="#FFB800"
                            emissive="#FFB800"
                            emissiveIntensity={1}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
