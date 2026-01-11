"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export const Testimonials = ({ items }: { items: any[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-32 px-4 md:px-8 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
            <div>
                <span className="text-marathon-teal font-mono text-[10px] uppercase tracking-widest mb-2 block">// Client_Feedback_Log</span>
                <h2 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white leading-none">
                    Voice of <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Industry</span>
                </h2>
            </div>
            <p className="text-zinc-500 text-xs max-w-sm text-right font-mono hidden md:block">
                VERIFIED ACCOUNTS FROM PARTNERS DRIVING <br/> THE FUTURE OF ETHIOPIAN MOBILITY.
            </p>
        </div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 hover:border-marathon-teal/50 hover:bg-zinc-900/80 transition-all duration-500 rounded-sm overflow-hidden flex flex-col"
            >
              {/* Card Header (User Info) */}
              <div className="p-6 flex items-center gap-4 border-b border-white/5 bg-white/[0.02]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-marathon-teal transition-colors">
                  <Image src={item.avatarUrl} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div>
                  <h4 className="font-heading font-black italic uppercase text-sm tracking-wide text-white leading-none mb-1">{item.name}</h4>
                  <p className="text-[9px] font-mono text-marathon-teal uppercase tracking-wider opacity-80">{item.role}</p>
                </div>
              </div>

              {/* Card Body (Quote) */}
              <div className="p-6 md:p-8 flex-1 flex flex-col relative">
                <Quote size={24} className="text-white/10 absolute top-6 right-6" />
                
                {/* Scrollable area for very long text to preserve layout */}
                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-sm md:text-[15px] font-light leading-relaxed text-zinc-300 font-sans">
                        "{item.quote}"
                    </p>
                </div>
              </div>

              {/* Decorative Tech Footer */}
              <div className="px-6 py-3 border-t border-white/5 flex justify-between items-center bg-black/20">
                 <span className="text-[8px] font-mono text-zinc-600 uppercase">ID: {item._id.substring(0,6)}</span>
                 <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-marathon-teal transition-colors" />
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};