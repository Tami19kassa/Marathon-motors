"use client";

import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  ContactShadows, 
  PresentationControls, 
  PerspectiveCamera,
  BakeShadows
} from "@react-three/drei";
import { Suspense } from "react";
import { HyundaiModel } from "./HyundaiModel";
import * as THREE from "three";

interface VehicleCanvasProps {
  scrollProgress: number;
  modelUrl: string;
}

export const VehicleCanvas = ({ scrollProgress, modelUrl }: VehicleCanvasProps) => {
  const Controls = PresentationControls as any;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none h-screen w-full bg-[#050505]">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        // FIX: ACESFilmicToneMapping makes colors vibrant like Sketchfab
        gl={{ 
            antialias: true, 
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 12]} fov={25} />

        {/* HIGH-END STUDIO LIGHTING */}
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.2} />
        
        {/* Top Softbox */}
        <rectAreaLight width={10} height={10} intensity={5} position={[0, 10, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        
        {/* Side Highlights */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
        <pointLight position={[-10, 5, 5]} intensity={5} color="#00e5ff" />

        <Suspense fallback={null}>
          <Controls
            global
            config={{ mass: 2, tension: 500 }}
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <HyundaiModel scrollProgress={scrollProgress} url={modelUrl} />
          </Controls>

          {/* FIX: 'studio' preset provides the sharp metallic reflections seen on Sketchfab */}
          <Environment preset="city" blur={0.8} />
          <BakeShadows />
        </Suspense>

        <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={3} 
            far={2} 
            color="#000000"
        />
      </Canvas>
    </div>
  );
};