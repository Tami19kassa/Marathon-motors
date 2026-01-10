"use client";
import { useEffect, useState } from "react";
import { AutomotiveHero } from "./AutomotiveHero"; // Ensure this matches your Hero component name
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  vehicles: any[];
}

export const HeroSlider = ({ vehicles }: HeroSliderProps) => {
  const [index, setIndex] = useState(0);

  // Auto-play Logic
  useEffect(() => {
    if (vehicles.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % vehicles.length);
    }, 8000); // 8 seconds per car
    return () => clearInterval(timer);
  }, [vehicles.length]);

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-marathon-dark">
      <AnimatePresence mode="wait">
        <motion.div 
          key={vehicles[index]?._id || index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          {/* Passing the specific vehicle to your existing AutomotiveHero */}
          <AutomotiveHero vehicle={vehicles[index]} />
        </motion.div>
      </AnimatePresence>

      {/* Visual Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-50 flex items-center gap-6">
        <div className="flex gap-2">
          {vehicles.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-700 rounded-full ${
                i === index ? 'w-12 bg-marathon-teal shadow-glow' : 'w-4 bg-white/20 hover:bg-white/40'
              }`} 
            />
          ))}
        </div>
        
        <div className="flex gap-2 ml-4">
           <button 
              onClick={() => setIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
           >
              <ChevronLeft size={18} />
           </button>
           <button 
              onClick={() => setIndex((prev) => (prev + 1) % vehicles.length)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
           >
              <ChevronRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};