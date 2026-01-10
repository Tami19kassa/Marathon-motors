"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MoveUpRight, ShieldCheck, Zap, Star, Clock } from "lucide-react";
import Image from "next/image";
import { InteractiveViewer } from "../canvas/InteractiveViewer";

interface ShowroomProps {
  vehicles: any[];
}

export const Showroom = ({ vehicles }: ShowroomProps) => {
  const [selectedModel, setSelectedModel] = useState<{url: string, name: string} | null>(null);

  // Categories for the "Car Category" section
  const categories = [
    { name: "Hyundai EV", img: "https://images.unsplash.com/photo-1669280165507-679469795096?q=80&w=600", count: 4 },
    { name: "Executive SUV", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600", count: 8 },
    { name: "Modern Sedan", img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600", count: 12 },
    { name: "Commercial", img: "https://images.unsplash.com/photo-1606136894082-16016766d953?q=80&w=600", count: 5 },
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-20" id="showroom">
      {/* 360 MODAL */}
      <AnimatePresence>
        {selectedModel && (
          <InteractiveViewer 
            modelUrl={selectedModel.url} 
            title={selectedModel.name}
            onClose={() => setSelectedModel(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* --- 1. CAR CATEGORY SECTION --- */}
        <div className="mb-32">
          <h2 className="text-5xl font-heading font-black italic uppercase mb-12">Car Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="relative aspect-[3/4] group overflow-hidden rounded-xl cursor-pointer">
                <Image src={cat.img} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{cat.name}</h3>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-marathon-teal group-hover:text-black transition-all">
                    <MoveUpRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 2. TREND VEHICLES SECTION --- */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-heading font-black italic uppercase">Trend vehicles</h2>
            <button className="bg-marathon-teal text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {vehicles.slice(0, 4).map((car) => (
              <motion.div 
                key={car._id}
                className="bg-slate-50 p-8 border border-slate-100 flex flex-col group"
                whileHover={{ backgroundColor: "#f1f5f9" }}
              >
                <h4 className="text-xl font-heading font-black italic uppercase mb-1">{car.name}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">Marathon Hyundai</p>
                
                <div className="relative h-40 w-full mb-8 cursor-pointer" onClick={() => car.modelUrl && setSelectedModel({url: car.modelUrl, name: car.name})}>
                   <Image src={car.imageUrl} alt={car.name} fill className="object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-200">
                  <span className="font-heading font-black italic text-lg">{car.price || "$150/day"}</span>
                  <button className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-marathon-teal transition-colors">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3. PROMO BLOCK (The "Tesla" look) --- */}
        <div className="bg-marathon-dark rounded-[40px] overflow-hidden relative min-h-[500px] flex items-center p-12 md:p-24 mb-32 shadow-2xl">
          {/* Background Text Overlay */}
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
             <div className="bg-marathon-teal text-black px-8 py-8 rounded-2xl">
                <span className="text-7xl font-heading font-black">50%</span>
                <p className="font-bold uppercase tracking-widest text-xs mt-2 text-center">For everyone<br/>Hyundai cars</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-heading font-black italic text-white leading-none uppercase">
                Book Ioniq 6 with <br/> a big discount
              </h2>
              <button className="bg-marathon-teal text-black px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-glow">
                Book Now
              </button>
            </div>
            
            <div className="relative h-[300px] md:h-[400px]">
               {/* Use a high-res image of your flagship car here */}
               <Image 
                 src="https://marathonmotorengineering.com/storage/products/ioniq5.png" 
                 alt="Promo" 
                 fill 
                 className="object-contain drop-shadow-[0_20px_50px_rgba(0,229,255,0.2)]" 
               />
            </div>
          </div>
        </div>

        {/* --- 4. FEATURE BAR --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-t border-slate-100">
           <Feature icon={<ShieldCheck size={32} />} title="Seamless booking" desc="Automated reservation system." />
           <Feature icon={<Star size={32} />} title="Premium privileges" desc="For regular marathon customers." />
           <Feature icon={<Clock size={32} />} title="Cancel Anytime" desc="Up to 72 hours before pickup." />
           <Feature icon={<Zap size={32} />} title="No Hidden Fees" desc="Honest engineering, honest pricing." />
        </div>

      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="text-marathon-teal mb-2">{icon}</div>
    <h5 className="font-heading font-bold italic uppercase text-lg">{title}</h5>
    <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">{desc}</p>
  </div>
);