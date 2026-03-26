# RK Platform Optimization Roadmap

### Strategic Feature Analysis — Derived from Leadership Meeting (March 25, 2026)

---

## Executive Summary

This document translates CEO Joe Maclean's strategic vision—articulated during the March 25 leadership call—into a concrete feature roadmap for the RK Dashboard platform. Joe's core thesis: **build a centralized AI-powered operating system that replaces fragmented tools, eliminates ~$250K/year in SaaS spend, and creates a scalable acquisition playbook.**

The platform today is a strong visual prototype with rich mock data, two working pricing engines (warehouse + LTL), and 22 pages of operational intelligence. What it lacks is **live data integration, workflow automation, user-scoped experiences, and the backend infrastructure to become the "giga factory" Joe described.**

Below are 14 feature initiatives organized into three tiers by revenue impact and implementation complexity.

---

## Current Platform Strengths (What We Keep)

| Asset | Value |
|-------|-------|
| 22-page dashboard architecture | Comprehensive operational coverage across RK + OTT |
| Warehouse rate card engine (`generateRateCard`) | Working markup logic, facility-scoped base costs, tiered pricing |
| LTL quote calculator (`calculateQuote`) | Full weight-break, class, zone, accessorial, fuel, and volume discount math |
| Facility profile system | 12 facilities with racking, lease, MHE, capacity data |
| Pipeline visualization | Funnel stages, Big 9 tracking, near-term probability scoring |
| Email Pulse framework | Volume, SLA, sentiment, facility-level and department-level views |
| Routing optimization mockup | Fleet management, simulation scenarios, zone performance |
| Financial modeling | LBO, pro forma acquisition calculator, forecast updater |

These are not throwaway prototypes—they are the **skeleton** onto which live data and automation will attach.

---

## TIER 1 — Revenue Acceleration & Cost Elimination

*High impact, directly tied to Joe's stated priorities. Target: 60-90 days.*

---

### 1. Personalized BD Dashboards — "Good Morning Mike"

**Joe's Words:** *"Each salesperson will have a dashboard... Good morning Mike... it'll have his clients, emails filtered, a pricing engine, KPIs."*

**What Exists Today:** Pipeline data has `owner` fields; RFQ data attributes deals to reps; BD outreach cards exist but are global, not user-scoped.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **User authentication + role system** | Login with role-based views (CEO, VP Sales, BD Rep, Ops Manager) | Foundation for all personalization |
| **Personal command center** | Greeting banner with name, date, weather at their facility; "Your day at a glance" | Adoption driver |
| **My Clients panel** | Filtered view of assigned accounts with revenue, margin, last contact, contract status | Eliminates manual account tracking |
| **My Pipeline** | Personal funnel with stage movement, expected close dates, probability-weighted revenue | Replaces Insightly per-user views |
| **My Activity feed** | Outbound emails sent, meetings held, quotes generated, proposals pending | Manager visibility without micromanaging |
| **My Pricing Engine** | Pre-scoped to their assigned facilities with "Generate Draft Quote" button | Empowers reps to self-serve first pass |
| **Daily Briefing AI** | AI-generated summary: "You have 3 quotes pending approval, Netflix escalation is in 12 days, Patterson vacancy is at 14%" | Proactive intelligence |

**Cost Elimination:** Replaces per-seat Insightly licenses and ZoomInfo lookups for BD team. Estimated savings: **$80-120K/year.**

**Revenue Impact:** Faster quote turnaround → higher win rate on pipeline. If 22% conversion improves to 26% on $65.8M pipeline, that's **$2.6M incremental revenue.**

---

### 2. Approval Workflow Engine — "Bang, Bang, Bang"

**Joe's Words:** *"Here are the approvals you need. Is it in guidelines or out of guidelines? If it's in guidelines, bang, bang, bang. If it's out of standard, it'll flag that for me."*

