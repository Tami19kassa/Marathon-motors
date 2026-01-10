"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export const NewsAndEvents = ({ news, events }: { news: any[], events: any[] }) => {
  return (
    <section className="py-32 px-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
      
      {/* NEWS COLUMN (2/3 Width) */}
      <div className="lg:col-span-2 space-y-12">
        <h2 className="text-4xl font-heading font-black italic uppercase border-l-4 border-marathon-teal pl-6">
          Latest Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item, i) => (
            <motion.div key={i} className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                <img src={item.imageUrl} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="text-marathon-teal text-xs font-bold uppercase mb-2">Marathon News</p>
              <h3 className="text-xl font-bold group-hover:text-marathon-teal transition-colors leading-tight">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EVENTS COLUMN (1/3 Width) */}
      <div className="bg-marathon-steel p-10 rounded-[40px] border border-white/5 shadow-premium h-fit">
        <h2 className="text-2xl font-heading font-black italic uppercase mb-10">Calendar</h2>
        <div className="space-y-8">
          {events.map((event, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="bg-marathon-teal text-black p-3 rounded-2xl text-center min-w-[70px]">
                <p className="text-xs font-black uppercase">{event.month}</p>
                <p className="text-2xl font-heading font-black">{event.day}</p>
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-marathon-teal transition-colors">{event.title}</h4>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                  <Calendar size={12} /> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-10 py-4 border border-white/10 rounded-2xl text-xs font-black uppercase hover:bg-white hover:text-black transition-all">
          View All Events
        </button>
      </div>
    </section>
  );
};