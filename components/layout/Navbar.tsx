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
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isLightSection 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4' 
            : 'bg-transparent py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-colors ${isLightSection ? 'border-marathon-teal' : 'border-white/20'}`}>
                <Image src="/logo.png" alt="Marathon" fill className="object-cover bg-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-heading font-black italic tracking-tighter leading-none transition-colors ${isLightSection ? 'text-black' : 'text-white'}`}>MARATHON</span>
              <span className="text-[8px] tracking-[0.3em] text-marathon-teal font-bold uppercase">Engineering</span>
            </div>
          </Link>

          {/* 2. CENTERED LINKS (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.id)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:text-marathon-teal ${
                    isLightSection ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 3. ACTIONS (Right Side) */}
          <div className={`flex items-center gap-4 md:gap-6 z-50 ${isLightSection ? 'text-black' : 'text-white'}`}>
            <button onClick={() => toggleSearch(true)} className="hover:text-marathon-teal transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth'})}
              className="hidden md:flex bg-marathon-teal text-black font-black text-[10px] uppercase px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              Book Service
            </button>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
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