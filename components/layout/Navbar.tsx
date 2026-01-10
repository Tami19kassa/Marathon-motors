"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Showroom", href: "#showroom" },
    { name: "EV Division", href: "#ev", icon: <Zap size={14} className="text-marathon-teal" /> },
    { name: "3S Services", href: "#services" },
    { name: "Haile Legacy", href: "#legacy" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-marathon-teal rounded-full flex items-center justify-center animate-ev-pulse">
             <span className="text-black font-black text-xl italic">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-heading font-bold tracking-tighter leading-none group-hover:text-marathon-teal transition-colors">MARATHON</span>
            <span className="text-[10px] tracking-[0.3em] text-slate-500 font-bold uppercase">Engineering</span>
          </div>
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-marathon-teal transition-all flex items-center gap-2"
            >
              {link.icon && link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b border-marathon-teal pb-1">
            <Globe size={14} /> Find a Dealer
          </button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};