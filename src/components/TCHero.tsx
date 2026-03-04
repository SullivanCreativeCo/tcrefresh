import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import BreachSimulator from "@/components/BreachSimulator";

const TCHero = () => {

  return (
    <section id="simulator" className="relative min-h-screen flex items-center overflow-hidden">
    <AnimatedShaderBackground />

    {/* Ambient blurs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Your Clients Don't Care About<br />
            <span className="text-gradient-cyan">Tech Talk</span><br />
            They Care About<br />
            <span className="text-gradient-cyan">Dollars &amp; Down Time</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Learn to translate technical risk into business impact that gets deals approved fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              Show Me How to Quantify Risk
            </a>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              Try Free for 14 Days
            </Link>
          </div>

        </motion.div>

        {/* Right — Breach Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-3 relative w-full max-w-md mx-auto md:max-w-none"
        >
          {/* Animated glow ring */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-primary/30 via-blue-500/20 to-primary/30 blur-2xl motion-safe:animate-pulse" />
          <div className="absolute -inset-2 -z-10 rounded-3xl border border-primary/10" />
          {/* Inner glow layers */}
          <div className="absolute inset-0 -z-10 blur-3xl rounded-3xl bg-primary/20 scale-110" />
          <div className="absolute inset-0 -z-10 blur-2xl rounded-3xl bg-blue-500/10 scale-105" />
          <BreachSimulator ariaLabel="Breach Impact Simulator — homepage" />
          <Link
            to="/estimator-for-msps"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            Get your own breach cost estimator for your homepage
          </Link>
        </motion.div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-10" />
  </section>
  );
};

export default TCHero;
