import type { Metadata } from "next";
import { Inter_Tight, Space_Grotesk } from 'next/font/google';
import "./globals.css"; // CRITICAL: This links your Tailwind styles

// Configure the professional automotive fonts
const interTight = Inter_Tight({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-heading' 
});

export const metadata: Metadata = {
  title: "Marathon Motors | The Pulse of Motion",
  description: "Official Hyundai importer and assembler in Ethiopia. Led by Haile Gebrselassie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="antialiased bg-marathon-dark text-white">
        {children}
      </body>
    </html>
  );
}