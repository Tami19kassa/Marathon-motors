import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { Showroom } from "@/components/sections/Showroom";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { HaileLegacy } from "@/components/sections/HaileLegacy";
import { NewsAndEvents } from "@/components/sections/NewsAndEvents";
import { Testimonials } from "@/components/sections/Testimonials";
import { cmsApi } from "@/lib/cms-api";

// FORCE FRESH DATA: Ensures every time you Publish in Sanity, the site updates instantly
export const dynamic = "force-dynamic";

export default async function Home() {
  // 1. DATA ACQUISITION: Parallel fetching for zero-lag loading
  const [vehicles, news, events, testimonials] = await Promise.all([
    cmsApi.getVehicles(),
    cmsApi.getNews(),
    cmsApi.getEvents(),
    cmsApi.getTestimonials()
  ]);

  // 2. ERROR BOUNDARY: Fallback if Sanity is disconnected
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="h-screen bg-marathon-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-marathon-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-marathon-teal font-heading italic tracking-widest uppercase text-xs">
            Synchronizing Showroom Assets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-marathon-dark min-h-screen selection:bg-marathon-teal selection:text-black">
      
      {/* --- GLOBAL UI LAYER --- */}
      <Navbar />

      {/* 
          --- SECTION 1: DYNAMIC HERO SLIDER --- 
          Automatically cycles through all car models uploaded to Sanity.
          Features the 2D-to-3D progressive loading engine.
      */}
      <section id="home">
        <HeroSlider vehicles={vehicles} />
      </section>

      <div className="relative z-10">
        
        {/* 
            --- SECTION 2: THE 3S ECOSYSTEM --- 
            Technical breakdown of Sales, Service, and Spare Parts.
            Aesthetic: Technical Blueprint / Blueprint Lines.
        */}
        <section id="technology">
           <Ecosystem />
        </section>

        {/* 
            --- SECTION 3: THE EDITORIAL SHOWROOM --- 
            Directly matches the high-end 4-column UI from your reference image.
            Aesthetic: Pure White / High-Contrast Serif Typography.
            Feature: Integrated 360° Interactive Inspection.
        */}
        <section id="showroom">
           <Showroom vehicles={vehicles} />
        </section>

        {/* 
            --- SECTION 4: VOICE OF OWNERSHIP (TESTIMONIALS) --- 
            Grid of Trust layout using massive quotation marks.
            Aesthetic: Clean / Magazine Style.
        */}
        <section id="testimonials">
            <Testimonials items={testimonials} />
        </section>

        {/* 
            --- SECTION 5: THE HAILE GEBRSELASSIE LEGACY --- 
            Horizontal GSAP Scroll explaining the connection between 
            Olympic endurance and Automotive engineering.
            Aesthetic: Grayscale / High Action.
        */}
        <section id="legacy">
           <HaileLegacy />
        </section>

        {/* 
            --- SECTION 6: DYNAMIC NEWS & EVENTS --- 
            Editorial grid of the latest company updates and calendar items.
            Aesthetic: Corporate / Newsroom.
        */}
        <section id="news">
           <NewsAndEvents news={news} events={events} />
        </section>

        {/* --- GLOBAL FOOTER --- */}
        <Footer />
      </div>
    </main>
  );
}