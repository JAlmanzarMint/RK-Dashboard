// ═══════════════════════════════════════════════════════
// Synthetic Audience — Platform Roadmap Testing
// Internal stakeholder personas derived from March 25, 2026 leadership call
// ═══════════════════════════════════════════════════════

export interface StakeholderPersona {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  color: string;
  context: string;
  dailyTools: string[];
  biggestFrustrations: string[];
  whatWouldMakeLifeEasier: string[];
  decisionInfluence: "Final Approver" | "Key Influencer" | "Daily User" | "Data Consumer";
  techComfort: "High" | "Medium" | "Low";
}

export const stakeholderPersonas: StakeholderPersona[] = [
  {
    id: "ceo",
    name: "Joe Maclean",
    title: "CEO",
    department: "Executive",
    avatar: "JM",
    color: "#0d9488",
    context: "Manages portfolio of companies (RK, OTT, Mint, Go Freight Hub). Wants a centralized brain that replaces email-based workflows. Inspired by Bezos's Project Prometheus and Musk's iterative factory model. Wakes up at night with ideas and wants to speak them into existence.",
    dailyTools: ["Email (primary)", "Insightly pipeline reports", "Liquidity spreadsheets", "Phone calls"],
    biggestFrustrations: [
      "Check run approvals get buried in email",
      "Has to open different emails/reports for different data",
      "No unified view across portfolio companies",
      "Can't see if quotes are in or out of guidelines without manual review",
      "Integration of acquired companies takes years, not months"
    ],
    whatWouldMakeLifeEasier: [
      "One dashboard that says 'Good Morning Joe' with all pending approvals",
      "In-guideline quotes auto-approved, out-of-guideline flagged with alerts",
      "Company forecast auto-updated from pipeline data",
      "Voice-to-feature pipeline for middle-of-night ideas",
      "Single view across RK + OTT + acquisitions"
    ],
    decisionInfluence: "Final Approver",
    techComfort: "Medium",
  },
  {
    id: "vp-ops",
    name: "James Bryant",
    title: "VP Operations / COO",
    department: "Operations",
    avatar: "JB",
    color: "#6366f1",
    context: "Flew to Phoenix to see the dashboard in person. Had a breakthrough moment after about an hour with Joe. Wants to track every commercial real estate contract, customer escalations, co-termination dates. Thinks about labor utilization and warehouse camera AI.",
    dailyTools: ["Email", "Facility tracker spreadsheets", "Insightly", "Phone with site managers"],
    biggestFrustrations: [
      "Susanna and Jasmine spend too much time manually tracking escalations",
      "No system flags when a revenue escalation date passes (e.g., Netflix March 1)",
      "Cannot see all contracts per building in one place",
      "No visibility into warehouse efficiency without visiting sites",
      "Co-termination tracking is completely manual"
    ],
    whatWouldMakeLifeEasier: [
      "Every contract per building with escalation dates auto-tracked",
      "Dashboard alerts when escalation dates approach",
      "Warehouse camera AI for damage tracking and labor utilization",
      "BD rep email/calendar visibility without constant one-on-ones",
      "Automated facility reports that free up admin staff"
    ],
    decisionInfluence: "Key Influencer",
    techComfort: "Medium",
  },
  {
    id: "vp-sales",
    name: "Peter O'Donnell",
    title: "VP Sales / BD",
    department: "Business Development",
    avatar: "PO",
    color: "#dc2626",
    context: "Manages the BD team across RK and OTT. Asked if the OTT pricing calculator could be customer-facing on the website. Wants to streamline everything into one view. Curious about eliminating ZoomInfo and Insightly. Runs one-on-ones with reps but wants data-backed conversations.",
    dailyTools: ["Insightly CRM", "ZoomInfo", "Email", "Phone", "Spreadsheets for pricing"],
    biggestFrustrations: [
      "Paying for ZoomInfo and Insightly when this platform could replace them",
      "BD reps using spreadsheets for quoting instead of a unified system",
      "No way for customers to self-serve quotes on the OTT website",
      "Pipeline data is in Insightly, pricing is in spreadsheets, approvals are in email",
      "One-on-ones lack objective activity data on rep performance"
    ],
    whatWouldMakeLifeEasier: [
      "Customer-facing OTT calculator on the website for lead gen",
      "Each BD rep gets their own dashboard with clients, pipeline, and pricing tools",
      "Quotes auto-feed into pipeline — no double-entry",
      "Rep activity scorecards: emails sent, meetings held, quotes generated",
      "CRM functionality built into the dashboard to eliminate Insightly"
    ],
    decisionInfluence: "Key Influencer",
    techComfort: "Medium",
  },
  {
    id: "controller",
    name: "David Chen",
    title: "Controller / VP Finance",
    department: "Finance",
    avatar: "DC",
    color: "#059669",
    context: "Manages financial reporting, check runs, liquidity, AR/AP. Joe says eliminating Insightly, ZoomInfo, HubSpot, and NewsFrom would save close to a quarter million. David needs the financial data to be accurate and auditable.",
    dailyTools: ["QuickBooks/ERP", "Excel spreadsheets", "Email for check run approvals", "Insightly for pipeline revenue estimates"],
    biggestFrustrations: [
      "Check run approvals via email — CEO sometimes takes days to respond",
      "Liquidity forecasting is manual and time-consuming",
      "No real-time view of how pipeline converts to projected revenue",
      "SaaS tool costs are fragmented and hard to justify ROI on each",
      "AR aging data is in one system, AP in another, cash forecast in a spreadsheet"
    ],
    whatWouldMakeLifeEasier: [
      "Check runs appear in CEO dashboard for instant approval",
      "Auto-forecast: pipeline → weighted revenue → margin → EBITDA projection",
      "Consolidated SaaS spend tracking to prove $250K savings",
      "13-week cash flow projection updated automatically from AR/AP data",
      "Audit trail on all approvals (who approved what, when)"
    ],
    decisionInfluence: "Key Influencer",
    techComfort: "High",
  },
  {
    id: "bd-rep",
    name: "Brian Saucier",
    title: "Business Development Representative",
    department: "Business Development",
    avatar: "BS",
    color: "#d97706",
    context: "Frontline BD rep covering San Antonio territory. Joe mentioned that if Brian's territory goes quiet (no emails for two weeks), leadership should know. Uses Insightly for CRM, spreadsheets for quoting. Wants tools that help him close faster.",
    dailyTools: ["Insightly CRM", "Email", "Phone", "Excel for quotes", "ZoomInfo for prospecting"],
    biggestFrustrations: [
      "Creating quotes in spreadsheets is slow and error-prone",
      "Pipeline updates in Insightly are manual and feel redundant",
      "No real-time pricing data for his assigned facilities",
      "Doesn't know competitor pricing when talking to prospects",
      "Spends time on admin instead of selling"
    ],
    whatWouldMakeLifeEasier: [
      "Personal 'Good Morning Brian' dashboard with his clients and pipeline",
      "Pricing engine pre-loaded with his facility rates and parameters",
      "One-click draft quote generation that auto-updates pipeline",
      "Competitive intelligence on his accounts (who's bidding, at what price)",
      "AI-generated daily brief: 'Here are your top 3 priorities today'"
    ],
    decisionInfluence: "Daily User",
    techComfort: "Medium",
  },
  {
    id: "ops-admin",
    name: "Susanna Martinez",
    title: "Operations Administrator",
    department: "Operations",
    avatar: "SM",
    color: "#7c3aed",
    context: "Handles facility tracking, contract management, escalation monitoring with Jasmine. James explicitly said the contract tracking system would free up Susanna and Jasmine to do other items. Currently spends hours each week manually tracking lease dates and customer escalations.",
    dailyTools: ["Spreadsheets", "Email", "Shared drives for contracts", "Calendar reminders"],
    biggestFrustrations: [
      "Manually tracking escalation dates across 12 facilities and dozens of customers",
      "No central repository for commercial real estate contracts",
      "Calendar reminders are the only system for upcoming deadlines",
      "Collecting revenue escalation data from multiple sources",
      "Co-termination analysis requires cross-referencing multiple spreadsheets"
    ],
    whatWouldMakeLifeEasier: [
      "Automated escalation alerts 60/30/15 days before rate increases",
      "Every contract uploaded and searchable by facility, customer, or date",
      "Auto-generated report: 'These escalations are due this month'",
      "Co-termination visual timeline showing overlapping contract dates",
      "Revenue escalation enforcer that flags when adjustments haven't been applied"
    ],
    decisionInfluence: "Daily User",
    techComfort: "Low",
  },
  {
    id: "warehouse-mgr",
    name: "Carlos Reyes",
    title: "Warehouse Operations Manager",
    department: "Operations",
    avatar: "CR",
    color: "#0891b2",
    context: "Manages day-to-day warehouse operations at one of the 12 facilities. James mentioned wanting AI to plug into warehouse cameras for damage tracking, labor utilization, and efficiency. Carlos needs practical tools, not executive dashboards.",
    dailyTools: ["WMS", "Radio/phone", "Clipboard/tablet for counts", "Email for damage reports"],
    biggestFrustrations: [
      "Damage reports are manual — by the time leadership knows, it's too late",
      "No objective measure of labor efficiency per zone",
      "Cannot prove to leadership how productive the team is without manual tracking",
      "Safety incidents are reported after the fact, not prevented",
      "Dock congestion — no visibility into truck dwell times"
    ],
    whatWouldMakeLifeEasier: [
      "Camera AI that auto-detects damage events and creates incident reports",
      "Zone-by-zone labor utilization heatmaps in real time",
      "Dock door monitoring showing which bays are occupied and for how long",
      "Safety compliance alerts (PPE, forklift speed, blocked exits)",
      "Daily operations scorecard auto-generated from camera + WMS data"
    ],
    decisionInfluence: "Daily User",
    techComfort: "Low",
  },
  {
    id: "customer-rep",
    name: "Jasmine Torres",
    title: "Customer Service Manager",
    department: "Customer Service",
    avatar: "JT",
    color: "#e11d48",
    context: "Handles inbound customer inquiries, inventory questions, billing disputes. Works with Susanna on escalation tracking. If a customer portal existed, it would dramatically reduce her inbound call volume.",
    dailyTools: ["Email", "Phone", "WMS for inventory lookups", "Excel for billing reconciliation"],
    biggestFrustrations: [
      "Customers call constantly for inventory counts she has to look up manually",
      "Billing disputes require cross-referencing multiple systems",
      "No self-service option for customers — everything goes through her",
      "Same questions repeated: 'Where's my shipment?' 'What's my balance?'",
      "Revenue escalation conversations with customers are uncomfortable without clear contract data"
    ],
    whatWouldMakeLifeEasier: [
      "Customer portal where clients see their own inventory and shipment status",
      "Self-service invoice viewing and payment portal",
      "Contract data at her fingertips when customers question rate increases",
      "Automated responses for common queries (inventory counts, shipment ETAs)",
      "30-40% reduction in inbound calls from customer self-service"
    ],
    decisionInfluence: "Daily User",
    techComfort: "Medium",
  },
];

