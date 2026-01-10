"use client";

import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, 
  OrbitControls, 
  Stage, 
  Center,
  Float
} from "@react-three/drei";
import { Suspense, useLayoutEffect } from "react";
import { X, MousePointer2, Move, ZoomIn } from "lucide-react";
import * as THREE from "three"; // FIX: Added missing THREE import
import { motion } from "framer-motion";

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            // FIX: Ensure textures look rich and not 'washed out'
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
            mat.envMapIntensity = 1.5;
          }
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

export const InteractiveViewer = ({ modelUrl, onClose, title }: { modelUrl: string; onClose: () => void; title?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-marathon-dark/98 backdrop-blur-3xl flex flex-col"
    >
      <div className="p-6 md:p-10 flex justify-between items-center border-b border-white/5 bg-black/20">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-marathon-teal uppercase tracking-[0.5em] mb-1">Marathon Prototyping</span>
          <h2 className="text-2xl font-heading font-black italic uppercase text-white leading-none">{title || "360° Inspection"}</h2>
        </div>
        <button onClick={onClose} className="w-14 h-14 rounded-full bg-white/5 hover:bg-marathon-teal hover:text-black transition-all flex items-center justify-center group border border-white/10">
          <X className="group-hover:rotate-90 transition-transform" size={24} />
        </button>
      </div>

      <div className="flex-1 relative cursor-grab active:cursor-grabbing">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          // FIX: ACES Filmic mapping makes the car look realistic like Sketchfab
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
        >
          <Suspense fallback={null}>
            <Stage intensity={0.5} environment="city" adjustCamera={1.8} shadows={{ type: 'contact', opacity: 0.6, blur: 3 }}>
              <Center>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Model url={modelUrl} />
                </Float>
              </Center>
            </Stage>
            <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.1} enablePan={false} />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8">
           <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <MousePointer2 size={14} className="text-marathon-teal"/>
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Rotate</span>
           </div>
           <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <ZoomIn size={14} className="text-marathon-teal"/>
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Zoom</span>
           </div>
        </div>
      </div>
      
      <div className="p-8 bg-black/40 border-t border-white/5 flex justify-center items-center gap-12">
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Visual Fidelity</span>
            <span className="text-marathon-teal font-heading font-bold italic text-xl">4K PBR RENDER</span>
        </div>
      </div>
    </motion.div>
  );
};