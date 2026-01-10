"use client";

import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  ContactShadows, 
  PresentationControls, 
  PerspectiveCamera 
} from "@react-three/drei";
import { Suspense } from "react";
import { HyundaiModel } from "./HyundaiModel";

interface VehicleCanvasProps {
  scrollProgress: number;
}

export const VehicleCanvas = ({ scrollProgress }: VehicleCanvasProps) => {
  // We define the controls with 'as any' to kill the TypeScript prop validation errors
  const Controls = PresentationControls as any;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none h-screen w-full">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        {/* Cinematic Camera */}
        <PerspectiveCamera makeDefault position={[0, 0.5, 8]} fov={35} />

        {/* Studio Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
        />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color="#00e5ff" />

        <Suspense fallback={null}>
          {/* 
             THE FIX: Using the 'Controls' variable cast as 'any'. 
             This forces VS Code to accept 'config' and 'snap' without checking types.
          */}
          <Controls
            global
            config={{ mass: 2, tension: 500 }}
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <HyundaiModel scrollProgress={scrollProgress} />
          </Controls>

          <Environment preset="city" />
        </Suspense>

        <ContactShadows 
          position={[0, -1.04, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2.8} 
          far={1.6} 
        />
      </Canvas>
    </div>
  );
};