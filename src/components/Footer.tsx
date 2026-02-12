import hatLogo from "@/assets/hat-logo.png";
import { Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-16">
    <div className="section-container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <a href="#" className="flex items-center gap-2 mb-4">
            <img src={hatLogo} alt="ThreatCaptain" className="w-8 h-8" />
            <span className="text-lg font-bold">Threat<span className="text-primary">Captain</span></span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
            Qualitative risk assessment that translates cyber threats into financial business impact.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Links */}
        {[
          { heading: "Platform", links: ["Features", "Why ThreatCaptain", "Resources", "Changelog"] },
          { heading: "Company", links: ["About", "Contact", "Careers", "Partners"] },
          { heading: "Legal", links: ["Privacy Policy", "Terms & Conditions"] },
        ].map((col) => (
          <div key={col.heading}>
            <h4 className="text-sm font-semibold mb-4">{col.heading}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-medium mb-1">Get threat intelligence delivered monthly</p>
          <p className="text-xs text-muted-foreground">Security insights and sales strategies for cybersecurity professionals.</p>
        </div>
        <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@company.com"
            className="px-4 py-2.5 text-sm bg-muted border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
          />
          <button type="submit" className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg glow-button transition-all hover:scale-105 whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-border/10 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 ThreatCaptain, Corp. All Rights Reserved.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-1">
          Proudly supporting community partners like Cyber Rise, Inc.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