// ═══════════════════════════════════════════════════════
// ROADMAP INITIATIVE REVIEWS BY SYNTHETIC AUDIENCE
// ═══════════════════════════════════════════════════════

export interface InitiativeReview {
  initiativeId: string;
  initiativeName: string;
  tier: 1 | 2 | 3;
  reviews: {
    personaId: string;
    impactScore: number; // 1-10
    urgencyScore: number; // 1-10
    feasibilityScore: number; // 1-10
    adoptionLikelihood: number; // 1-10
    quote: string;
    strengthsIdentified: string[];
    concernsRaised: string[];
    featureRequests: string[];
  }[];
  aggregateScores: {
    avgImpact: number;
    avgUrgency: number;
    avgFeasibility: number;
    avgAdoption: number;
    overallScore: number;
  };
  feedbackDrivenChanges: string[];
}

export const initiativeReviews: InitiativeReview[] = [
  // ── TIER 1 ──────────────────────────────────────────
  {
    initiativeId: "bd-dashboards",
    initiativeName: "1. Personalized BD Dashboards",
    tier: 1,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 9,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "This is the whole point. Good Morning Joe with everything I need. If we build one thing first, it's this.",
        strengthsIdentified: ["Eliminates context-switching between Insightly and email", "Portfolio-level visibility", "Approval queue integration"],
        concernsRaised: ["Must work on mobile — I'm not always at a desk", "Data needs to be real-time, not stale"],
        featureRequests: ["Add voice command: 'Show me pipeline over $1M'", "SMS alert when something needs immediate attention"],
      },
      {
        personaId: "vp-sales",
        impactScore: 10,
        urgencyScore: 10,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "My team needs this yesterday. Brian in San Antonio shouldn't be using spreadsheets to track his pipeline when this exists.",
        strengthsIdentified: ["Rep-level pipeline view replaces Insightly", "Activity tracking gives me data for one-on-ones", "Pricing engine in each rep's hands"],
        concernsRaised: ["Reps might resist if it feels like surveillance", "Need training plan — some reps aren't tech-savvy"],
        featureRequests: ["Leaderboard showing rep performance rankings", "Comparison view: Rep A vs Rep B on key metrics", "Goal tracking — show progress toward monthly targets"],
      },
      {
        personaId: "bd-rep",
        impactScore: 9,
        urgencyScore: 9,
        feasibilityScore: 8,
        adoptionLikelihood: 8,
        quote: "If I can see my clients, create quotes, and update pipeline in one place, I'll actually use it. Right now I'm in 4 different tools.",
        strengthsIdentified: ["One place for everything I need daily", "Draft quotes without waiting for pricing from leadership", "My own pipeline without digging through Insightly"],
        concernsRaised: ["Don't want management seeing every email I send — metadata only is fine", "Need offline capability when I'm at client sites with bad WiFi"],
        featureRequests: ["Quick-add button for new prospects from my mobile", "Competitor pricing intel on my accounts", "Daily AI brief: 'Here's what to focus on today'"],
      },
      {
        personaId: "ops-admin",
        impactScore: 5,
        urgencyScore: 4,
        feasibilityScore: 7,
        adoptionLikelihood: 6,
        quote: "This doesn't directly affect my work, but if it reduces how many times BD asks me to pull contract data for their quotes, I'm all for it.",
        strengthsIdentified: ["Less ad-hoc requests from BD team", "Pipeline data auto-updated means fewer report requests"],
        concernsRaised: ["Doesn't address my core pain points around contract tracking"],
        featureRequests: ["Link BD quotes to the relevant facility contracts I manage"],
      },
    ],
    aggregateScores: { avgImpact: 8.5, avgUrgency: 8.0, avgFeasibility: 7.3, avgAdoption: 8.0, overallScore: 8.4 },
    feedbackDrivenChanges: [
      "ADD: Mobile-responsive design as hard requirement — CEO and reps need mobile access",
      "ADD: Rep performance leaderboard with opt-in visibility settings to address surveillance concern",
      "ADD: Daily AI briefing module per rep with top 3 priorities",
      "ADD: Goal tracking progress bars on personal dashboard",
      "MODIFY: Email tracking to show metadata only (volume, recency) — not content — per rep feedback",
      "ADD: Quick-add prospect button for mobile use",
    ],
  },
  {
    initiativeId: "approval-engine",
    initiativeName: "2. Approval Workflow Engine",
    tier: 1,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 10,
        feasibilityScore: 8,
        adoptionLikelihood: 10,
        quote: "Check runs get buried. Quotes get buried. If it's in guidelines, bang bang bang — I shouldn't even need to look at it. This is critical.",
        strengthsIdentified: ["Auto-approve in-guideline items saves hours per week", "Out-of-guideline flagging prevents bad deals", "Everything in one queue, not scattered across email"],
        concernsRaised: ["Guidelines engine needs to be configurable — margins and terms change", "Need SMS/push backup for urgent items"],
        featureRequests: ["One-tap approve from mobile notification", "Weekly summary: 'You approved 15 quotes totaling $X this week'", "Escalation timer: if I don't respond in 4 hours, alert James"],
      },
      {
        personaId: "controller",
        impactScore: 10,
        urgencyScore: 10,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "Check runs are my biggest pain point. If Joe can approve from his dashboard instead of searching through email, we save 2-3 days per cycle.",
        strengthsIdentified: ["Audit trail solves compliance concerns", "Faster approval = faster payments = better vendor relationships", "Guideline engine prevents out-of-policy quotes"],
        concernsRaised: ["Need integration with our accounting system for check run data", "Audit trail must be immutable — no retroactive changes"],
        featureRequests: ["Check run detail view: vendor, amount, due date, PO reference", "Batch approval for multiple in-guideline items", "Export audit log for quarterly compliance review"],
      },
      {
        personaId: "vp-sales",
        impactScore: 9,
        urgencyScore: 8,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "Quotes sitting in email for 3 days while the customer talks to our competitor is how we lose deals. This fixes that.",
        strengthsIdentified: ["Faster quote approval = shorter sales cycle", "In-guideline auto-approve empowers the sales team", "Transparency on where a quote is in the approval chain"],
        concernsRaised: ["Need clear definition of 'in-guideline' — who sets the parameters?"],
        featureRequests: ["Quote status tracker: Submitted → Under Review → Approved → Sent to Customer", "Notification to rep when their quote is approved"],
      },
    ],
    aggregateScores: { avgImpact: 9.7, avgUrgency: 9.3, avgFeasibility: 7.3, avgAdoption: 9.3, overallScore: 9.3 },
    feedbackDrivenChanges: [
      "ADD: Mobile one-tap approval capability via push notification",
      "ADD: Escalation timers — auto-escalate to VP if CEO doesn't respond within configurable window",
      "ADD: Batch approval for multiple in-guideline items",
      "ADD: Quote status tracker visible to submitting rep",
      "ADD: Configurable guidelines engine with role-based editing",
      "ADD: Immutable audit log with export capability for compliance",
      "ADD: Check run detail view with full AP metadata",
      "PRIORITY: Move approval engine to #1 build priority (tied with BD dashboards) based on unanimous 10/10 urgency from CEO and Controller",
    ],
  },
  {
    initiativeId: "pricing-lead-gen",
    initiativeName: "3. Customer-Facing Pricing & Lead Gen",
    tier: 1,
    reviews: [
      {
        personaId: "vp-sales",
        impactScore: 9,
        urgencyScore: 8,
        feasibilityScore: 8,
        adoptionLikelihood: 9,
        quote: "Pete already asked for this on the call. Customers should be able to get an OTT quote on our website. It's a lead gen machine.",
        strengthsIdentified: ["Inbound lead channel that doesn't exist today", "Reduces rep time on initial quoting", "Captures prospect data for pipeline"],
        concernsRaised: ["Public pricing might undercut negotiated rates for existing customers", "Need to show 'estimated' pricing, not binding quotes"],
        featureRequests: ["Password-protected tier for existing customers with their negotiated rates", "Lead scoring on inbound requests", "Auto-assign leads to reps by territory"],
      },
      {
        personaId: "bd-rep",
        impactScore: 8,
        urgencyScore: 7,
        feasibilityScore: 9,
        adoptionLikelihood: 8,
        quote: "If a lead comes in from the website already knowing their estimated cost, I'm 50% through the sales conversation before I pick up the phone.",
        strengthsIdentified: ["Pre-qualified leads save time", "Customer already has pricing context", "More professional than spreadsheet quotes"],
        concernsRaised: ["Hope it doesn't replace my job — I add value in the relationship, not just the quote"],
        featureRequests: ["Show me which leads came from the website vs my own outreach", "Alert me instantly when someone in my territory requests a quote"],
      },
      {
        personaId: "customer-rep",
        impactScore: 7,
        urgencyScore: 6,
        feasibilityScore: 8,
        adoptionLikelihood: 7,
        quote: "If existing customers can see their rates online, I'll get fewer calls asking 'What am I paying for this?' That alone saves me hours.",
        strengthsIdentified: ["Reduces rate-inquiry calls", "Transparency builds customer trust"],
        concernsRaised: ["Customers might see market rates and demand reductions", "Need to be careful about what pricing data is visible"],
        featureRequests: ["Customer-specific portal showing their contracted rates, not public rates"],
      },
    ],
    aggregateScores: { avgImpact: 8.0, avgUrgency: 7.0, avgFeasibility: 8.3, avgAdoption: 8.0, overallScore: 7.9 },
    feedbackDrivenChanges: [
      "MODIFY: Public calculator shows 'estimated range' not exact pricing — addresses competitive concern",
      "ADD: Two tiers — public (lead gen) and authenticated (existing customer with contracted rates)",
      "ADD: Auto-assign leads to reps by territory/facility",
      "ADD: Lead source tracking (website vs. rep outreach vs. referral)",
      "ADD: Instant push notification to assigned rep when a website quote request comes in",
      "MODIFY: Label all public quotes as 'Estimate — contact for final pricing' per VP Sales feedback",
    ],
  },
  {
    initiativeId: "saas-elimination",
    initiativeName: "4. SaaS Tool Elimination ($250K Savings)",
    tier: 1,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 8,
        feasibilityScore: 6,
        adoptionLikelihood: 8,
        quote: "We figured this out because James got on a plane. Insightly, ZoomInfo, HubSpot, NewsFrom — we don't need them if this platform works.",
        strengthsIdentified: ["$250K direct cost savings", "Single platform reduces training burden", "Data consolidation improves analytics"],
        concernsRaised: ["Can't cut tools until replacement features are production-ready", "Need data migration plan — years of Insightly history", "What if the new platform goes down? Need reliability guarantees"],
        featureRequests: ["Migration wizard that imports Insightly contacts and deals", "Uptime SLA dashboard showing platform reliability"],
      },
      {
        personaId: "controller",
        impactScore: 10,
        urgencyScore: 7,
        feasibilityScore: 5,
        adoptionLikelihood: 7,
        quote: "I love the savings number but I need to see a parallel-run period. We can't just rip out Insightly on day one.",
        strengthsIdentified: ["Quantifiable cost reduction for board reporting", "Consolidation simplifies vendor management"],
        concernsRaised: ["Need 90-day parallel run before cutting any tool", "Some tools may have features we don't realize we use until they're gone", "Contract termination penalties on existing SaaS agreements"],
        featureRequests: ["SaaS spend dashboard tracking current costs vs. platform replacement savings", "Feature parity checklist: for each tool, confirm equivalent capability exists"],
      },
      {
        personaId: "vp-sales",
        impactScore: 8,
        urgencyScore: 6,
        feasibilityScore: 5,
        adoptionLikelihood: 7,
        quote: "ZoomInfo is the one I'd cut last. The data is hard to replicate. Insightly we can definitely replace first.",
        strengthsIdentified: ["Insightly replacement is most natural fit", "Cost savings are real and meaningful"],
        concernsRaised: ["ZoomInfo contact data quality will be hard to match with AI scraping", "BD team needs continuous access — no gaps during migration"],
        featureRequests: ["Phased rollout: Insightly → NewsFrom → HubSpot → ZoomInfo (last)", "Side-by-side comparison during transition period"],
      },
    ],
    aggregateScores: { avgImpact: 9.3, avgUrgency: 7.0, avgFeasibility: 5.3, avgAdoption: 7.3, overallScore: 7.5 },
    feedbackDrivenChanges: [
      "ADD: Phased elimination plan — Insightly first, ZoomInfo last — per VP Sales feedback",
      "ADD: 90-day parallel run for each tool before cancellation per Controller requirement",
      "ADD: Feature parity checklist showing replacement status for each SaaS tool",
      "ADD: SaaS spend tracking dashboard showing real-time savings realization",
      "ADD: Insightly data migration wizard as first-build item",
      "ADD: Uptime monitoring and reliability dashboard",
      "MODIFY: Lower feasibility score means this is a 6-month initiative, not 60-day — adjust timeline",
    ],
  },
  // ── TIER 2 ──────────────────────────────────────────
  {
    initiativeId: "contract-intelligence",
    initiativeName: "5. Contract & Lease Intelligence",
    tier: 2,
    reviews: [
      {
        personaId: "vp-ops",
        impactScore: 10,
        urgencyScore: 10,
        feasibilityScore: 8,
        adoptionLikelihood: 10,
        quote: "This is exactly what I was talking about on the call. Every contract, every building, every escalation date. The Netflix one March 1 — we can't miss those.",
        strengthsIdentified: ["Directly addresses my stated pain point", "Frees up Susanna and Jasmine for higher-value work", "Co-termination visibility enables strategic lease negotiations"],
        concernsRaised: ["Initial data entry will be massive — hundreds of contracts to digitize", "Need someone to validate all the dates and terms are correct"],
        featureRequests: ["AI-assisted contract parsing — upload a PDF and it extracts key dates and terms", "Monthly executive summary: 'These contracts need attention'", "Link to facility profile page for geographic context"],
      },
      {
        personaId: "ops-admin",
        impactScore: 10,
        urgencyScore: 10,
        feasibilityScore: 7,
        adoptionLikelihood: 10,
        quote: "You have no idea how much time I spend on this. If the system tells me 'Netflix escalation is in 15 days,' that changes my entire workflow.",
        strengthsIdentified: ["Eliminates my most tedious weekly task", "Automated alerts mean I'll never miss a deadline", "Revenue escalation enforcer catches what we've been missing"],
        concernsRaised: ["I need the interface to be simple — I'm not technical", "What if the system gets a date wrong? Need manual override capability"],
        featureRequests: ["Simple form to add/edit contracts — not a complicated interface", "Color-coded calendar view: green (OK), yellow (30 days), red (overdue)", "Bulk upload option for initial data migration"],
      },
      {
        personaId: "controller",
        impactScore: 9,
        urgencyScore: 8,
        feasibilityScore: 8,
        adoptionLikelihood: 9,
        quote: "Revenue escalation enforcement alone could recover six figures annually. This directly impacts the P&L.",
        strengthsIdentified: ["Revenue recovery from missed escalations", "Financial planning improved with visibility into upcoming cost changes", "Audit readiness improved"],
        concernsRaised: ["Need integration with billing system to verify escalations were actually applied"],
        featureRequests: ["Revenue impact projection: 'These upcoming escalations represent $X in annual revenue increase'", "Exception report: escalations past due but not yet applied to billing"],
      },
    ],
    aggregateScores: { avgImpact: 9.7, avgUrgency: 9.3, avgFeasibility: 7.7, avgAdoption: 9.7, overallScore: 9.3 },
    feedbackDrivenChanges: [
      "PRIORITY UPGRADE: Move to Tier 1 — unanimously scored highest urgency (10/10 from Operations personas)",
      "ADD: AI-powered contract PDF parser for bulk onboarding",
      "ADD: Simple, non-technical form interface for Susanna's daily use",
      "ADD: Color-coded calendar view (green/yellow/red)",
      "ADD: Revenue impact projection for upcoming escalations",
      "ADD: Exception report for overdue escalations not yet applied to billing",
      "ADD: Manual override capability for all auto-detected dates",
      "ADD: Link contracts to facility profiles for geographic context",
    ],
  },
  {
    initiativeId: "email-intelligence",
    initiativeName: "6. Email Intelligence & Activity Monitoring",
    tier: 2,
    reviews: [
      {
        personaId: "vp-ops",
        impactScore: 8,
        urgencyScore: 7,
        feasibilityScore: 6,
        adoptionLikelihood: 7,
        quote: "The San Antonio example — if we'd seen Brian's emails drop to zero for two weeks, we could've intervened before it became a problem.",
        strengthsIdentified: ["Early warning on territory disengagement", "Data-backed one-on-ones replace gut feeling", "Customer engagement visibility"],
        concernsRaised: ["Privacy concerns — need clear policy on what's tracked", "Some reps may feel this is Big Brother", "Email volume ≠ productivity — need to weight for quality"],
        featureRequests: ["Anomaly detection, not surveillance — alert on deviations from normal patterns", "Customer-facing metric: 'When was the last time we contacted [customer]?'"],
      },
      {
        personaId: "bd-rep",
        impactScore: 5,
        urgencyScore: 4,
        feasibilityScore: 6,
        adoptionLikelihood: 4,
        quote: "Honestly, this makes me uncomfortable. If it's about tracking my email count, it doesn't capture the two-hour phone call I had with a prospect.",
        strengthsIdentified: ["I can see my own metrics which might be motivating"],
        concernsRaised: ["Feels like surveillance", "Email count doesn't reflect actual selling activity", "Phone calls and in-person meetings aren't captured"],
        featureRequests: ["Let me self-report activities (calls, meetings) alongside email data", "Show MY dashboard to ME — don't just surface it to management", "Include phone call logging and meeting tracking, not just email"],
      },
    ],
    aggregateScores: { avgImpact: 6.5, avgUrgency: 5.5, avgFeasibility: 6.0, avgAdoption: 5.5, overallScore: 5.9 },
    feedbackDrivenChanges: [
      "CRITICAL REDESIGN: Reframe from 'Email Monitoring' to 'Activity Intelligence' — reps see it as surveillance",
      "ADD: Multi-channel activity tracking — email + phone + meetings + self-reported activities",
      "ADD: Rep-facing personal dashboard showing their own metrics first — transparency builds trust",
      "MODIFY: Management sees aggregate patterns and anomalies, not individual email counts",
      "ADD: 'Customer last contacted' metric as primary use case instead of rep monitoring",
      "ADD: Self-report feature for phone calls, in-person meetings, and other non-email activities",
      "MODIFY: Lower priority — build after BD dashboards are adopted and trust is established",
    ],
  },
  {
    initiativeId: "tms-integration",
    initiativeName: "7. TMS Integration & Route Intelligence",
    tier: 2,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 9,
        urgencyScore: 7,
        feasibilityScore: 5,
        adoptionLikelihood: 8,
        quote: "TMS should feed right into this. Routing simulations, machine learning on the routing — that's where real money is saved.",
        strengthsIdentified: ["Operational cost reduction through route optimization", "Real-time visibility replaces manual status checks", "ML on historical routes creates compounding value"],
        concernsRaised: ["TMS API might be limited or poorly documented", "Need buy-in from OTT operations team"],
        featureRequests: ["Fuel cost savings tracker with dollar amounts", "Compare AI-optimized routes vs actual routes driven"],
      },
      {
        personaId: "warehouse-mgr",
        impactScore: 7,
        urgencyScore: 6,
        feasibilityScore: 5,
        adoptionLikelihood: 7,
        quote: "If I could see which trucks are coming and when, I could plan dock assignments better. Right now I'm guessing.",
        strengthsIdentified: ["Dock planning visibility", "Inbound ETA tracking"],
        concernsRaised: ["TMS data quality is inconsistent", "Need real-time updates, not 30-minute delays"],
        featureRequests: ["Dock scheduling view: which trucks arriving at which dock, at what time", "Inbound volume forecast so I can plan labor"],
      },
    ],
    aggregateScores: { avgImpact: 8.0, avgUrgency: 6.5, avgFeasibility: 5.0, avgAdoption: 7.5, overallScore: 6.8 },
    feedbackDrivenChanges: [
      "ADD: Dock scheduling view for warehouse managers (unexpected high-value use case)",
      "ADD: Inbound volume forecasting tied to TMS data",
      "ADD: Route optimization savings tracker with actual dollar amounts",
      "MODIFY: Start with read-only TMS data feed before building ML features",
      "ADD: API assessment task — evaluate TMS vendor's API capabilities before committing to timeline",
    ],
  },
  {
    initiativeId: "camera-ai",
    initiativeName: "8. Warehouse Camera AI",
    tier: 2,
    reviews: [
      {
        personaId: "vp-ops",
        impactScore: 8,
        urgencyScore: 6,
        feasibilityScore: 4,
        adoptionLikelihood: 7,
        quote: "We already have the cameras. If AI can watch them and tell me about damage, labor issues, safety violations — that's a game changer.",
        strengthsIdentified: ["Leverages existing hardware investment", "Objective measurement replaces subjective reports", "Safety compliance is a liability reducer"],
        concernsRaised: ["Computer vision AI accuracy in warehouse environments", "Employee concerns about constant surveillance", "Processing power and bandwidth requirements"],
        featureRequests: ["Start with damage detection — highest ROI", "Safety compliance as phase 2", "Labor utilization as phase 3"],
      },
      {
        personaId: "warehouse-mgr",
        impactScore: 9,
        urgencyScore: 7,
        feasibilityScore: 4,
        adoptionLikelihood: 8,
        quote: "If I could prove to corporate that my team is productive, I could justify the overtime and temporary labor I keep requesting.",
        strengthsIdentified: ["Objective productivity data", "Damage incident documentation for claims", "Real-time safety monitoring"],
        concernsRaised: ["Workers will feel surveilled — need transparent communication", "False positives could create alert fatigue", "Who handles the alerts at 2 AM?"],
        featureRequests: ["Daily productivity scorecard auto-generated from camera data", "Damage incident clips auto-saved with timestamp for claims", "Alert severity levels so I only get woken up for critical issues"],
      },
    ],
    aggregateScores: { avgImpact: 8.5, avgUrgency: 6.5, avgFeasibility: 4.0, avgAdoption: 7.5, overallScore: 6.6 },
    feedbackDrivenChanges: [
      "MODIFY: Phased rollout — Phase 1: Damage detection, Phase 2: Safety, Phase 3: Labor utilization",
      "ADD: Alert severity levels (critical/warning/info) with configurable notification rules",
      "ADD: Auto-save incident video clips for insurance claims",
      "ADD: Transparent employee communication plan as prerequisite before deployment",
      "ADD: Pilot at one facility first before network-wide rollout",
      "MODIFY: Lower feasibility score (4.0) means this needs vendor evaluation — may require specialized CV partner",
    ],
  },
  // ── TIER 3 ──────────────────────────────────────────
  {
    initiativeId: "acquisition-playbook",
    initiativeName: "9. Acquisition Integration Playbook",
    tier: 3,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 9,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "We're still not integrated with On Time two and a half years later. Go Freight Hub is signed. We need this to be months, not years.",
        strengthsIdentified: ["Directly enables the acquisition growth strategy", "Templated approach means each acquisition is faster than the last", "Cross-portfolio analytics unlock synergy identification"],
        concernsRaised: ["Each acquisition is different — template needs to be flexible", "Go Freight Hub is the first test — need it working before the next deal"],
        featureRequests: ["Integration progress tracker with milestone checklist", "Day 1 / Week 1 / Month 1 / Quarter 1 automation playbooks", "Synergy tracking: projected vs actual savings"],
      },
      {
        personaId: "controller",
        impactScore: 9,
        urgencyScore: 8,
        feasibilityScore: 6,
        adoptionLikelihood: 8,
        quote: "The financial integration alone — consolidated reporting across companies — would save me a week per month-end close.",
        strengthsIdentified: ["Consolidated financial reporting", "Synergy tracking creates accountability", "Standardized chart of accounts across companies"],
        concernsRaised: ["Different companies use different accounting systems", "Need to handle different fiscal years and reporting structures"],
        featureRequests: ["Consolidated P&L dashboard across all portfolio companies", "Intercompany elimination entries automated", "Due diligence checklist template for future acquisitions"],
      },
    ],
    aggregateScores: { avgImpact: 9.5, avgUrgency: 8.5, avgFeasibility: 6.5, avgAdoption: 8.5, overallScore: 8.5 },
    feedbackDrivenChanges: [
      "PRIORITY UPGRADE: Move to Tier 2 — Go Freight Hub acquisition is imminent",
      "ADD: Integration milestone tracker with automated progress reporting",
      "ADD: Day 1 / Week 1 / Month 1 playbook templates",
      "ADD: Consolidated financial dashboard across portfolio companies",
      "ADD: Synergy tracker: projected vs actual savings per acquisition",
      "ADD: Due diligence checklist template for future M&A pipeline",
    ],
  },
  {
    initiativeId: "domain-ai",
    initiativeName: "10. Domain Knowledge AI Engine",
    tier: 3,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 7,
        feasibilityScore: 6,
        adoptionLikelihood: 8,
        quote: "Jason did it for mint. He fed his domain expertise into AI and it created a super being. We need that for warehousing, for finance, for sales.",
        strengthsIdentified: ["Preserves institutional knowledge", "Scales expertise beyond individual people", "Cross-company knowledge sharing"],
        concernsRaised: ["Quality depends on what humans feed it", "Need dedicated AI team to maintain and improve"],
        featureRequests: ["Voice-to-knowledge: let me speak my ideas and have AI capture and categorize them", "Jason's mint model as the template to replicate"],
      },
      {
        personaId: "vp-sales",
        impactScore: 8,
        urgencyScore: 5,
        feasibilityScore: 5,
        adoptionLikelihood: 7,
        quote: "If I could ask the AI 'What did we quote Tesla last year and did we win?' and get an instant answer, that's incredibly valuable.",
        strengthsIdentified: ["Historical deal intelligence", "Competitive pricing memory", "New rep onboarding acceleration"],
        concernsRaised: ["Garbage in, garbage out — data quality must be high", "Need to protect confidential client information within the AI"],
        featureRequests: ["Natural language queries: 'Show me all won deals over $1M in California'", "AI-suggested pricing based on historical wins at similar specs"],
      },
    ],
    aggregateScores: { avgImpact: 9.0, avgUrgency: 6.0, avgFeasibility: 5.5, avgAdoption: 7.5, overallScore: 7.0 },
    feedbackDrivenChanges: [
      "ADD: Natural language query interface for historical deal and pricing data",
      "ADD: Voice-to-knowledge capture (Joe's midnight ideas)",
      "ADD: AI-suggested pricing based on historical win/loss patterns",
      "ADD: Confidentiality controls — restrict AI from surfacing client-specific data to unauthorized users",
      "MODIFY: Start with structured knowledge (deal history, pricing) before unstructured (SOPs, tribal knowledge)",
    ],
  },
  {
    initiativeId: "predictive-analytics",
    initiativeName: "11. Predictive Analytics & Forecasting",
    tier: 3,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 9,
        urgencyScore: 8,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "Pipeline should auto-update the forecast. $100M pipeline at 23% conversion is $23M. Blended margin gives me EBITDA. Just do the math for me.",
        strengthsIdentified: ["Eliminates manual forecasting", "Real-time financial visibility", "Scenario modeling for strategic planning"],
        concernsRaised: ["Model accuracy will be questioned until it proves itself", "Need override capability for manual adjustments"],
        featureRequests: ["Board-ready output with one click", "What-if scenarios: 'What if we win the top 5 deals?'", "Rolling 13-week cash flow forecast"],
      },
      {
        personaId: "controller",
        impactScore: 10,
        urgencyScore: 8,
        feasibilityScore: 7,
        adoptionLikelihood: 10,
        quote: "If pipeline data auto-forecasts revenue, and I can overlay my cost assumptions, I have a real-time P&L projection. That's transformational.",
        strengthsIdentified: ["Real-time P&L projection capability", "Cash flow forecasting from multiple data sources", "Eliminates monthly forecast rebuild"],
        concernsRaised: ["Need to validate model against last 12 months of actuals", "Manual override is essential — AI can suggest, humans must confirm"],
        featureRequests: ["Confidence intervals on all forecasts", "Variance tracking: forecast vs actual over time to improve model", "Integration with actual financial results for backtesting"],
      },
    ],
    aggregateScores: { avgImpact: 9.5, avgUrgency: 8.0, avgFeasibility: 7.0, avgAdoption: 9.5, overallScore: 8.5 },
    feedbackDrivenChanges: [
      "ADD: Confidence intervals displayed on all forecasts",
      "ADD: Manual override capability with annotation (why the override)",
      "ADD: Backtest feature: compare past forecasts to actuals to build trust in model",
      "ADD: One-click board presentation export",
      "ADD: Rolling 13-week cash flow tied to AR aging + AP schedule + pipeline probability",
      "MODIFY: Build on top of existing Financials page — don't create a separate module",
    ],
  },
  {
    initiativeId: "communication-hub",
    initiativeName: "12. Unified Communication Hub",
    tier: 3,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 8,
        urgencyScore: 5,
        feasibilityScore: 6,
        adoptionLikelihood: 6,
        quote: "I want to be dependent on this tool, not email. But we can't force the transition overnight.",
        strengthsIdentified: ["Contextual communication attached to data", "Notification center consolidates alerts"],
        concernsRaised: ["Competing with Slack, Teams, Email — hard to change behavior", "External communication still requires email"],
        featureRequests: ["Daily digest email for those who resist the transition", "Mobile push notifications with deep links to dashboard items"],
      },
      {
        personaId: "bd-rep",
        impactScore: 5,
        urgencyScore: 3,
        feasibilityScore: 5,
        adoptionLikelihood: 4,
        quote: "Another messaging tool? I'm already in email, text, and Teams. Unless it replaces ALL of them, it's just one more thing to check.",
        strengthsIdentified: ["Contextual messages on deals could be useful"],
        concernsRaised: ["Yet another communication channel", "Customers communicate via email — can't avoid it"],
        featureRequests: ["Email integration — let me reply from within the dashboard", "If it doesn't replace email, at least surface my important emails inside the dashboard"],
      },
    ],
    aggregateScores: { avgImpact: 6.5, avgUrgency: 4.0, avgFeasibility: 5.5, avgAdoption: 5.0, overallScore: 5.3 },
    feedbackDrivenChanges: [
      "DEPRIORITIZE: Lowest-scoring initiative — adoption risk is too high without replacing email entirely",
      "PIVOT: Instead of a full communication hub, build a 'Notification Center' only",
      "ADD: Daily digest email as bridge — summarize all dashboard activity and alerts via email",
      "ADD: Deep-link push notifications so mobile users go directly to the relevant dashboard item",
      "REMOVE: In-platform messaging — it won't compete with email/Teams; focus on notification aggregation instead",
    ],
  },
  {
    initiativeId: "customer-portal",
    initiativeName: "13. Customer Portal",
    tier: 3,
    reviews: [
      {
        personaId: "customer-rep",
        impactScore: 10,
        urgencyScore: 9,
        feasibilityScore: 7,
        adoptionLikelihood: 9,
        quote: "If customers could check their own inventory and track their own shipments, my inbound calls drop by 30-40%. That's not a guess — I tracked it.",
        strengthsIdentified: ["Massive call reduction", "Customer satisfaction improvement", "24/7 self-service for time zones we don't cover"],
        concernsRaised: ["Need WMS integration for real-time inventory data", "Some customers won't use it — still need phone support"],
        featureRequests: ["Inventory dashboard with search and export", "Shipment tracking with ETA", "Invoice viewing and download", "Simple, clean interface — customers aren't tech people"],
      },
      {
        personaId: "vp-sales",
        impactScore: 8,
        urgencyScore: 7,
        feasibilityScore: 6,
        adoptionLikelihood: 8,
        quote: "A customer portal is a competitive differentiator. Most 3PLs make customers call for everything. This says 'we're modern.'",
        strengthsIdentified: ["Competitive differentiation", "Customer stickiness — once they rely on it, switching costs increase", "Data-driven customer conversations"],
        concernsRaised: ["Security and data isolation between customers is critical", "Need customer onboarding process"],
        featureRequests: ["Customer health score visible to BD team", "Usage analytics — which customers use the portal, which don't"],
      },
    ],
    aggregateScores: { avgImpact: 9.0, avgUrgency: 8.0, avgFeasibility: 6.5, avgAdoption: 8.5, overallScore: 8.0 },
    feedbackDrivenChanges: [
      "PRIORITY UPGRADE: Move to Tier 2 — Customer Service Manager scored 10/10 impact, and call reduction directly improves margins",
      "ADD: Customer health score visible to BD and management",
      "ADD: Portal usage analytics to track adoption",
      "ADD: Simple onboarding flow for new customer accounts",
      "ADD: Multi-tenant data isolation as security requirement",
      "ADD: Export functionality for inventory and invoice data",
    ],
  },
  {
    initiativeId: "portfolio-command",
    initiativeName: "14. Cross-Portfolio Command Center",
    tier: 3,
    reviews: [
      {
        personaId: "ceo",
        impactScore: 10,
        urgencyScore: 7,
        feasibilityScore: 5,
        adoptionLikelihood: 9,
        quote: "Everything I do applies to both RK and On Time. And now Go Freight Hub. I need one screen that shows me how the whole portfolio is performing.",
        strengthsIdentified: ["Single view across all companies", "Synergy identification across portfolio", "Investment thesis validation"],
        concernsRaised: ["Each company has different data structures", "Need normalized KPIs that are comparable"],
        featureRequests: ["Side-by-side company comparison on normalized KPIs", "Portfolio-level EBITDA roll-up", "Cross-company talent view for internal mobility"],
      },
      {
        personaId: "controller",
        impactScore: 9,
        urgencyScore: 6,
        feasibilityScore: 4,
        adoptionLikelihood: 8,
        quote: "Consolidated reporting is the holy grail but it requires standardized chart of accounts across companies. That's a big lift.",
        strengthsIdentified: ["Eliminates manual consolidation work", "Investor-ready portfolio view"],
        concernsRaised: ["Standardization across companies is prerequisite", "Different fiscal periods complicate consolidation"],
        featureRequests: ["Automated consolidation with intercompany eliminations", "Investor presentation export"],
      },
    ],
    aggregateScores: { avgImpact: 9.5, avgUrgency: 6.5, avgFeasibility: 4.5, avgAdoption: 8.5, overallScore: 7.3 },
    feedbackDrivenChanges: [
      "ADD: Standardized KPI definitions across portfolio companies",
      "ADD: Portfolio EBITDA roll-up with company drill-down",
      "ADD: Investor presentation export with one click",
      "MODIFY: Requires accounting standardization as prerequisite — add to acquisition playbook",
      "ADD: Multi-tenant architecture from day one to support future acquisitions",
    ],
  },
];

