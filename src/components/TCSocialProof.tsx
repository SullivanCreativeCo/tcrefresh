import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const partners = [
  "Kraken",
  "Cyber Solutions",
  "Novus Insight",
  "Performive",
  "Triad InfoSec",
  "Scout Technology Guides",
  "Captivate Technologies",
  "Triada Networks",
];

const testimonials = [
  {
    quote:
      "This is the only tool I've used that actually makes sense to show to a CFO. There's nothing else out there that ties insurance and financial impact together this well.",
    name: "Steve Brickner",
    title: "CEO/Founder",
    company: "Kraken",
  },
  {
    quote:
      "That last piece - the financial risk assessment - is how you get funding for what you want to do. The data isn't just pulled from thin air. It's real and backed up by industry benchmarks.",
    name: "Kylan Cleveland",
    title: "Business Dev. Manager",
    company: "Cyber Solutions",
  },
  {
    quote:
      "ThreatCaptain built this from a sales-first perspective, and it shows. They've struck a great balance between usability and detailed insight.",
    name: "Steven Piteo",
    title: "Account Executive",
    company: "Performive",
  },
];

const TCSocialProof = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            From the Channel
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Built for MSPs,{" "}
            <span className="text-gradient-cyan">by MSPs.</span>
          </h2>
        </motion.div>

        {/* Logo bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <p className="text-xs text-muted-foreground text-center uppercase tracking-[0.2em] mb-6">
            Trusted by leaders in the channel
          </p>
          <div className="relative">
            {/* Fade edges on mobile scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none sm:hidden" />

            <div className="flex gap-8 sm:gap-10 items-center justify-start sm:justify-center overflow-x-auto sm:overflow-visible px-4 sm:px-0 scrollbar-none">
              {partners.map((name, i) => (
                <div
                  key={name}
                  className="flex-shrink-0 group cursor-default"
                >
                  <div className="flex items-center justify-center h-10 px-4 rounded-lg border border-border/50 bg-card/30 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap transition-colors duration-300">
                      {name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
              className="glass rounded-xl p-6 sm:p-8 flex flex-col justify-between group hover:border-primary/20 transition-colors duration-300"
            >
              <div>
                <Quote className="w-5 h-5 text-primary/40 mb-4" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                {/* Avatar placeholder */}
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See what others are saying
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TCSocialProof;
