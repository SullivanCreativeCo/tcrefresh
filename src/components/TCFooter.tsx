import captainBeacon from "@/assets/captain-beacon.png";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Methodology", href: "#methodology" },
  { label: "Contact", href: "#contact" },
];

const TCFooter = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <a href="#" aria-label="ThreatCaptain — back to top" className="flex items-center">
        <img src={captainBeacon} alt="" className="h-20 w-auto" />
      </a>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Footer navigation">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <span className="text-xs text-muted-foreground text-center">
        &copy; 2026 ThreatCaptain. All rights reserved.
      </span>
    </div>
  </footer>
);

export default TCFooter;
