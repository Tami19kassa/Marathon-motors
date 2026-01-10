"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export const Testimonials = ({ items }: { items: any[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white py-40 px-6 border-t border-slate-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* MINIMALIST HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-marathon-teal font-black tracking-[0.4em] uppercase text-[10px]">Testimonials</span>
            <h2 className="text-6xl md:text-8xl font-heading font-black italic uppercase leading-[0.85] mt-4">
              Voice of <br/> <span className="text-slate-200">Endurance</span>
            </h2>
          </div>
          <p className="text-slate-400 font-medium max-w-xs text-sm leading-relaxed border-l-2 border-marathon-teal pl-6">
            Hear from the individuals and corporations driving the future of Ethiopia with Marathon Motors.
          </p>
        </div>

        {/* THE EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-[48px] overflow-hidden shadow-premium">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 md:p-16 flex flex-col group hover:bg-[#fafafa] transition-colors duration-500"
            >
              <div className="mb-10 text-marathon-teal">
                <Quote size={40} fill="currentColor" className="opacity-20" />
              </div>

              {/* THE QUOTE - High contrast, readable size */}
              <p className="text-xl font-medium leading-[1.6] text-slate-800 mb-12 flex-1 italic">
                "{item.quote}"
              </p>

              {/* THE AUTHOR BLOCK */}
              <div className="flex items-center gap-5 pt-10 border-t border-slate-100">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-black italic uppercase text-sm tracking-tight text-black">{item.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};