**What Exists Today:** Quote statuses (`approved`, `pending`, `in-review`) are display-only badges. No state machine, no assignment, no audit trail. Check run approvals happen via email and "get buried."

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Approval queue** | CEO/VP dashboard widget: pending approvals ranked by urgency, with "Approve / Reject / Request Changes" buttons | Eliminates email burial |
| **Guidelines engine** | Configurable rules: margin floors, rate ceilings, minimum terms, accessorial caps per facility | Auto-approve in-guideline quotes instantly |
| **Out-of-band alerts** | SMS/push notification when out-of-guideline quote or high-priority check run needs attention | Sub-hour response time |
| **Audit trail** | Timestamped approval chain: who submitted, who reviewed, what changed, final approval | Compliance + institutional memory |
| **Check run integration** | AP check runs surface in dashboard with approve/reject; notification to accounting on completion | Cash management velocity |
| **Quote → Pipeline auto-flow** | Approved quote automatically creates/updates pipeline opportunity with value, probability, expected close | Eliminates double-entry |

**Revenue Impact:** Joe mentioned check runs "get buried" — delayed approvals = delayed payments = vendor relationship risk. Faster quote approvals = faster deal close. Estimated **5-10% reduction in sales cycle length.**

---

### 3. Integrated Pricing Engine with Customer-Facing Lead Gen

**Joe's Words:** *"A landing page with a stripped-down calculator to give someone a real-time quote... like a lead gen page."*

**Pete's Request:** *"Can the OTT calculator be available for the customer to log into and get their own quotes through our website?"*

**What Exists Today:** Two working pricing engines (warehouse + LTL) with real formulas. No persistence, no customer-facing version, no lead capture.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Public OTT quote widget** | Embeddable on ontimedelivers.com; stripped-down inputs (origin, dest, weight, class) → instant estimate | Lead generation at scale |
| **Lead capture gate** | "Get your full detailed quote" requires email + company name + phone → feeds pipeline | Inbound lead engine |
| **Quote persistence** | All quotes (internal + external) saved to database with timestamp, rep, customer, facility, status | Historical analytics + forecasting |
| **Quote-to-proposal PDF** | One-click generation of branded proposal document from calculated quote | Professional sales collateral |
| **Competitive rate benchmarking** | Compare generated quote against market rates, historical wins/losses at similar specs | Price optimization intelligence |
| **Pipeline auto-population** | Every generated quote auto-creates pipeline entry: value, stage, probability, assigned rep | Eliminates manual CRM entry |

**Revenue Impact:** Customer-facing calculator creates **inbound lead channel** that currently doesn't exist. Industry benchmarks suggest 3-5% of website quote requests convert. If 100 quotes/month × 4% × $50K avg deal = **$2.4M annual pipeline from new channel.**

---

### 4. SaaS Tool Elimination — $250K Annual Savings

**Joe's Words:** *"We figured out we don't need Insightly, we don't need HubSpot, we don't need NewsFrom, we don't think we need ZoomInfo... close to a quarter million, fully burdened."*

**What to Build to Replace Each Tool:**

| Tool to Eliminate | Annual Cost (Est.) | Replacement Feature | Current Platform Gap |
|---|---|---|---|
| **Insightly CRM** | ~$60-80K | Contact management, deal pipeline, activity tracking, email logging | Need backend persistence, contact entity model, deal stages with drag-drop |
| **ZoomInfo** | ~$60-80K | Company/contact enrichment, org charts, intent data | Integrate free/cheaper APIs (Clearbit, Apollo) + AI web scraping for company intel |
| **HubSpot** | ~$40-60K | Email marketing, sequences, landing pages, analytics | EmailMarketingTab exists with mock data; need Mailchimp/SendGrid integration or custom SMTP |
| **NewsFrom** | ~$20-30K | Industry news monitoring, competitor alerts | Market Intel page exists; add RSS/API feeds from logistics trade publications + AI summarization |

