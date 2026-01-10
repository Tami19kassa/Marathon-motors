"use client";

import { useState } from 'react';
import { Search, User, Menu, X, Globe, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isLightSection, setIsLightSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSearch, toggleAuthModal } = useAppStore();

  // Switch theme when scrolling past the Hero (approx 80vh)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsLightSection(latest > 600);
  });

  const navLinks = [
    { name: "Showroom", id: "showroom" },
    { name: "E-Mobility", id: "ev" },
    { name: "Haile Legacy", id: "legacy" },
    { name: "Technology", id: "technology" },
  ];

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
  className={`fixed top-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[1440px] z-[100] transition-all duration-500 rounded-full border ${
    isLightSection 
      ? 'bg-white/80 border-slate-200 shadow-premium text-black' 
      : 'bg-black/20 border-white/10 text-white shadow-none'
  } backdrop-blur-2xl`}
>
  <div className="px-10 py-5 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-marathon-teal bg-white shadow-xl group-hover:scale-110 transition-transform">
        <Image src="/logo.png" alt="Logo" fill className="object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-black italic text-xl tracking-tighter uppercase leading-none">Marathon</span>
        <span className="text-[7px] font-black tracking-[0.4em] text-marathon-teal uppercase">Engineering</span>
      </div>
    </Link>

    {/* Center Links with technical divider styling */}
    <div className="hidden lg:flex items-center gap-12">
        {navLinks.map(link => (
            <button key={link.id} onClick={() => handleScroll(link.id)} className="group relative py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-marathon-teal transition-all duration-300 group-hover:w-full" />
            </button>
        ))}
    </div>

    <div className="flex items-center gap-8">
        <Search size={18} className="cursor-pointer hover:text-marathon-teal transition-all" />
        <button className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-marathon-teal hover:text-black shadow-lg active:scale-95">
            Connect
        </button>
    </div>
  </div>
</motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[200] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
                <span className="text-black font-heading font-black italic text-2xl">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-black"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                    <button 
                        key={link.name} 
                        onClick={() => handleScroll(link.id)}
                        className="text-5xl font-heading font-black italic uppercase text-slate-200 hover:text-marathon-teal text-left transition-colors"
                    >
                        {link.name}
                    </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};