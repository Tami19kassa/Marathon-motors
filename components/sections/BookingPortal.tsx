"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, CheckCircle, ChevronRight } from "lucide-react";

export const BookingPortal = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ model: "", date: "", name: "", email: "" });

  const nextStep = () => setStep(s => s + 1);

  return (
    <section className="py-32 bg-white text-black px-6" id="booking">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-marathon-teal font-black tracking-[0.4em] uppercase text-xs">Drive the Legend</span>
        <h2 className="text-5xl md:text-7xl font-heading font-bold italic uppercase mt-4 mb-16">Reserve a Test Drive</h2>

        <div className="bg-slate-50 rounded-[40px] p-8 md:p-16 border border-slate-200 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-marathon-teal transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step1" className="space-y-8">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Step 1: Select Your Machine</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Ioniq 5", "Kona EV", "Tucson", "Creta", "Santa Fe", "Staria"].map(m => (
                    <button 
                      key={m}
                      onClick={() => { setForm({...form, model: m}); nextStep(); }}
                      className="p-6 rounded-2xl border-2 border-slate-200 hover:border-marathon-teal font-bold transition-all hover:bg-white"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step2" className="space-y-8">
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Step 2: Contact Details</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase text-slate-400 ml-2">Full Name</label>
                       <input type="text" className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-marathon-teal outline-none" placeholder="Abebe Bikila" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase text-slate-400 ml-2">Phone Number</label>
                       <input type="tel" className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-marathon-teal outline-none" placeholder="+251 ..." />
                    </div>
                 </div>
                 <button onClick={nextStep} className="bg-black text-white px-12 py-5 rounded-full font-black uppercase flex items-center gap-3 mx-auto hover:bg-marathon-teal hover:text-black transition-all">
                    Generate Booking <ChevronRight />
                 </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key="step3" className="py-10 text-center">
                 <div className="w-24 h-24 bg-marathon-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
                    <CheckCircle size={48} className="text-black" />
                 </div>
                 <h3 className="text-4xl font-heading font-black italic uppercase">Reservation Confirmed</h3>
                 <p className="text-slate-500 mt-4 max-w-sm mx-auto font-medium">Your request for the <span className="text-black font-bold">{form.model}</span> is processed. Our concierge will contact you shortly.</p>
                 <button onClick={() => setStep(1)} className="mt-10 text-xs font-black uppercase border-b-2 border-black pb-1">New Booking</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};