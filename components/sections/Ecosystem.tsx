"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Settings, LucideProps } from "lucide-react";
import Image from "next/image";

// 1. Strict Interface Definition
interface PillarItem {
  title: string;
  desc: string;
  stat: string;
  // This type is the "Master Key" for Lucide Icons in TypeScript
  icon: React.ComponentType<LucideProps>; 
  img: string;
}

// 2. Data Array with Explicit Typing
const pillars: PillarItem[] = [
  {
    title: "Sales",
    desc: "Digital-first showrooms featuring the full Hyundai EV & ICE lineup.",
    stat: "12+ Models",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=2070"
  },
  {
    title: "Service",
    desc: "Certified EV technicians and high-voltage diagnostic systems.",
    stat: "45 Service Bays",
    icon: Wrench, // Changed from Tool to Wrench for better compatibility
    img: "https://images.unsplash.com/photo-1632733711679-5292d686360e?q=80&w=2070"
  },
  {
    title: "Spare Parts",
    desc: "Centralized hub for 100% genuine Hyundai components in East Africa.",
    stat: "98% Inventory",
    icon: Settings,
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070"
  }
];

export const Ecosystem = () => {
  return (
    <section className="py-32 px-6 bg-marathon-dark relative overflow-hidden" id="services">
      {/* Visual Technical Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-marathon-teal" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-marathon-teal" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-marathon-teal font-black tracking-[0.5em] uppercase text-[10px] md:text-xs"
          >
            The 3S Standard
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold italic uppercase mt-4 text-white">
            A Complete <br/> 
            <span className="text-white/20">Engineering Circle</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, i) => {
            // 3. Extract the component with a Capitalized name to satisfy React
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[550px] rounded-3xl overflow-hidden bg-marathon-steel border border-white/5"
              >
                {/* Image Background */}
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-dark via-marathon-dark/60 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-xl bg-marathon-teal/10 flex items-center justify-center mb-6 group-hover:bg-marathon-teal group-hover:text-black transition-all duration-500 text-marathon-teal">
                    {/* Render the Icon using the capitalized variable */}
                    <IconComponent size={24} />
                  </div>
                  
                  <h3 className="text-3xl font-heading font-black italic uppercase mb-4 text-white">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                    {item.desc}
                  </p>
                  
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Capacity</span>
                    <span className="text-marathon-teal font-heading font-bold italic text-xl">{item.stat}</span>
                  </div>
                </div>

                {/* Animated Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-marathon-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};