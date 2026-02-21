import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TCNavbar from "@/components/TCNavbar";
import TCHero from "@/components/TCHero";
import TCFeatures from "@/components/TCFeatures";
import TCMethodology from "@/components/TCMethodology";
import TCDashboard from "@/components/TCDashboard";
import TCCTA from "@/components/TCCTA";
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
      <TCNavbar />
      <main>
        <TCHero />
        <TCMethodology />
        <TCFeatures />
        <TCDashboard />
        
        <TCCTA />
      </main>
      <TCFooter />
    </div>
  );
};

export default Index;