**Implementation Strategy:**
1. **Month 1:** Migrate Insightly contacts and deals into platform database; build CRUD screens
2. **Month 2:** Replace ZoomInfo with AI-powered company research (Perplexity API + web enrichment)
3. **Month 3:** Connect email marketing to SendGrid/Mailchimp API; replace HubSpot sequences
4. **Month 4:** RSS + AI news aggregation replaces NewsFrom

**Net Impact:** **~$250K/year direct cost savings** + elimination of context-switching between 4+ tools.

---

## TIER 2 — Operational Intelligence & Integration

*Structural improvements that multiply the value of Tier 1. Target: 90-180 days.*

---

### 5. Contract & Lease Intelligence Engine

**James's Words (Joe's VP):** *"Dumping every single contract we have for every building... what escalations are coming up... co-terminate tracking... free up Susanna and Jasmine."*

**What Exists Today:** `LeaseInfo` in facility profiles has landlord-facing lease terms. `data.ts` has `lease_exp` dates. No customer contract tracking, no escalation alerts, no document storage.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Contract repository** | Per-facility, per-customer contract records: start, end, rate, escalation schedule, co-termination clauses | Single source of truth |
| **Escalation calendar** | Automated alerts 60/30/15 days before rate escalations, renewals, expirations | Never miss a revenue escalation again |
| **Co-termination tracker** | Visual timeline showing which contracts expire together; risk assessment for facility vacancy | Strategic lease negotiation leverage |
| **Revenue escalation enforcer** | Flag when escalation date passes without rate adjustment applied; track collection status | Directly captures missed revenue |
| **Document attachment** | Upload/link contract PDFs to each record | Audit readiness |

**Revenue Impact:** Netflix escalation "just happened March 1" — how many escalations have been missed or delayed? Even capturing **2-3 previously missed escalations per year** at $50-100K each = **$100-300K recovered revenue.**

**Labor Impact:** Frees Susanna, Jasmine, and Peter Dobby from manual tracking. Estimated **15-20 hours/week** reallocated to higher-value work.

---

### 6. Email Intelligence & Activity Monitoring

**James's Words:** *"If we had San Antonio as an example... for two weeks, no emails came through... Brian's emails, his calendar, who's having meetings with..."*

**What Exists Today:** EmailPulse has rich mock models (volume, sentiment, SLA, facility, department). EmailAnalysis has thread metadata, contact profiles, daily volume. All static.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Gmail/Outlook API integration** | OAuth connection to BD team email accounts; read-only metadata (not content) for volume, recency, contact mapping | Real activity visibility |
| **Calendar sync** | Google/Outlook calendar integration showing meetings per rep, customer meeting frequency | Workload + engagement tracking |
| **Activity scoring** | AI-generated score per rep: email volume + meeting frequency + quote generation + pipeline movement | Performance benchmarking |
| **Dead zone alerts** | Automated flag when a rep or facility goes quiet (no emails, no meetings) for configurable threshold | Early warning on disengagement |
| **Customer engagement heat map** | Which customers are getting attention? Which are being neglected? Cross-referenced with revenue/margin | Prioritization intelligence |

**Privacy Approach:** Metadata only (sender, recipient, timestamp, subject line). No email body content stored. Configurable opt-in per team member.

**Revenue Impact:** Preventing even one "San Antonio situation" where a territory goes dark for two weeks could save a **$500K+ account relationship.**

---

### 7. TMS Integration & Route Intelligence

**Joe's Words:** *"We're going to have the TMS feed right into this dashboard... running simulations on the routing... machine learning on the routing."*

**What Exists Today:** RoutingOptimization page has fleet management, shipment tracking, simulation scenarios, zone performance — all mock data with "Live TMS" badge that's cosmetic.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **TMS API connector** | Real-time feed from TMS (shipment status, POD, driver location, rate confirmations) | Eliminate manual status checking |
| **Route optimization engine** | ML model trained on historical routes: distance, time, fuel cost, driver hours → suggest optimal routing | Fuel + labor cost reduction |
| **Rate confirmation auto-capture** | Carrier rates from TMS auto-populate into cost tracking; compare against quoted rates | Margin monitoring |
| **Delivery performance scoring** | On-time %, damage rate, customer satisfaction by route/driver/carrier | Quality-based carrier selection |
| **Simulation workspace** | "What if" scenarios: add a stop, change sequence, switch carrier → impact on cost/time/margin | Planning intelligence |

