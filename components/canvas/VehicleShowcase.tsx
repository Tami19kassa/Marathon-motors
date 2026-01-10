"use client";
import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { VehicleCanvas } from "./VehicleCanvas";
import { Vehicle } from "@/lib/cms-api"; // Import your real type

export const VehicleShowcase = ({ vehicle, progress }: { vehicle: Vehicle, progress: number }) => {
  const { active, progress: loadProgress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // When 3D engine is silent and progress is 100, show the car
    if (!active && loadProgress === 100) {
      const timer = setTimeout(() => setIsLoaded(true), 800);
      return () => clearTimeout(timer);
    }
  }, [active, loadProgress]);

  return (
    <div className="relative w-full h-screen">
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-20 bg-marathon-dark"
          >
            <Image
              src={vehicle.imageUrl}
              alt={vehicle.name}
              fill
              className="object-cover brightness-50"
              priority
            />
            {/* Modern Loader Strip */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <span className="text-marathon-teal font-heading font-bold italic uppercase tracking-[0.3em] text-xs">
                Synchronizing 3D Assets
              </span>
              <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-marathon-teal shadow-glow"
                        animate={{ width: `${loadProgress}%` }}
                        role="progressbar"
                        aria-valuenow={loadProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                />
              </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/80">
                      {Math.round(loadProgress)}%
                    </div>
                    {/* Show transparent PNG preview while loading if available */}
                    {vehicle.transparentPngUrl && (
                      <div className="absolute right-8 top-8 w-40 h-24 overflow-hidden rounded-md border border-white/6">
                        <Image src={vehicle.transparentPngUrl} alt={`${vehicle.name} preview`} fill className="object-contain" />
                      </div>
                    )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <VehicleCanvas scrollProgress={progress} modelUrl={vehicle.modelUrl} />
      </div>
    </div>
  );
};