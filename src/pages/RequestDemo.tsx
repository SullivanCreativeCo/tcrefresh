import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Loader2 } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { supabase } from "@/integrations/supabase/client";

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
const roles = ["Owner/CEO", "Sales Leader", "Account Manager", "Technical Lead", "Other"];

const RequestDemo = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_size: "",
    role: "",
    sales_challenge: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.first_name || !form.last_name || !form.email || !form.company_name) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("demo_requests").insert({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      company_name: form.company_name.trim(),
      company_size: form.company_size || null,
      role: form.role || null,
      sales_challenge: form.sales_challenge.trim() || null,
    });
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Request a Demo | ThreatCaptain</title>
        <meta name="description" content="Book a 30-minute walkthrough and see how MSPs use ThreatCaptain's financial risk data to close security deals faster." />
        <meta property="og:title" content="Request a Demo | ThreatCaptain" />
        <meta property="og:description" content="Book a 30-minute walkthrough and see how MSPs close security deals faster with ThreatCaptain." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tcnewsite.lovable.app/request-demo" />
      </Helmet>
      <TCNavbar />

      <section className="pt-28 pb-24 sm:pt-36 sm:pb-32 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-lg mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              See ThreatCaptain <span className="text-gradient-cyan">in Action</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              Book a 30-minute walkthrough and see how MSPs use financial risk data to close deals faster.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Thanks! We'll be in touch within 24 hours.</h2>
              <p className="text-sm text-muted-foreground">Check your inbox for a confirmation.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-5 glass-strong rounded-2xl p-6 sm:p-8 border border-white/5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>First Name *</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Jane" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Last Name *</label>
                  <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Doe" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Company Name *</label>
                <input name="company_name" value={form.company_name} onChange={handleChange} placeholder="Acme MSP" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Company Size</label>
                  <select name="company_size" value={form.company_size} onChange={handleChange} className={inputCls}>
                    <option value="">Select…</option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Role</label>
                  <select name="role" value={form.role} onChange={handleChange} className={inputCls}>
                    <option value="">Select…</option>
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>What's your biggest sales challenge?</label>
                <textarea
                  name="sales_challenge"
                  value={form.sales_challenge}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Prospects don't understand the ROI of cybersecurity…"
                  className={inputCls + " resize-none"}
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow disabled:opacity-60"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Request Your Demo
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <TCFooter />
    </div>
  );
};

export default RequestDemo;
