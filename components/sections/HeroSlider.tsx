"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AutomotiveHero } from "./AutomotiveHero"; // Logic below
import { Vehicle } from "@/lib/cms-api";
import { MoveRight } from "lucide-react";

export const HeroSlider = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (vehicles.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % vehicles.length);
    }, 8000); // 8 Seconds per model
    return () => clearInterval(timer);
  }, [vehicles.length]);

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <AutomotiveHero vehicle={vehicles[index]} />
        </motion.div>
      </AnimatePresence>

      {/* EDITORIAL INDICATORS */}
      <div className="absolute bottom-12 left-12 z-50 flex items-end gap-12">
        <div className="flex flex-col">
            <span className="text-[10px] font-black text-marathon-teal uppercase tracking-[0.4em] mb-4">Current Series</span>
            <div className="flex gap-3">
            {vehicles.map((_, i) => (
                <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-[3px] transition-all duration-700 rounded-full ${
                    i === index ? 'w-16 bg-marathon-teal' : 'w-4 bg-white/20'
                }`}
                />
            ))}
            </div>
        </div>
        
        <div className="hidden md:block">
            <p className="text-white/20 font-heading font-black italic text-6xl leading-none select-none">
                0{index + 1}
            </p>
        </div>
      </div>
    </div>
  );
};