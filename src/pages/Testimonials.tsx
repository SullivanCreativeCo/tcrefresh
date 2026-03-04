import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { useInView } from "@/hooks/use-in-view";

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
      "ThreatCaptain elevates the discussion from talking about tools to the benefits that can be received by a customer. There are lots of tools in the MSP space; ThreatCaptain elicits the risks and the biggest challenges.",
    name: "Greg Bugbee",
    title: "Chief Information Security Officer",
    company: "Novus Insight",
  },
  {
    quote:
      "ThreatCaptain built this from a sales-first perspective, and it shows. They've struck a great balance between usability and detailed insight.",
    name: "Steven Piteo",
    title: "Account Executive",
    company: "Performive",
  },
  {
    quote:
      "The best thing about ThreatCaptain is that it is financial. This hasn't existed in the MSP space. Numbers evaluating risk haven't been sourced and validated before.",
    name: "Jason Rorie",
    title: "Founder",
    company: "Triad InfoSec",
  },
  {
    quote:
      "The financial risk data from the platform was super useful. We're thinking of turning it into a case study we can leverage with our marketing.",
    name: "Raffi Jamgotchian",
    title: "CEO",
    company: "Triada Networks",
  },
  {
    quote:
      "ThreatCaptain helps us clearly communicate the financial risks of a breach, prioritize security investments, and align IT teams with leadership by focusing on business outcomes. It strengthens our value proposition and positions us as trusted advisors in a world where cyber threats are constantly evolving.",
    name: "George Adams",
    title: "CEO",
    company: "Captivate Technologies Solution",
  },
  {
    quote:
      "I'm just blown away at how much detail has gone into the risk assessments. They've automated it so it's not a burden - this is amazing.",
    name: "Matt Dryfhout",
    title: "CEO/Founder",
    company: "Scout Technology Guides",
  },
  {
    quote:
      "This is by far the most support I've ever gotten from a vendor. They are constantly asking for feedback - and actually doing something with it.",
    name: "Michelle Heryford",
    title: "Director Of Channel-West",
    company: "Performive",
  },
];

const TestimonialCard = ({
  t,
  i,
}: {
  t: (typeof testimonials)[0];
  i: number;
}) => {
  const { ref, inView } = useInView(0.15);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
      className="glass rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300"
    >
      <div>
        <Quote className="w-5 h-5 text-primary/40 mb-4" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
          "{t.quote}"
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
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
  );
};

const Testimonials = () => {
  const { ref: ctaRef, inView: ctaInView } = useInView(0.2);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Testimonials | ThreatCaptain</title>
        <meta
          name="description"
          content="See how ThreatCaptain is changing client conversations for MSPs and security professionals across the channel."
        />
        <meta property="og:title" content="Testimonials | ThreatCaptain" />
        <meta
          property="og:description"
          content="What MSPs are saying about ThreatCaptain."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tcnewsite.lovable.app/testimonials"
        />
      </Helmet>
      <TCNavbar />

      <main className="pt-28 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Testimonials
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            What MSPs Are <span className="text-gradient-cyan">Saying</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See how ThreatCaptain is changing client conversations for MSPs and
            security professionals across the channel.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name + t.company} t={t} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <section
          ref={ctaRef}
          className="mt-24 sm:mt-32 max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Ready to <span className="text-gradient-cyan">join them</span>?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Start your free trial and see why MSPs trust ThreatCaptain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
              >
                Try Free for 14 Days
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/request-demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground text-sm hover:border-primary/30 hover:text-foreground transition-colors"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <TCFooter />
    </div>
  );
};

export default Testimonials;
