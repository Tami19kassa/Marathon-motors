import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { Showroom } from "@/components/sections/Showroom";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { HaileLegacy } from "@/components/sections/HaileLegacy";
import { NewsAndEvents } from "@/components/sections/NewsAndEvents";
import { cmsApi } from "@/lib/cms-api";

export default async function Home() {
  // PARALLEL DATA FETCHING FROM SANITY
  const [vehicles, news, events] = await Promise.all([
    cmsApi.getVehicles(),
    cmsApi.getNews(),
    cmsApi.getEvents()
  ]);

  return (
    <main className="bg-marathon-dark min-h-screen">
      <Navbar />
      
      {/* 1. AUTO-SCROLLING 3D HERO SLIDER */}
      <HeroSlider vehicles={vehicles} />

      <div className="relative z-10">
        {/* 2. THE 3S ECOSYSTEM (Blueprint Sections) */}
        <Ecosystem />

        {/* 3. INTERACTIVE FILTERABLE SHOWROOM */}
        <Showroom vehicles={vehicles} />

        {/* 4. HAILE GEBRSELASSIE LEGACY STORY */}
        <HaileLegacy />

        {/* 5. DYNAMIC NEWS & EVENTS */}
        <NewsAndEvents news={news} events={events} />

        <Footer />
      </div>
    </main>
  );
}