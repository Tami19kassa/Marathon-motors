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

      {/* EDITORIAL INDICATORS + THUMBNAILS */}
      <div className="absolute bottom-12 left-12 z-50 flex items-end gap-8">
        <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-marathon-teal uppercase tracking-[0.4em] mb-4">Current Series</span>
            <div className="flex gap-3 items-center">
              {vehicles.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`group relative h-12 w-20 overflow-hidden rounded-lg border border-white/6 bg-white/2 transition-all ${i === index ? 'ring-2 ring-marathon-teal scale-105' : 'hover:scale-102'} `}
                >
                  {v.transparentPngUrl ? (
                    // thumbnail if available
                    <img src={v.transparentPngUrl} alt={v.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-xs text-white/80 text-center py-1">{v.name}</div>
                </button>
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