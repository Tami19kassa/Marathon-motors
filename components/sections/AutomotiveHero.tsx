"use client";
import { motion } from "framer-motion";
import { Zap, Gauge, Shield } from "lucide-react";

export const AutomotiveHero = ({ vehicle }: { vehicle: any }) => {
  return (
    <div className="relative w-full h-full flex items-center px-6 md:px-20">
      
      {/* 1. TYPOGRAPHY OVERLAY */}
      <div className="relative z-20 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-marathon-teal" />
             <span className="text-marathon-teal font-black uppercase tracking-[0.5em] text-[10px]">
                Marathon × Hyundai Ethiopia
             </span>
          </div>

          <h1 className="text-7xl md:text-[11vw] font-heading font-black italic text-white leading-[0.85] uppercase tracking-tighter">
            {vehicle.name}
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl max-w-xl font-medium leading-relaxed italic">
            {vehicle.tagline || "The standard of engineering endurance."}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button className="bg-marathon-teal text-black font-bold uppercase px-6 py-3 rounded-md shadow-glow hover:scale-[1.02] transition-transform">
              Explore Specs
            </button>
            <button className="border border-white/10 text-white font-semibold uppercase px-5 py-3 rounded-md backdrop-blur-sm hover:bg-white/5 transition-colors">
              Configure Color
            </button>
          </div>

          {/* HORIZONTAL SPECS (Like the reference image) */}
          <div className="pt-10 mt-10">
            <div className="inline-grid grid-cols-3 gap-6 bg-white/3 backdrop-blur rounded-xl p-6 border border-white/6">
              <SpecItem label="Electric Range" value={vehicle.specs?.range || "---"} icon={<Zap size={14}/>} />
              <SpecItem label="Acceleration" value={vehicle.specs?.acceleration || "---"} icon={<Gauge size={14}/>} />
              <SpecItem label="Energy/Battery" value={vehicle.specs?.battery || "---"} icon={<Shield size={14}/>} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. 3D BACKGROUND GRADIENTS */}
      {/* The 3D car is rendered by the VehicleCanvas in page.tsx, 
          which sits UNDER this transparent text layer */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </div>
    </div>
  );
};

const SpecItem = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="space-y-2">
        <p className="text-slate-500 font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
            {icon} {label}
        </p>
        <p className="text-2xl font-heading font-bold italic text-white uppercase">{value}</p>
    </div>
);