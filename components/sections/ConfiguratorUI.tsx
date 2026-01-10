"use client";
import { motion } from "framer-motion";
import { useConfigStore } from "@/lib/config-store";
import { Check } from "lucide-react";

export const ConfiguratorUI = () => {
  const { factoryColors, activeColor, setactiveColor } = useConfigStore();

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8">
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-black/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-marathon-teal block mb-6">
          Exterior Palette
        </span>

        <div className="flex flex-col gap-5">
          {factoryColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setactiveColor(color)}
              className="group relative flex items-center gap-4 text-left"
            >
              {/* Color Swatch */}
              <div 
                className="w-12 h-12 rounded-full border-2 transition-all duration-500 relative"
                style={{ 
                  backgroundColor: color.hex,
                  borderColor: activeColor.name === color.name ? "#00e5ff" : "transparent"
                }}
              >
                {activeColor.name === color.name && (
                  <motion.div layoutId="check" className="absolute inset-0 flex items-center justify-center">
                    <Check size={16} className={color.name === "Atlas White" ? "text-black" : "text-white"} />
                  </motion.div>
                )}
              </div>

              {/* Label */}
              <div className="overflow-hidden">
                <p className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeColor.name === color.name ? "text-white translate-x-0" : "text-slate-500 translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                  {color.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* PRICE COUNTER */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-marathon-teal p-6 rounded-3xl text-black shadow-glow"
      >
        <p className="text-[10px] font-black uppercase tracking-widest leading-none">Starting from</p>
        <p className="text-2xl font-heading font-black italic mt-1">ETB 4.2M</p>
      </motion.div>
    </div>
  );
};