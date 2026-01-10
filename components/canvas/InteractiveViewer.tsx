"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Center } from "@react-three/drei";
import { Suspense } from "react";
import { Loader2, X } from "lucide-react";

// Robust Model Loader
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface InteractiveViewerProps {
  modelUrl: string;
  onClose: () => void;
  title?: string;
}

export const InteractiveViewer = ({ modelUrl, onClose, title }: InteractiveViewerProps) => {
  return (
    <div className="fixed inset-0 z-[200] bg-marathon-dark/98 backdrop-blur-2xl flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 bg-black/20">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-marathon-teal uppercase tracking-[0.4em]">Marathon Engineering</span>
          <h2 className="text-xl md:text-2xl font-heading font-bold italic uppercase text-white">{title || "Vehicle Inspection"}</h2>
        </div>
        <button 
          onClick={onClose} 
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-marathon-teal hover:text-black transition-all flex items-center justify-center group"
        >
          <X className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* 3D Canvas Area */}
      <div className="flex-1 relative cursor-grab active:cursor-grabbing">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 35 }}>
          <Suspense fallback={null}>
            {/* 
               FIX: The prop is now 'shadows'. 
               Setting it to 'contact' enables the realistic floor shadow.
            */}
            <Stage 
              intensity={0.5} 
              environment="city" 
              adjustCamera={1.2} 
              shadows={{ type: 'contact', opacity: 0.5, blur: 3 }}
            >
              <Center>
                <Model url={modelUrl} />
              </Center>
            </Stage>
            
            <OrbitControls 
              makeDefault 
              minPolarAngle={Math.PI / 4} 
              maxPolarAngle={Math.PI / 2} 
              enableDamping={true}
            />
          </Suspense>
        </Canvas>

        {/* Loading Indicator inside Canvas */}
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-marathon-teal animate-spin" />
          </div>
        }>
          <Model url={modelUrl} />
        </Suspense>
      </div>
      
      {/* Interaction Help */}
      <div className="p-8 text-center bg-black/40 border-t border-white/5">
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold">
          Drag to Rotate • Scroll to Zoom • Right Click to Pan
        </p>
      </div>
    </div>
  );
};