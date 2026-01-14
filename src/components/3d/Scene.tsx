import { Canvas, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import CyberPlant from "./CyberPlant";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

function CameraController({ plantRef }: { plantRef: React.RefObject<Group> }) {
    const { camera } = useThree();
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!plantRef.current) return;

        // Initial Camera Position (Soil/Roots view)
        camera.position.set(0, 0.5, 3);
        camera.lookAt(0, 0, 0);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            },
        });

        timelineRef.current = tl;

        // Stage 1: Pan up to stem (15-30%)
        tl.to(camera.position, {
            y: 2,
            z: 4,
            duration: 2,
            ease: "power1.inOut",
        }, 0);

        // Stage 2: Focus on leaf / Diagnosis (30-50%)
        tl.to(camera.position, {
            x: 1.5,
            y: 3,
            z: 2,
            duration: 2,
            ease: "power1.inOut",
            onUpdate: () => camera.lookAt(0, 2, 0),
        }, 2);

        // Stage 3: Zoom out for Market/Sourcing (50-70%)
        tl.to(camera.position, {
            x: -3,
            y: 5,
            z: 8,
            duration: 2,
            ease: "power1.inOut",
            onUpdate: () => camera.lookAt(0, 1, 0),
        }, 4);

        // Stage 4: Full Bloom / Strategy (70-100%)
        tl.to(camera.position, {
            x: 0,
            y: 4,
            z: 10,
            duration: 3,
            ease: "power2.out",
            onUpdate: () => camera.lookAt(0, 2, 0),
        }, 6);

        // Animate Plant Rotation alongside
        tl.to(plantRef.current.rotation, {
            y: Math.PI * 2, // Full rotation
            duration: 9,
            ease: "none",
        }, 0);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera, plantRef]);

    return null;
}

export default function Scene() {
    const plantRef = useRef<Group>(null);

    return (
        <div className="fixed inset-0 z-0 bg-cyber-black pointer-events-none">
            <Canvas className="w-full h-full">
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={50} />

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

                    <group ref={plantRef}>
                        <CyberPlant />
                    </group>

                    <CameraController plantRef={plantRef} />

                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
