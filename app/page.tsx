import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { Showroom } from "@/components/sections/Showroom";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { HaileLegacy } from "@/components/sections/HaileLegacy";
import { NewsAndEvents } from "@/components/sections/NewsAndEvents";
import { cmsApi } from "@/lib/cms-api";
import { Suspense } from "react";

// Force fresh data from Sanity on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  // 1. Parallel Data Fetching (Fastest Method)
  const [vehicles, news, events] = await Promise.all([
    cmsApi.getVehicles(),
    cmsApi.getNews(),
    cmsApi.getEvents()
  ]);

  // 2. Safety Check: If Sanity is empty, show a professional "Under Maintenance" or empty state
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="h-screen bg-marathon-dark flex items-center justify-center">
        <p className="text-marathon-teal font-heading italic animate-pulse">
          INITIALIZING SHOWROOM ASSETS...
        </p>
      </div>
    );
  }

  return (
    <main className="bg-marathon-dark min-h-screen selection:bg-marathon-teal selection:text-black">
      {/* 
          High-Z-Index UI 
          We wrap them in a fragment to keep them above the scrollable content
      */}
      <Navbar />
      
      {/* 
          1. HERO SECTION (Auto-Scrolling 3D Models)
          This component now handles the 'VehicleShowcase' logic internally 
          to provide the 2D-to-3D transition for every car.
      */}
      <section id="home">
        <HeroSlider vehicles={vehicles} />
      </section>

      <div className="relative z-10">
        {/* 2. THE 3S ECOSYSTEM (Technical Blueprint Sections) */}
        <section id="technology">
           <Ecosystem />
        </section>

        {/* 3. INTERACTIVE FILTERABLE SHOWROOM (360° Inspection) */}
        <section id="showroom">
           <Showroom vehicles={vehicles} />
        </section>

        {/* 4. HAILE GEBRSELASSIE LEGACY STORY (GSAP Horizontal) */}
        <section id="legacy">
           <HaileLegacy />
        </section>

        {/* 5. DYNAMIC NEWS & EVENTS (Editorial Grid) */}
        <section id="news">
           <NewsAndEvents news={news} events={events} />
        </section>

        {/* 6. GLOBAL FOOTER */}
        <Footer />
      </div>
    </main>
  );
}