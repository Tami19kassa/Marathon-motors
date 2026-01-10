"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const TrainingCenter = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
        x: 100,
        opacity: 0,
        stagger: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white text-black min-h-screen flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT SIDE: Visual Blueprint */}
        <div className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden group">
           <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Engineering Lab"
           />
           {/* Technical Overlay */}
           <div className="absolute inset-0 bg-marathon-teal/10 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-4/5 h-4/5 border border-black/10 flex items-center justify-center relative">
                 <div className="absolute top-0 left-0 p-4 font-mono text-[10px] text-black/40">REF_ID: LAB_251</div>
                 <div className="text-black font-black text-[8vw] italic opacity-5">HYUNDAI</div>
              </div>
           </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="space-y-10">
          <div>
            <span className="text-marathon-teal font-black tracking-[0.5em] uppercase text-xs">Human Capital</span>
            <h2 className="text-6xl font-heading font-black italic uppercase leading-none mt-4">
              The Academy <br/> of Motion
            </h2>
            <p className="text-slate-600 mt-8 text-lg leading-relaxed">
              Marathon Motors doesn't just build cars; we build engineers. Our world-class technical center in Addis Ababa provides certified training for the next generation of EV technicians.
            </p>
          </div>

          <div className="space-y-6">
            {["High-Voltage Systems Training", "Robotic Assembly Diagnostics", "Global Hyundai Certification", "AI-Driven Logistics Management"].map((item) => (
              <div key={item} className="tech-item flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-full border border-marathon-teal flex items-center justify-center group-hover:bg-marathon-teal transition-colors">
                   <CheckCircle2 size={14} className="text-marathon-teal group-hover:text-white" />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-marathon-teal hover:text-black transition-all">
             View Training Programs
          </button>
        </div>
      </div>
    </section>
  );
};