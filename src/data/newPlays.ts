// New Plays Structure - Organized by Business Goal with Phase Tagging

export type BusinessGoal = 'leads' | 'close' | 'adoption';

export type MethodologyPhase = 
  | 'branding' 
  | 'marketing' 
  | 'awareness' 
  | 'leadgen' 
  | 'bdr' 
  | 'sales' 
  | 'closing' 
  | 'implementation' 
  | 'touchpoints' 
  | 'reviews';

export interface Play {
  id: string;
  title: string;
  businessGoal: BusinessGoal;
  phases: MethodologyPhase[];
  governingSystem: string;
  targetAudience: {
    industries?: string;
    companySize: string;
    roles: string[];
    buyingContext: string;
  };
  whenToRun: string[];
  color: string;
}

export interface BusinessGoalGroup {
  id: BusinessGoal;
  title: string;
  description: string;
  color: string;
  plays: Play[];
}

const goalColors = {
  leads: '#4F8BFF',
  close: '#8BC34A',
  adoption: '#F44336',
};

export const plays: Play[] = [
  // GET MORE LEADS (6 Plays)
  {
    id: 'leads-1',
    title: 'Industry Breach Cost Workshop',
    businessGoal: 'leads',
    phases: ['branding', 'marketing', 'awareness', 'leadgen'],
    governingSystem: 'Golden Circle + Category Education / Business Risk Framing',
    targetAudience: {
      industries: 'Single industry vertical (e.g., healthcare, construction, manufacturing)',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Not actively shopping, but responsible for risk',
    },
    whenToRun: [
      'When targeting a specific industry vertical',
      'When the MSP needs net-new conversations, not just visibility',
      'When the MSP wants to establish credibility before selling',
      'Not ideal for late-stage sales or highly customized deals',
    ],
    color: goalColors.leads,
  },
  {
    id: 'leads-2',
    title: 'Conference Booth Risk Snapshot',
    businessGoal: 'leads',
    phases: ['marketing', 'awareness', 'leadgen'],
    governingSystem: 'Category Education / Experiential Discovery',
    targetAudience: {
      industries: 'Conference attendees within a defined ICP',
      companySize: '20–500 employees',
      roles: ['Owner', 'Executive', 'Operations', 'Finance'],
      buyingContext: 'Curious, time-constrained',
    },
    whenToRun: [
      'When attending an industry conference or trade show',
      'When booth traffic is high but conversations are shallow',
      'When the MSP needs fast, high-quality lead capture',
      'Not ideal for deep discovery or pricing discussions',
    ],
    color: goalColors.leads,
  },
  {
    id: 'leads-3',
    title: 'Industry Association Roundtable',
    businessGoal: 'leads',
    phases: ['branding', 'awareness', 'leadgen'],
    governingSystem: 'Peer-Based Learning + Category Education / Business Risk Framing',
    targetAudience: {
      industries: 'Members of a single industry association or peer group',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Peer-driven, relationship-oriented',
    },
    whenToRun: [
      'When targeting a specific industry with strong peer communities',
      'When the MSP wants facilitated discussion rather than presentation',
      'When trust and credibility matter more than scale',
      'Not ideal for broad or mixed audiences',
    ],
    color: goalColors.leads,
  },
  {
    id: 'leads-4',
    title: 'Thought Leadership Speaking Slot',
    businessGoal: 'leads',
    phases: ['branding', 'awareness'],
    governingSystem: 'Golden Circle + Category Education / Business Risk Framing',
    targetAudience: {
      industries: 'Industry-specific business leaders',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Educational, exploratory',
    },
    whenToRun: [
      'When an industry event, association, or conference offers a speaking opportunity',
      'When the MSP wants to establish credibility before any sales interaction',
      'When the audience is unfamiliar with business-risk-first cybersecurity',
      'Not ideal for direct selling or detailed technical instruction',
    ],
    color: goalColors.leads,
  },
  {
    id: 'leads-5',
    title: 'Partner-Led Co-Marketing Session',
    businessGoal: 'leads',
    phases: ['branding', 'awareness', 'leadgen'],
    governingSystem: 'Trust Transfer + Category Education / Business Risk Framing',
    targetAudience: {
      industries: 'Shared customers or prospects of the MSP and partner',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Advisory-driven, trust-oriented',
    },
    whenToRun: [
      'When the MSP has strong relationships with trusted partners',
      'When targeting buyers who already trust another advisor',
      'When credibility and third-party validation matter',
      'Not ideal without a clearly aligned partner',
    ],
    color: goalColors.leads,
  },
  {
    id: 'leads-6',
    title: 'Business Risk Assessment Offer',
    businessGoal: 'leads',
    phases: ['awareness', 'leadgen', 'bdr'],
    governingSystem: 'Value-First Conversion + Up-Front Contract',
    targetAudience: {
      industries: 'Attendees from speaking events, workshops, or webinars',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Educated and curious, ready to explore their own numbers',
    },
    whenToRun: [
      'Immediately after a speaking engagement, workshop, or webinar',
      'When attendees want to understand their specific risk exposure',
      'When the MSP wants to convert interest into a paid or scheduled discovery session',
      'Not ideal without a preceding educational event',
    ],
    color: goalColors.leads,
  },

  // CLOSE MORE NEW LOGOS (9 Plays)
  {
    id: 'close-1',
    title: 'Qualified Risk Conversation',
    businessGoal: 'close',
    phases: ['bdr', 'sales'],
    governingSystem: 'Sandler Sales – Bonding & Rapport + Up-Front Contract',
    targetAudience: {
      industries: 'Prospective customers within a defined ICP',
      companySize: '20–500 employees',
      roles: ['Owner', 'Executive', 'Operations', 'Finance'],
      buyingContext: 'Curious, early-stage, time-constrained',
    },
    whenToRun: [
      'After initial outreach or inbound interest',
      'When a prospect agrees to a first real conversation',
      'When the goal is to determine fit before deep discovery',
      'Not ideal for pitching services or running assessments',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-2',
    title: 'Business Context & Justification Discovery',
    businessGoal: 'close',
    phases: ['sales'],
    governingSystem: 'Sandler Sales – Pain Discovery (Business Context First)',
    targetAudience: {
      industries: 'Qualified prospects within a defined ICP',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Willing to explore alignment between business goals and IT',
    },
    whenToRun: [
      'After a Qualified Risk Conversation confirms fit',
      'When the prospect agrees to deeper discovery',
      'When understanding business goals is required before discussing risk',
      'Not ideal for pricing or solution discussions',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-3',
    title: 'Ah-Ha Impact Simulation',
    businessGoal: 'close',
    phases: ['sales'],
    governingSystem: 'Sandler Sales – Pain Deepening + Quantification',
    targetAudience: {
      industries: 'Qualified prospects with documented business context',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Ready to explore financial impact of risk',
    },
    whenToRun: [
      'After Business Context & Justification Discovery is complete',
      'When the prospect is ready to see their specific risk exposure',
      'When quantifying business impact will create urgency',
      'Not ideal before business context is documented',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-4',
    title: 'Multi-Stakeholder Risk Alignment',
    businessGoal: 'close',
    phases: ['sales'],
    governingSystem: 'Sandler Sales – Decision Process + Pain Ownership',
    targetAudience: {
      industries: 'Buying groups within a qualified prospect',
      companySize: '50–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO', 'IT leadership'],
      buyingContext: 'Shared decision-making',
    },
    whenToRun: [
      'After the Ah-Ha Impact Simulation confirms meaningful risk',
      'When more than one decision-maker is involved',
      'When budget, authority, and ownership are distributed',
      'Not ideal for single-decision-maker SMB deals',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-5',
    title: 'Value-to-Investment Fulfillment',
    businessGoal: 'close',
    phases: ['closing'],
    governingSystem: 'Sandler Sales – Fulfillment',
    targetAudience: {
      industries: 'Final decision-makers and influencers',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO'],
      buyingContext: 'Ready to evaluate investment',
    },
    whenToRun: [
      'After Multi-Stakeholder Risk Alignment is complete',
      'When the prospect agrees on the problem, priority, and decision process',
      'When pricing and scope need to be justified in business terms',
      'Not ideal before risk and impact are agreed',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-6',
    title: 'Implementation Kickoff',
    businessGoal: 'close',
    phases: ['implementation'],
    governingSystem: 'Change Management + Value Realization',
    targetAudience: {
      industries: 'Newly signed customers',
      companySize: '20–500 employees',
      roles: ['Owner', 'Executive Sponsor', 'IT Lead', 'Operations'],
      buyingContext: 'Committed, moving into execution',
    },
    whenToRun: [
      'Immediately after a buying decision is made',
      'When transitioning from sales to delivery',
      'When expectations, scope, and outcomes must be locked',
      'Not ideal for introducing new value arguments',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-7',
    title: 'Insurance Posture Conversion',
    businessGoal: 'close',
    phases: ['sales', 'closing'],
    governingSystem: 'Risk Transfer Alignment + Sandler Fulfillment',
    targetAudience: {
      industries: 'Insurance, Financial Services, Professional Services, or any prospect with cyber insurance gaps',
      companySize: '20–500 employees',
      roles: ['Owner', 'CFO', 'COO', 'Risk Manager'],
      buyingContext: 'Price-sensitive, incumbent provider, unclear on insurance requirements',
    },
    whenToRun: [
      'When a prospect is underpaying relative to their risk profile',
      'When cyber insurance gaps exist or coverage is inadequate',
      "When there is a pricing objection tied to a prior provider's low rates",
      'When the prospect needs to justify investment to executives or stakeholders',
      'Not ideal without an existing insurance conversation or coverage gap',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-8',
    title: 'Paid Business Risk Assessment',
    businessGoal: 'close',
    phases: ['sales', 'closing'],
    governingSystem: 'Value-First Conversion + Sandler Budget Step',
    targetAudience: {
      industries: 'Manufacturing, Professional Services, or any prospect with budget constraints',
      companySize: '20–500 employees',
      roles: ['IT Manager', 'CFO', 'COO', 'Owner'],
      buyingContext: 'Price-sensitive, comparing against cheaper alternatives, needs CFO justification',
    },
    whenToRun: [
      'When a prospect is comparing you against a cheaper alternative',
      'When IT needs to justify budget to the CFO',
      'When converting post-acquisition clients with pricing gaps',
      'When bundling assessments (pen test + vuln scan + BRA) creates perceived value',
      'Not ideal without a clear pricing objection or budget constraint',
    ],
    color: goalColors.close,
  },
  {
    id: 'close-9',
    title: 'Competitive Bid Price Justification',
    businessGoal: 'close',
    phases: ['sales', 'closing'],
    governingSystem: 'Sandler Pain + Competitive Differentiation',
    targetAudience: {
      industries: 'Any industry where prospects are comparing multiple MSP proposals',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO', 'IT Manager'],
      buyingContext: 'Competitive bid, believes they already have cybersecurity, comparing on price',
    },
    whenToRun: [
      'When competing against a lower-cost provider',
      'When prospect believes current provider covers their security needs',
      'When pricing objection is the primary blocker',
      'When you need to expose gaps in competitor coverage',
      'Not ideal if prospect has no existing security spend to analyze',
    ],
    color: goalColors.close,
  },

  // INCREASE SECURITY ADOPTION & SPEND (8 Plays)
  {
    id: 'adoption-1',
    title: 'Internal Security Alignment',
    businessGoal: 'adoption',
    phases: ['touchpoints'],
    governingSystem: 'ISO-Lite Security Management + Continuous Improvement',
    targetAudience: {
      industries: 'Existing customers',
      companySize: '20–500 employees',
      roles: ['Owner', 'Executive Sponsor', 'IT Lead', 'Operations'],
      buyingContext: 'Stable relationship, open to optimization',
    },
    whenToRun: [
      'After implementation is complete',
      'When security controls are in place but not regularly revisited',
      'When the MSP wants to shift from reactive support to advisory',
      'Not ideal during active incidents or major outages',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-2',
    title: 'Annual Risk Reset',
    businessGoal: 'adoption',
    phases: ['touchpoints', 'reviews'],
    governingSystem: 'ISO-Lite Risk Management + Management Review',
    targetAudience: {
      industries: 'Existing customers',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO', 'IT Lead'],
      buyingContext: 'Evaluating priorities for the coming year',
    },
    whenToRun: [
      'Annually or aligned to budgeting, insurance renewal, or strategic planning cycles',
      'When assumptions about risk, growth, or operations may have changed',
      'When the MSP wants to proactively justify continued investment',
      'Not ideal during contract disputes or unresolved delivery issues',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-3',
    title: 'Business Change Trigger',
    businessGoal: 'adoption',
    phases: ['touchpoints'],
    governingSystem: 'Event-Driven Risk Reassessment',
    targetAudience: {
      industries: 'Existing customers experiencing change',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO', 'IT Lead'],
      buyingContext: 'Actively managing growth, risk, or compliance',
    },
    whenToRun: [
      'When a material business change occurs',
      "When the customer's risk profile is likely altered",
      'When security assumptions may no longer be valid',
      'Not ideal without a clear business-driven trigger',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-4',
    title: 'Control Gap Prioritization',
    businessGoal: 'adoption',
    phases: ['touchpoints', 'reviews'],
    governingSystem: 'Risk-Based Prioritization (ISO-lite)',
    targetAudience: {
      industries: 'Existing customers',
      companySize: '20–500 employees',
      roles: ['Owner', 'CFO', 'COO', 'IT Lead'],
      buyingContext: 'Evaluating where to invest next',
    },
    whenToRun: [
      'After an Annual Risk Reset or Business Change Trigger',
      'When existing controls no longer match risk priorities',
      'When the customer needs clarity on what to do next',
      'Not ideal without an agreed risk context',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-5',
    title: 'Insurance Alignment Expansion',
    businessGoal: 'adoption',
    phases: ['touchpoints', 'reviews'],
    governingSystem: 'Risk Transfer Alignment (Insurance + Controls)',
    targetAudience: {
      industries: 'Existing customers with cyber insurance coverage',
      companySize: '20–500 employees',
      roles: ['Owner', 'CFO', 'COO', 'Risk Manager'],
      buyingContext: 'Managing premiums, coverage, or renewal risk',
    },
    whenToRun: [
      'After Control Gap Prioritization identifies insurance-related gaps',
      'Prior to cyber insurance renewal or policy changes',
      'When claims confidence or premium pressure is a concern',
      'Not ideal without an active or upcoming insurance decision',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-6',
    title: 'Executive Roadmap Review',
    businessGoal: 'adoption',
    phases: ['reviews'],
    governingSystem: 'Strategic Planning + ISO-Lite Management Review',
    targetAudience: {
      industries: 'Existing customers',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'COO', 'Executive Sponsor'],
      buyingContext: 'Strategic planning and budget alignment',
    },
    whenToRun: [
      'After Annual Risk Reset and Control Gap Prioritization',
      'When planning budgets, strategy, or major initiatives',
      'When the MSP wants to move from tactical support to strategic advisory',
      'Not ideal without executive participation',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-7',
    title: 'vCIO Risk Elevation',
    businessGoal: 'adoption',
    phases: ['touchpoints', 'reviews'],
    governingSystem: 'Strategic Planning + ISO-Lite Management Review',
    targetAudience: {
      industries: 'Existing customers with vCIO or managed services relationship',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'IT Manager', 'Executive Sponsor'],
      buyingContext: 'Stable relationship, open to advisory services, budget available for strategic projects',
    },
    whenToRun: [
      'When existing clients are managed by IT staff but lack C-suite engagement',
      'When vCIO/QBR conversations feel tool-focused rather than risk-focused',
      'When client is undergoing organizational changes (M&A, partnerships)',
      'When upselling professional services to existing accounts',
      'Not ideal for clients with unresolved service issues',
    ],
    color: goalColors.adoption,
  },
  {
    id: 'adoption-8',
    title: 'vCIO Tabletop Risk Elevation',
    businessGoal: 'adoption',
    phases: ['reviews', 'touchpoints'],
    governingSystem: 'Management Review (ISO-lite) + Financial Risk Quantification',
    targetAudience: {
      industries: 'Compliance-heavy sectors: Banking, Healthcare, Manufacturing, Credit Unions',
      companySize: '20–500 employees',
      roles: ['Owner', 'CEO', 'CFO', 'VP of Finance', 'VP of Compliance', 'IT Manager'],
      buyingContext: 'Has tabletop/DR exercise requirements, open to advisory, wants to strengthen executive alignment',
    },
    whenToRun: [
      'When running DR or tabletop exercises with existing customers',
      'When clients shrug off disaster scenarios as "no big deal"',
      'When you need to demonstrate real-time financial impact of control failures',
      'When aligning IT, finance, and compliance leaders around risk',
      'Not ideal without executive participation in the tabletop',
    ],
    color: goalColors.adoption,
  },
];

export const businessGoalGroups: BusinessGoalGroup[] = [
  {
    id: 'leads',
    title: 'Get More Leads',
    description: 'Generate net-new conversations and establish credibility before selling',
    color: goalColors.leads,
    plays: plays.filter(p => p.businessGoal === 'leads'),
  },
  {
    id: 'close',
    title: 'Close More New Logos',
    description: 'Move qualified prospects through discovery to signed agreements',
    color: goalColors.close,
    plays: plays.filter(p => p.businessGoal === 'close'),
  },
  {
    id: 'adoption',
    title: 'Increase Security Adoption & Spend',
    description: 'Expand and retain existing customers through advisory relationships',
    color: goalColors.adoption,
    plays: plays.filter(p => p.businessGoal === 'adoption'),
  },
];

export function getPlayById(id: string): Play | undefined {
  return plays.find(p => p.id === id);
}

export function getPlaysByPhase(phase: MethodologyPhase): Play[] {
  return plays.filter(p => p.phases.includes(phase));
}

export function getPlaysByGoal(goal: BusinessGoal): Play[] {
  return plays.filter(p => p.businessGoal === goal);
}

export function getGoalLabel(goal: BusinessGoal): string {
  const labels: Record<BusinessGoal, string> = {
    leads: 'Get More Leads',
    close: 'Close More New Logos',
    adoption: 'Increase Adoption & Spend',
  };
  return labels[goal];
}

export function getPhaseLabel(phase: MethodologyPhase): string {
  const labels: Record<MethodologyPhase, string> = {
    branding: 'Branding',
    marketing: 'Marketing',
    awareness: 'Awareness',
    leadgen: 'Lead Generation',
    bdr: 'Prospecting / BDR',
    sales: 'Sales',
    closing: 'Closing',
    implementation: 'Implementation',
    touchpoints: 'Ongoing Support',
    reviews: 'Annual Review',
  };
  return labels[phase];
}
