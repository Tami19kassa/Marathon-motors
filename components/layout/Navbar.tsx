"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Showroom", "E-Mobility", "Haile Legacy", "Technology", "Contact"];

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-8 pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* 1. BRAND (Glass Capsule) */}
        <Link href="/" className="bg-black/20 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 hover:border-marathon-teal/50 transition-all group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white">
            <Image src="/logo.png" alt="Marathon" fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-black italic text-white tracking-tighter group-hover:text-marathon-teal transition-colors">MARATHON</span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Engineering</span>
          </div>
        </Link>

        {/* 2. CENTER LINKS (Invisible on start, reveals frosted on scroll) */}
        <div className="hidden lg:flex items-center bg-black/10 backdrop-blur-md border border-white/5 rounded-full px-2 py-2 shadow-2xl">
          {links.map((link) => (
            <Link 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* 3. ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-marathon-teal hover:text-black transition-all">
             <Search size={18} />
          </button>
          <button className="bg-marathon-teal text-black font-black text-[10px] uppercase px-8 py-4 rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all">
             Book Service
          </button>
        </div>
      </div>
    </nav>
  );
};