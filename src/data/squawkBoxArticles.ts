export type SquawkCategory = "Vendors" | "MSP News" | "Security" | "M&A" | "Compliance" | "Channel" | "AI & Automation";

export interface SquawkArticle {
  slug: string;
  headline: string;
  source: string;
  date: string;
  category: SquawkCategory;
  preview: string;
  body: string;
  impactScore: number; // 1-10
  featured?: boolean;
}

export const squawkArticles: SquawkArticle[] = [
  {
    slug: "connectwise-acquires-ai-threat-detection-startup",
    headline: "ConnectWise Acquires AI Threat Detection Startup for $340M",
    source: "CRN",
    date: "2026-02-24",
    category: "M&A",
    preview: "The acquisition signals ConnectWise's aggressive push into AI-powered security, giving MSPs a native threat detection layer inside the Asio platform.",
    body: `ConnectWise announced today the acquisition of SentryMind, an AI-native threat detection startup based in Austin, TX, for approximately $340 million in cash and stock.\n\nThe deal brings SentryMind's behavioral analysis engine directly into the ConnectWise Asio platform, giving managed service providers real-time threat detection without third-party integrations.\n\n"MSPs have been duct-taping security stacks together for years," said ConnectWise CEO Manny Rivelo. "This acquisition eliminates an entire layer of complexity."\n\nSentryMind's technology analyzes endpoint behavior patterns and flags anomalies within milliseconds, a capability that previously required enterprise-grade SOC infrastructure.\n\nIndustry analysts expect the move to pressure competitors like Datto and Kaseya to accelerate their own AI security roadmaps. For MSPs, the immediate impact is a simplified stack and potentially lower per-seat costs for threat detection.\n\nThe acquisition is expected to close in Q2 2026, pending regulatory approval.`,
    impactScore: 9,
    featured: true,
  },
  {
    slug: "datto-raises-endpoint-pricing-15-percent",
    headline: "Datto Raises Endpoint Security Pricing by 15% Effective April 1",
    source: "Channel Futures",
    date: "2026-02-23",
    category: "Vendors",
    preview: "MSPs are bracing for margin compression as Datto's endpoint security tier sees its second price increase in 12 months.",
    body: `Datto, a Kaseya company, has notified partners of a 15% price increase on its endpoint security products, effective April 1, 2026.\n\nThis marks the second price hike in the past year, following a 10% increase in May 2025. The change affects Datto EDR and Datto AV product lines.\n\nIn a letter to partners, Datto cited "rising infrastructure costs and continued investment in AI-driven detection capabilities" as the primary drivers.\n\nMSPs on community forums have expressed frustration. "We can't keep absorbing these increases without passing them to clients," wrote one MSP owner on Reddit's r/msp. "But raising prices mid-contract is a relationship killer."\n\nThe pricing change is expected to push some MSPs to evaluate alternatives like SentinelOne, Huntress, or Bitdefender for endpoint protection.\n\nAnalysts note that vendor pricing pressure is accelerating MSP stack consolidation, with many providers looking for platforms that bundle multiple capabilities at predictable costs.`,
    impactScore: 7,
  },
  {
    slug: "sec-cyber-disclosure-rules-hit-smbs",
    headline: "New SEC Cyber Disclosure Rules Now Apply to Companies Under $250M Revenue",
    source: "Dark Reading",
    date: "2026-02-22",
    category: "Compliance",
    preview: "The expanded mandate creates a massive new compliance market for MSPs serving mid-market clients who now need incident reporting infrastructure.",
    body: `The SEC's expanded cybersecurity disclosure rules, originally targeting public companies with over $1B in revenue, now apply to all publicly traded companies regardless of size.\n\nThe rule requires material cyber incidents to be disclosed within four business days and mandates annual reporting on cybersecurity risk management strategies.\n\nFor MSPs, this creates immediate opportunity. Mid-market clients—many of whom lack dedicated security teams—will need help building incident response playbooks, implementing detection systems, and preparing board-level risk reports.\n\n"This is the biggest compliance tailwind for MSPs since HIPAA," said analyst firm Canalys in a research note. "Every company with a stock ticker now needs a cybersecurity program that can withstand SEC scrutiny."\n\nMSPs who can package compliance-ready security services stand to capture significant new revenue from clients who previously viewed cybersecurity as optional.`,
    impactScore: 8,
  },
  {
    slug: "huntress-launches-msp-sales-enablement-toolkit",
    headline: "Huntress Launches Free Sales Enablement Toolkit for MSP Partners",
    source: "Huntress Blog",
    date: "2026-02-21",
    category: "Vendors",
    preview: "The toolkit includes customizable pitch decks, ROI calculators, and client-facing threat reports designed to help MSPs close security deals faster.",
    body: `Huntress has released a comprehensive sales enablement toolkit available to all MSP partners at no additional cost.\n\nThe package includes customizable pitch decks, an interactive ROI calculator, client-facing threat landscape reports, and email templates for security upsell campaigns.\n\n"We kept hearing from partners that the hardest part isn't the technology—it's the conversation," said Huntress CEO Kyle Hanslovan. "This toolkit gives MSPs the business language they need to sell security effectively."\n\nThe toolkit is available immediately through the Huntress partner portal and includes quarterly updates aligned with the latest threat intelligence.\n\nThe move highlights a growing trend among security vendors to invest in MSP sales support, recognizing that technical capability alone doesn't drive adoption.`,
    impactScore: 6,
  },
  {
    slug: "ransomware-payments-hit-record-2025",
    headline: "Ransomware Payments Hit $1.1B in 2025, SMBs Account for 62% of Victims",
    source: "Chainalysis",
    date: "2026-02-20",
    category: "Security",
    preview: "Small and mid-sized businesses continue to bear the brunt of ransomware attacks, with average payouts climbing to $280K per incident.",
    body: `Blockchain analytics firm Chainalysis reports that ransomware payments reached $1.1 billion in 2025, with small and mid-sized businesses representing 62% of all victims.\n\nThe average ransom payment for SMBs climbed to $280,000, up from $197,000 in 2024. Healthcare, professional services, and manufacturing were the most targeted verticals.\n\n"Attackers have realized that SMBs pay faster and more reliably than enterprises," the report states. "They lack the security infrastructure to prevent attacks and the legal teams to negotiate effectively."\n\nFor MSPs, the data reinforces the urgency of the security conversation. Clients who resist security investments are statistically more likely to face a breach—and the financial impact is growing year over year.\n\nThe report recommends MSPs use financial impact data in client conversations to make the cost of inaction concrete and measurable.`,
    impactScore: 9,
  },
  {
    slug: "kaseya-365-user-suite-expansion",
    headline: "Kaseya Expands 365 User Suite With Built-In Compliance Monitoring",
    source: "CRN",
    date: "2026-02-19",
    category: "Vendors",
    preview: "The platform play continues as Kaseya bundles compliance monitoring into its all-in-one MSP suite, pressuring point-solution vendors.",
    body: `Kaseya has announced the addition of compliance monitoring capabilities to its IT Complete 365 User suite, further expanding its all-in-one platform strategy.\n\nThe new module provides automated compliance checks against frameworks including NIST CSF, CIS Controls, and SOC 2, with client-facing reports generated automatically.\n\n"Compliance is the next frontier for MSP revenue," said Kaseya CEO Fred Voccola. "We're making it as easy to deliver as patching."\n\nThe addition puts pressure on standalone compliance platforms like Drata and Vanta, which have been courting the MSP channel. Kaseya's bundled approach—included at no additional per-seat cost for existing 365 subscribers—makes it difficult for point solutions to compete on price.\n\nMSPs using the Kaseya ecosystem can now offer compliance monitoring without adding another vendor to their stack.`,
    impactScore: 7,
  },
  {
    slug: "arctic-wolf-ipo-filing-2026",
    headline: "Arctic Wolf Files for IPO, Valued at $4.3B",
    source: "Bloomberg",
    date: "2026-02-18",
    category: "M&A",
    preview: "The managed security platform's IPO filing signals strong investor confidence in the MSP security market and could accelerate channel investment.",
    body: `Arctic Wolf Networks has filed its S-1 with the SEC, seeking a public listing at a valuation of approximately $4.3 billion.\n\nThe company, which provides security operations through a network of MSP and channel partners, reported $780 million in annual recurring revenue for fiscal year 2025, up 34% year-over-year.\n\n"This IPO validates the managed security model," said a Gartner analyst. "It tells the market that delivering security through partners isn't just viable—it's the growth story."\n\nFor MSPs, Arctic Wolf's public listing could mean increased investment in partner programs, better tooling, and more competitive pricing as the company seeks to demonstrate growth to public market investors.\n\nThe IPO is expected to price in late Q1 2026.`,
    impactScore: 8,
  },
  {
    slug: "state-privacy-laws-2026-update",
    headline: "7 New State Privacy Laws Take Effect in 2026—MSPs Are the First Call",
    source: "IAPP",
    date: "2026-02-17",
    category: "Compliance",
    preview: "A wave of state-level data privacy regulations is creating urgent demand for MSPs who can help SMBs navigate compliance requirements.",
    body: `Seven new state-level data privacy laws take effect across the United States in 2026, joining the patchwork of regulations that began with California's CCPA.\n\nThe new laws in Indiana, Iowa, Montana, Tennessee, Texas, Oregon, and Delaware each carry unique requirements around data handling, breach notification, and consumer rights.\n\nFor SMBs operating across state lines, compliance has become a logistical nightmare—and MSPs are the natural solution.\n\n"Our phone has been ringing off the hook," said one MSP owner in Tennessee. "Clients who never thought about privacy before are suddenly asking us to help them figure out what they need to do."\n\nMSPs who can package data privacy assessments and ongoing compliance monitoring stand to capture significant recurring revenue from this regulatory wave.`,
    impactScore: 7,
  },
  {
    slug: "microsoft-copilot-security-msp-integration",
    headline: "Microsoft Opens Copilot for Security to MSP Multi-Tenant Management",
    source: "Microsoft Blog",
    date: "2026-02-16",
    category: "Vendors",
    preview: "MSPs can now use Copilot for Security across client tenants, bringing AI-powered threat investigation to the managed services model.",
    body: `Microsoft has announced multi-tenant support for Copilot for Security, allowing MSPs to use the AI-powered security assistant across all managed client environments from a single pane of glass.\n\nThe update enables MSPs to run natural language threat investigations, generate incident summaries, and create client-facing reports without switching between tenants.\n\n"This is a game-changer for our SOC team," said an MSP operations director. "What used to take 45 minutes of investigation per alert can now be summarized in seconds."\n\nThe feature is available to MSPs enrolled in the Microsoft Cloud Partner Program with a Security specialization. Pricing is consumption-based at $4 per security compute unit.\n\nAnalysts expect this to drive Microsoft Sentinel adoption among MSPs who want to leverage Copilot's full capabilities.`,
    impactScore: 8,
  },
  {
    slug: "channel-futures-msp-501-trends",
    headline: "Channel Futures MSP 501: Security Revenue Now 38% of Average MSP Income",
    source: "Channel Futures",
    date: "2026-02-15",
    category: "MSP News",
    preview: "The annual MSP 501 ranking reveals that security services have overtaken traditional managed services as the primary growth driver for top MSPs.",
    body: `The 2026 Channel Futures MSP 501 ranking reveals a landmark shift: security services now represent 38% of average revenue for ranked MSPs, up from 27% in 2024.\n\nThe data shows that MSPs leading in revenue growth are those who have repositioned security from an add-on to a core offering.\n\n"The MSPs at the top of this list aren't just selling security—they're selling it first," said Channel Futures editor Robert DeMarzo. "Security has become the tip of the spear for client acquisition."\n\nThe report also found that MSPs with dedicated security sales resources grew 2.4x faster than those relying on general sales teams.\n\nKey takeaway for MSPs: investing in security sales enablement—tools, training, and dedicated personnel—directly correlates with revenue growth.`,
    impactScore: 7,
  },
];

export const categories: SquawkCategory[] = ["Vendors", "MSP News", "Security", "M&A", "Compliance", "Channel", "AI & Automation"];

export const marketPulseStats = [
  { label: "Avg. Ransomware Payout (SMB)", value: "$280K", change: "+42% YoY" },
  { label: "MSP Security Revenue Share", value: "38%", change: "+11pts YoY" },
  { label: "Active State Privacy Laws", value: "19", change: "+7 in 2026" },
  { label: "Vendor Price Increases (Avg.)", value: "12%", change: "2nd hike this cycle" },
];
