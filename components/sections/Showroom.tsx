"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Zap, Boxes, Maximize2 } from "lucide-react";
import Image from "next/image";
import { InteractiveViewer } from "../canvas/InteractiveViewer";

interface ShowroomProps {
  vehicles: any[];
}

export const Showroom = ({ vehicles }: ShowroomProps) => {
  const [filter, setFilter] = useState("All");
  const [selectedModel, setSelectedModel] = useState<{url: string, name: string} | null>(null);

  const categories = ["All", "EV", "SUV", "Sedan"];
  const filteredItems = vehicles.filter(v => filter === "All" || v.category === filter);

  return (
    <section className="py-32 px-6 bg-marathon-dark min-h-screen relative" id="showroom">
      {/* THE 360 MODAL POPUP */}
      <AnimatePresence>
        {selectedModel && (
          <InteractiveViewer 
            modelUrl={selectedModel.url} 
            title={selectedModel.name}
            onClose={() => setSelectedModel(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">
        {/* HEADER & FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-marathon-teal font-black tracking-[0.4em] uppercase text-xs">Explore Fleet</span>
            <h2 className="text-5xl md:text-7xl font-heading font-bold italic uppercase mt-4 text-white">Digital Showroom</h2>
          </div>

          <div className="flex bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 md:px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat ? "bg-marathon-teal text-black shadow-glow" : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* VEHICLE GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((car) => (
              <motion.div
                key={car._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-marathon-steel rounded-[40px] p-8 border border-white/5 hover:border-marathon-teal/50 transition-all duration-500 shadow-premium"
              >
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-3xl font-heading font-black italic uppercase text-white leading-none">{car.name}</h3>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 block">{car.category}</span>
                   </div>
                   {car.category === "EV" && <Zap className="text-marathon-teal fill-current animate-pulse" size={20} />}
                </div>

                {/* VISUAL PREVIEW */}
                <div className="relative h-56 w-full mb-8">
                   <Image 
                      src={car.imageUrl} 
                      alt={car.name} 
                      fill 
                      className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" 
                   />
                </div>

                {/* 360° ACTION (Only if model file exists) */}
                {car.modelUrl && (
                  <button 
                    onClick={() => setSelectedModel({ url: car.modelUrl, name: car.name })}
                    className="w-full mb-4 py-4 rounded-2xl bg-white/5 hover:bg-marathon-teal hover:text-black text-white transition-all flex items-center justify-center gap-3 font-bold uppercase text-[10px] tracking-widest border border-white/5"
                  >
                    <Maximize2 size={14} /> Interactive 360° View
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Battery/Engine</p>
                      <span className="text-sm font-bold text-white uppercase">{car.specs?.battery || "Standard"}</span>
                   </div>
                   <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Range</p>
                      <span className="text-sm font-bold text-marathon-teal">{car.specs?.range || "N/A"}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};