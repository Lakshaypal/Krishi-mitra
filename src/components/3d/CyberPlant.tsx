import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";

export default function CyberPlant() {
    const groupRef = useRef<Group>(null);

    // Create a procedural structures for a "Digital Tree"
    const branches = useMemo(() => {
        const items = [];
        // Main trunk
        items.push({
            position: [0, 0, 0],
            scale: [0.2, 4, 0.2],
            geometry: 'cylinder',
            color: '#00FF9D'
        });

        // Branches
        for (let i = 0; i < 8; i++) {
            const y = 0.5 + Math.random() * 2;
            const angle = (i / 8) * Math.PI * 2;
            const length = 1 + Math.random();
            items.push({
                position: [Math.cos(angle) * 0.5, y, Math.sin(angle) * 0.5],
                rotation: [0, angle, Math.PI / 4],
                scale: [0.1, length, 0.1],
                geometry: 'cylinder',
                color: '#00FF9D'
            });

            // Leaves/Data Nodes at the end of branches
            items.push({
                position: [Math.cos(angle) * (0.5 + length * 0.7), y + length * 0.7, Math.sin(angle) * (0.5 + length * 0.7)],
                scale: [0.3, 0.3, 0.3],
                geometry: 'octahedron',
                color: '#FFB800'
            });
        }
        return items;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Pulse effect for the whole tree
            // const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
            // groupRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={groupRef}>
            {branches.map((item, i) => (
                <mesh
                    key={i}
                    position={item.position as [number, number, number]}
                    rotation={item.rotation as [number, number, number] || [0, 0, 0]}
                    scale={item.scale as [number, number, number]}
                >
                    {item.geometry === 'cylinder' ? (
                        <cylinderGeometry args={[1, 1, 1, 8]} />
                    ) : (
                        <octahedronGeometry args={[1, 0]} />
                    )}
                    <meshStandardMaterial
                        color={item.color}
                        wireframe
                        emissive={item.color}
                        emissiveIntensity={item.geometry === 'cylinder' ? 0.2 : 0.8}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}

            {/* Holographic Ground Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <ringGeometry args={[1.5, 1.6, 64]} />
                <meshBasicMaterial color="#00FF9D" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}
