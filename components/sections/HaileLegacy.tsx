"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HaileLegacy = () => {
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(scrollRef.current, 
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        }
      }
    );
    return () => { pin.kill(); };
  }, []);

  return (
    <section className="overflow-hidden bg-white text-black">
      <div ref={triggerRef}>
        <div ref={scrollRef} className="h-screen w-[400vw] flex flex-nowrap items-center">
          
          {/* STEP 1: The Runner */}
          <div className="h-screen w-screen flex items-center justify-center px-20">
            <div className="grid grid-cols-2 gap-20 items-center">
               <h2 className="text-[12vw] font-heading font-black italic leading-none">ENDURANCE</h2>
               <p className="text-xl max-w-md uppercase font-bold text-slate-400">Haile Gebrselassie's heartbeat is the engine behind Marathon Motors.</p>
            </div>
          </div>

          {/* STEP 2: The Vision */}
          <div className="h-screen w-screen bg-marathon-dark text-white flex items-center justify-center">
             <div className="text-center">
                <span className="text-marathon-teal font-bold tracking-[0.5em] uppercase">Founded 2009</span>
                <h3 className="text-7xl font-heading font-bold mt-4 uppercase italic">Engineering Ethiopia's Future</h3>
             </div>
          </div>

          {/* STEP 3: The Assembly */}
          <div className="h-screen w-screen flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070" className="w-[80%] h-[60%] object-cover grayscale" alt="Assembly" />
          </div>

        </div>
      </div>
    </section>
  );
};