import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import dashboardImg from "@/assets/dashboard-preview.png";

const TCDashboard = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="insights" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            style={{ textShadow: "0 0 40px rgba(42, 54, 255, 0.3)" }}
          >
            Take the helm of your{" "}
            <span className="text-gradient-cyan">sales process</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          {/* Glow behind image */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(42, 54, 255, 0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
              transform: "scale(1.05)",
            }}
          />
          <img
            src={dashboardImg}
            alt="ThreatCaptain sales dashboard showing client overview, deal assessments, and risk intelligence"
            className="relative rounded-2xl w-full max-w-5xl shadow-2xl border border-white/5"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TCDashboard;
