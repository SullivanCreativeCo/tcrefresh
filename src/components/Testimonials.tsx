import AnimatedSection from "./AnimatedSection";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This is the only tool I've used that actually makes sense to show to a CFO. There's nothing else out there that ties insurance and financial impact together this well.",
    name: "Steve Brickner",
    title: "CEO/Founder, Kraken",
    featured: true,
  },
  {
    quote: "That last piece—the financial risk assessment—is how you get funding for what you want to do. The data isn't just pulled from thin air. It's real and backed up by industry benchmarks.",
    name: "Kylan Cleveland",
    title: "Business Development Manager, Cyber Solutions",
  },
  {
    quote: "ThreatCaptain elevates the discussion from talking about tools to the benefits that can be received by a customer. There are lots of tools in the space; ThreatCaptain elicits the risks and the biggest challenges.",
    name: "Greg Bugbee",
    title: "CISO, Novus Insight",
  },
  {
    quote: "ThreatCaptain built this from a sales-first perspective, and it shows. They've struck a great balance between usability and detailed insight.",
    name: "Steven Piteo",
    title: "Account Executive, Performive",
  },
  {
    quote: "The best thing about ThreatCaptain is that it is financial. This hasn't existed in the space. Numbers evaluating risk haven't been sourced and validated before.",
    name: "Jason Rorie",
    title: "Founder, Triad InfoSec",
  },
  {
    quote: "The financial risk data from the platform was super useful. We're thinking of turning it into a case study we can leverage with our marketing.",
    name: "Raffi Jamgotchian",
    title: "CEO, Triada Networks",
  },
  {
    quote: "ThreatCaptain helps us clearly communicate the financial risks of a breach, prioritize security investments, and align IT teams with leadership by focusing on business outcomes.",
    name: "George Adams",
    title: "CEO, Captivate Technologies Solution",
  },
  {
    quote: "I'm just blown away at how much detail has gone into the risk assessments. They've automated it so it's not a burden—this is amazing.",
    name: "Matt Dryfhout",
    title: "CEO/Founder, Scout Technology Guides",
  },
  {
    quote: "This is by far the most support I've ever gotten from a vendor. They are constantly asking for feedback—and actually doing something with it.",
    name: "Michelle Heryford",
    title: "Director of Channel-West, Performive",
  },
];

const Testimonials = () => {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section id="testimonials" className="py-24">
      <div className="section-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">Social Proof</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">Cybersecurity Professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's how ThreatCaptain is changing the way security teams communicate risk.
          </p>
        </AnimatedSection>

        {/* Featured */}
        <AnimatedSection className="max-w-3xl mx-auto mb-12">
          <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px]" />
            <Quote className="text-primary/30 mb-4" size={40} />
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-6 relative z-10">
              "{featured.quote}"
            </blockquote>
            <div>
              <p className="font-semibold">{featured.name}</p>
              <p className="text-sm text-muted-foreground">{featured.title}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.06}>
              <div className="glass-card-hover p-6 h-full flex flex-col">
                <Quote className="text-primary/20 mb-3" size={20} />
                <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  "{t.quote}"
                </blockquote>
                <div className="pt-4 border-t border-border/20">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
