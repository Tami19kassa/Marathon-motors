"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Zap
} from "lucide-react";

const footerLinks = {
  showroom: [
    { name: "Electric Vehicles", href: "#showroom" },
    { name: "SUVs & Sedans", href: "#showroom" },
    { name: "Commercial Fleet", href: "#" },
    { name: "Vehicle Configurator", href: "#" },
  ],
  services: [
    { name: "Maintenance & Repair", href: "#services" },
    { name: "Genuine Spare Parts", href: "#services" },
    { name: "Technical Training", href: "#services" },
    { name: "Roadside Assistance", href: "#" },
  ],
  company: [
    { name: "Haile's Legacy", href: "#legacy" },
    { name: "Our Assembly Plant", href: "#" },
    { name: "News & Events", href: "#" },
    { name: "Careers", href: "#" },
  ]
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-marathon-dark border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* TOP SECTION: BRANDING & CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-marathon-teal rounded-full flex items-center justify-center">
                  <span className="text-black font-black text-2xl italic">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-heading font-bold tracking-tighter leading-none text-white uppercase italic">MARATHON</span>
                  <span className="text-[10px] tracking-[0.4em] text-marathon-teal font-bold uppercase">Engineering</span>
                </div>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                The pulse of motion in East Africa. Locally assembling the future of Hyundai engineering with the endurance of a legend.
              </p>
            </div>

            <div className="flex gap-4">
              <SocialButton icon={<Facebook size={18} />} />
              <SocialButton icon={<Instagram size={18} />} />
              <SocialButton icon={<Linkedin size={18} />} />
              <SocialButton icon={<Twitter size={18} />} />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Showroom</h4>
              <ul className="space-y-4">
                {footerLinks.showroom.map(link => (
                  <li key={link.name}><FooterLink name={link.name} href={link.href} /></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Ecosystem</h4>
              <ul className="space-y-4">
                {footerLinks.services.map(link => (
                  <li key={link.name}><FooterLink name={link.name} href={link.href} /></li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Marathon</h4>
              <ul className="space-y-4">
                {footerLinks.company.map(link => (
                  <li key={link.name}><FooterLink name={link.name} href={link.href} /></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location / 3S Facilities */}
          <div className="lg:col-span-3 space-y-8 bg-white/5 p-8 rounded-3xl border border-white/5">
             <h4 className="text-marathon-teal font-black uppercase tracking-widest text-xs">Headquarters</h4>
             <div className="space-y-6">
                <ContactItem icon={<MapPin size={16} />} text="Nifas Silk-Lafto, Addis Ababa, Ethiopia" />
                <ContactItem icon={<Phone size={16} />} text="+251 11 470 9271" />
                <ContactItem icon={<Mail size={16} />} text="info@marathonmotorengineering.com" />
             </div>
             <button className="w-full py-4 bg-marathon-teal text-black font-black uppercase tracking-tighter rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-white transition-all">
                Dealer Locator <ArrowUpRight size={14} />
             </button>
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL & LEGACY */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Legacy Mark */}
          <div className="flex items-center gap-4 group">
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Haile_Gebrselassie_Berlin_2009.jpg" 
                  className="w-full h-full object-cover rounded-full" 
                  alt="Haile Gebrselassie" 
                />
             </div>
             <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Chairman's Commitment</p>
                <p className="text-sm font-heading font-bold text-white italic">"Endurance is the hallmark of quality."</p>
             </div>
          </div>

          {/* Copyrights */}
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
               <a href="#" className="hover:text-marathon-teal transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-marathon-teal transition-colors">Terms of Use</a>
               <a href="#" className="hover:text-marathon-teal transition-colors">Hyundai Global</a>
            </div>
            <p className="text-[10px] text-slate-600 font-medium">
              &copy; {new Date().getFullYear()} Marathon Motor Engineering PLC. Official Hyundai Assembler.
            </p>
          </div>

          {/* Back to top */}
          <button 
            onClick={scrollToTop}
            className="p-4 rounded-full border border-white/10 text-slate-500 hover:text-marathon-teal hover:border-marathon-teal transition-all"
          >
            <ArrowUpRight size={20} className="-rotate-45" />
          </button>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-marathon-teal hover:text-black hover:border-marathon-teal transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ name, href }: { name: string; href: string }) => (
  <Link href={href} className="text-slate-500 text-sm font-medium hover:text-marathon-teal transition-all flex items-center gap-2 group">
    <span className="w-0 h-[1px] bg-marathon-teal group-hover:w-4 transition-all duration-300" />
    {name}
  </Link>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-start gap-4 text-slate-400">
    <div className="mt-1 text-marathon-teal">{icon}</div>
    <span className="text-sm font-medium leading-snug">{text}</span>
  </div>
);