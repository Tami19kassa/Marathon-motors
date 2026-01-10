"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Gauge, ArrowRight } from "lucide-react";

export const AutomotiveHero = ({ vehicle }: { vehicle: any }) => {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-marathon-dark">
      {/* 1. BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-linear-to-r from-marathon-dark via-marathon-dark/40 to-transparent z-10" />
         {/* Atmospheric Ambient Glow */}
         <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-marathon-teal/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
             <span className="bg-marathon-teal text-black px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">
               {vehicle.category} Division
             </span>
             <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Assembled in Addis</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-black italic text-white leading-[0.9] uppercase">
            {vehicle.name}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            {vehicle.tagline || "Experience the pinnacle of Ethiopian engineering and Hyundai innovation."}
          </p>

          {/* DYNAMIC SPECS BAR */}
          <div className="flex gap-8 pt-4">
             <div className="space-y-1">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Range</p>
                <div className="flex items-center gap-2 text-white font-heading font-bold text-xl">
                   <Zap size={16} className="text-marathon-teal" /> {vehicle.specs?.range || "N/A"}
                </div>
             </div>
             <div className="w-px h-10 bg-white/10" />
             <div className="space-y-1">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">0-100 km/h</p>
                <div className="flex items-center gap-2 text-white font-heading font-bold text-xl">
                   <Gauge size={16} className="text-marathon-teal" /> {vehicle.specs?.acceleration || "N/A"}
                </div>
             </div>
          </div>

          <div className="flex gap-4 pt-8">
             <button className="bg-marathon-teal text-black font-black px-10 py-5 rounded-full hover:shadow-glow transition-all active:scale-95 flex items-center gap-3">
                BOOK TEST DRIVE <ArrowRight size={18} />
             </button>
          </div>
        </motion.div>

        {/* 3. FLOATING VEHICLE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
          className="relative aspect-video lg:aspect-auto"
        >
          <Image 
             src={vehicle.transparentPngUrl || vehicle.imageUrl} 
             alt={vehicle.name}
             width={1000}
             height={500}
             className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,229,255,0.2)]"
             priority
          />
        </motion.div>
      </div>
    </div>
  );
};