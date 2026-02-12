export interface PlayTool {
  name: string;
  usage: string;
}

export interface OMLExecutionNotes {
  low: string;
  mid: string;
  high: string;
}

export interface PlayDetail {
  id: string;
  title: string;
  businessGoal: string;
  summary: string;
  behaviors: {
    before: string[];
    during: string[];
    after: string[];
  };
  tools: PlayTool[];
  omlNotes: OMLExecutionNotes;
  outcomes: string[];
  failureModes: string[];
  nextPlay?: string;
}

export const playDetails: Record<string, PlayDetail> = {
  'leads-1': {
    id: 'leads-1',
    title: 'Industry Breach Cost Workshop',
    businessGoal: 'Get more leads',
    summary: 'Host an educational workshop for a specific industry vertical that teaches business owners the real financial cost of cyber breaches. Use this play when you want to establish credibility and generate high-quality leads by positioning yourself as an educator rather than a salesperson.',
    behaviors: {
      before: [
        'Select a single ICP (industry, size, decision-maker)',
        'Identify where that ICP already gathers (associations, chambers, conferences, CLEs, peer groups)',
        'Secure a speaking opportunity or host a session in partnership with an existing group',
        'Invite attendees using outcome-focused language, not technical promises',
      ],
      during: [
        'Teach breach cost using a realistic example business in the target industry',
        'Explain how downtime and operational disruption create real financial loss',
        'Educate on why cyber insurance often does not pay out as expected',
        'Facilitate understanding, not fear or urgency',
      ],
      after: [
        "Offer a follow-up conversation to explore the attendee's specific situation",
        'Book meetings focused on understanding business risk, not selling tools',
      ],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Used live to show breach cost for an example business. Directional and educational.' },
      { name: 'Hourly Downtime Calculator', usage: 'Used to illustrate how downtime drives loss. Assumptions are transparent and non-binding.' },
      { name: 'Cyber Insurance Health Check', usage: 'Used to explain claim likelihood and common failure points. Framed as education, not validation.' },
    ],
    omlNotes: {
      low: 'Use pre-built examples. Focus on clarity and confidence.',
      mid: 'Tailor assumptions to industry norms. Invite limited interaction.',
      high: 'Position the MSP as the trusted guide for that industry. Prospects self-select into next steps.',
    },
    outcomes: ['Higher-quality inbound leads', 'Faster trust in first meetings', 'Reduced need for fear-based selling', 'Clear differentiation from IT-first MSPs'],
    failureModes: ['Skipping ICP selection', 'Speaking to "everyone"', 'Turning education into a pitch', 'Over-customizing numbers live'],
    nextPlay: 'close-1',
  },
  'leads-2': {
    id: 'leads-2',
    title: 'Conference Booth Risk Snapshot',
    businessGoal: 'Get more leads',
    summary: 'Turn brief booth interactions into meaningful lead conversations by offering attendees a quick, personalized view of what a breach could cost their business.',
    behaviors: {
      before: ['Define the ICP attending the conference', 'Prepare a simple breach scenario relevant to that industry', 'Set up an iPad with the Quick Sim and Hourly Downtime Calculator', 'Train booth staff on how to invite participation without pitching'],
      during: ['Invite attendees to explore what a breach might cost their business', 'Run a fast Financial Impact Quick Sim using generic assumptions', 'Let the attendee input their own downtime assumptions', 'Show the combined impact clearly and briefly'],
      after: ['Capture contact information with permission', 'Offer a follow-up conversation focused on understanding their situation'],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Fast, directional simulation at the booth' },
      { name: 'Hourly Downtime Calculator', usage: 'Attendee inputs their own numbers for personalization' },
    ],
    omlNotes: { low: 'Use prepared assumptions only. Keep interactions under five minutes.', mid: 'Confidently explain assumptions and ranges.', high: 'Attendees self-select into deeper conversations.' },
    outcomes: ['Increased booth engagement', 'Higher-quality leads', 'Easier follow-up conversations'],
    failureModes: ['Pitching services at the booth', 'Over-customizing numbers', 'Taking too long per interaction'],
    nextPlay: 'close-1',
  },
  'leads-3': {
    id: 'leads-3',
    title: 'Industry Association Roundtable',
    businessGoal: 'Get more leads',
    summary: 'Facilitate a peer discussion among industry leaders about real-world cyber risk and business impact.',
    behaviors: {
      before: ['Select a single industry ICP', 'Identify an existing association, peer group, or advisory council', 'Secure permission to host or facilitate a roundtable', 'Invite participants using peer discussion and shared learning language'],
      during: ['Set ground rules for discussion, not selling', 'Facilitate conversation about real-world breach impact in the industry', 'Use a simple example to anchor discussion on cost and downtime', 'Encourage participants to share challenges and assumptions'],
      after: ['Offer optional follow-up conversations to continue the discussion', 'Schedule meetings focused on understanding individual business risk'],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Example-based discussion anchor' },
      { name: 'Hourly Downtime Calculator', usage: 'Illustrates industry-specific downtime costs' },
      { name: 'Cyber Insurance Health Check', usage: 'Facilitates discussion on insurance realities' },
    ],
    omlNotes: { low: 'Use prepared examples. Keep facilitation structured.', mid: 'Guide discussion using industry patterns.', high: 'MSP is viewed as trusted facilitator.' },
    outcomes: ['Deeper trust than presentation-based events', 'Higher-quality leads', 'Faster peer-driven credibility'],
    failureModes: ['Dominating the conversation', 'Turning discussion into a sales pitch', 'Allowing sessions to drift off-topic'],
    nextPlay: 'close-1',
  },
  'leads-4': {
    id: 'leads-4',
    title: 'Thought Leadership Speaking Slot',
    businessGoal: 'Get more leads',
    summary: 'Deliver a presentation at an industry event that reframes cybersecurity as a business and financial issue.',
    behaviors: {
      before: ['Select a single ICP and industry focus', 'Identify events, associations, or conferences serving that ICP', 'Submit a talk proposal focused on business outcomes, not security tools', 'Build a presentation centered on business risk, cost, and decision-making'],
      during: ['Reframe cybersecurity as a business and financial issue', 'Teach how breach impact and downtime affect real businesses', 'Explain why cyber insurance often fails to deliver expected protection', 'Avoid discussing products, services, or pricing'],
      after: ['Invite attendees to continue the conversation outside the session', 'Book meetings focused on understanding business risk and priorities'],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Referenced in presentation examples' },
      { name: 'Hourly Downtime Calculator', usage: 'Illustrates concepts in talk' },
      { name: 'Cyber Insurance Health Check', usage: 'Supports insurance discussion points' },
    ],
    omlNotes: { low: 'Use prepared examples. Keep content conceptual.', mid: 'Confidently answer business-oriented questions.', high: 'MSP is viewed as an authority in the space.' },
    outcomes: ['Increased credibility and trust', 'Higher-quality inbound inquiries', 'Reduced resistance in early sales conversations'],
    failureModes: ['Turning the talk into a sales pitch', 'Using technical jargon', 'Failing to define a clear takeaway'],
    nextPlay: 'close-1',
  },
  'leads-5': {
    id: 'leads-5',
    title: 'Partner-Led Co-Marketing Session',
    businessGoal: 'Get more leads',
    summary: 'Partner with a trusted advisor (CPA, insurance broker, attorney) to co-host an educational session for shared prospects.',
    behaviors: {
      before: ['Select a partner with overlapping ICPs (insurance broker, CPA, attorney)', 'Align on a shared topic centered on business risk, not technology', 'Define roles so the partner invites and the MSP educates', 'Co-create an invitation focused on outcomes and relevance'],
      during: ['Let the partner open the session and establish credibility', 'Teach breach cost, downtime impact, and insurance realities', 'Use a realistic industry example to anchor the discussion', 'Keep the session educational and non-promotional'],
      after: ['Coordinate follow-up with the partner', 'Book conversations focused on understanding business risk'],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Example-based teaching' },
      { name: 'Hourly Downtime Calculator', usage: 'Illustrates downtime impact' },
      { name: 'Cyber Insurance Health Check', usage: 'Aligns with partner expertise (if insurance broker)' },
    ],
    omlNotes: { low: 'Use prepared examples. Rely on partner credibility.', mid: 'Confidently tie discussion to partner services.', high: 'MSP is viewed as a peer advisor.' },
    outcomes: ['Higher trust at first contact', 'Increased inbound interest', 'Shorter sales cycles'],
    failureModes: ['Misaligned messaging with partner', 'Turning the session into a pitch', 'Poor follow-up coordination'],
    nextPlay: 'leads-6',
  },
  'leads-6': {
    id: 'leads-6',
    title: 'Business Risk Assessment Offer',
    businessGoal: 'Get more leads',
    summary: 'Convert speaking event attendees into scheduled Business Risk Assessment sessions by making a clear, compelling offer.',
    behaviors: {
      before: ['Prepare a clear offer slide or handout for the end of your presentation', 'Define your assessment format: 60-minute intro or 2-hour deep dive', 'Decide on pricing: free qualification call, paid assessment ($500–$2,500), or hybrid', 'Create a simple scheduling mechanism (Calendly, QR code, sign-up sheet)', "Prepare a one-page 'What You'll Learn' leave-behind"],
      during: ["Close your talk by restating the core insight: 'You now understand what a breach could cost businesses like yours'", "Transition to the offer: 'If you want to understand YOUR specific numbers, here is how we do that'", 'Explain the Business Risk Assessment: a 60-minute to 2-hour conversation focused on YOUR business, YOUR risk, and YOUR decisions', "Present the value clearly: 'You will walk away knowing what to spend, where to spend it, and what happens if you do not'", "State the investment (if paid) or the commitment (if free): 'This is a $1,500 engagement' OR 'I have 5 slots available this month'", "Make the CTA clear: 'Scan this code to schedule' or 'Sign up at my booth'"],
      after: ['Follow up within 24–48 hours with everyone who expressed interest', 'Send a confirmation with the assessment agenda and what to prepare', 'For paid assessments: send invoice or payment link before the session', 'For unpaid assessments: set clear expectations about decision points', 'Schedule the session and transition to the Business Context & Justification Discovery play'],
    },
    tools: [
      { name: 'Financial Impact (Quick Sim)', usage: 'Referenced in offer as what they experienced in the talk' },
      { name: 'Financial Impact (Full)', usage: 'What they will receive in the paid assessment—personalized to their business' },
      { name: 'Hourly Downtime Calculator', usage: 'Teased in the offer as part of the deep-dive deliverable' },
      { name: 'Cyber Insurance Health Check', usage: 'Optional add-on for assessment value' },
    ],
    omlNotes: { low: 'Use a scripted offer. Keep pricing simple (free or single tier). Focus on scheduling, not selling.', mid: 'Confidently explain the value. Offer tiered options (intro vs. deep dive). Handle objections smoothly.', high: 'Attendees ask to schedule before you make the offer. Premium pricing is accepted without negotiation.' },
    outcomes: ['Warm leads converted to scheduled discovery sessions', 'Revenue from paid assessments (if offered)', 'Clear pipeline of qualified prospects', 'Reduced "think about it" responses'],
    failureModes: ['Ending the talk without a clear CTA', 'Making the offer feel like a sales pitch instead of a next step', 'Overcomplicating pricing or options', 'Failing to follow up within 48 hours', 'Not setting expectations for what the assessment covers'],
    nextPlay: 'close-2',
  },
  'close-1': {
    id: 'close-1',
    title: 'Qualified Risk Conversation',
    businessGoal: 'Close more new logos',
    summary: 'Have an initial conversation with a prospect to determine if there is mutual fit before investing in deeper discovery.',
    behaviors: {
      before: ["Review the prospect's industry, size, and likely risk profile", 'Prepare outcome-focused questions centered on business goals and concerns'],
      during: ['Establish rapport and set expectations for the conversation', 'Ask questions about business goals, growth plans, and constraints', 'Explore whether cybersecurity risk could materially impact those goals', 'Confirm whether the prospect wants to continue the conversation'],
      after: ['Clearly agree on the next step or mutually disqualify', 'Schedule Business Context & Justification Discovery if appropriate'],
    },
    tools: [],
    omlNotes: { low: 'Follow a simple question framework. Focus on clarity and permission.', mid: 'Confidently reframe risk as a business issue.', high: 'Prospect self-identifies the need to continue.' },
    outcomes: ['Clear qualification or disqualification', 'Higher-quality discovery meetings', 'Reduced wasted sales effort'],
    failureModes: ['Pitching too early', 'Asking technical questions', 'Skipping the up-front contract'],
    nextPlay: 'close-2',
  },
  'close-2': {
    id: 'close-2',
    title: 'Business Context & Justification Discovery',
    businessGoal: 'Close more new logos',
    summary: "Document the prospect's business goals, constraints, and priorities to build a business case for IT and security investment.",
    behaviors: {
      before: ['Review notes from the Qualified Risk Conversation', 'Prepare questions focused on business objectives, constraints, and priorities'],
      during: ['Set an up-front contract for a business-focused discussion', 'Ask questions about growth goals, compliance drivers, and operational risks', 'Document what the business is trying to achieve and why it matters', 'Identify where technology and security support or hinder those goals'],
      after: ["Summarize the business justification for IT in the prospect's own words", 'Confirm whether exploring business risk and impact makes sense', 'Schedule the Ah-Ha Impact Simulation if appropriate'],
    },
    tools: [{ name: 'Business Context & Justification Intake', usage: 'Used to document goals, constraints, and success criteria. Co-created with the prospect during the conversation.' }],
    omlNotes: { low: 'Use a guided question set. Keep documentation simple.', mid: 'Confidently tie IT conversations to business outcomes.', high: 'Prospect articulates their own business case.' },
    outcomes: ['Clear business justification for IT and security discussions', 'Strong foundation for risk and impact modeling', 'Reduced price sensitivity later in the process'],
    failureModes: ['Slipping into technical discovery', 'Treating the intake as a form-fill exercise', 'Rushing toward solutions'],
    nextPlay: 'close-3',
  },
  'close-3': {
    id: 'close-3',
    title: 'Ah-Ha Impact Simulation',
    businessGoal: 'Close more new logos',
    summary: 'Run a collaborative financial simulation that shows the prospect exactly what a breach or downtime would cost their specific business.',
    behaviors: {
      before: ['Review the documented business context and goals', "Prepare simulation scenarios relevant to the prospect's industry and size", 'Have Financial Impact and Downtime tools ready'],
      during: ['Reconfirm the business objectives being protected', 'Run the Financial Impact simulation using prospect-specific assumptions', 'Walk through the Hourly Downtime Calculator with their inputs', 'Connect the outputs to their stated business goals and constraints', 'Allow the prospect to internalize the numbers before discussing solutions'],
      after: ['Summarize the quantified business risk in their words', 'Confirm whether addressing this risk is a priority', 'Schedule Multi-Stakeholder Risk Alignment if needed, or proceed to fulfillment'],
    },
    tools: [
      { name: 'Financial Impact (Full)', usage: 'Co-created with customer using their specific assumptions' },
      { name: 'Hourly Downtime Calculator', usage: 'Customer inputs their own numbers. They own the math.' },
      { name: 'Breach Likelihood', usage: 'Reviewed together to validate probability of occurrence' },
      { name: 'Cyber Insurance Health Check', usage: 'Co-created or reviewed to add financial protection context' },
    ],
    omlNotes: { low: 'Use prepared scenarios. Focus on one clear impact number.', mid: 'Confidently discuss assumptions and ranges. Invite questions.', high: 'Prospect drives the simulation and draws their own conclusions.' },
    outcomes: ['Clear "ah-ha" moment for the prospect', 'Quantified urgency tied to business goals', 'Reduced need for fear-based selling', 'Strong foundation for investment justification'],
    failureModes: ['Running simulations before business context is established', 'Over-engineering the numbers', 'Failing to connect outputs to stated goals', 'Pitching solutions immediately after'],
    nextPlay: 'close-4',
  },
  'close-4': {
    id: 'close-4',
    title: 'Multi-Stakeholder Risk Alignment',
    businessGoal: 'Close more new logos',
    summary: 'Bring all decision-makers together to confirm shared understanding of the problem, priority, and decision process.',
    behaviors: {
      before: ['Identify all stakeholders involved in the decision', 'Align on the business goals and risks already discussed', 'Prepare a summary of agreed impact and assumptions'],
      during: ['Set an up-front contract for alignment and decision clarity', 'Reconfirm business goals and risk impact in plain language', 'Ensure each stakeholder agrees on the problem and priority', 'Clarify decision-making roles and success criteria'],
      after: ['Confirm consensus on addressing the risk', 'Agree on how the final decision will be made', 'Schedule Value-to-Investment Fulfillment'],
    },
    tools: [
      { name: 'Business Risk Summary', usage: 'Executive-facing summary of agreed risks' },
      { name: 'Financial Impact + Downtime Outputs', usage: 'Referenced to maintain shared understanding' },
    ],
    omlNotes: { low: 'Keep summaries simple and focused.', mid: 'Confidently manage differing perspectives.', high: 'Stakeholders self-align without facilitation.' },
    outcomes: ['Unified understanding of the problem', 'Clear decision process', 'Reduced last-minute objections'],
    failureModes: ['Allowing stakeholders to introduce new problems', 'Skipping decision-process clarification', 'Reopening discovery'],
    nextPlay: 'close-5',
  },
  'close-5': {
    id: 'close-5',
    title: 'Value-to-Investment Fulfillment',
    businessGoal: 'Close more new logos',
    summary: 'Present your solution and pricing as a direct response to the agreed-upon business risk and impact.',
    behaviors: {
      before: ['Review agreed business goals, risks, and impact', 'Prepare a solution mapped directly to those outcomes', 'Define investment options aligned to priorities'],
      during: ['Reconfirm the business objective being protected or enabled', 'Review the risk being mitigated and loss avoided', 'Present the solution as a response to those realities', 'Clearly state the required investment and what it accomplishes', 'Pause and allow the buyer to react and ask questions'],
      after: ['Confirm alignment on value and scope', 'Agree on next steps toward commitment'],
    },
    tools: [
      { name: 'Business Context & Justification Summary', usage: 'Referenced to anchor the proposal' },
      { name: 'Financial Impact + Hourly Downtime Outputs', usage: 'Referenced as agreed truth' },
      { name: 'Risk Amortizer', usage: 'Shows monthly risk cost and justifies scope' },
      { name: 'Cyber Insurance Health Check', usage: 'Referenced as secondary benefit' },
    ],
    omlNotes: { low: 'Keep scope and pricing simple.', mid: 'Confidently discuss tradeoffs and prioritization.', high: 'Buyer connects investment to outcomes without prompting.' },
    outcomes: ['Reduced sticker shock', 'Clear value-to-investment alignment', 'Confident buying decision'],
    failureModes: ['Introducing new information', 'Defending price emotionally', 'Overcomplicating options'],
    nextPlay: 'close-6',
  },
  'close-6': {
    id: 'close-6',
    title: 'Implementation Kickoff',
    businessGoal: 'Close more new logos',
    summary: 'Transition a new customer from sales to delivery by reconfirming business objectives and setting clear expectations.',
    behaviors: {
      before: ['Review agreed business goals, risks, and priorities', 'Prepare a clear execution plan aligned to those outcomes'],
      during: ['Set expectations for how work will be delivered', 'Reconfirm the business objective and risk being addressed', 'Walk through scope, timeline, and responsibilities', 'Explain how progress and success will be measured'],
      after: ['Document the agreed baseline and next milestones', 'Transition the customer into active delivery and support'],
    },
    tools: [
      { name: 'Business Context & Justification Summary', usage: 'Referenced to anchor expectations' },
      { name: 'Risk Amortizer (baseline reference)', usage: 'Establishes starting point' },
      { name: 'Control Baseline Snapshot', usage: 'If available, documents initial state' },
    ],
    omlNotes: { low: 'Keep kickoff structured and simple.', mid: 'Confidently tie execution to business value.', high: 'Customer views kickoff as advisory, not operational.' },
    outcomes: ['Clean handoff from sales to delivery', "Reduced buyer's remorse", 'Clear definition of success'],
    failureModes: ['Treating kickoff as purely technical', 'Failing to restate business value', 'Allowing scope ambiguity'],
    nextPlay: 'adoption-1',
  },
  'close-7': {
    id: 'close-7',
    title: 'Insurance Posture Conversion',
    businessGoal: 'Close more new logos',
    summary: 'Convert price-sensitive prospects by reframing the conversation around cyber insurance gaps and financial exposure.',
    behaviors: {
      before: ["Review the prospect's current security posture and prior MSP pricing", 'Identify cyber insurance gaps or coverage inadequacies', 'Prepare a tiered pricing model (current stack, baseline, premium)', "Pull the Cyber Insurance Health Score for the prospect's industry"],
      during: ['Reframe the conversation from "IT costs" to "business risk exposure"', 'Use the Cyber Insurance Health Score to illustrate their current posture', 'Run breach impact simulations showing current state vs. improved state', 'Connect control maturity directly to cyber insurance compatibility and premium impact', 'Present tiered pricing tied to risk reduction, not feature lists'],
      after: ['Summarize the gap between current posture and insurable/defensible state', 'Provide a clear proposal showing investment vs. risk reduction', 'Schedule decision meeting with all stakeholders who need to approve budget', 'Follow up with ROI documentation tied to insurance and breach exposure'],
    },
    tools: [
      { name: 'Cyber Insurance Health Check', usage: 'Central artifact—shows current posture as an "insurability score"' },
      { name: 'Financial Impact (Full)', usage: 'Breach simulation showing current vs. improved state outcomes' },
      { name: 'Risk Amortizer', usage: 'Spreads breach cost over time to justify monthly investment' },
      { name: 'Control Baseline Snapshot', usage: 'Documents what controls exist today and what gaps remain' },
    ],
    omlNotes: { low: 'Use pre-built insurance framing. Keep simulations simple and directional.', mid: 'Confidently tie insurance posture to pricing tiers. Handle objections about prior provider.', high: 'Prospect accepts premium pricing without negotiation based on risk clarity.' },
    outcomes: ['Price objections converted to investment decisions', 'Higher contract value than prior provider', 'Executive clarity on risk, cost, and insurance alignment', 'Repeatable playbook for post-acquisition or competitive displacement deals'],
    failureModes: ['Leading with technical features instead of business risk', 'Failing to connect pricing to insurance outcomes', 'Over-customizing simulations in the first meeting', 'Not involving stakeholders who control budget'],
    nextPlay: 'close-6',
  },
  'close-8': {
    id: 'close-8',
    title: 'Paid Business Risk Assessment',
    businessGoal: 'Close new logos by monetizing discovery',
    summary: 'Turn the Business Risk Assessment into a paid engagement that bridges pricing objections and gives IT managers the financial ammunition to secure CFO buy-in.',
    behaviors: {
      before: ["Identify the prospect's budget constraints and who controls the purse strings", 'Understand the competitive landscape—are they comparing you to cheaper alternatives?', 'Prepare a bundled proposal that includes BRA + technical assessments', "Research the prospect's industry to customize risk scenarios"],
      during: ['Reframe the conversation from "cost of assessment" to "cost of not knowing your risk"', 'Position the BRA as the tool that gives IT managers CFO-ready justification', 'Show how the financial simulation quantifies exposure in dollars, not technical jargon', 'Bundle pen test + vuln assessment + BRA to create a differentiated package', "Emphasize: \"This isn't a guess—it's backed by real industry data\""],
      after: ['Deliver findings in executive-friendly language (not technical reports)', 'Provide a clear "ask" the IT manager can take to the CFO', 'Position the BRA engagement as the first step toward ongoing advisory work', 'Document the win as a repeatable playbook for similar prospects'],
    },
    tools: [
      { name: 'Financial Impact (Full)', usage: 'Core BRA artifact—quantifies risk in dollars to justify budget' },
      { name: 'Risk Amortizer', usage: 'Shows how security investment offsets potential losses' },
      { name: 'Cyber Insurance Health Check', usage: 'Connects controls to premium implications' },
      { name: 'Control Baseline Snapshot', usage: 'Documents current state for pen test/vuln assessment scope' },
    ],
    omlNotes: { low: 'Use pre-built examples. Focus on the bundling value proposition.', mid: 'Confidently price the engagement and defend the value.', high: 'BRA becomes a standard offering in your sales process.' },
    outcomes: ['Closed paid engagements ($5K–$15K range)', 'IT managers equipped to secure CFO approval', 'Differentiation from competitors selling on price', 'Pipeline for ongoing advisory and managed services'],
    failureModes: ['Giving away the BRA for free when it should be paid', 'Focusing on technical deliverables instead of business justification', 'Not bundling to create perceived value', 'Failing to arm the IT manager with CFO-ready talking points'],
    nextPlay: 'close-9',
  },
  'close-9': {
    id: 'close-9',
    title: 'Competitive Bid Price Justification',
    businessGoal: 'Win competitive bids by reframing price as risk',
    summary: "When competing against lower-cost providers, use ThreatCaptain to analyze the prospect's existing spend and expose gaps between what they're paying for and what they're actually getting.",
    behaviors: {
      before: ["Obtain the prospect's current cybersecurity billing or contract details", 'Identify the competing provider and their typical service gaps', 'Prepare a control-by-control comparison: fully implemented, partially implemented, or missing', 'Research industry-specific insurance and liability implications'],
      during: ["Walk through the prospect's current spend line by line", 'Score each control as fully covered, partially covered, or missing entirely', "Show where assumptions don't match reality", 'Connect gaps to insurance claim denial risk and liability exposure', 'Use analogies the prospect understands', "Reframe: \"I'm not trying to talk you into spending more—I'm showing you what real protection requires\""],
      after: ['Provide a clear before/after comparison showing control maturity improvement', "Document the risk they're accepting if they choose the cheaper option", 'Ensure they leave with a clear understanding of why your pricing is justified', 'Follow up with insurance alignment documentation if relevant'],
    },
    tools: [
      { name: 'Control Baseline Snapshot', usage: 'Score current controls as fully/partially/missing' },
      { name: 'Financial Impact (Full)', usage: 'Quantify the cost of gaps in dollars' },
      { name: 'Cyber Insurance Health Check', usage: 'Connect gaps to claim denial risk' },
      { name: 'Risk Amortizer', usage: 'Show how your pricing offsets potential losses' },
    ],
    omlNotes: { low: 'Use the comparison framework with pre-built examples. Focus on 2-3 critical gaps.', mid: 'Confidently walk through the full analysis and defend your pricing.', high: 'Competitive differentiation becomes a standard part of your sales process.' },
    outcomes: ['Won competitive bids against lower-cost providers', 'Pricing justified through risk, not discounts', 'Prospects understand the true cost of being underprotected', 'Positioned as professional advisor, not vendor'],
    failureModes: ['Discounting to match competitor pricing', 'Focusing on features instead of gaps', 'Not obtaining current billing/contract details upfront', 'Letting the conversation stay on price instead of risk'],
  },
  'adoption-1': {
    id: 'adoption-1',
    title: 'Internal Security Alignment',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: "Review an existing customer's security posture against their stated business goals to identify misalignments and opportunities.",
    behaviors: {
      before: ['Review implemented controls and current service scope', 'Identify gaps between current posture and intended outcomes'],
      during: ["Reconfirm the customer's business goals and risk tolerance", 'Review current security posture against those goals', 'Identify areas where controls are misaligned, missing, or overbuilt', 'Agree on what "good" should look like going forward'],
      after: ['Document agreed posture and priorities', 'Schedule follow-up actions or deeper reviews'],
    },
    tools: [
      { name: 'Control Baseline Snapshot', usage: 'Documents current state' },
      { name: 'Risk Register (ISO-lite)', usage: 'Tracks identified risks' },
      { name: 'Business Context & Justification Summary', usage: 'Anchors discussion to business goals' },
    ],
    omlNotes: { low: 'Focus on visibility and documentation.', mid: 'Confidently recommend adjustments.', high: 'Customer expects ongoing alignment.' },
    outcomes: ['Clear understanding of current security posture', 'Strong foundation for expansion conversations', 'Increased trust in MSP guidance'],
    failureModes: ['Treating alignment as a technical audit', 'Skipping business context', 'Avoiding hard prioritization conversations'],
    nextPlay: 'adoption-2',
  },
  'adoption-2': {
    id: 'adoption-2',
    title: 'Annual Risk Reset',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: "Conduct a yearly review of the customer's risk landscape, priorities, and security investments.",
    behaviors: {
      before: ['Review the current Risk Register and Control Baseline', "Identify changes in the customer's business, industry, or threat landscape"],
      during: ['Reconfirm business goals and risk tolerance for the next year', 'Review current risks, controls, and residual exposure', 'Identify new or emerging risks and outdated assumptions', 'Agree on updated priorities and focus areas'],
      after: ['Update the Risk Register and baseline', 'Define initiatives or assessments for the coming year'],
    },
    tools: [
      { name: 'Risk Register (ISO-lite)', usage: 'Central artifact for risk tracking' },
      { name: 'Control Baseline Snapshot', usage: 'Documents control state' },
      { name: 'Financial Impact + Downtime Outputs', usage: 'Revalidates business impact' },
    ],
    omlNotes: { low: 'Keep the review structured and concise.', mid: 'Confidently guide prioritization decisions.', high: 'Customer treats the review as a governance requirement.' },
    outcomes: ['Renewed relevance of security investments', 'Clear roadmap for the next year', 'Natural trigger for expanded services'],
    failureModes: ['Treating the review as a recap', 'Avoiding reprioritization', 'Failing to update documentation'],
    nextPlay: 'adoption-4',
  },
  'adoption-3': {
    id: 'adoption-3',
    title: 'Business Change Trigger',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: 'Proactively reach out when a customer experiences a material business change that affects their risk profile.',
    behaviors: {
      before: ['Identify a material business event (growth, M&A, compliance, insurance renewal, new technology adoption)', 'Confirm the event has security and risk implications'],
      during: ['Reach out to acknowledge the business change', 'Reframe the event in terms of risk exposure and impact', 'Gain agreement to reassess assumptions and priorities'],
      after: ['Update business context and risk assumptions', 'Schedule targeted reviews or assessments aligned to the change'],
    },
    tools: [
      { name: 'Business Context & Justification Update', usage: 'Refreshes documented goals and constraints' },
      { name: 'Risk Register (ISO-lite)', usage: 'Updated with new risks' },
      { name: 'Financial Impact + Downtime Outputs', usage: 'Revalidates exposure post-change' },
    ],
    omlNotes: { low: 'React to obvious changes.', mid: 'Proactively identify likely triggers.', high: 'Customer expects proactive outreach.' },
    outcomes: ['Security conversations tied to real business events', 'Reduced resistance to additional investment', 'Stronger advisory relationship'],
    failureModes: ['Missing the trigger entirely', 'Treating the change as a sales excuse', 'Skipping reassessment'],
    nextPlay: 'adoption-4',
  },
  'adoption-4': {
    id: 'adoption-4',
    title: 'Control Gap Prioritization',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: 'Identify and rank security control gaps by business impact and feasibility to help customers decide what to address.',
    behaviors: {
      before: ['Review the current Risk Register and Control Baseline', 'Identify gaps between existing controls and stated risk tolerance'],
      during: ['Reconfirm the business objective being protected', 'Review current risks and residual exposure', 'Identify control gaps that materially affect risk', 'Rank gaps by business impact and feasibility'],
      after: ['Agree on which gaps to address now, later, or not at all', 'Define next actions and owners'],
    },
    tools: [
      { name: 'Risk Register (ISO-lite)', usage: 'Source of truth for risks' },
      { name: 'Risk Amortizer', usage: 'Quantifies gap impact' },
      { name: 'Control Baseline Snapshot', usage: 'Documents current controls' },
    ],
    omlNotes: { low: 'Focus on a small number of obvious gaps.', mid: 'Confidently discuss tradeoffs.', high: 'Customer expects structured prioritization.' },
    outcomes: ['Clear, agreed security priorities', 'Reduced decision fatigue', 'Increased confidence in security investments'],
    failureModes: ['Treating all gaps as equal', 'Turning prioritization into compliance mapping', 'Avoiding difficult tradeoff discussions'],
    nextPlay: 'adoption-5',
  },
  'adoption-5': {
    id: 'adoption-5',
    title: 'Insurance Alignment Expansion',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: 'Review how current security controls align with cyber insurance requirements and claims likelihood.',
    behaviors: {
      before: ["Review the customer's current cyber insurance posture", 'Identify control gaps that affect underwriting or claims likelihood'],
      during: ['Reconfirm the business objective of insurance coverage', 'Review how current controls align with insurance expectations', 'Explain where misalignment increases denial or delay risk', 'Identify control improvements that materially improve insurance outcomes'],
      after: ['Agree on changes needed to improve alignment', 'Define scope and investment for those improvements'],
    },
    tools: [
      { name: 'Cyber Insurance Health Check', usage: 'Central artifact for insurance alignment' },
      { name: 'Risk Register (ISO-lite)', usage: 'Links controls to risks' },
      { name: 'Control Baseline Snapshot', usage: 'Documents control state' },
    ],
    omlNotes: { low: 'Focus on obvious underwriting requirements.', mid: 'Confidently discuss claim likelihood and tradeoffs.', high: 'Insurance alignment is treated as ongoing governance.' },
    outcomes: ['Improved claims confidence', 'Stronger justification for additional security investment', 'Reduced renewal friction'],
    failureModes: ['Promising insurance outcomes', 'Treating insurance as the only justification', 'Ignoring business priorities'],
    nextPlay: 'adoption-6',
  },
  'adoption-6': {
    id: 'adoption-6',
    title: 'Executive Roadmap Review',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: 'Present a forward-looking security roadmap to executives that connects investments to business outcomes.',
    behaviors: {
      before: ['Review the Risk Register, Control Baseline, and prioritized gaps', 'Prepare a forward-looking roadmap aligned to business objectives', 'Identify budget and resource implications'],
      during: ['Present the current security posture in executive terms', 'Connect roadmap items to business goals and risk tolerance', 'Discuss tradeoffs, timing, and investment levels', 'Gain executive alignment on direction and priorities'],
      after: ['Formalize the agreed roadmap', 'Define milestones and review cadence for the next period'],
    },
    tools: [
      { name: 'Risk Register (ISO-lite)', usage: 'Foundation for roadmap' },
      { name: 'Control Baseline Snapshot', usage: 'Documents current state' },
      { name: 'Risk Amortizer', usage: 'Quantifies investment justification' },
      { name: 'Financial Impact + Downtime Outputs', usage: 'Connects roadmap to business impact' },
    ],
    omlNotes: { low: 'Keep the roadmap simple and outcome-focused.', mid: 'Confidently discuss strategic tradeoffs.', high: 'MSP is treated as a strategic advisor.' },
    outcomes: ['Executive buy-in for security investments', 'Clear multi-year direction', 'Stronger advisory relationship'],
    failureModes: ['Presenting a technical roadmap', 'Avoiding budget discussions', 'Failing to connect to business outcomes'],
    nextPlay: 'adoption-7',
  },
  'adoption-7': {
    id: 'adoption-7',
    title: 'vCIO Risk Elevation',
    businessGoal: 'Increase security adoption and spend with existing customers',
    summary: 'Elevate vCIO and QBR conversations from tool-focused to risk-focused by using financial impact analysis to bridge the gap between IT managers and the C-suite.',
    behaviors: {
      before: ["Review the client's current service scope and relationship history", 'Identify whether conversations have been primarily tool/support-focused', 'Prepare CFIA artifacts customized to their business context', 'Identify upcoming organizational changes (M&A, partnerships, growth)'],
      during: ['Reframe the discussion from "IT costs" to "business risk and fiduciary responsibility"', 'Use ThreatCaptain to quantify business obligations (breach costs, compliance gaps)', 'Showcase how specific controls align with cyber insurance requirements', 'Help the client understand the relationship between deductibles, losses, and affordable protections', 'Connect IT spend to prevention of harm, not just operational uptime'],
      after: ['Summarize the conversation in executive-friendly language', 'Propose a professional services engagement to address identified gaps', 'Schedule follow-up with C-suite stakeholders who need visibility', 'Document the transition from MSP services to consultative solutions'],
    },
    tools: [
      { name: 'Financial Impact (Full)', usage: 'Central CFIA artifact—quantifies business risk in dollars to elevate conversation' },
      { name: 'Cyber Insurance Health Check', usage: 'Connects control maturity to insurance alignment and premium implications' },
      { name: 'Hourly Downtime Calculator', usage: 'Makes operational disruption tangible to C-suite' },
      { name: 'Control Baseline Snapshot', usage: 'Documents current state and identifies gaps for professional services scope' },
    ],
    omlNotes: { low: 'Use pre-built CFIA examples. Focus on one or two clear risk areas.', mid: 'Confidently tie risk findings to professional services recommendations.', high: 'Client views vCIO as a strategic advisor; C-suite requests regular risk briefings.' },
    outcomes: ['Professional services revenue from existing accounts', 'Elevated conversations from IT to C-suite', 'Enhanced vCIO program credibility', 'Positioned as trusted advisor delivering actionable cyber risk insights'],
    failureModes: ['Keeping the conversation at the IT manager level', 'Focusing on tools and features rather than business impact', 'Failing to propose professional services as the next step', 'Not involving executive stakeholders in findings presentation'],
    nextPlay: 'adoption-8',
  },
  'adoption-8': {
    id: 'adoption-8',
    title: 'vCIO Tabletop Risk Elevation',
    businessGoal: 'Elevate tabletop exercises into executive-level financial discussions',
    summary: 'Transform routine tabletop and DR exercises into powerful risk communication tools. Use ThreatCaptain to model what happens when controls fail—not just when they work—and convert abstract breach scenarios into monthly financial impact that executives immediately understand.',
    behaviors: {
      before: ['Identify customers with upcoming tabletop or DR exercise requirements', 'Prepare ThreatCaptain with customer-specific data: controls, financials, industry context', 'Build two scenarios: "controls working" vs "controls failed"', 'Research industry-specific breach scenarios relevant to the customer', 'Coordinate with customer to ensure executive participation (President, VP Finance, VP Compliance)'],
      during: ['Run the tabletop scenario with a realistic control failure assumption', 'Show the side-by-side view: zero residual risk (controls working) vs actual exposure (controls failed)', 'Use the ALE tool to convert annual loss exposure into monthly financial language', 'Walk through hourly and daily downtime costs in operational terms', 'Demonstrate how quickly exposure changes when a single control slips', 'Connect control failures to insurance claim denial risk'],
      after: ['Deliver a clear "controls working vs controls failed" comparison document', 'Provide monthly impact figures executives can use in budget discussions', 'Propose professional services to address identified control gaps', 'Schedule follow-up QBR focused on closing the exposure gap', 'Document the tabletop findings for compliance and audit purposes'],
    },
    tools: [
      { name: 'Financial Impact (Full)', usage: 'Model control failure scenarios and quantify residual risk' },
      { name: 'Hourly Downtime Calculator', usage: 'Make operational disruption tangible during tabletop' },
      { name: 'Control Baseline Snapshot', usage: 'Document controls as functional vs failed for side-by-side comparison' },
      { name: 'Cyber Insurance Health Check', usage: 'Connect control gaps to claim denial risk' },
    ],
    omlNotes: { low: 'Use pre-built tabletop scenarios. Focus on 2-3 critical control failure points.', mid: 'Confidently model multiple failure scenarios and defend the monthly impact figures.', high: 'Tabletop exercises become a standard part of your vCIO program with executive attendance.' },
    outcomes: ['Executive buy-in through monthly impact language', 'Strengthened alignment between IT, finance, and compliance leaders', 'Elevated tabletop exercises from theoretical to practical', 'Professional services pipeline from identified control gaps', 'Clear understanding of exposure when controls fail'],
    failureModes: ['Running tabletops without executive participation', 'Only showing the "controls working" scenario', 'Using annual loss figures instead of monthly impact', 'Keeping the conversation at IT level instead of C-suite', 'Failing to connect control failures to insurance implications'],
    nextPlay: 'close-8',
  },
};

export function getPlayDetail(id: string): PlayDetail | undefined {
  return playDetails[id];
}
