"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Float, Center } from "@react-three/drei";
import { Suspense, useState } from "react";
import { X, Box, Info, Share2, Maximize, ScanLine, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const InteractiveViewer = ({ modelUrl, title, onClose }: any) => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-zinc-950 flex flex-col overflow-hidden"
    >
      {/* BACKGROUND GRID FX */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* 1. HUD HEADER */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-zinc-900/80 backdrop-blur-md border border-white/10 p-5 rounded-sm border-l-4 border-l-marathon-teal shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
            <span className="text-marathon-teal font-mono text-[10px] uppercase tracking-widest">Live_Render // 01</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black italic uppercase leading-none text-white">{title}</h2>
        </div>
        
        <div className="flex gap-4 pointer-events-auto">
             <button onClick={() => setShowInfo(!showInfo)} className="bg-white/5 border border-white/10 p-4 hover:bg-white hover:text-black transition-all text-white rounded-sm">
                <Info size={20} />
             </button>
             <button onClick={onClose} className="bg-marathon-teal border border-marathon-teal p-4 text-white hover:bg-white hover:text-black transition-all rounded-sm">
                <X size={20} strokeWidth={3} />
             </button>
        </div>
      </div>

      {/* 2. LEFT SIDE SPECIFICATION PANEL */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-6 z-20 w-[300px] pointer-events-none hidden md:block"
          >
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 pointer-events-auto space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-zinc-400 text-xs font-mono uppercase">Vehicle_Data</span>
                    <ScanLine className="text-marathon-teal" size={16} />
                </div>
                
                <div className="space-y-4">
                    <SpecRow label="Chassis" value="Reinforced Alloy" />
                    <SpecRow label="Drive" value="AWD / Electric" />
                    <SpecRow label="Aerodynamics" value="0.23 Cd" />
                </div>

                <div className="pt-4 flex gap-3">
                    <button className="flex-1 bg-white text-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-marathon-teal transition-colors">
                        Reserve
                    </button>
                    <button className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. 3D CANVAS */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 8], fov: 35 }}>
          <Suspense fallback={null}>
            <Stage intensity={0.5} environment="city" adjustCamera={false} shadows={{ type: 'contact', opacity: 0.6, blur: 2 }}>
              <Center>
                  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[0, 0.2]}>
                    <Model url={modelUrl} />
                  </Float>
              </Center>
            </Stage>
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} dampingFactor={0.05} />
          </Suspense>
        </Canvas>
      </div>

      {/* 4. BOTTOM CONTROLS HUD */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-zinc-900/90 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
          <HUDItem icon={<RotateCw size={14}/>} text="Rotate" />
          <div className="w-px h-3 bg-white/20" />
          <HUDItem icon={<Maximize size={14}/>} text="Zoom" />
          <div className="w-px h-3 bg-white/20" />
          <HUDItem icon={<Box size={14}/>} text="Inspect" />
      </div>
    </motion.div>
  );
};

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  // Add a subtle rim light effect or material override if needed here
  return <primitive object={scene} />;
};

const SpecRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-mono text-white">{value}</span>
  </div>
);

const HUDItem = ({ icon, text }: any) => (
    <div className="flex items-center gap-2 text-zinc-400 hover:text-marathon-teal transition-colors cursor-help">
        {icon} <span className="text-[9px] font-black uppercase tracking-[0.2em]">{text}</span>
    </div>
);