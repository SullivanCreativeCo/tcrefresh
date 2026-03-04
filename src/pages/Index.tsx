import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TCNavbar from "@/components/TCNavbar";
import TCHero from "@/components/TCHero";
import TCFeatures from "@/components/TCFeatures";
import TCMethodology from "@/components/TCMethodology";
import TCDashboard from "@/components/TCDashboard";
import TCCTA from "@/components/TCCTA";

import TCSimulatorCTA from "@/components/TCSimulatorCTA";
import TCSocialProof from "@/components/TCSocialProof";
import TCWhyUs from "@/components/TCWhyUs";

import TCFooter from "@/components/TCFooter";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Helmet>
        <title>ThreatCaptain | Turn Cyber Risk Into Revenue for MSPs</title>
        <meta name="description" content="Translate technical cyber risk into financial impact that gets MSP security deals approved. Quantify breach costs, shorten sales cycles, and close more contracts." />
        <meta property="og:title" content="ThreatCaptain | Turn Cyber Risk Into Revenue for MSPs" />
        <meta property="og:description" content="Translate technical cyber risk into financial impact that gets MSP security deals approved." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tcnewsite.lovable.app/" />
      </Helmet>
      <TCNavbar />
      <main id="main-content">
        <TCHero />
        <TCSimulatorCTA />
        <TCMethodology />
        <TCFeatures />
        <TCSocialProof />
        
        <TCDashboard />
        <TCWhyUs />
        
        <TCCTA />
      </main>
      <TCFooter />
    </div>
  );
};

export default Index;