**Revenue Impact:** Route optimization typically yields **8-15% fuel cost savings** and **5-10% labor efficiency gains** in logistics operations.

---

### 8. Warehouse Camera AI Integration

**James's Words:** *"If AI can plug into the warehouse cameras, you can help better track damages, labor utilization, efficiency."*

**What Exists Today:** FacilityUtilization page has camera feed placeholders, zone utilization data, AI summaries, hourly heatmaps — all mock.

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Camera feed ingestion** | Connect to existing warehouse IP cameras via RTSP/API | Infrastructure layer |
| **Damage detection AI** | Computer vision model trained on product damage patterns; auto-flag incidents with timestamp + image | Reduce damage claims liability |
| **Labor utilization tracking** | Zone occupancy detection; measure productive time vs. idle time by warehouse area | Labor efficiency optimization |
| **Safety compliance** | Detect PPE violations, forklift near-misses, blocked fire exits | Risk mitigation |
| **Dock door monitoring** | Track truck dwell time at dock doors; identify bottlenecks | Throughput optimization |

**Revenue Impact:** Damage reduction alone could save **$200-500K/year** across 12 facilities. Labor utilization improvements of **10-15%** translate to significant payroll optimization.

---

## TIER 3 — Strategic Multiplication

*Features that create exponential returns as Joe described. Target: 180-365 days.*

---

### 9. Acquisition Integration Playbook

**Joe's Words:** *"When we buy a company, we just have the complete playbook where we can rapidly integrate... we just signed the documents to acquire Go Freight Hub in Miami."*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Company onboarding wizard** | Step-by-step integration checklist: data migration, system setup, team onboarding, customer notification | Reduce integration time from years to months |
| **Template dashboard cloning** | One-click creation of new company dashboard with standard KPIs, adjusted for acquisition's data | Instant operational visibility |
| **Financial integration module** | Merge acquisition P&L into consolidated view; track integration costs vs. synergy realization | ROI tracking on acquisitions |
| **Cross-portfolio analytics** | Compare performance metrics across RK, OTT, Go Freight Hub, future acquisitions | Portfolio-level intelligence |
| **Synergy tracker** | Identify and track cost-saving opportunities post-acquisition: overlapping vendors, shared facilities, headcount | Maximize acquisition ROI |

**Revenue Impact:** Joe's thesis: buy a company at 5x EBITDA, use technology to cut costs 50%, grow EBITDA from $10M to $15M. If the platform **cuts integration time by 50%**, synergy realization accelerates proportionally. On a $50M acquisition, that could mean **$2-5M in accelerated EBITDA improvement.**

---

### 10. Domain Knowledge AI Engine — "Super Being"

**Joe's Words:** *"I had Jason feed all of his human intelligence... it's created like a super being in the life science logistics space."*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Knowledge base ingestion** | Upload SOPs, pricing guides, customer playbooks, market research → indexed by AI | Institutional memory preservation |
| **AI assistant per function** | Finance AI, Sales AI, Operations AI — each trained on domain-specific knowledge | Expert answers on demand |
| **Voice-to-feature pipeline** | Joe's "wake up at 2am with an idea" → voice memo → AI transcribes → creates feature ticket | Zero-friction innovation capture |
| **Cross-company intelligence** | Insights from mint/RK/OTT automatically cross-pollinate where applicable | Portfolio learning effect |
| **Competitive intelligence AI** | Continuously monitor competitor pricing, service offerings, customer reviews, job postings | Market positioning |

