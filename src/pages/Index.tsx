import TCNavbar from "@/components/TCNavbar";
import TCHero from "@/components/TCHero";
import TCFeatures from "@/components/TCFeatures";
import TCMethodology from "@/components/TCMethodology";
import TCDashboard from "@/components/TCDashboard";
import TCCTA from "@/components/TCCTA";
import TCFooter from "@/components/TCFooter";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0a0e1a", color: "#e2e8f0" }}>
      <header>
        <TCNavbar />
      </header>
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
