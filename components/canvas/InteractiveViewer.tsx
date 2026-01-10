"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import { X, Box, Info, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export const InteractiveViewer = ({ modelUrl, title, onClose }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[600] bg-white flex flex-col md:flex-row"
    >
      {/* 1. SIDEBAR INFO (Editorial Style) */}
      <div className="w-full md:w-[400px] border-r border-slate-100 p-12 flex flex-col justify-between bg-slate-50/50">
        <div className="space-y-8">
          <button onClick={onClose} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-colors">
            <X size={14}/> Exit Gallery
          </button>
          
          <div>
            <span className="text-marathon-teal font-black text-[10px] uppercase tracking-widest">Model Inspection</span>
            <h2 className="text-5xl font-heading font-black italic uppercase leading-none mt-2">{title}</h2>
          </div>

          <div className="space-y-6">
            <SpecRow label="Exterior Finish" value="PBR Metallic" />
            <SpecRow label="Lighting" value="Studio High-Key" />
            <SpecRow label="Tessellation" value="Ultra-High" />
          </div>
        </div>

        <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest">Book Now</button>
            <button className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-all"><Share2 size={18}/></button>
        </div>
      </div>

      {/* 2. THE 3D STUDIO CANVAS */}
      <div className="flex-1 relative bg-white">
        {/* Visual Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
            <h3 className="text-[30vw] font-heading font-black italic uppercase">MARATHON</h3>
        </div>

        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 30 }}>
          <Suspense fallback={null}>
            {/* STAGE provides the professional white studio lighting automatically */}
            <Stage intensity={0.6} environment="city" adjustCamera={1.8} shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Model url={modelUrl} />
              </Float>
            </Stage>
            <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.1} enablePan={false} dampingFactor={0.05} />
          </Suspense>
        </Canvas>

        {/* Interaction HUD */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10">
           <HUDItem icon={<Box size={16}/>} text="Drag to Rotate" />
           <div className="h-4 w-px bg-slate-200" />
           <HUDItem icon={<Info size={16}/>} text="Scroll to Zoom" />
        </div>
      </div>
    </motion.div>
  );
};

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const SpecRow = ({ label, value }: any) => (
  <div className="flex justify-between border-b border-slate-200 pb-2">
    <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
    <span className="text-xs font-black uppercase tracking-tighter">{value}</span>
  </div>
);

const HUDItem = ({ icon, text }: any) => (
    <div className="flex items-center gap-3 text-slate-400">
        {icon} <span className="text-[10px] font-black uppercase tracking-widest">{text}</span>
    </div>
);