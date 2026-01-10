"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export const Testimonials = ({ items }: { items: any[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white py-32 md:py-48 px-6 border-t border-slate-100 relative overflow-hidden">
      
      {/* Decorative large text background */}
      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[20vw] leading-none font-heading font-black italic uppercase text-black whitespace-nowrap">
              VOICES VOICES VOICES
          </h2>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div>
                <span className="text-marathon-teal font-black tracking-[0.4em] uppercase text-[10px] block mb-4">Endorsements</span>
                <h2 className="text-5xl md:text-7xl font-heading font-black italic uppercase leading-[0.9] text-slate-900">
                    Trusted by the <br/> <span className="text-slate-300">Resilient.</span>
                </h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-slate-200" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true }}
              className="group flex flex-col justify-between p-8 md:p-10 bg-slate-50 border border-transparent hover:border-marathon-teal hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50"
            >
              <div>
                <Quote size={40} className="text-marathon-teal/20 group-hover:text-marathon-teal transition-colors mb-8" />
                <p className="text-lg md:text-xl font-medium leading-[1.6] text-slate-700 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200 group-hover:border-marathon-teal/20 transition-colors">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 grayscale group-hover:grayscale-0 transition-all duration-500">
                   <Image src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                    <h4 className="font-heading font-black italic uppercase text-sm tracking-wide text-slate-900">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-marathon-teal transition-colors">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};