**Revenue Impact:** Jason's work on mint "doubled revenue in two weeks." Even a fraction of that applied to RK's $100M+ revenue base = **transformational.**

---

### 11. Predictive Analytics & Forecasting

**Joe's Words:** *"Pipeline report automatically updates the company forecast... $100M pipeline, expected conversion rate 23%, that's $23M in revenue... expected to blend in at this margin."*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Auto-forecast engine** | Pipeline → weighted probability → revenue forecast → margin blend → EBITDA projection | Real-time financial visibility |
| **Scenario modeling** | "What if we win the top 3 deals?" "What if vacancy hits 15%?" → impact on full-year projections | Strategic decision support |
| **Trend detection** | ML on historical data: seasonal patterns, customer churn signals, pricing elasticity | Proactive risk management |
| **Cash flow forecasting** | Combine AR aging + AP schedule + pipeline probability → 13-week cash projection | Liquidity management |
| **Board-ready reporting** | One-click generation of investor/board presentation with current metrics + forecast | Executive time savings |

---

### 12. Unified Communication Hub

**Joe's Words:** *"I'm going to make it so I am dependent on this tool... all the check runs, approvals... I don't have to worry about email."*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **In-platform messaging** | Direct messages between team members within the dashboard | Reduce email dependency |
| **@mentions and threading** | Tag colleagues on deals, quotes, facilities; threaded discussions on any data point | Contextual communication |
| **Notification center** | Unified inbox: approvals, alerts, mentions, deadlines, escalations | Never miss critical items |
| **Mobile companion app** | Push notifications + approval capabilities on mobile | CEO can approve from anywhere |
| **Daily digest email** | AI-generated morning email: "Here's what needs your attention today" for those who prefer email | Bridge to full adoption |

---

### 13. Customer Portal — Revenue Generation

**Pete's Question:** *"Can this be available for the customer to log into... so they can get their own quotes through our website?"*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Customer login portal** | Branded portal where customers see their facilities, inventory, billing, shipment status | Customer self-service |
| **Self-service quoting** | Customers generate their own quotes for additional services, expansions, new lanes | Reduce BD workload |
| **Inventory visibility** | Real-time warehouse inventory counts, receipt/shipment history | Reduce inbound customer service calls |
| **Invoice & payment portal** | View invoices, make payments, dispute charges — all within dashboard | Accelerate AR collection |
| **Customer satisfaction surveys** | Automated post-service surveys → feed into operational scoring | Retention intelligence |

**Revenue Impact:** Customer portals in logistics typically **reduce customer service inquiries by 30-40%** and **accelerate payment collection by 5-10 days** on average.

---

### 14. Cross-Portfolio Command Center

**Joe's Words:** *"Everything I do can be applied both to RK and On Time... and then position us for when we buy additional companies."*

**What to Build:**

| Component | Description | Revenue Impact |
|-----------|-------------|----------------|
| **Portfolio overview** | Single screen: RK, OTT, Go Freight Hub, future acquisitions — all key metrics side by side | CEO-level portfolio management |
| **Shared services dashboard** | Finance, HR, IT metrics across all companies; identify consolidation opportunities | Shared services cost savings |
| **Talent mobility** | View bench strength across all companies; identify internal transfer opportunities | Reduce external recruiting costs |
| **Best practice propagation** | When one company solves a problem, automatically flag relevance for other portfolio companies | Institutional learning |
| **M&A target scoring** | AI-scored acquisition targets based on strategic fit, integration complexity, synergy potential | Smarter deal flow |

---

## Implementation Architecture

### Phase 1 — Foundation (Weeks 1-4)

```
Current State                    Target State
─────────────                    ────────────
Static TS data files      →     PostgreSQL database + Drizzle ORM
No authentication         →     Auth system with role-based access
No API endpoints          →     RESTful API for all data operations
Client-side only          →     Server-side business logic + validation
No persistence            →     Full CRUD with audit logging
```

