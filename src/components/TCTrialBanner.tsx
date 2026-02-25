import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const TCTrialBanner = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-primary/[0.03]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 text-center"
      >
        <p className="text-lg sm:text-xl text-muted-foreground mb-2">
          See it in action.
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Try ThreatCaptain free for <span className="text-gradient-cyan">14 days</span>.
        </h3>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
        >
          Start Free Trial
        </Link>
        <p className="text-xs text-muted-foreground mt-4">
          No credit card required. Full access to all features.
        </p>
      </motion.div>
    </section>
  );
};

export default TCTrialBanner;