// ═══════════════════════════════════════════════════════
// AGGREGATED FEEDBACK SUMMARY
// ═══════════════════════════════════════════════════════

export const feedbackSummary = {
  totalPersonas: 8,
  totalInitiatives: 14,
  totalReviews: 38,

  topScoringInitiatives: [
    { name: "Approval Workflow Engine", score: 9.3, reason: "Unanimous urgency from CEO and Finance" },
    { name: "Contract & Lease Intelligence", score: 9.3, reason: "Operations personas gave perfect 10s across the board" },
    { name: "Personalized BD Dashboards", score: 8.4, reason: "Core enabler for sales team modernization" },
  ],

  lowestScoringInitiatives: [
    { name: "Unified Communication Hub", score: 5.3, reason: "Adoption risk — competes with existing email/Teams habits" },
    { name: "Email Intelligence", score: 5.9, reason: "Privacy concerns from BD reps; reframed as Activity Intelligence" },
  ],

  priorityChanges: [
    { initiative: "Contract & Lease Intelligence", from: "Tier 2", to: "Tier 1", reason: "Unanimous 10/10 urgency from Operations — immediate revenue recovery" },
    { initiative: "Acquisition Playbook", from: "Tier 3", to: "Tier 2", reason: "Go Freight Hub acquisition is imminent — cannot wait 6 months" },
    { initiative: "Customer Portal", from: "Tier 3", to: "Tier 2", reason: "30-40% call reduction = direct margin improvement" },
    { initiative: "Communication Hub", from: "Tier 3", to: "Deprioritized", reason: "Pivoted to Notification Center only — full hub has adoption risk" },
  ],

  crossCuttingThemes: [
    {
      theme: "Mobile-First",
      count: 5,
      detail: "CEO, BD reps, and warehouse managers all need mobile access. One-tap approvals, push notifications, and responsive design are non-negotiable.",
    },
    {
      theme: "Privacy & Trust",
      count: 3,
      detail: "Email monitoring reframed as Activity Intelligence. Metadata only. Rep-facing dashboards shown first, management views show aggregates. Warehouse camera AI needs transparent employee communication.",
    },
    {
      theme: "Phased Rollout",
      count: 4,
      detail: "SaaS elimination needs 90-day parallel runs. Camera AI pilots at one facility first. TMS starts read-only. Email intelligence builds after BD dashboard trust is established.",
    },
    {
      theme: "Simplicity for Non-Technical Users",
      count: 3,
      detail: "Susanna needs simple forms, not complex interfaces. Warehouse managers need practical views, not executive dashboards. Customer portal must be intuitive for logistics clients.",
    },
    {
      theme: "Revenue Protection",
      count: 2,
      detail: "Contract escalation enforcement and approval workflow acceleration both directly protect and accelerate revenue capture.",
    },
  ],

  revisedBuildOrder: [
    { phase: "Phase 1 (Weeks 1-6)", items: ["Authentication + Roles", "Approval Workflow Engine", "Contract & Lease Intelligence"] },
    { phase: "Phase 2 (Weeks 7-12)", items: ["Personalized BD Dashboards", "Quote Persistence + Pipeline Auto-flow", "Notification Center (replaces Communication Hub)"] },
    { phase: "Phase 3 (Weeks 13-18)", items: ["Customer-Facing Pricing + Lead Gen", "Customer Portal (MVP)", "Acquisition Playbook (Go Freight Hub)"] },
    { phase: "Phase 4 (Weeks 19-26)", items: ["SaaS Tool Migration (Insightly first)", "Activity Intelligence (renamed from Email Monitoring)", "TMS Integration (read-only feed)"] },
    { phase: "Phase 5 (Weeks 27-36)", items: ["Predictive Analytics", "Domain Knowledge AI", "Camera AI (pilot)", "Portfolio Command Center"] },
  ],

  financialImpactRevised: {
    year1Conservative: "$4.2M",
    year1Optimistic: "$11.5M",
    keyDrivers: [
      "Contract escalation recovery: $200-400K (moved to Phase 1)",
      "Approval acceleration: 10% sales cycle reduction on $65.8M pipeline",
      "SaaS elimination: $250K (phased over 6 months)",
      "Customer portal call reduction: 30-40% = $120K labor savings",
      "Inbound lead gen from public calculator: $2.4M pipeline",
    ],
  },
};
