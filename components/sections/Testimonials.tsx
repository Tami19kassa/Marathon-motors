"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export const Testimonials = ({ items }: { items: any[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* EDITORIAL HEADER */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-marathon-teal font-black tracking-[0.5em] uppercase text-[10px]"
          >
            Voice of Ownership
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-heading font-black italic uppercase leading-none mt-4"
          >
            The Marathon <br/> <span className="text-slate-200">Experience</span>
          </motion.h2>
        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#fcfcfc] p-12 rounded-[40px] border border-slate-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              {/* Massive Background Quote Mark */}
              <Quote className="absolute top-10 right-10 text-slate-100 group-hover:text-marathon-teal/10 transition-colors" size={80} />
              
              <div className="relative z-10">
                {/* RATING */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < item.rating ? "text-marathon-teal fill-marathon-teal" : "text-slate-200"} />
                  ))}
                </div>

                {/* THE QUOTE */}
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-800 mb-10">
                  "{item.quote}"
                </p>

                {/* AUTHOR */}
                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image 
                        src={item.avatarUrl || "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=200"} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-black italic uppercase text-sm tracking-tight">{item.name}</h4>
                    <p className="text-[10px] font-bold text-marathon-teal uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};