**Critical Path Items:**
1. Database schema design (users, contacts, deals, quotes, contracts, facilities, approvals)
2. Authentication + authorization (JWT + role-based middleware)
3. API layer (Express routes serving real data)
4. Migration script to seed database from existing static TS data
5. WebSocket setup for real-time notifications

### Phase 2 — Core Features (Weeks 5-12)

| Week | Deliverable |
|------|-------------|
| 5-6 | BD dashboards with user login + personal pipeline views |
| 7-8 | Approval workflow engine (quotes + check runs) |
| 9-10 | Quote persistence + pipeline auto-flow |
| 11-12 | Contract/lease tracking with escalation alerts |

### Phase 3 — Integration (Weeks 13-20)

| Week | Deliverable |
|------|-------------|
| 13-14 | Gmail/Outlook API integration for email intelligence |
| 15-16 | TMS API connector for route/shipment data |
| 17-18 | Customer-facing OTT quote widget on website |
| 19-20 | CRM migration from Insightly (contacts, deals, history) |

### Phase 4 — Intelligence (Weeks 21-30)

| Week | Deliverable |
|------|-------------|
| 21-24 | AI knowledge base + domain-specific assistants |
| 25-28 | Predictive forecasting + scenario modeling |
| 29-30 | Acquisition playbook + portfolio command center |

---

## Financial Impact Summary

| Category | Annual Impact | Confidence |
|----------|--------------|------------|
| **SaaS tool elimination** (Insightly, ZoomInfo, HubSpot, NewsFrom) | $250K savings | High — Joe confirmed |
| **Pipeline conversion improvement** (22% → 26% via faster quoting) | $2.6M revenue | Medium |
| **Inbound lead generation** (customer-facing calculator) | $2.4M pipeline | Medium |
| **Missed escalation recovery** (contract tracking) | $100-300K revenue | High |
| **Labor reallocation** (automation of manual tracking) | $150-200K equivalent | High |
| **Route optimization savings** (fuel + labor efficiency) | $500K-1M savings | Medium |
| **Damage reduction** (camera AI) | $200-500K savings | Medium |
| **Acquisition integration acceleration** | $2-5M EBITDA impact | High — per Joe's model |
| **AR acceleration** (customer portal) | $100-200K cash flow | Medium |

**Conservative total Year 1 impact: $3-5M in combined revenue gain + cost savings**
**Optimistic total Year 1 impact: $8-12M including acquisition synergy acceleration**

---

## Joe's Operating Principles (Embedded in Design)

These principles, articulated during the meeting, should guide every feature decision:

1. **"Subtract, don't add"** — Every new feature should eliminate a process, not create a parallel one. The Tesla Gigafactory approach: fewer steps, tighter loops.

2. **"I want to be dependent on this tool"** — The platform must become the single source of truth. If people still need email/Insightly/spreadsheets, we haven't succeeded.

3. **"Your job function just changed — you're managing robots now"** — Design for delegation to AI, not manual operation. Every workflow should have an "AI can handle this" path.

4. **"Anything you want, we can just build"** — Maintain rapid feature velocity. Voice memo → feature ticket → deployed in days, not months.

5. **"Once you build something, it creates three more opportunities"** — Expect compounding. Build modular features that unlock adjacent capabilities.

6. **"Everything applies to both RK and On Time"** — Multi-tenant from day one. Every feature, every template, every automation must work across portfolio companies.

---

## Immediate Next Steps

1. **Prioritization session** — Joe, James, Pete, David rank the 14 initiatives by urgency
2. **Database schema design** — Architect the unified data model (Users → Companies → Facilities → Customers → Deals → Quotes → Contracts → Approvals)
3. **Auth system** — Implement user login + roles as the foundation for personalized dashboards
4. **Insightly data export** — Pull all contacts, deals, activities for migration planning
5. **TMS API documentation** — Get API specs from current TMS vendor for integration scoping

---

*Document generated from analysis of March 25, 2026 leadership call transcript + comprehensive audit of current RK Dashboard platform codebase.*
