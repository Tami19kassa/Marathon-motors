"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { X, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export const InteractiveViewer = ({ modelUrl, title, onClose }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-zinc-950 flex flex-col overflow-hidden"
    >
      {/* 1. CLEAN UI OVERLAY */}
      <div className="absolute inset-0 z-50 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        
        {/* HEADER & EXIT BUTTON */}
        <div className="flex justify-between items-start pointer-events-auto w-full">
             {/* Simple Badge */}
             <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 flex items-center gap-2 rounded-sm">
                <Trophy size={14} className="text-yellow-500"/> 
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Showroom Mode</span>
             </div>

             {/* EXIT BUTTON - High Visibility */}
             <button 
                onClick={onClose} 
                className="group flex items-center gap-3 bg-red-600 text-white px-8 py-3 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl"
             >
                <span>Exit</span>
                <X size={18} strokeWidth={3} />
             </button>
        </div>

        {/* STATS PANEL (Minimalist) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-10 pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-md border-r-4 border-marathon-teal p-8 text-right space-y-4 shadow-2xl w-[280px]">
                <div>
                    <div className="flex justify-end gap-1 text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <h2 className="text-3xl font-heading font-black italic uppercase text-white leading-none">{title}</h2>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div className="space-y-3">
                   <StatRow label="Top Speed" value="320 km/h" />
                   <StatRow label="0-100 km/h" value="2.9 s" />
                   <StatRow label="Range" value="450 km" />
                </div>
            </div>
        </div>
      </div>

      {/* 2. 3D SCENE - MANUALLY ZOOMED */}
      <div className="absolute inset-0 z-10 cursor-move bg-gradient-to-b from-zinc-900 to-black">
        {/* 
            CAMERA FIX: 
            position={[1.5, 1, 2.5]} -> Puts camera VERY close to the center.
            fov={40} -> Narrower field of view makes the object look larger/cinematic.
        */}
        <Canvas shadows dpr={[1, 2]} camera={{ position: [1.5, 1, 2.5], fov: 40 }}>
          <Suspense fallback={null}>
            
            {/* STAGE: adjustCamera={false} prevents it from zooming out automatically */}
            <Stage intensity={1} environment="city" adjustCamera={false} shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}>
                  <Model url={modelUrl} />
            </Stage>
            
            <OrbitControls 
                makeDefault 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2.1} 
                minDistance={1.5} // Allow getting very close
                maxDistance={6}   // Prevent zooming out too far
            />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
};

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  // Manual scale boost just in case the model source is tiny
  return <primitive object={scene} scale={1.2} />;
};

const StatRow = ({ label, value }: any) => (
    <div className="flex justify-end items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
        <span className="text-lg font-heading font-black italic text-white">{value}</span>
    </div>
);