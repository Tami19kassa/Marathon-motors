"use client";

import { useState } from 'react';
// FIX: Added 'User' to imports
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 border-b backdrop-blur-md ${
            isLightSection 
            ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm' 
            : 'bg-zinc-950/80 border-white/10 text-white'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* 1. BRANDING */}
            <Link href="/" className="flex items-center gap-4 group">
                <div className={`relative w-10 h-10 border p-1 transition-colors duration-300 ${isLightSection ? 'border-slate-300 bg-slate-100' : 'border-white/20 bg-white/5'}`}>
                    <div className="relative w-full h-full">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-heading font-black italic text-xl tracking-tighter uppercase leading-none">Marathon</span>
                    <div className="flex items-center gap-2">
                        <span className="h-px w-3 bg-marathon-teal"></span>
                        <span className="text-[9px] font-bold tracking-[0.3em] opacity-60 uppercase">Engineering</span>
                    </div>
                </div>
            </Link>

            {/* 2. CENTER NAV */}
            <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                    <button key={link.id} onClick={() => handleScroll(link.id)} className="group relative py-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity">
                            {link.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-marathon-teal transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </div>

            {/* 3. ACTIONS */}
            <div className="flex items-center gap-4">
                {/* FIX: Passed 'true' to toggleSearch */}
                <button 
                    onClick={() => toggleSearch(true)} 
                    className={`p-2 transition-transform hover:scale-110 ${isLightSection ? 'text-slate-600' : 'text-slate-300'}`}
                >
                    <Search size={18} />
                </button>

                {/* FIX: Passed 'true' to toggleAuthModal */}
                <button 
                    onClick={() => toggleAuthModal(true)} 
                    className="hidden md:flex items-center gap-2 bg-marathon-teal text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                >
                    Connect <ArrowRight size={14} />
                </button>

                <button onClick={() => setIsMobileMenuOpen(true)} className={`lg:hidden ${isLightSection ? 'text-black' : 'text-white'}`}>
                    <Menu size={24} />
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
            transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col text-white"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
                <span className="text-marathon-teal font-mono text-xs uppercase tracking-widest">System Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-col justify-center px-8 gap-8 flex-1">
                {navLinks.map((link, i) => (
                    <button 
                        key={link.name} 
                        onClick={() => handleScroll(link.id)}
                        className="group text-left"
                    >
                        <span className="block text-[10px] text-zinc-500 font-mono mb-2 group-hover:text-marathon-teal">0{i+1}</span>
                        <span className="text-5xl font-heading font-black italic uppercase text-white/50 group-hover:text-white transition-all duration-300">
                            {link.name}
                        </span>
                    </button>
                ))}
            </div>

            <div className="p-8 bg-zinc-900 border-t border-white/10 flex justify-between items-center">
                 <div className="flex gap-4 text-zinc-500">
                    <Globe size={20} />
                    {/* FIX: User component is now imported */}
                    <User size={20} />
                </div>
                <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">Marathon Engineering</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};