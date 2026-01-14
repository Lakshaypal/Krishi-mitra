import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CyberPlant from "./CyberPlant";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 bg-cyber-black">
            <Canvas className="w-full h-full">
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

                    {/* Cyber-Agrarian Lighting */}
                    <ambientLight intensity={0.2} color="#00FF9D" />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                        color="#00FF9D"
                    />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#FFB800" />

                    <CyberPlant />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
