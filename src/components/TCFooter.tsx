import { Compass } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Methodology", href: "#methodology" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const TCFooter = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <a href="#" className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-cyan-400" />
        <span className="font-bold text-sm text-white">
          Threat<span className="text-cyan-400">Captain</span>
        </span>
      </a>

      <div className="flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>

      <span className="text-xs text-slate-600">
        &copy; 2025 ThreatCaptain. All rights reserved.
      </span>
    </div>
  </footer>
);

export default TCFooter;
