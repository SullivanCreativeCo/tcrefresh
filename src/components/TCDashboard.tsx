import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const bars = [
  { label: "Ransomware (double extortion)", value: 8.4, max: 12, color: "#f87171" },
  { label: "Business email compromise", value: 4.2, max: 12, color: "#fbbf24" },
  { label: "Cloud misconfiguration breach", value: 6.1, max: 12, color: "#fb923c" },
  { label: "Insider threat (data exfil)", value: 3.2, max: 12, color: "#818cf8" },
  { label: "Third-party supply chain", value: 5.8, max: 12, color: "#a78bfa" },
];

const metrics = [
  { label: "Total ALE", value: "$27.7M" },
  { label: "95th Percentile Loss", value: "$14.2M" },
  { label: "Risk Reduction (YoY)", value: "-18.4%" },
  { label: "Control Coverage", value: "84.2%" },
];

const TCDashboard = () => {
  const { ref, inView } = useInView(0.1);

  const score = 72;
  const circumference = 157;
  const offset = circumference - (circumference * score) / 100;

  return (
    <section id="insights" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Risk Intelligence
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your threat landscape,{" "}
            <span className="text-gradient-cyan">quantified</span>
          </h2>
        </div>

        <div ref={ref} className="glass-strong rounded-2xl glow-cyan overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-red-400/60" />
            <span className="w-3 h-3 rounded-full bg-amber-400/60" />
            <span className="w-3 h-3 rounded-full bg-green-400/60" />
            <span className="ml-4 font-mono text-xs text-slate-500">
              threatcaptain.app/dashboard
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 p-6 sm:p-8">
            {/* Bars */}
            <div className="lg:col-span-2">
              <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-6">
                Annualized Loss Exposure by Scenario
              </h3>
              <div className="space-y-5">
                {bars.map((b, i) => (
                  <div key={b.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-400 text-xs">{b.label}</span>
                      <span className="text-slate-300 font-mono text-xs">
                        ${b.value}M
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0f172a] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: b.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(b.value / b.max) * 100}%` } : {}}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score + metrics */}
            <div>
              {/* Gauge */}
              <div className="flex flex-col items-center mb-6">
                <svg viewBox="0 0 120 70" className="w-40">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 65 A 50 50 0 0 1 110 65"
                    fill="none"
                    stroke="rgba(99,102,241,0.1)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 10 65 A 50 50 0 0 1 110 65"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={inView ? { strokeDashoffset: offset } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <motion.span
                  className="text-2xl font-bold font-mono text-white -mt-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  {score}
                </motion.span>
                <span className="text-xs text-slate-500 mt-1">
                  Composite Risk Score
                </span>
              </div>

              {/* Key Metrics */}
              <div className="glass rounded-xl p-4">
                <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                  Key Metrics
                </h4>
                <div className="space-y-2.5">
                  {metrics.map((m) => (
                    <div key={m.label} className="flex justify-between text-sm">
                      <span className="text-slate-500">{m.label}</span>
                      <span className="text-white font-mono text-xs">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TCDashboard;
