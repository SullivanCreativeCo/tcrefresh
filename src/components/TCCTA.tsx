import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/use-in-view";

const TCCTA = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to Stop <span className="text-gradient-cyan">Explaining</span><br />
            and Start <span className="text-gradient-cyan">Closing</span>?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            ThreatCaptain users close deals faster because they speak the language CFOs understand: dollars and downtime.
          </p>

          <div className="flex justify-center">
            <Link
              to="/request-demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              Learn How Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TCCTA;
