// ═══════════════════════════════════════════════════════
// Competitor Intelligence — Customer/Project/Location Data
// ═══════════════════════════════════════════════════════

export interface CompetitorCustomer {
  customer: string;
  location: string;
  services: string;
  vertical: string;
  year: string;
  contractValue?: string;
  threatLevel: "high" | "medium" | "low"; // threat to RK
}

export interface CompetitorProfile {
  name: string;
  revenue: string;
  totalCustomers: number;
  geoFocus: string;
  keyVerticals: string[];
  recentWins: string;
  customers: CompetitorCustomer[];
  overlapScore: number; // 0-100, how much they overlap with RK's target verticals
}

export const competitorProfiles: CompetitorProfile[] = [
  {
    name: "GXO Logistics",
    revenue: "$13.2B",
    totalCustomers: 1043,
    geoFocus: "US, UK, Europe — 27 countries, 221M sqft",
    keyVerticals: ["Omnichannel Retail", "Technology & Electronics", "Aerospace & Defense", "Industrial Manufacturing"],
    recentWins: "$1B+ new business wins in 2025 (3rd consecutive year). BAE Systems 6-year extension. $774M incremental revenue pipeline for 2026.",
    overlapScore: 72,
    customers: [
      { customer: "Major Semiconductor Mfg", location: "Undisclosed, US", services: "Supply chain management, warehousing", vertical: "Semiconductor", year: "Ongoing", threatLevel: "high" },
      { customer: "BMW Group", location: "Swindon, UK", services: "Warehouse operations", vertical: "Automotive", year: "2025", threatLevel: "medium" },
      { customer: "BAE Systems", location: "Glasgow, UK", services: "Warehousing, materials handling, distribution", vertical: "Aerospace & Defense", year: "2024", threatLevel: "low" },
      { customer: "Pratt & Whitney (RTX)", location: "Multiple US sites", services: "Logistics services", vertical: "Aerospace & Defense", year: "2025", threatLevel: "low" },
      { customer: "Boeing", location: "Dormagen, Germany", services: "Aircraft parts logistics", vertical: "Aerospace & Defense", year: "2025", threatLevel: "low" },
      { customer: "PepsiCo", location: "Romania", services: "EV transportation fleet", vertical: "Consumer Goods", year: "2025", threatLevel: "low" },
    ],
  },
  {
    name: "XPO Inc.",
    revenue: "$8.2B",
    totalCustomers: 500,
    geoFocus: "US (LTL dominant), Europe (contract logistics)",
    keyVerticals: ["Automotive/EV", "Technology/Electronics", "Industrial Manufacturing", "Food & Beverage"],
    recentWins: "MG Motor service parts facility UK (2025). Apple 1M+ sqft fulfillment center Clayton, IN. Arla Foods automated DC (2026).",
    overlapScore: 58,
    customers: [
      { customer: "Apple", location: "Clayton, IN", services: "E-commerce fulfillment, distribution (1M+ sqft)", vertical: "Technology/Electronics", year: "2021", threatLevel: "medium" },
      { customer: "MG Motor", location: "Daventry, UK", services: "Service parts warehousing, 150+ retailer distribution", vertical: "Automotive/EV", year: "2025", threatLevel: "medium" },
      { customer: "SKF", location: "Parçay-Meslay, France", services: "Warehousing (6K sqm), bearing component transport", vertical: "Industrial Manufacturing", year: "Ongoing (20+ yrs)", threatLevel: "low" },
      { customer: "Major Auto OEM", location: "Combs-la-Ville, France", services: "Warehousing, 500-800 pallets/day", vertical: "Automotive/EV", year: "2024", threatLevel: "low" },
      { customer: "Arla Foods", location: "UK", services: "Automated chilled distribution center", vertical: "Food & Beverage", year: "2026", threatLevel: "low" },
      { customer: "Soprema Group", location: "Witham & Hadleigh, UK", services: "FTL, groupage, pallet network", vertical: "Construction", year: "2025", threatLevel: "low" },
    ],
  },
  {
    name: "Ryder System",
    revenue: "$12.7B",
    totalCustomers: 800,
    geoFocus: "North America — US, Canada, Mexico. 800+ locations",
    keyVerticals: ["Automotive (JIT/sequencing)", "Technology/Electronics", "Retail/E-commerce", "Healthcare"],
    recentWins: "Corning Tarboro NC distribution outsource (2026). Cardinal Health acquisition expanding dedicated services (2024). AI-powered warehouse management platform launch.",
    overlapScore: 78,
    customers: [
      { customer: "Corning", location: "Tarboro, NC", services: "Distribution center operations (outsourced from Corning)", vertical: "Technology/Glass", year: "2026", contractValue: "123 jobs transferred", threatLevel: "high" },
      { customer: "General Motors", location: "Lansing, MI", services: "Parts sequencing, JIT delivery, inbound logistics, warehousing", vertical: "Automotive", year: "Ongoing", threatLevel: "medium" },
      { customer: "Toyota", location: "US assembly plants", services: "Automotive logistics, supply chain management", vertical: "Automotive", year: "Ongoing", threatLevel: "medium" },
      { customer: "Honda", location: "US assembly plants", services: "Automotive logistics", vertical: "Automotive", year: "Ongoing", threatLevel: "low" },
      { customer: "Ford", location: "US assembly plants", services: "Automotive logistics, inbound/outbound", vertical: "Automotive", year: "Ongoing", threatLevel: "low" },
      { customer: "Leading Tech Co.", location: "US (1.2M sqft DC)", services: "Reverse logistics, VAS, repairs, parts harvesting", vertical: "Technology/Electronics", year: "Ongoing", threatLevel: "medium" },
      { customer: "DaimlerChrysler", location: "North America", services: "Inbound planning, JIT, integrated logistics centers", vertical: "Automotive", year: "Ongoing", threatLevel: "low" },
    ],
  },
  {
    name: "NFI Industries",
    revenue: "$4.0B",
    totalCustomers: 400,
    geoFocus: "North America — 73M sqft. Strong East Coast, central US, expanding Canada",
    keyVerticals: ["Retail/E-commerce", "Consumer Goods", "Technology", "Manufacturing"],
    recentWins: "Spin Master new Olive Branch MS facility (2024). Lamps Plus Greensboro NC fulfillment (2025). Meta EV fleet pilot East Coast (2025).",
    overlapScore: 45,
    customers: [
      { customer: "Meta", location: "Chesapeake, VA", services: "Dedicated EV transportation pilot", vertical: "Technology", year: "2025", threatLevel: "medium" },
      { customer: "Spin Master", location: "Olive Branch, MS", services: "Warehousing, distribution, drayage", vertical: "Retail/Toys", year: "2024", threatLevel: "low" },
      { customer: "Puma", location: "East Coast, US", services: "Distribution, order fulfillment (AutoStore)", vertical: "Retail/Apparel", year: "Ongoing", threatLevel: "low" },
      { customer: "PMI (Stanley)", location: "US & Canada", services: "Warehousing, drayage, brokerage", vertical: "Consumer Goods", year: "2023", threatLevel: "low" },
      { customer: "Lamps Plus", location: "Greensboro, NC", services: "E-commerce fulfillment", vertical: "Retail/Lighting", year: "2025", threatLevel: "low" },
      { customer: "Lennox International", location: "Nationwide", services: "Warehouse & distribution", vertical: "Manufacturing/HVAC", year: "Ongoing", threatLevel: "low" },
    ],
  },
  {
    name: "CEVA Logistics",
    revenue: "$18.4B",
    totalCustomers: 600,
    geoFocus: "Global — ~90 NA sites. Strongest in TX, CA, IL",
    keyVerticals: ["Automotive/EV/Battery", "Heavy Machinery", "Technology/Electronics", "Healthcare"],
    recentWins: "Caterpillar 'Integrated Logistics Supplier of the Year' (2024-2025). Tesla Semi long-range pilot on US West Coast (2026).",
    overlapScore: 68,
    customers: [
      { customer: "Tesla", location: "US West Coast", services: "Transportation pilot (Tesla Semi), potential warehousing", vertical: "EV/Automotive", year: "2026", threatLevel: "high" },
      { customer: "Caterpillar", location: "Texas & North America", services: "Integrated logistics, contract warehousing (22-year relationship)", vertical: "Heavy Machinery", year: "2003", threatLevel: "low" },
    ],
  },
  {
    name: "DHL Supply Chain",
    revenue: "$20B+ (NA)",
    totalCustomers: 2000,
    geoFocus: "Global — Americas largest segment. CA, Midwest strongest in US",
    keyVerticals: ["Automotive/EV", "Semiconductor", "Electronics", "E-commerce", "Healthcare"],
    recentWins: "ReTurn Network launch (11 NA reverse logistics sites, 2025). Tesla Semi fleet deployment Central CA (2025-26). Robust.AI robotics rollout NA/Mexico.",
    overlapScore: 85,
    customers: [
      { customer: "Tesla", location: "Central California", services: "Transportation management with Tesla Semi fleet", vertical: "EV/Automotive", year: "2025", threatLevel: "high" },
      { customer: "LG", location: "North America", services: "White glove delivery, 2-man handling for electronics/appliances", vertical: "Electronics", year: "Ongoing", threatLevel: "medium" },
      { customer: "EV Battery Manufacturer", location: "US (near fab sites)", services: "Bonded warehousing for EV batteries", vertical: "Battery/EV", year: "Ongoing", threatLevel: "high" },
      { customer: "Semiconductor Cos (Intel/TSMC clients)", location: "Arizona & Ohio fabs", services: "Warehousing, distribution, fab construction logistics", vertical: "Semiconductor", year: "Ongoing", threatLevel: "high" },
      { customer: "Auto-Mobility Clients", location: "North America", services: "Manufacturing support, components warehousing/transport", vertical: "Automotive", year: "Ongoing", threatLevel: "medium" },
      { customer: "Various Retailers/Tech", location: "11 ReTurn sites, NA", services: "Reverse logistics, returns processing", vertical: "E-commerce/Tech", year: "2025", threatLevel: "low" },
    ],
  },
  {
    name: "Hub Group",
    revenue: "$3.8B",
    totalCustomers: 350,
    geoFocus: "North America — 35+ fulfillment centers. Key states: CA, OH, AR",
    keyVerticals: ["Automotive/EV", "Retail", "Consumer Products", "Semiconductor/Comms"],
    recentWins: "Essendant 3-year managed delivery partnership (Nov 2025). Marten Intermodal acquisition adding customer contracts (2025). Strong Dedicated/Logistics pipeline.",
    overlapScore: 52,
    customers: [
      { customer: "Essendant", location: "Nationwide US", services: "Managed delivery, truckload/LTL/final mile", vertical: "Wholesale Distribution", year: "2025", threatLevel: "low" },
      { customer: "Automotive OEMs (undisclosed)", location: "Various NA manufacturing sites", services: "Warehousing, dedicated trucking, JIT delivery", vertical: "Automotive/EV", year: "Ongoing", threatLevel: "medium" },
      { customer: "Leading Auto Manufacturer", location: "Undisclosed", services: "Multimodal logistics, supply chain scaling", vertical: "Automotive", year: "Ongoing", threatLevel: "medium" },
    ],
  },
  {
    name: "Radiant Logistics",
    revenue: "$903M",
    totalCustomers: 200,
    geoFocus: "North America — 100+ locations, 1.9M sqft. Key: FL, TX, WA, CA",
    keyVerticals: ["Electronics/High-Tech", "Automotive", "Consumer Goods", "Government/Military"],
    recentWins: "5-year USAID/BHA global transportation contract for humanitarian/disaster response (Aug 2024). Foundation Logistics Humble TX acquisition. Weport Mexico City expansion.",
    overlapScore: 40,
    customers: [
      { customer: "USAID/BHA", location: "Global (managed from US)", services: "Global transportation, disaster response logistics", vertical: "Government", year: "2024", contractValue: "5-year contract", threatLevel: "low" },
      { customer: "Electronics Manufacturers", location: "WA, CA, TX", services: "Warehousing, customs brokerage, freight forwarding", vertical: "Electronics/High-Tech", year: "Ongoing", threatLevel: "medium" },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// Aggregate stats
// ═══════════════════════════════════════════════════════

export const competitorIntelKPIs = {
  totalCompetitorsTracked: 8,
  highThreatRelationships: 7,
  overlappingVerticals: ["Semiconductor", "EV/Automotive", "Battery", "Electronics", "Technology"],
  competitorsByCASemiPresence: ["DHL Supply Chain", "GXO Logistics", "CEVA Logistics", "Ryder System"],
};

// Map of RK target accounts to which competitors are also pursuing them
export const accountOverlap: Record<string, { competitors: string[]; riskNote: string }> = {
  "Tesla": {
    competitors: ["CEVA Logistics", "DHL Supply Chain"],
    riskNote: "Both CEVA and DHL have active Tesla relationships — CEVA running Tesla Semi pilots on West Coast, DHL deploying Tesla Semi fleet in Central CA. RK's Tesla margin crisis (-50.4%) makes this a vulnerable account.",
  },
  "Corning": {
    competitors: ["Ryder System"],
    riskNote: "Corning just outsourced Tarboro NC distribution to Ryder (April 2026, 123 jobs transferred). Ryder is now the incumbent for Corning's logistics. RK pursuing Tempe AZ Corning deal ($4M pipeline) — different geography but same customer.",
  },
  "Semiconductor (LAM/KLA)": {
    competitors: ["GXO Logistics", "DHL Supply Chain"],
    riskNote: "GXO services a major semiconductor manufacturer (unnamed). DHL provides warehousing/distribution for semiconductor companies near AZ & OH fabs. RK's LAM and KLA relationships are core revenue — must protect.",
  },
  "Lucid Motors": {
    competitors: ["DHL Supply Chain"],
    riskNote: "DHL has deep auto-mobility and EV logistics capabilities. As Lucid scales AZ manufacturing (500K sqft pipeline for RK), DHL could compete for inbound sequencing work.",
  },
  "Panasonic": {
    competitors: ["DHL Supply Chain", "CEVA Logistics"],
    riskNote: "Both DHL and CEVA serve EV battery manufacturers. Panasonic's So Cal/Savannah GA DC ops ($7.4M RK pipeline) could attract large-scale 3PL bids from these global players.",
  },
};

// Vertical threat matrix — which competitors are strongest in RK's target verticals
export const verticalThreatMatrix: { vertical: string; competitors: { name: string; strength: "dominant" | "strong" | "moderate" | "emerging" }[] }[] = [
  {
    vertical: "Semiconductor / AI",
    competitors: [
      { name: "DHL Supply Chain", strength: "dominant" },
      { name: "GXO Logistics", strength: "strong" },
      { name: "Ryder System", strength: "moderate" },
      { name: "Hub Group", strength: "emerging" },
    ],
  },
  {
    vertical: "EV / Automotive",
    competitors: [
      { name: "Ryder System", strength: "dominant" },
      { name: "DHL Supply Chain", strength: "strong" },
      { name: "CEVA Logistics", strength: "strong" },
      { name: "XPO Inc.", strength: "moderate" },
      { name: "Hub Group", strength: "moderate" },
    ],
  },
  {
    vertical: "Battery / Energy Storage",
    competitors: [
      { name: "DHL Supply Chain", strength: "dominant" },
      { name: "CEVA Logistics", strength: "strong" },
      { name: "GXO Logistics", strength: "moderate" },
    ],
  },
  {
    vertical: "Electronics / Technology",
    competitors: [
      { name: "DHL Supply Chain", strength: "dominant" },
      { name: "GXO Logistics", strength: "strong" },
      { name: "XPO Inc.", strength: "strong" },
      { name: "Ryder System", strength: "strong" },
      { name: "Radiant Logistics", strength: "moderate" },
      { name: "NFI Industries", strength: "moderate" },
    ],
  },
  {
    vertical: "Glass / Advanced Materials",
    competitors: [
      { name: "Ryder System", strength: "strong" },
    ],
  },
];

// Geographic competition — where competitors have strong presence near RK facilities
export const geoCompetition: { region: string; rkPresence: string; competitorsPresent: { name: string; footprint: string }[] }[] = [
  {
    region: "Bay Area / Fremont, CA",
    rkPresence: "HQ + 5 facilities (Christy, Mowry, Morton, Industrial, Hayman)",
    competitorsPresent: [
      { name: "DHL Supply Chain", footprint: "Multiple CA sites" },
      { name: "CEVA Logistics", footprint: "Strong CA presence (~90 NA sites)" },
      { name: "Radiant Logistics", footprint: "CA operations" },
    ],
  },
  {
    region: "Arizona (Phoenix/Tempe)",
    rkPresence: "Hardy facility + Lucid/Corning pipeline",
    competitorsPresent: [
      { name: "DHL Supply Chain", footprint: "AZ fab logistics for semiconductor companies" },
      { name: "Ryder System", footprint: "800+ locations nationally, AZ operations" },
    ],
  },
  {
    region: "Texas (Kyle/Austin)",
    rkPresence: "Vista Ridge facility — 208K sqft",
    competitorsPresent: [
      { name: "CEVA Logistics", footprint: "Strongest TX presence" },
      { name: "NFI Industries", footprint: "Expanding central/southern US" },
      { name: "Hub Group", footprint: "AR/central US operations" },
    ],
  },
  {
    region: "Michigan (Whitmore Lake)",
    rkPresence: "Whitmore Lake — 52.8K sqft",
    competitorsPresent: [
      { name: "Ryder System", footprint: "Lansing MI (GM operations)" },
      { name: "Hub Group", footprint: "OH/Midwest fulfillment" },
    ],
  },
];
