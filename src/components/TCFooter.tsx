import captainBeacon from "@/assets/captain-beacon.png";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Methodology", href: "#methodology" },
  { label: "Contact", href: "#contact" },
];

const TCFooter = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <a href="#" className="flex items-center">
        <img src={captainBeacon} alt="ThreatCaptain" className="h-20 w-auto" />
      </a>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Footer navigation">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <span className="text-xs text-slate-600">
        &copy; 2026 ThreatCaptain. All rights reserved.
      </span>
    </div>
  </footer>
);

export default TCFooter;
