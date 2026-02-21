import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import tcHat from "@/assets/tc-hat.png";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Methodology", href: "#methodology" },
  { label: "Insights", href: "#insights" },
];

const TCNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src={tcHat} alt="ThreatCaptain" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-slate-200 hover:shadow-[0_0_12px_hsl(var(--primary)/0.4)] rounded-lg px-3 py-1.5 transition-all duration-300"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/request-demo"
            className="text-sm px-4 py-2 rounded-lg border border-primary/20 bg-primary/10 text-white hover:bg-primary/20 hover:shadow-[0_0_16px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            Request Demo
          </Link>
        </div>

        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-400 hover:text-white transition-colors py-2"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/request-demo"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-4 py-2 rounded-lg border border-primary/20 bg-primary/10 text-primary text-center"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TCNavbar;
