// ═══════════════════════════════════════════════════════
// RK Logistics CEO Dashboard — All Data
// ═══════════════════════════════════════════════════════

export const kpis = {
  combined: {
    revenue_fy2025: "$105.4M",
    ebitda_fy2025: "$15.8M",
    ebitda_margin: "15.0%",
    gross_margin: "35.6%",
    net_income: "$2.7M",
    jan26_revenue: "$9.1M",
    jan26_ebitda: "$1.5M",
    jan26_ebitda_margin: "16.3%",
    jan26_gross_margin: "38.5%",
    yoy_rev_growth: "6.5%",
  },
  rk_logistics: {
    revenue_fy2025: "$88.2M",
    ebitda_fy2025: "$11.6M",
    ebitda_margin: "13.2%",
    gross_margin: "31.1%",
    net_income: "$2.2M",
    jan26_revenue: "$7.8M",
    jan26_ebitda: "$1.3M",
    jan26_ebitda_margin: "16.3%",
    jan26_gross_margin: "35.9%",
    yoy_rev_growth: "6.3%",
  },
  ott: {
    revenue_fy2025: "$17.1M",
    ebitda_fy2025: "$4.2M",
    ebitda_margin: "24.3%",
    gross_margin: "58.5%",
    net_income: "$485K",
    jan26_revenue: "$1.3M",
    jan26_ebitda: "$220K",
    jan26_ebitda_margin: "16.6%",
    jan26_gross_margin: "53.6%",
    yoy_rev_growth: "7.3%",
  },
};

export const rkTopCustomers = [
  { name: "LAM Research", jan26_revenue: "$2.85M", pct_total: "31.4%", industry: "Semi / AI", risk: "HIGH", ytd_revenue: "$27.2M", margin: "40.3%", target_margin: "22%", variance: "+18.3%", tier: "Tier 1" },
  { name: "Tesla", jan26_revenue: "$1.73M", pct_total: "19.1%", industry: "Automotive/EV", risk: "MED", ytd_revenue: "$7.2M", margin: "-50.4%", target_margin: "25%", variance: "-75.4%", tier: "Tier 2" },
  { name: "KLA Corporation", jan26_revenue: "$1.62M", pct_total: "17.9%", industry: "Semi / AI", risk: "MED", ytd_revenue: "$7.6M", margin: "-22.4%", target_margin: "25%", variance: "-47.4%", tier: "Tier 2" },
  { name: "Delta Products", jan26_revenue: "$671K", pct_total: "7.4%", industry: "Electronics", risk: "LOW", ytd_revenue: "$1.2M", margin: "-53.4%", target_margin: "30%", variance: "-83.4%", tier: "Tier 3" },
  { name: "American Panel Solutions", jan26_revenue: "$429K", pct_total: "4.7%", industry: "Solar/Energy", risk: "LOW" },
  { name: "Other", jan26_revenue: "$1.77M", pct_total: "19.5%", industry: "Various", risk: "MED" },
];

export const ottTopCarriers = [
  { name: "Saia Inc.", revenue: "$694K", pct_total: "52.4%", type: "Freight/LTL" },
  { name: "TForce Freight", revenue: "$334K", pct_total: "25.2%", type: "Freight/LTL" },
  { name: "Roadrunner Transportation", revenue: "$106K", pct_total: "8.0%", type: "Freight/LTL" },
  { name: "Other", revenue: "$191K", pct_total: "14.4%", type: "Various" },
];

export const pipeline = {
  total_value: "$65.8M",
  stages: [
    { name: "Define Scope", value: 15, label: "$15M" },
    { name: "Preparing Quote", value: 7, label: "$7M" },
    { name: "Quote Follow-up", value: 24, label: "$24M" },
    { name: "Negotiation", value: 20, label: "$20M" },
  ],
  conversion_rate: "~22%",
  big9_opportunities: [
    { account: "Tesla Service", location: "San Bernardino, CA", description: "320K sqft high volume service parts distribution", est_rev: "$8M", next_steps: "Decision Q2 2026 due to focus on AZ", status: "In Progress" },
    { account: "KLA", location: "NJ", description: "Warehouse & Handle newly MFG systems", est_rev: "TBD", next_steps: "Exploring scope", status: "Early Stage" },
    { account: "KLA", location: "Fremont", description: "Campus MFG Support. 60 headcount & FTZ", est_rev: "TBD", next_steps: "Process mapping has begun", status: "In Progress" },
    { account: "KLA", location: "Bonded Trans", description: "Dedicated Bonded fleet", est_rev: "$2M", next_steps: "WON - Contracting", status: "Won" },
    { account: "LAM", location: "AZ", description: "Service Parts", est_rev: "$8M", next_steps: "AWARDED - Contracting", status: "Won" },
    { account: "Tesla", location: "TBD", description: "Samsung Chip Storage", est_rev: "TBD", next_steps: "RFI Completed. RK a finalist", status: "In Progress" },
    { account: "Panasonic", location: "So Cal/Savannah GA", description: "DC Ops in So Cal/Savannah GA", est_rev: "$7.4M", next_steps: "RFP Response submitted 3/6", status: "In Progress" },
    { account: "Corning", location: "Tempe AZ", description: "Shuttle Trans + Warehouse Expansion", est_rev: "$4M", next_steps: "Pending Customer Feedback", status: "In Progress" },
    { account: "Lucid", location: "Tempe AZ", description: "IB Sequencing to Manufacturing - 500K sqft", est_rev: "$9M", next_steps: "Facility selection and solution design", status: "In Progress" },
  ],
  high_prob_near_term: [
    { company: "Franklin", site: "Patterson Pass", sqft: "15,000", annual_rev: "$0.5M", close: "Mar", start: "Apr", status: "Contracting" },
    { company: "KLA - Bonded Trans", site: "Christy", sqft: "—", annual_rev: "$2M", close: "Apr", start: "May", status: "SOW Development" },
    { company: "Dimerco", site: "Trans", sqft: "—", annual_rev: "$1M", close: "Apr", start: "May", status: "SOW Development" },
    { company: "LAM", site: "Goodyear AZ", sqft: "270,000", annual_rev: "$8M", close: "March", start: "May/June", status: "SOW Development" },
    { company: "Panasonic", site: "Patterson Pass", sqft: "60,000", annual_rev: "$2M", close: "Mar", start: "March", status: "CLOSED WON" },
  ],
  strategic_total: "$36.4M",
};

export const facilities = [
  { name: "Christy", location: "41707 Christy, Fremont, CA", sqft: 190080, vacancy_pct: 0, lease_exp: "2028-12-31", months_to_exp: 33 },
  { name: "Hawthorne", location: "7600 Hawthorne Ave, Livermore, CA", sqft: 75451, vacancy_pct: 0, lease_exp: "2027-02-28", months_to_exp: 11 },
  { name: "Mowry", location: "6753 Mowry Ave, Newark, CA", sqft: 268538, vacancy_pct: 0, lease_exp: "2031-05-31", months_to_exp: 62 },
  { name: "Vista Ridge", location: "400 Vista Ridge Dr, Kyle, TX", sqft: 208010, vacancy_pct: 0, lease_exp: "2028-10-31", months_to_exp: 31 },
  { name: "Hardy", location: "Phoenix, AZ", sqft: 157992, vacancy_pct: 0, lease_exp: "2028-02-01", months_to_exp: 23 },
  { name: "Morton", location: "7375 Morton Ave, Newark, CA", sqft: 141275, vacancy_pct: 0, lease_exp: "2026-09-30", months_to_exp: 6 },
  { name: "Industrial", location: "44951/31 Industrial, Fremont, CA", sqft: 14000, vacancy_pct: 13.9, lease_exp: "2026-09-30", months_to_exp: 6 },
  { name: "Whitmore Lake", location: "9257 East M-36 Whitmore Lake, MI", sqft: 52800, vacancy_pct: 14.4, lease_exp: "2027-09-30", months_to_exp: 18 },
  { name: "Hayman", location: "31775 Hayman St, Hayward, CA", sqft: 75328, vacancy_pct: 26.3, lease_exp: "2027-06-30", months_to_exp: 15 },
  { name: "Grand", location: "Grand", sqft: 85000, vacancy_pct: 30.9, lease_exp: "2027-12-31", months_to_exp: 21 },
  { name: "Patterson", location: "7150 Patterson Pass, Livermore, CA", sqft: 181458, vacancy_pct: 38.1, lease_exp: "2027-09-30", months_to_exp: 18 },
  { name: "Kato", location: "47020 Kato Rd, Fremont, CA", sqft: 209748, vacancy_pct: 72.0, lease_exp: "2031-05-31", months_to_exp: 62 },
];

export const facilitySummary = {
  total_sqft: 1659680,
  overall_vacancy: "16.0%",
  total_vacancy_sqft: 265248,
  non_billable_sqft: 38563,
  vacancy_trend: "Overall vacancy increased ~7.3K sqft week-over-week",
  notes: [
    "Kato at 72% vacancy - critical issue, 62 months remaining on lease",
    "Patterson at 38.1% - decrease of ~3.5K sqft in Delta",
    "Grand at 30.9% - increase of 4K sqft in Tesla",
    "Hayman at 26.3% - increase of ~11.5K sqft (Tesla Glass 10K sqft)",
    "Whitmore Lake - decrease of 5K sqft vacancy (Tesla Glass)",
  ],
};

export const facilityCustomers: Record<string, string[]> = {
  "Christy": ["KLA"],
  "Hawthorne": ["LAM Research"],
  "Mowry": ["LAM Research"],
  "Vista Ridge": ["Tesla"],
  "Hardy": ["Corning"],
  "Morton": ["KLA", "Delta", "Lucid"],
  "Industrial": ["Amazon"],
  "Whitmore Lake": ["Tesla"],
  "Hayman": ["Tesla"],
  "Patterson": ["LAM Research", "Delta", "Panasonic"],
  "Kato": ["Tesla", "Delta", "Wisk"],
  "Grand": ["Tesla"],
};

export const facilityCoordinates = [
  { name: "Christy", lat: 37.5100, lng: -121.9500, state: "CA" },
  { name: "Hawthorne", lat: 37.6816, lng: -121.7680, state: "CA" },
  { name: "Mowry", lat: 37.5225, lng: -122.0400, state: "CA" },
  { name: "Vista Ridge", lat: 29.9883, lng: -97.8611, state: "TX" },
  { name: "Hardy", lat: 33.4484, lng: -112.0740, state: "AZ" },
  { name: "Morton", lat: 37.5190, lng: -122.0380, state: "CA" },
  { name: "Industrial", lat: 37.5050, lng: -121.9600, state: "CA" },
  { name: "Whitmore Lake", lat: 42.4350, lng: -83.7446, state: "MI" },
  { name: "Hayman", lat: 37.6345, lng: -122.0760, state: "CA" },
  { name: "Patterson", lat: 37.7100, lng: -121.7100, state: "CA" },
  { name: "Kato", lat: 37.5000, lng: -121.9650, state: "CA" },
  { name: "Grand", lat: 37.5150, lng: -121.9550, state: "CA" },
];

export const vacancyForecast = [
  { month: "May '25", vacancy_pct: 13.0 },
  { month: "Jun '25", vacancy_pct: 13.0 },
  { month: "Jul '25", vacancy_pct: 13.0 },
  { month: "Aug '25", vacancy_pct: 13.0 },
  { month: "Sep '25", vacancy_pct: 13.0 },
  { month: "Oct '25", vacancy_pct: 13.0 },
  { month: "Nov '25", vacancy_pct: 3.7 },
  { month: "Dec '25", vacancy_pct: 2.9 },
  { month: "Jan '26", vacancy_pct: 1.6 },
  { month: "Feb '26", vacancy_pct: 15.6 },
  { month: "Mar '26", vacancy_pct: 16.0 },
  { month: "Apr '26", vacancy_pct: 16.0 },
  { month: "May '26", vacancy_pct: 16.0 },
  { month: "Jun '26", vacancy_pct: 16.0 },
  { month: "Jul '26", vacancy_pct: 16.0 },
  { month: "Aug '26", vacancy_pct: 16.0 },
];

export const liquidityChartData = [
  { date: "Jan '25", net_cash: -0.52, is_actual: true },
  { date: "Feb '25", net_cash: -0.98, is_actual: true },
  { date: "Mar '25", net_cash: -0.15, is_actual: true },
  { date: "Apr '25", net_cash: -0.74, is_actual: true },
  { date: "May '25", net_cash: 2.05, is_actual: true },
  { date: "Jun '25", net_cash: 2.15, is_actual: true },
  { date: "Jul '25", net_cash: 3.53, is_actual: true },
  { date: "Aug '25", net_cash: 0.90, is_actual: true },
  { date: "Sep '25", net_cash: 4.69, is_actual: true },
  { date: "Oct '25", net_cash: -1.36, is_actual: true },
  { date: "Nov '25", net_cash: -0.50, is_actual: true },
  { date: "Dec '25", net_cash: 0.84, is_actual: true },
  { date: "Jan '26", net_cash: -0.19, is_actual: true },
  { date: "Feb '26", net_cash: -3.32, is_actual: true },
  { date: "Mar '26", net_cash: -1.69, is_actual: true },
  { date: "Apr '26", net_cash: -1.25, is_actual: false },
  { date: "May '26", net_cash: -0.40, is_actual: false },
  { date: "Jun '26", net_cash: -0.23, is_actual: false },
  { date: "Jul '26", net_cash: 0.98, is_actual: false },
  { date: "Aug '26", net_cash: 2.03, is_actual: false },
  { date: "Sep '26", net_cash: 2.14, is_actual: false },
  { date: "Oct '26", net_cash: 3.15, is_actual: false },
  { date: "Nov '26", net_cash: 4.09, is_actual: false },
  { date: "Dec '26", net_cash: 3.90, is_actual: false },
];

export const liquidity = {
  cash_position_net_abl: "-$1.69M",
  ar: "$6.76M",
  ap: "-$261K",
  net_working_capital: "$6.36M",
  total_debt: "$42.1M",
  abl_balance: "$2.55M",
  abl_availability: "$5.04M",
  abl_limit: "$7.59M",
  abl_utilization: "33.6%",
  ttm_adj_ebitda: "$17.0M",
  valuation_multiple: "8.0x",
  net_enterprise_value: "$98.7M",
  ar_current_pct: "99.8%",
  ar_past_due_11: "$12.3K",
  ar_past_due_30: "$3.2K",
};

export const lbo = {
  entry_ev: "$126.4M",
  entry_multiple: "8.0x EBITDA",
  total_debt: "$86.9M",
  equity_check: "$42.0M",
  base_irr: "37.2%",
  base_moic: "4.86x",
  exit_ev: "$241.6M",
  exit_equity: "$204.1M",
  exit_multiple: "9.0x",
  net_debt_ebitda: "5.5x",
  hold_period: "5 years",
};

// ═══════════════════════════════════════════════════════
// LBO Detailed Model Data
// ═══════════════════════════════════════════════════════

export const lboSourcesAndUses = {
  sources: [
    { item: "Senior Secured Term Loan", amount: 63.2, pct: 50.0, rate: "8.50%" },
    { item: "Mezzanine Debt", amount: 23.7, pct: 18.8, rate: "11.50%" },
    { item: "Sponsor Equity", amount: 42.0, pct: 33.2, rate: "—" },
  ],
  uses: [
    { item: "Enterprise Value", amount: 126.4, pct: 97.8 },
    { item: "Transaction Fees", amount: 2.5, pct: 1.9 },
    { item: "Working Capital Adj.", amount: 0.3, pct: 0.2 },
  ],
  total: 128.9,
};

export const lboFiveYearProjections = [
  { year: "Year 0", label: "Entry", revenue: 105.4, revenueGrowth: 0, ebitda: 15.8, ebitdaMargin: 15.0, capex: 3.2, fcf: 0, totalDebt: 86.9, netDebtEbitda: 5.5 },
  { year: "Year 1", label: "2026", revenue: 112.8, revenueGrowth: 7.0, ebitda: 18.0, ebitdaMargin: 16.0, capex: 3.4, fcf: 5.9, totalDebt: 81.0, netDebtEbitda: 4.5 },
  { year: "Year 2", label: "2027", revenue: 121.8, revenueGrowth: 8.0, ebitda: 20.7, ebitdaMargin: 17.0, capex: 3.7, fcf: 8.2, totalDebt: 72.8, netDebtEbitda: 3.5 },
  { year: "Year 3", label: "2028", revenue: 131.5, revenueGrowth: 8.0, ebitda: 23.1, ebitdaMargin: 17.5, capex: 3.9, fcf: 10.1, totalDebt: 62.7, netDebtEbitda: 2.7 },
  { year: "Year 4", label: "2029", revenue: 140.7, revenueGrowth: 7.0, ebitda: 25.3, ebitdaMargin: 18.0, capex: 4.2, fcf: 12.0, totalDebt: 50.7, netDebtEbitda: 2.0 },
  { year: "Year 5", label: "2030", revenue: 149.2, revenueGrowth: 6.0, ebitda: 26.8, ebitdaMargin: 18.0, capex: 4.5, fcf: 13.7, totalDebt: 37.0, netDebtEbitda: 1.4 },
];

export const lboDebtSchedule = [
  { year: "Year 0", seniorBalance: 63.2, mezzBalance: 23.7, totalDebt: 86.9, seniorInterest: 0, mezzInterest: 0, totalInterest: 0, mandatoryAmort: 0 },
  { year: "Year 1", seniorBalance: 57.3, mezzBalance: 23.7, totalDebt: 81.0, seniorInterest: 5.4, mezzInterest: 2.7, totalInterest: 8.1, mandatoryAmort: 5.9 },
  { year: "Year 2", seniorBalance: 49.1, mezzBalance: 23.7, totalDebt: 72.8, seniorInterest: 4.9, mezzInterest: 2.7, totalInterest: 7.6, mandatoryAmort: 8.2 },
  { year: "Year 3", seniorBalance: 39.0, mezzBalance: 23.7, totalDebt: 62.7, seniorInterest: 4.2, mezzInterest: 2.7, totalInterest: 6.9, mandatoryAmort: 10.1 },
  { year: "Year 4", seniorBalance: 27.0, mezzBalance: 23.7, totalDebt: 50.7, seniorInterest: 3.3, mezzInterest: 2.7, totalInterest: 6.0, mandatoryAmort: 12.0 },
  { year: "Year 5", seniorBalance: 13.3, mezzBalance: 23.7, totalDebt: 37.0, seniorInterest: 2.3, mezzInterest: 2.7, totalInterest: 5.0, mandatoryAmort: 13.7 },
];

// IRR sensitivity: rows = entry multiple, cols = exit multiple
export const lboSensitivityIRR = {
  entryMultiples: [7.0, 7.5, 8.0, 8.5, 9.0, 10.0],
  exitMultiples: [7.0, 8.0, 9.0, 10.0, 11.0],
  data: [
    [32.5, 38.2, 42.8, 46.7, 50.1],
    [29.1, 34.5, 39.0, 42.8, 46.1],
    [26.2, 31.4, 37.2, 40.0, 43.2],
    [23.7, 28.7, 33.0, 36.8, 40.0],
    [21.5, 26.3, 30.5, 34.2, 37.5],
    [17.8, 22.2, 26.1, 29.5, 32.5],
  ],
};

export const lboSensitivityMOIC = {
  entryMultiples: [7.0, 7.5, 8.0, 8.5, 9.0, 10.0],
  exitMultiples: [7.0, 8.0, 9.0, 10.0, 11.0],
  data: [
    [3.52, 4.32, 5.12, 5.92, 6.72],
    [3.15, 3.91, 4.66, 5.42, 6.17],
    [2.84, 3.56, 4.86, 5.00, 5.71],
    [2.57, 3.26, 3.94, 4.63, 5.31],
    [2.34, 2.99, 3.65, 4.30, 4.96],
    [1.97, 2.55, 3.14, 3.73, 4.31],
  ],
};

export const lboComps = [
  { name: "GXO Logistics", evEbitda: 9.8, evRevenue: 0.72, debtEbitda: 2.1 },
  { name: "XPO Inc.", evEbitda: 8.2, evRevenue: 1.05, debtEbitda: 2.5 },
  { name: "Ryder System", evEbitda: 5.9, evRevenue: 0.88, debtEbitda: 3.2 },
  { name: "Universal Logistics", evEbitda: 7.4, evRevenue: 0.62, debtEbitda: 1.8 },
  { name: "Hub Group", evEbitda: 8.5, evRevenue: 0.55, debtEbitda: 0.9 },
  { name: "Radiant Logistics", evEbitda: 10.1, evRevenue: 0.48, debtEbitda: 1.4 },
  { name: "RXO Inc.", evEbitda: 12.3, evRevenue: 0.68, debtEbitda: 1.6 },
];

// ═══════════════════════════════════════════════════════
// Forecast Model Baseline (for updater)
// ═══════════════════════════════════════════════════════

export const forecastBaseline = {
  // Monthly baseline revenue run-rate ($M)
  rkMonthlyRevenue: 7.8,
  ottMonthlyRevenue: 1.3,
  rkEbitdaMarginPct: 13.2,
  ottEbitdaMarginPct: 24.3,
  // Annual projections baseline
  projections: [
    { year: "FY2026", rkRevenue: 93.6, ottRevenue: 15.6, totalRevenue: 109.2, ebitda: 17.2, ebitdaMargin: 15.8 },
    { year: "FY2027", rkRevenue: 101.1, ottRevenue: 16.8, totalRevenue: 117.9, ebitda: 20.0, ebitdaMargin: 17.0 },
    { year: "FY2028", rkRevenue: 109.2, ottRevenue: 18.1, totalRevenue: 127.3, ebitda: 22.3, ebitdaMargin: 17.5 },
    { year: "FY2029", rkRevenue: 116.8, ottRevenue: 19.4, totalRevenue: 136.2, ebitda: 24.5, ebitdaMargin: 18.0 },
    { year: "FY2030", rkRevenue: 123.8, ottRevenue: 20.6, totalRevenue: 144.4, ebitda: 26.0, ebitdaMargin: 18.0 },
  ],
};

export const customerRanking = [
  { name: "LAM", total_revenue: 27208208, profit: 10970551, margin: 0.403, target_margin: 0.22, tier: "Tier 1", division: "RK" },
  { name: "Tesla", total_revenue: 7235901, profit: -3647128, margin: -0.504, target_margin: 0.25, tier: "Tier 2", division: "RK" },
  { name: "KLA", total_revenue: 7645438, profit: -1715867, margin: -0.224, target_margin: 0.25, tier: "Tier 2", division: "RK" },
  { name: "Delta", total_revenue: 1248409, profit: -666144, margin: -0.534, target_margin: 0.3, tier: "Tier 3", division: "RK" },
  { name: "Lucid", total_revenue: 41712, profit: -297490, margin: -7.13, target_margin: 0.3, tier: "Tier 3", division: "RK" },
  { name: "CATL", total_revenue: 422014, profit: -387994, margin: -0.919, target_margin: 0.3, tier: "Tier 3", division: "RK" },
  { name: "Netflix", total_revenue: 167026, profit: -10165, margin: -0.061, target_margin: 0.35, tier: "Tier 4", division: "RK" },
  { name: "Amazon", total_revenue: 143406, profit: -152804, margin: -1.066, target_margin: 0.35, tier: "Tier 4", division: "RK" },
  { name: "Soundboks", total_revenue: 155473, profit: -160500, margin: -1.032, target_margin: 0.3, tier: "Tier 3", division: "RK" },
  { name: "Lens", total_revenue: 131888, profit: -46519, margin: -0.353, target_margin: 0.3, tier: "Tier 3", division: "RK" },
];

export const ottCustomerRanking = [
  { name: "Saia Inc.", total_revenue: 8328000, profit: 2082000, margin: 0.25, target_margin: 0.20, tier: "Tier 1", division: "OTT" },
  { name: "TForce Freight", total_revenue: 4009200, profit: 1002300, margin: 0.25, target_margin: 0.20, tier: "Tier 1", division: "OTT" },
  { name: "Roadrunner", total_revenue: 1272000, profit: 318000, margin: 0.25, target_margin: 0.20, tier: "Tier 2", division: "OTT" },
  { name: "XPO Logistics", total_revenue: 890000, profit: 222500, margin: 0.25, target_margin: 0.20, tier: "Tier 2", division: "OTT" },
  { name: "FedEx Freight", total_revenue: 650000, profit: 162500, margin: 0.25, target_margin: 0.20, tier: "Tier 3", division: "OTT" },
  { name: "Other Carriers", total_revenue: 1950800, profit: 412700, margin: 0.211, target_margin: 0.20, tier: "Tier 3", division: "OTT" },
];

export const monthlyRevenue = [
  { month: "Aug '25", rk: 7.2, ott: 1.3, total: 8.5 },
  { month: "Sep '25", rk: 7.4, ott: 1.3, total: 8.7 },
  { month: "Oct '25", rk: 7.5, ott: 1.4, total: 8.9 },
  { month: "Nov '25", rk: 7.3, ott: 1.2, total: 8.5 },
  { month: "Dec '25", rk: 7.6, ott: 1.3, total: 8.9 },
  { month: "Jan '26", rk: 7.8, ott: 1.3, total: 9.1 },
];

export const priorityOutreach = [
  { rank: 1, name: "LAM Research", revenue: "$2.85M/mo", pct: "31.4%", margin: "40.3%", tier: "Tier 1", action: "PROTECT & GROW", priority: "High", industry: "Semi / AI", detail: "Star account. Largest revenue contributor with strong margins. Protect relationship, explore AZ service parts expansion ($8M pipeline)." },
  { rank: 2, name: "Tesla", revenue: "$1.73M/mo", pct: "19.1%", margin: "-50.4%", tier: "Tier 2", action: "MARGIN FIX URGENT", priority: "Critical", industry: "Automotive/EV", detail: "Critical margin issue. Massive revenue but deeply unprofitable. Renegotiate pricing structure immediately." },
  { rank: 3, name: "KLA Corporation", revenue: "$1.62M/mo", pct: "17.9%", margin: "-22.4%", tier: "Tier 2", action: "MARGIN FIX + EXPAND", priority: "High", industry: "Semi / AI", detail: "Negative margins need correction. Multiple pipeline opportunities (NJ, Fremont campus, Bonded Trans $2M won). Fix pricing while growing." },
  { rank: 4, name: "Delta Products", revenue: "$671K/mo", pct: "7.4%", margin: "-53.4%", tier: "Tier 3", action: "MARGIN FIX", priority: "High", industry: "Electronics", detail: "Deeply negative margin. Patterson vacancy decreasing 3.5K sqft. Restructure deal terms or evaluate exit." },
  { rank: 5, name: "Panasonic", revenue: "Pipeline", pct: "—", margin: "—", tier: "New", action: "NEW BUSINESS", priority: "Medium", industry: "Energy/Battery", detail: "RFP submitted 3/6 for DC Ops in So Cal/Savannah GA ($7.4M). Patterson Pass deal $2M CLOSED WON." },
  { rank: 6, name: "Lucid", revenue: "Pipeline", pct: "—", margin: "—", tier: "New", action: "NEW BUSINESS", priority: "Medium", industry: "Automotive/EV", detail: "IB Sequencing to Manufacturing in Tempe AZ, 500K sqft ($9M pipeline). Facility selection phase." },
  { rank: 7, name: "Corning", revenue: "Pipeline", pct: "—", margin: "—", tier: "Expand", action: "EXPAND", priority: "Medium", industry: "Glass/Tech", detail: "Shuttle Trans + Warehouse Expansion in Tempe AZ ($4M). Pending customer feedback." },
  { rank: 8, name: "CATL", revenue: "$422K YTD", pct: "<1%", margin: "-91.9%", tier: "Tier 3", action: "MARGIN FIX", priority: "High", industry: "Battery/EV", detail: "Catastrophic margin. Evaluate if account is salvageable. US expansion stalled under regulatory scrutiny." },
  { rank: 9, name: "Foxconn", revenue: "Prospect", pct: "—", margin: "—", tier: "Prospect", action: "DEVELOP", priority: "Low", industry: "Electronics/AI", detail: "AI server manufacturing growth driving logistics needs. Ingrasys San Jose facility. Explore warehousing opportunity." },
];

export const ottCarrierOutreach = [
  { name: "Saia Inc.", revenue: "$694K", pct: "52.4%", type: "Freight/LTL", detail: "Largest OTT carrier. Q1 LTL metrics mixed but strong contractual renewals 6.6%. Next earnings Apr 24." },
  { name: "TForce Freight", revenue: "$334K", pct: "25.2%", type: "Freight/LTL", detail: "Parent TFI International trading at $102. Ongoing network optimization." },
  { name: "Roadrunner", revenue: "$106K", pct: "8.0%", type: "Freight/LTL", detail: "2026 'Year of the Driver'. AI-powered P&D platform. Phoenix and So Cal service centers." },
];

export const customerNews = [
  {
    entity: "KLA Corporation",
    headline: "KLA Hosts Investor Day; Announces $7 Billion Share Repurchase Program and 21% Increase to Quarterly Dividend",
    developments: "On March 12, 2026, KLA announced a new $7B share repurchase authorization, 21% dividend increase to $2.30/share (17th consecutive annual raise), and introduced 2030 Target Model during Investor Day.",
    logistics: "No specific logistics, warehousing, or supply chain developments for KLA reported in March 2026. General semi supply chain faces potential helium shortages from Qatar shutdown.",
    facility: "No new facility expansions or closures in CA, AZ, or US in last 30 days. Existing sites in Chandler/Phoenix AZ and Milpitas/Hayward/San Diego CA.",
    financial: "Pre-market Mar 16: $1,418.64 (+0.64%). Q2 FY2026: Revenue $3.30B, Net Income $1.15B, EPS $8.68. Next earnings Apr 29, 2026.",
    sources: "KLA IR, PR Newswire, Yahoo Finance",
  },
  {
    entity: "CATL",
    headline: "CATL beats Q4 profit estimates with 57.1% YoY growth amid China market share at 49.1% in Feb 2026",
    developments: "No major corporate announcements specific to USA operations in last 30 days. US partnerships stalled under regulatory scrutiny; focus on Europe/Asia expansions.",
    logistics: "No USA-specific developments; global partnership with Maersk for ocean/air freight, warehousing, supply chain resilience.",
    facility: "No expansions or closures in California, Arizona, or US generally. Stalled US plans due to scrutiny.",
    financial: "Q4 2025: Revenue CNY 140.6B, Net Income CNY 23.2B (+57.1% YoY). Stock (300750.SZ): CNY 408.40 (+2.87%).",
    sources: "Reuters, Asia Times, CnEVPost",
  },
  {
    entity: "Corning",
    headline: "Corning outsources NC distribution to Ryder; multiyear $6B deal with Meta for data center optical connectivity",
    developments: "Outsourcing Tarboro, NC distribution center to Ryder (123 layoffs). Multiyear $6B deal with Meta for data center optical connectivity, expanding NC manufacturing.",
    logistics: "No major logistics/supply chain developments specific to Arizona in recent period. Ongoing solar supply chain push via AZ facility.",
    facility: "Tarboro, NC distribution facility closing/outsourced to Ryder (April 2026). Capacity expansion in Hickory, NC for Meta deal. No changes in AZ/CA.",
    financial: "GLW pre-market: $129.12 (-0.50%), mkt cap $111B, P/E 70.56. Strong 2025 Optical Communications growth (+35% to $6.3B).",
    sources: "Business Journals, Corning.com, Yahoo Finance",
  },
  {
    entity: "Lucid Motors",
    headline: "Lucid held Investor Day on March 12 outlining path to profitability, midsize platform, robotaxi partnerships",
    developments: "12% US workforce reduction (~319 in CA HQ) announced Feb 20, effective April; no impact on AZ manufacturing. Focus on midsize production start.",
    logistics: "Ongoing supply chain disruptions/tariffs cited for slower 2026 production growth (25-27k vehicles vs 18k in 2025).",
    facility: "No new expansions/closures in last 30 days in CA/AZ/US; AZ AMP-1 ongoing for Gravity/midsize.",
    financial: "Pre-market Mar 16: $9.90 (+0.61%), mkt cap $3.24B. Q4 2025: rev $523M, net loss $814M, cash $998M.",
    sources: "LA Times, Reuters, CleanTechnica",
  },
  {
    entity: "Foxconn Ingrasys",
    headline: "Foxconn forecasts strong revenue growth for 2026 driven by AI servers; commits to 5-year sustainability roadmap",
    developments: "No major corporate announcements in the last 30 days. Sustainability roadmap announced March 3 and Q4 profit report with full-year 2026 outlook on March 16.",
    logistics: "Ingrasys employs smart warehousing with WMS and AGVs for JIT supply. US expansions in Houston, Louisville strengthen domestic supply chains.",
    facility: "Louisville KY plant opening Q3 2026; Houston TX Ingrasys facility ramping. Existing US sites in San Jose CA, Mt Pleasant WI.",
    financial: "Revenue up 22% YoY through early 2026 driven by servers. Foxconn Tech (2354.TW) at TWD 55 (+2.42%).",
    sources: "Hon Hai, Reuters, DCD, Ingrasys",
  },
  {
    entity: "TForce Freight",
    headline: "No major announcements in last 30 days; general market shows improving demand",
    developments: "No significant corporate developments found in recent searches across multiple news sources.",
    logistics: "General market shows improving demand and higher rates per KCH Transportation March update.",
    facility: "No recent facility expansions or closures announced in California, Arizona, or US.",
    financial: "Parent TFI International (TFII) trading at pre-market $102.04 (-0.89%), market cap $8.4B.",
    sources: "Trucking Info, KCH Transportation, ACT Expo",
  },
  {
    entity: "Delta Electronics",
    headline: "Delta Electronics Philippines partners with Danao City for EV charging infrastructure (Feb 2026)",
    developments: "Partnership with Danao City Government deploying EV chargers in Cebu Province. No major US corporate announcements.",
    logistics: "Ongoing efforts include localized low-carbon supply chains and digital tools. Delta exhibiting at MODEX 2026.",
    facility: "No facility expansions or closures reported in California, Arizona, or US in last 30 days.",
    financial: "Stock closed at 1,360 TWD (-1.81%). Feb 2026 revenue record NT$49.9B (+31% YoY).",
    sources: "PR Newswire, OEM Update, Delta Press",
  },
  {
    entity: "Tesla",
    headline: "Giga Texas site expansion ongoing with Cybercab testing (Mar 16)",
    developments: "No major corporate announcements in the last 30 days. Ongoing construction at Giga Texas including new test track.",
    logistics: "Tesla tops 2026 Lead the Charge Auto Supply Chain Leaderboard for second year. Brookshire TX Megafactory includes 600K sq ft warehousing.",
    facility: "Giga Texas expansion progressing. Fremont CA: Leased 108K + 267K sqft near factory for AI/Optimus. Considering AZ, NY, Idaho for solar.",
    financial: "TSLA pre-market: $391.20 (-0.96%), mkt cap $1.47T. Analysts halved 2026 delivery growth forecast to 3.8%.",
    sources: "Tesla IR, Reuters, Teslarati",
  },
  {
    entity: "Roadrunner Transportation",
    headline: "No major corporate announcements; declared 2026 'Year of the Driver'",
    developments: "Company declared 2026 'Year of the Driver' in Jan 2026 GRI announcement. Named 2026 Best Place to Work by Built In for second year.",
    logistics: "Ongoing network expansions with focus on AI-powered P&D platform reducing missed pickups.",
    facility: "Existing facilities in Phoenix, AZ and Southern CA. No recent expansions or closures.",
    financial: "RRTS closed at $2.56 on Mar 13, 2026 (-4.19%, market cap ~$98M).",
    sources: "Transport Topics, Roadrunner Freight",
  },
  {
    entity: "Saia Inc.",
    headline: "Saia Provides January and February 2026 LTL Operating Data Showing Mixed Volume Trends",
    developments: "Q1-to-date LTL metrics: shipments per workday down 0.9% YoY, tonnage down 4.8% YoY; contractual renewals strong at 6.6% and 5.9%.",
    logistics: "Network efficiency improvements ongoing. No major logistics developments in last 30 days.",
    facility: "No new facility expansions or closures announced in last 30 days in CA, AZ, or US.",
    financial: "SAIA price $321 (+1.66%), market cap $8.56B, P/E 33.68. Q4 2025: revenue $790M. Next earnings April 24.",
    sources: "GlobeNewswire, Yahoo Finance",
  },
  {
    entity: "LAM Research",
    headline: "Lam Research announces leadership transitions effective Mar 6 for AI velocity; analysts see 25% upside",
    developments: "Leadership changes announced Feb 3 (effective Mar 6). Q2 FY26 record revenue $5.34B (+22% YoY), EPS beat. New Boise office opened Feb 17.",
    logistics: "Supply-constrained wafer fab equipment cycle noted; scaling manufacturing capacity in AZ/Malaysia amid cleanroom bottlenecks.",
    facility: "New 9,200 sq ft office Boise ID. Acquired 147K sq ft office North Phoenix AZ ($45.8M) near TSMC.",
    financial: "Pre-market Mar 16: $212.20 (+1.29%), mkt cap $265B. Q3 FY26 guidance $5.7B revenue.",
    sources: "Lam Newsroom, GuruFocus, Seeking Alpha",
  },
  {
    entity: "Panasonic",
    headline: "No major announcements in last 30 days; global parent reports potential 12K layoffs",
    developments: "Global restructuring including ~12,000 layoffs reported late Feb 2026, shifting NA/EU TV sales to Skyworth April 2026.",
    logistics: "Ongoing US/Mexico bonded warehousing, VMI services for maquiladoras. Battery supply chain via NV/KS Gigafactories.",
    facility: "KS De Soto battery plant mass production July 2025 (32 GWh, 4K jobs); NV Sparks operational. No 2026 changes for CA/AZ.",
    financial: "Parent stock ~¥2,400 (Mar 2026), up ~48% YoY. FY26 profit forecast cut to ¥320B.",
    sources: "na.panasonic.com, Reuters, Yahoo Finance",
  },
];

export const industryEvents = [
  { event: "Mid-America Trucking Show (MATS)", date: "March 26-28, 2026", location: "Louisville, KY", relevance: "Major trucking conference — OTT carriers, fleet partnerships" },
  { event: "MODEX 2026", date: "April 13-16, 2026", location: "Atlanta, GA", relevance: "Largest supply chain/manufacturing event — warehousing, automation" },
  { event: "ACT Expo", date: "May 4-7, 2026", location: "Las Vegas, NV", relevance: "Advanced clean transportation — EV logistics, fleet electrification" },
  { event: "Saia Q1 Earnings", date: "April 24, 2026", location: "—", relevance: "Key OTT carrier financial update" },
  { event: "KLA Q3 FY2026 Earnings", date: "April 29, 2026", location: "—", relevance: "Major customer financial update — expansion plans" },
];

export const upcomingHolidays = [
  { holiday: "Good Friday", date: "April 3, 2026", impact: "NYSE/Nasdaq closed. Potential manufacturing shutdowns (auto, semi). Reduced logistics capacity." },
  { holiday: "Memorial Day", date: "May 25, 2026", impact: "95% businesses closed. Major logistics slowdown. Plan ahead for capacity." },
  { holiday: "Independence Day (observed)", date: "July 3, 2026", impact: "Federal holiday. Reduced freight capacity. Extended weekend planning needed." },
  { holiday: "Labor Day", date: "September 7, 2026", impact: "End of summer. Freight surge before and after. Carrier capacity tight." },
];

export const technologyInitiatives = [
  {
    category: "WMS & Automation",
    items: [
      { name: "WMS Platform Upgrade", status: "In Progress", progress: 65, description: "Migration to cloud-native WMS for real-time inventory visibility across all 12 facilities", priority: "High" },
      { name: "AGV Integration — Christy", status: "Planning", progress: 15, description: "Automated Guided Vehicle deployment for LAM Research high-volume operations", priority: "Medium" },
      { name: "Barcode/RFID Modernization", status: "In Progress", progress: 80, description: "Upgrading scanning infrastructure across CA facilities for sub-second cycle counts", priority: "High" },
    ],
  },
  {
    category: "AI & Analytics",
    items: [
      { name: "Demand Forecasting Model", status: "Active", progress: 90, description: "ML-based demand prediction for top 5 customers to optimize labor scheduling", priority: "High" },
      { name: "Route Optimization — OTT", status: "In Progress", progress: 45, description: "AI-powered route planning for OnTime Trucking fleet reducing empty miles", priority: "Medium" },
      { name: "CEO Intelligence Dashboard", status: "Active", progress: 100, description: "Real-time KPI dashboard with customer intel, pipeline tracking, and facility monitoring", priority: "High" },
    ],
  },
  {
    category: "IT Infrastructure",
    items: [
      { name: "Cybersecurity Audit", status: "Completed", progress: 100, description: "Annual SOC 2 Type II audit completed. Zero critical findings.", priority: "High" },
      { name: "Network Redundancy", status: "In Progress", progress: 55, description: "Dual ISP failover for all facilities to ensure 99.99% uptime", priority: "Medium" },
      { name: "ERP Integration", status: "Planning", progress: 10, description: "Unified ERP platform connecting warehousing, transportation, and financial systems", priority: "Low" },
    ],
  },
];

export const marketingData = {
  brandMetrics: [
    { metric: "Website Traffic", value: "12.4K", change: "+18%", period: "Monthly visitors (Feb '26)" },
    { metric: "LinkedIn Followers", value: "3,850", change: "+12%", period: "Company page followers" },
    { metric: "RFP Inbound Rate", value: "4.2/mo", change: "+40%", period: "Avg inbound RFPs (Q1 '26)" },
    { metric: "Client NPS Score", value: "72", change: "+5pts", period: "Net Promoter Score (Jan survey)" },
  ],
  conferencePresence: [
    { event: "MODEX 2026", date: "Apr 13-16", location: "Atlanta, GA", status: "Registered", budget: "$18K" },
    { event: "MATS 2026", date: "Mar 26-28", location: "Louisville, KY", status: "Attending", budget: "$8K" },
    { event: "ACT Expo", date: "May 4-7", location: "Las Vegas, NV", status: "Evaluating", budget: "$12K" },
    { event: "ProMat 2027", date: "TBD", location: "Chicago, IL", status: "Planning", budget: "$25K" },
  ],
  digitalPerformance: [
    { channel: "Organic Search", sessions: "6,200", conversion: "3.2%", leads: 198 },
    { channel: "LinkedIn Ads", sessions: "2,800", conversion: "4.1%", leads: 115 },
    { channel: "Email Campaigns", sessions: "1,900", conversion: "5.8%", leads: 110 },
    { channel: "Direct Traffic", sessions: "1,500", conversion: "2.4%", leads: 36 },
  ],
};

// ═══════════════════════════════════════════════════════
// Extended Marketing Data (Head of Marketing View)
// ═══════════════════════════════════════════════════════

export const marketingSocialMedia = {
  rk: {
    linkedin: { followers: 1910, growth: "+8%", posts30d: 4, engagement: "1.2%", topPost: "Phoenix expansion announcement — 2.4K impressions" },
    twitter: { followers: 75, growth: "0%", posts30d: 0, engagement: "N/A", status: "Inactive" },
    youtube: { subscribers: 0, status: "No channel" },
    website: { monthly: "12.4K", blogPages: 385, topContent: "FTZ tariff whitepaper, SPL guides" },
  },
  platforms: [
    { platform: "LinkedIn", rkValue: "1,910", competitorAvg: "~490K", gap: "257x behind avg", priority: "Critical" as const, action: "Increase posting to 3-4x/week, launch employee advocacy program" },
    { platform: "X / Twitter", rkValue: "75 (inactive)", competitorAvg: "~8.5K", gap: "113x behind", priority: "Medium" as const, action: "Reactivate with industry commentary, tariff/FTZ thought leadership" },
    { platform: "YouTube", rkValue: "None", competitorAvg: "~2.5K subs", gap: "No presence", priority: "Low" as const, action: "Create channel with facility tours, customer testimonials" },
    { platform: "Website Traffic", rkValue: "~12.4K/mo", competitorAvg: "~300K/mo", gap: "24x behind", priority: "High" as const, action: "SEO investment, Google Ads, content marketing acceleration" },
  ],
  contentCalendar: [
    { day: "Monday", type: "Industry Insight", topic: "Semiconductor/EV supply chain trends, tariff updates" },
    { day: "Tuesday", type: "Customer Spotlight", topic: "Case study snippets, client wins (anonymized if needed)" },
    { day: "Wednesday", type: "Facility Feature", topic: "Behind-the-scenes at facilities, FTZ capabilities" },
    { day: "Thursday", type: "Thought Leadership", topic: "CEO/leadership perspectives, market commentary" },
    { day: "Friday", type: "Team & Culture", topic: "Employee spotlights, hiring, awards, community" },
  ],
};

export const marketingCompetitors = [
  {
    name: "DHL Supply Chain", tier: "Enterprise", revenue: "$20B+ (NA)", color: "#FFCC00",
    linkedin: "2.21M", twitter: "29.5K", youtube: "~500", web: "61.2M/mo",
    tagline: "#1 in Contract Logistics · Green Logistics of Choice",
    recentMoves: [
      "Named Gartner leader for 11th consecutive year (Mar 2026)",
      "Acquired IDS Fulfillment (May 2025) and SDS Rx (Sep 2025)",
      "Hosts NOW & NEXT Summit (Oct 2025), Tech Conf (Apr 2026)",
      "Trend Radar 7.0 thought leadership report published",
      "Net-zero by 2050 sustainability campaign across all channels",
    ],
    contentStrategy: "Whitepapers, case studies, podcasts via Insights & Trends hub. Heavy event hosting.",
    threatLevel: "Medium" as const,
    strengths: "Global scale, massive brand awareness, sustainability leadership",
    weaknesses: "Premium pricing, bureaucratic, slow to customize for mid-market",
    rkOpportunity: "RK can differentiate on agility, specialization (semi/EV), local expertise vs DHL's one-size-fits-all",
  },
  {
    name: "GXO Logistics", tier: "Enterprise", revenue: "$13.2B", color: "#1E40AF",
    linkedin: "304K", twitter: "3.1K", youtube: "3.2K", web: "365K/mo",
    tagline: "Logistics at full potential",
    recentMoves: [
      "Fortune Most Admired Companies 2026 (Jan 2026)",
      "Enhanced GXO Direct solution launched in US (Jun 2025)",
      "Innovation Tour showcasing automation (Sep 2025)",
      "Manifest Vegas sponsor/panels (Feb 2026)",
      "Heavy automation messaging — Geek+ robotics case studies",
    ],
    contentStrategy: "Whitepapers (A&D logistics), case studies, LinkedIn/YouTube thought leadership. Innovation-forward brand.",
    threatLevel: "High" as const,
    strengths: "Largest pure-play contract logistics, tech/automation narrative, innovation tours",
    weaknesses: "Net margin <1%, Wincanton integration risk, heavy European exposure",
    rkOpportunity: "Counter GXO's automation narrative with RK's niche expertise — semi handling, FTZ, zero-fault tolerance for high-value goods",
  },
  {
    name: "XPO Inc", tier: "Large", revenue: "$8.1B", color: "#1D4ED8",
    linkedin: "622K", twitter: "17K", youtube: "5.3K", web: "734K/mo",
    tagline: "Your freight first",
    recentMoves: [
      "Fortune Most Admired Companies 2026",
      "'Your freight first' brand video campaign (2025)",
      "Monthly LTL data reports — transparent performance marketing",
      "MasterTech 2025 technician competition",
      "Sustainability report 2025 with AI/tech emphasis",
    ],
    contentStrategy: "Resource center with case studies, monthly LTL reports as content marketing. Strong employee recognition content.",
    threatLevel: "Medium" as const,
    strengths: "#2 LTL carrier, AI-driven pricing, strong brand awareness",
    weaknesses: "Pure LTL focus limits cross-sell, capital intensive",
    rkOpportunity: "XPO is LTL-focused; RK's warehousing + value-add services are a different segment. OTT competes more directly on drayage.",
  },
  {
    name: "Ryder System", tier: "Large", revenue: "$12.7B", color: "#EF4444",
    linkedin: "155K", twitter: "6.2K", youtube: "3.9K", web: "848K/mo",
    tagline: "Ever better",
    recentMoves: [
      "National TV campaign 'Stories from the Supply Chain' (Apr-Jun 2025) on ESPN, TBS, Bloomberg",
      "Record Supply Chain Solutions sales in 2025",
      "$100M strategic initiatives announced",
      "Quest for Quality 2025 award (warehousing)",
      "E-commerce fulfillment study published 2025",
    ],
    contentStrategy: "Blogs, case studies, whitepapers, monthly State of Transportation report. Most aggressive traditional marketing (TV ads).",
    threatLevel: "High" as const,
    strengths: "Integrated fleet + supply chain, national TV presence, strong brand recognition",
    weaknesses: "Legacy fleet business under pressure, slow SCS tech adoption",
    rkOpportunity: "Ryder's TV campaigns don't reach RK's niche semi/EV buyers. RK should own the specialized content space Ryder can't.",
  },
  {
    name: "CEVA Logistics", tier: "Enterprise", revenue: "$18.4B", color: "#DC2626",
    linkedin: "1.93M", twitter: "20K", youtube: "5.5K", web: "1.16M/mo",
    tagline: "World-class supply chain solutions",
    recentMoves: [
      "FORPLANET sub-brand for sustainability (launched Nov 2024, expanded 2025)",
      "Scuderia Ferrari HP partnership promotions",
      "AI order dispatching system launched (Dec 2025)",
      "EV battery reverse logistics service (Sep 2025)",
      "Top Employer 2026 Latin America recognition",
    ],
    contentStrategy: "CEVA Insights blog, daily LinkedIn posting, strong event presence.",
    threatLevel: "Medium" as const,
    strengths: "CMA CGM ocean backing, global scale, EV battery logistics expertise",
    weaknesses: "Integration complexity, lower contract logistics margins",
    rkOpportunity: "CEVA's EV battery reverse logistics is a direct competitive threat. RK should develop and market similar capabilities proactively.",
  },
  {
    name: "NFI Industries", tier: "Mid-Market", revenue: "$3.7B", color: "#F97316",
    linkedin: "82K", twitter: "2.2K", youtube: "N/A", web: "54K/mo",
    tagline: "Powered by our people",
    recentMoves: [
      "NFI Wrapped 2025 — year-in-review content series",
      "VALOR veteran initiative (2025 ongoing)",
      "10M zero-emission miles milestone (Jan 2026)",
      "Daily LinkedIn posting cadence — highest among mid-market",
      "TCA Safety Award (Jan 2026), G75 Green Fleet recognition",
    ],
    contentStrategy: "Insights blog with case studies (Puma, Hain Celestial). Heavy sustainability and people-first messaging. Daily social.",
    threatLevel: "Medium" as const,
    strengths: "Family-owned (like RK), strong sustainability narrative, daily social presence",
    weaknesses: "Limited West Coast presence, less technology investment vs GXO",
    rkOpportunity: "NFI's daily posting cadence is a model to follow. RK should match this frequency. NFI's East Coast focus means limited CA overlap.",
  },
  {
    name: "Radiant Logistics", tier: "Mid-Market", revenue: "$830M", color: "#8B5CF6",
    linkedin: "13K", twitter: "517", youtube: "54", web: "Low",
    tagline: "It's the Network that Delivers!",
    recentMoves: [
      "Freight Market Update newsletters (weekly 2025)",
      "#TechTuesday series on LinkedIn",
      "Weport Mexico acquisition expansion",
      "JOC Inland Distribution 2025 panel participation",
      "Sustainability supplier engagement program",
    ],
    contentStrategy: "Weekly freight updates as content anchor, LinkedIn thought leadership. Minimal content infrastructure.",
    threatLevel: "Low" as const,
    strengths: "Asset-light model, agent network, freight updates as thought leadership",
    weaknesses: "Small scale, limited control via agent model",
    rkOpportunity: "Similar size competitor — Radiant's weekly newsletter format is worth replicating. RK has stronger content (385 blog pages) but less promotion.",
  },
];

export const marketingBdActivities = [
  { date: "Mar 15", type: "win" as const, title: "LAM Research AZ — Awarded", detail: "Service parts, ~$8M/yr, 270K sqft Goodyear AZ. SOW development.", tags: ["Semi/AI", "Arizona"], impact: "high" as const },
  { date: "Mar 15", type: "win" as const, title: "Panasonic Patterson Pass — Closed Won", detail: "60K sqft distribution, $2M/yr. Execution beginning March.", tags: ["Battery/EV", "Livermore"], impact: "medium" as const },
  { date: "Mar 14", type: "opportunity" as const, title: "Lucid Motors — Tempe AZ", detail: "IB Sequencing to MFG, 500K sqft, ~$9M/yr potential.", tags: ["Automotive/EV", "Arizona"], impact: "high" as const },
  { date: "Mar 14", type: "acquisition" as const, title: "Go Freight Terminal Acquisition", detail: "Acquiring warehouse business for $75K. Target April 1 start.", tags: ["M&A", "Expansion"], impact: "high" as const },
  { date: "Mar 14", type: "opportunity" as const, title: "Aeropost — Partnership Evaluation", detail: "Click Capital arranged meeting. Financial model under analysis.", tags: ["M&A", "Partnership"], impact: "medium" as const },
  { date: "Mar 12", type: "rfp" as const, title: "Panasonic SoCal/Savannah GA", detail: "DC Ops RFP response submitted 3/6. Est $7.4M/yr.", tags: ["Battery/EV", "Multi-site"], impact: "high" as const },
  { date: "Mar 10", type: "opportunity" as const, title: "Tesla Service — San Bernardino", detail: "320K sqft service parts distribution, ~$8M/yr. Q2 decision.", tags: ["Automotive/EV", "SoCal"], impact: "high" as const },
  { date: "Mar 9", type: "progress" as const, title: "KLA Fremont — MFG Support", detail: "Campus MFG support, 60 headcount & FTZ. Process mapping underway.", tags: ["Semi/AI", "Fremont"], impact: "medium" as const },
];

export const marketingKeyAccounts = [
  { name: "LAM Research", annual: "$27M", status: "Growing" as const, segment: "Semi/AI", note: "AZ expansion won. #1 customer." },
  { name: "KLA", annual: "$12M", status: "Growing" as const, segment: "Semi/AI", note: "Bonded Trans won. MFG support expanding." },
  { name: "Tesla", annual: "$8M", status: "Stable" as const, segment: "Automotive/EV", note: "Service parts SB and Samsung chip pipeline." },
  { name: "Panasonic", annual: "$5M", status: "Growing" as const, segment: "Battery/EV", note: "Patterson won. SoCal/Savannah RFP pending." },
  { name: "Corning", annual: "$4M", status: "Stable" as const, segment: "Glass/Materials", note: "AZ shuttle expansion pending." },
  { name: "Lucid", annual: "$2M", status: "High Potential" as const, segment: "Automotive/EV", note: "$9M AZ opportunity in pipeline." },
  { name: "CATL", annual: "Prospect", status: "Target" as const, segment: "Battery/EV", note: "Priority target — battery MFG." },
  { name: "Foxconn", annual: "Prospect", status: "Target" as const, segment: "Electronics", note: "Priority target — electronics MFG." },
  { name: "Delta Electronics", annual: "$0.5M", status: "Growing" as const, segment: "Electronics", note: "Morton operations." },
];

export const marketingPipeline = { total: "$65.8M", conversion: "~22%", stages: [
  { name: "Define Scope", value: 15 },
  { name: "Preparing Quote", value: 7 },
  { name: "Quote Follow-up", value: 24 },
  { name: "Negotiation", value: 20 },
]};

export const marketingRecommendations = [
  { type: "campaign" as const, title: "Launch 'Arizona Expansion' Case Study Campaign", description: "With LAM AZ ($8M) won and Lucid AZ ($9M) in pipeline, create content showcasing RK's Southwest expansion.", priority: "high" as const, effort: "Medium", timeline: "2 weeks", linkedBD: ["LAM AZ", "Lucid AZ"] },
  { type: "content" as const, title: "Panasonic Win — Press Release & Case Study", description: "Panasonic Patterson Pass closed. Draft press release and customer success story for MATS 2026 booth materials (10 days out).", priority: "high" as const, effort: "Low", timeline: "This week", linkedBD: ["Panasonic Win"] },
  { type: "vacancy" as const, title: "Kato Facility — Targeted Digital Campaign", description: "72% vacancy is critical. Create landing page and LinkedIn/Google Ads targeting semi, EV battery, and electronics companies.", priority: "critical" as const, effort: "High", timeline: "Ongoing", linkedBD: ["Kato (72%)"] },
  { type: "social" as const, title: "Social Media Acceleration — 5x/Week", description: "RK posts ~1x/week vs NFI's daily cadence. Implement 5-day content calendar.", priority: "high" as const, effort: "Medium", timeline: "Immediate", linkedBD: ["Competitive Gap"] },
  { type: "event" as const, title: "MATS 2026 Prep — 10 Days Out", description: "Finalize booth materials, lead capture. Incorporate LAM AZ win and Panasonic success into pitch deck.", priority: "high" as const, effort: "Medium", timeline: "By Mar 25", linkedBD: ["MATS 2026"] },
  { type: "campaign" as const, title: "Patterson & Hayman Vacancy Fill Campaign", description: "Patterson (38.1%) and Hayman (26.3%) need digital marketing. Google Ads for warehouse space.", priority: "medium" as const, effort: "Medium", timeline: "2 weeks", linkedBD: ["Patterson", "Hayman"] },
];

export const marketingIdeas = [
  { category: "Content Marketing", priority: "critical" as const, ideas: [
    { title: "Weekly Industry Newsletter", description: "Launch 'RK Supply Chain Pulse' — weekly email covering semi/EV tariff updates, FTZ insights, market trends.", effort: "Medium", timeline: "2 weeks to launch", competitor: "Radiant Logistics" },
    { title: "Customer Success Case Studies", description: "Publish 2 case studies/month: Panasonic Patterson win, LAM AZ expansion, Tesla service parts.", effort: "Medium", timeline: "Ongoing", competitor: "GXO, Ryder" },
    { title: "FTZ/Tariff Thought Leadership Series", description: "Monthly whitepaper or blog on tariff impacts, FTZ advantages. No competitor owns this niche.", effort: "High", timeline: "Monthly", competitor: "None (blue ocean)" },
  ]},
  { category: "Social Media", priority: "critical" as const, ideas: [
    { title: "5x/Week LinkedIn Posting Cadence", description: "NFI posts daily with 82K followers. RK posts ~1x/week with 1.9K. Implement 5-day content calendar.", effort: "Medium", timeline: "Immediate", competitor: "NFI Industries" },
    { title: "Employee Advocacy Program", description: "DHL and CEVA leverage 100K+ employee networks. Even 50 active advocates could 10x reach.", effort: "Low", timeline: "4 weeks", competitor: "DHL, CEVA" },
    { title: "LinkedIn Video Series: 'Inside RK'", description: "Short-form facility tour videos for LinkedIn — cost-effective, high engagement in B2B.", effort: "Medium", timeline: "Ongoing", competitor: "GXO, Ryder" },
  ]},
  { category: "Digital Advertising", priority: "high" as const, ideas: [
    { title: "Google Ads for Vacancy Fill", description: "Target 'warehouse space Fremont CA', 'FTZ Bay Area'. Kato (72%) and Patterson (38%) need campaigns.", effort: "Medium", timeline: "1 week", competitor: "Market standard" },
    { title: "LinkedIn Sponsored Content", description: "Target supply chain VPs at LAM, KLA, Tesla, Lucid, CATL with RK capabilities content.", effort: "Medium", timeline: "2 weeks", competitor: "GXO, Ryder" },
    { title: "Retargeting Campaigns", description: "Install LinkedIn Insight Tag + Google remarketing on rklogisticsgroup.com.", effort: "Low", timeline: "1 week", competitor: "Industry standard" },
  ]},
  { category: "Events & PR", priority: "high" as const, ideas: [
    { title: "MATS 2026 Press Release Package", description: "MATS is 10 days out. Prepare press release on LAM AZ win + Panasonic success.", effort: "Low", timeline: "This week", competitor: "Ryder, XPO" },
    { title: "Quarterly 'RK Innovation Tour'", description: "Invite prospective clients (CATL, Foxconn, Delta) for facility tours at Christy or Kato.", effort: "Medium", timeline: "Q2 2026", competitor: "GXO" },
    { title: "Industry Awards Submissions", description: "Submit for Quest for Quality, Top 3PL, Supply Chain Brain 100 Great.", effort: "Low", timeline: "Ongoing", competitor: "XPO, Ryder, NFI" },
  ]},
  { category: "Sustainability & Brand", priority: "medium" as const, ideas: [
    { title: "Launch Sustainability Narrative", description: "Every competitor leads with sustainability. RK has zero messaging. Create ESG page on website.", effort: "Medium", timeline: "4 weeks", competitor: "DHL, GXO, NFI, CEVA" },
    { title: "'Precision Logistics' Brand Campaign", description: "No competitor owns semiconductor-grade logistics as a brand position.", effort: "High", timeline: "Q2 2026", competitor: "None (unique position)" },
  ]},
];

export const marketingEmailCampaigns = [
  { name: "Arizona Expansion Announcement", type: "campaign" as const, audience: "Semi/EV prospects in Southwest", subject: "RK Logistics Now Serving Arizona — Semiconductor & EV Logistics", status: "ready" as const, preview: "We're excited to announce RK Logistics' expansion into Arizona with our new 79,000 sqft Tempe facility, purpose-built for semiconductor and EV supply chains.", cta: "Schedule a Facility Tour", sendTo: 340 },
  { name: "FTZ Tariff Advisory", type: "nurture" as const, audience: "Import-heavy manufacturers", subject: "How Foreign-Trade Zones Can Save Your Supply Chain Millions in 2026", status: "ready" as const, preview: "With tariff uncertainty at an all-time high, RK Logistics operates one of the Bay Area's most advanced FTZ programs — saving clients 12-18% on duty costs.", cta: "Download FTZ Whitepaper", sendTo: 520 },
  { name: "Kato Facility Availability", type: "campaign" as const, audience: "Bay Area warehouse seekers", subject: "209K sqft FTZ-Capable Space Available in Fremont, CA", status: "urgent" as const, preview: "Looking for industrial warehouse space in Silicon Valley? RK Logistics has immediate availability at our 209,478 sqft Kato Road facility in Fremont, CA.", cta: "Request a Quote", sendTo: 280 },
  { name: "Panasonic Win — Social Proof", type: "nurture" as const, audience: "Battery/EV companies", subject: "How RK Logistics Became Panasonic's West Coast Distribution Partner", status: "ready" as const, preview: "When Panasonic needed a distribution partner for Patterson Pass operations, they chose RK Logistics.", cta: "Read Case Study", sendTo: 180 },
  { name: "Monthly Industry Digest", type: "newsletter" as const, audience: "All contacts & prospects", subject: "RK Supply Chain Pulse — March 2026: Tariffs, AI Chips & EV Battery Boom", status: "draft" as const, preview: "This month: New tariff proposals could impact semiconductor imports by 15%.", cta: "Subscribe to Newsletter", sendTo: 1200 },
  { name: "Quarterly Business Review Invite", type: "retention" as const, audience: "Existing clients", subject: "Your Q1 2026 Supply Chain Performance Report Is Ready", status: "template" as const, preview: "Your quarterly supply chain performance report is ready for review with key metrics.", cta: "Book QBR Meeting", sendTo: 45 },
  { name: "OTT Carrier Partnership Outreach", type: "campaign" as const, audience: "LTL shippers in Tri-State area", subject: "On Time Trucking: Reliable LTL Service in the Northeast", status: "ready" as const, preview: "On Time Trucking delivers reliable LTL service from our Farmingdale, NY hub with Saia, TForce, and Roadrunner partnerships.", cta: "Get a Rate Quote", sendTo: 410 },
  { name: "EV/Battery Logistics Capabilities", type: "campaign" as const, audience: "EV OEMs & battery manufacturers", subject: "Specialized EV Battery Logistics — Hazmat Certified, FTZ-Enabled", status: "ready" as const, preview: "RK Logistics provides end-to-end battery logistics: hazmat-certified warehousing, FTZ duty deferral, temperature monitoring.", cta: "Explore EV Solutions", sendTo: 290 },
];

export const marketingCustomerNewsRK = [
  { company: "LAM Research", ticker: "LRCX", price: "$217.74", change: "+2.61%", positive: true, sentiment: "bullish" as const, sector: "Semi/AI", news: [
    { date: "Mar 12", headline: "Shares drop 4.3% amid market volatility", detail: "Closed $209.49. Analysts maintain Moderate Buy, $245 target.", impact: "neutral" as const },
    { date: "Feb 17", headline: "Deepens investment in Boise — new office for 150 employees", detail: "Supporting Micron memory production.", impact: "positive" as const },
  ], logisticsImpact: "Boise expansion increases need for US-based warehousing for semiconductor equipment." },
  { company: "KLA Corporation", ticker: "KLAC", price: "$1,442", change: "+1.65%", positive: true, sentiment: "bullish" as const, sector: "Semi/AI", news: [
    { date: "Mar 12", headline: "Investor Day: $7B buyback & 21% dividend increase", detail: "17th straight dividend increase. 2030 Target Model.", impact: "positive" as const },
    { date: "Feb 11", headline: "Expands Chennai R&D Hub to 300,000 sqft", detail: "Up to 1,300 employees in AI, software, engineering.", impact: "positive" as const },
  ], logisticsImpact: "Strong AI-driven growth signals sustained demand for high-value transport." },
  { company: "Tesla", ticker: "TSLA", price: "$399.51", change: "+1.2%", positive: true, sentiment: "bullish" as const, sector: "Automotive/EV", news: [
    { date: "Mar 16", headline: "Giga Texas major expansion — new staging yard & test track", detail: "Cybercab event preparations underway.", impact: "positive" as const },
    { date: "Mar 5", headline: "#1 in 2026 Global Sustainable Supply Chain Rankings", detail: "Top spot for second year.", impact: "positive" as const },
  ], logisticsImpact: "Giga Texas expansion increases local warehousing/staging needs." },
  { company: "Panasonic", ticker: "PCRFY", price: "\u00A51,242", change: "-1.8%", positive: false, sentiment: "bearish" as const, sector: "Battery/EV", news: [
    { date: "Feb 12", headline: "FY2026 revenue expected to slide amid restructuring", detail: "8.3% revenue decline expected.", impact: "negative" as const },
    { date: "Feb 4", headline: "Battery unit Q3 operating profit drops 3.5%", detail: "Decreased North America sales.", impact: "negative" as const },
  ], logisticsImpact: "Short-term softness, but Kansas factory ramp-up increases long-term demand." },
  { company: "Corning", ticker: "GLW", price: "$132.90", change: "+2.93%", positive: true, sentiment: "bullish" as const, sector: "Glass/Materials", news: [
    { date: "Mar 16", headline: "Launching AI innovations at OFC 2026", detail: "New fiber & connectivity solutions.", impact: "positive" as const },
    { date: "Jan 27", headline: "Up to $6B Meta partnership for data center optics", detail: "Multiyear deal with NC expansion.", impact: "positive" as const },
  ], logisticsImpact: "Meta deal creates high-volume fiber optic transport demand." },
  { company: "Lucid Motors", ticker: "LCID", price: "$9.89", change: "-0.11%", positive: false, sentiment: "bullish" as const, sector: "Automotive/EV", news: [
    { date: "Mar 12", headline: "Investor Day: midsize platform & robotaxi plans", detail: "3 new models starting <$50K.", impact: "positive" as const },
    { date: "Feb 24", headline: "2026 production guidance 25-27K vehicles (+40-50%)", detail: "FY25 revenue $1.35B (+68%).", impact: "positive" as const },
  ], logisticsImpact: "40-50% production increase drives higher logistics demand." },
  { company: "CATL", ticker: "300750.SZ", price: "CNY 408", change: "+2.87%", positive: true, sentiment: "bullish" as const, sector: "Battery/EV", news: [
    { date: "Mar 9", headline: "Q4 profit +57.1% YoY, beats estimates", detail: "FY2025 profit +42.3%.", impact: "positive" as const },
    { date: "Feb 27", headline: "BMW MOU on battery passport & decarbonization", detail: "Supply chain data exchange.", impact: "positive" as const },
  ], logisticsImpact: "Global capacity expansions signal rising international shipments." },
  { company: "Foxconn", ticker: "2354.TW", price: "55 TWD", change: "+0.5%", positive: true, sentiment: "bullish" as const, sector: "Electronics", news: [
    { date: "Mar 16", headline: "Record revenue +22% on AI servers", detail: "Strong Q1/FY2026 growth guidance.", impact: "positive" as const },
    { date: "Mar 6", headline: "Expanding factories in Mexico and Texas for Nvidia", detail: "Optimistic 2026 outlook.", impact: "neutral" as const },
  ], logisticsImpact: "AI server boom + new factories create massive warehousing demand." },
  { company: "Delta Electronics", ticker: "2308.TW", price: "$1,360", change: "-1.81%", positive: false, sentiment: "bullish" as const, sector: "Electronics", news: [
    { date: "Feb 26", headline: "Record profit as AI data centers drive growth", detail: "AI power now 25% of revenue.", impact: "positive" as const },
    { date: "Feb 13", headline: "Approves new $72M factory in India", detail: "Data center/BESS manufacturing.", impact: "positive" as const },
  ], logisticsImpact: "Factory expansions in US, India, Thailand increase warehousing demand." },
];

export const marketingCustomerNewsOTT = [
  { company: "Saia", ticker: "SAIA", price: "$322.01", change: "+0.31%", positive: true, sentiment: "neutral" as const, sector: "LTL Freight", news: [
    { date: "Mar 3", headline: "Jan-Feb LTL data: tonnage down, pricing strong", detail: "5.9-6.6% pricing renewals.", impact: "neutral" as const },
  ], logisticsImpact: "Rebranded to Saia Logistics. 21 new terminals maturing." },
  { company: "TForce Freight", ticker: "TFII", price: "$102.67", change: "-0.5%", positive: false, sentiment: "neutral" as const, sector: "LTL Freight", news: [
    { date: "Feb 18", headline: "TFI International seeking acquisitions", detail: "Q1 EPS guidance $0.50-$0.60.", impact: "neutral" as const },
  ], logisticsImpact: "Acquisition-driven growth. Data center transport creating demand." },
  { company: "Roadrunner", ticker: "RRTS", price: "$2.55", change: "-0.39%", positive: false, sentiment: "neutral" as const, sector: "LTL Freight", news: [
    { date: "Mar 16", headline: "Milwaukee service closed due to blizzard", detail: "SmartNetwork densification ongoing.", impact: "negative" as const },
  ], logisticsImpact: "Densifying SmartNetwork on metro-to-metro lanes." },
];

export const marketingFacilityLocations = [
  { name: "Kato Road (HQ)", address: "47020 Kato Road, Fremont, CA 94538", sqft: "209,478", lat: 37.4842, lng: -121.9280, type: "hq" as const, customers: ["HQ / Multi-tenant"], gbpScore: 4.2, reviews: 18, gbpStatus: "Claimed" as const, localRank: 3 },
  { name: "Mowry Ave", address: "6753 Mowry Avenue, Newark, CA 94560", sqft: "268,000", lat: 37.5199, lng: -122.0300, type: "warehouse" as const, customers: ["LAM Research"], gbpScore: 4.5, reviews: 12, gbpStatus: "Claimed" as const, localRank: 5 },
  { name: "Christy St", address: "41707 Christy Street, Fremont, CA 94538", sqft: "190,080", lat: 37.4766, lng: -121.9370, type: "warehouse" as const, customers: ["KLA"], gbpScore: 4.0, reviews: 8, gbpStatus: "Claimed" as const, localRank: 7 },
  { name: "W Winton", address: "2701 W Winton Ave, Hayward, CA 94545", sqft: "237,400", lat: 37.6340, lng: -122.1100, type: "warehouse" as const, customers: ["Multi-tenant"], gbpScore: 0, reviews: 0, gbpStatus: "Unclaimed" as const, localRank: null },
  { name: "Hayman St", address: "31775 Hayman Street, Hayward, CA 94544", sqft: "75,328", lat: 37.6290, lng: -122.0780, type: "warehouse" as const, customers: ["Tesla Glass"], gbpScore: 0, reviews: 0, gbpStatus: "Unclaimed" as const, localRank: null },
  { name: "Morton Ave", address: "7375 Morton Avenue, Newark, CA 94560", sqft: "141,000", lat: 37.5250, lng: -122.0340, type: "warehouse" as const, customers: ["KLA", "Delta", "Lucid"], gbpScore: 3.8, reviews: 5, gbpStatus: "Claimed" as const, localRank: 9 },
  { name: "Industrial Dr", address: "44951 Industrial Drive, Fremont, CA 94538", sqft: "14,000", lat: 37.4870, lng: -121.9340, type: "warehouse" as const, customers: ["Amazon"], gbpScore: 0, reviews: 0, gbpStatus: "Unclaimed" as const, localRank: null },
  { name: "Patterson Pass", address: "7150 Patterson Pass Rd, Livermore, CA 94550", sqft: "181,458", lat: 37.6870, lng: -121.7130, type: "warehouse" as const, customers: ["Franklin", "Panasonic"], gbpScore: 4.1, reviews: 6, gbpStatus: "Claimed" as const, localRank: 4 },
  { name: "Hawthorne Ave", address: "7600 Hawthorne Ave, Livermore, CA 94550", sqft: "75,451", lat: 37.6850, lng: -121.7280, type: "warehouse" as const, customers: ["LAM Research"], gbpScore: 0, reviews: 0, gbpStatus: "Unclaimed" as const, localRank: null },
  { name: "Vista Ridge (TX)", address: "400 Vista Ridge Drive, Kyle, TX 78640", sqft: "208,010", lat: 30.0024, lng: -97.8631, type: "warehouse" as const, customers: ["Tesla"], gbpScore: 4.3, reviews: 3, gbpStatus: "Claimed" as const, localRank: 6 },
  { name: "Hardy Dr (AZ)", address: "7929 South Hardy Drive, Tempe, AZ 85284", sqft: "79,000", lat: 33.3728, lng: -111.9420, type: "warehouse" as const, customers: ["Corning"], gbpScore: 0, reviews: 0, gbpStatus: "Unclaimed" as const, localRank: null },
  { name: "Whitmore Lake (MI)", address: "9257 East M-36, Whitmore Lake, MI 48189", sqft: "52,800", lat: 42.4340, lng: -83.7540, type: "warehouse" as const, customers: ["Tesla"], gbpScore: 4.0, reviews: 2, gbpStatus: "Claimed" as const, localRank: 8 },
  { name: "Farmingdale (NY)", address: "921 Conklin Street, Farmingdale, NY 11735", sqft: "60,000", lat: 40.7290, lng: -73.4410, type: "ott" as const, customers: ["On Time Trucking HQ"], gbpScore: 4.4, reviews: 22, gbpStatus: "Claimed" as const, localRank: 2 },
];

// ═══════════════════════════════════════════════════════
// Reddit Strategy Data
// ═══════════════════════════════════════════════════════

export const marketingRedditData = {
  overview: {
    rkPresence: "None",
    opportunity: "High",
    monthlyReach: "~320K logistics professionals across key subreddits",
    adPlatformCPM: "$3.50–6.00 (lower than LinkedIn's $30+ CPM)",
    summary: "Reddit's logistics communities are highly engaged, with authentic peer-to-peer discussions on 3PL selection, warehouse operations, and freight strategy. RK has zero presence — a significant untapped channel for thought leadership, lead gen, and brand building.",
  },
  subreddits: [
    { name: "r/supplychain", members: "88K", growth: "+28%/yr", activity: "Very High" as const, description: "Largest supply chain community. Career discussions, industry trends, salary benchmarks, tariff impacts.", rkRelevance: "High" as const, topTopics: ["Salary megathread (248 comments)", "Warehousing jobs outlook 2026", "Tariff & nearshoring shifts", "AI in supply chain"], strategy: "Share FTZ/tariff insights, semiconductor logistics expertise. Thought leadership via CEO or VP posts." },
    { name: "r/logistics", members: "46K", growth: "+22%/yr", activity: "High" as const, description: "Broad logistics discussions — 3PL selection, warehouse operations, freight, career advice.", rkRelevance: "High" as const, topTopics: ["Small 3PL survival rates (57% at 3 yrs)", "Smaller national warehouse companies", "Big shifts in logistics right now", "How to market a logistics company"], strategy: "Answer warehouse selection questions, share RK facility capabilities. Organic lead gen from companies searching for 3PL." },
    { name: "r/Warehousing", members: "12K", growth: "+18%/yr", activity: "Medium" as const, description: "Inventory management, WMS systems, warehouse operations, labor. Niche but highly targeted.", rkRelevance: "Critical" as const, topTopics: ["Marketing ideas for 3PL warehouse", "WMS recommendations", "Warehouse location maps", "Inventory accuracy tips"], strategy: "Core community for RK. Post operational best practices, facility spotlights, hiring content." },
    { name: "r/FreightBrokers", members: "34K", growth: "+15%/yr", activity: "High" as const, description: "Freight brokerage community. Rate discussions, carrier relationships, market conditions.", rkRelevance: "Medium" as const, topTopics: ["Market conditions & pricing", "Landing new customers", "Capacity management", "Carrier relationship advice"], strategy: "OTT opportunity — share LTL insights, carrier partnership perspective. Build relationships with brokers." },
    { name: "r/SupplyChainLogistics", members: "8K", growth: "+35%/yr", activity: "Medium" as const, description: "Networking-focused community. Distribution, warehousing, and supply chain content shared.", rkRelevance: "Medium" as const, topTopics: ["Top 20 most-read articles 2025", "Supply chain digitization", "AI in logistics", "Global supply chain breakdowns"], strategy: "Share RK blog content and whitepapers. Cross-promote FTZ thought leadership articles." },
    { name: "r/smallbusiness", members: "2.2M", growth: "+29%/yr", activity: "Very High" as const, description: "Massive community. Frequent questions about warehousing, 3PL, and logistics for growing businesses.", rkRelevance: "Low" as const, topTopics: ["How to market a logistics company", "3PL warehouse business advice", "Scaling with fulfillment partners", "Warehouse space questions"], strategy: "Monitor for 3PL/warehouse questions from Bay Area businesses. Helpful answers build brand organically." },
  ],
  contentStrategy: [
    { type: "Thought Leadership" as const, frequency: "2x/week", description: "CEO or VP posts sharing semiconductor logistics insights, FTZ tariff advantages, and industry commentary.", subreddits: ["r/supplychain", "r/logistics"], effort: "Medium" as const, impact: "High" as const },
    { type: "Q&A Engagement" as const, frequency: "Daily", description: "Monitor and respond to warehouse selection, 3PL comparison, and Bay Area logistics questions.", subreddits: ["r/logistics", "r/Warehousing", "r/smallbusiness"], effort: "Low" as const, impact: "High" as const },
    { type: "Case Studies" as const, frequency: "1x/month", description: "Share anonymized case studies: Panasonic partnership, LAM AZ expansion, FTZ savings stories.", subreddits: ["r/supplychain", "r/SupplyChainLogistics"], effort: "Medium" as const, impact: "Medium" as const },
    { type: "Reddit Ads" as const, frequency: "Ongoing", description: "Targeted ads on r/logistics, r/Warehousing, r/supplychain. Promote facility tours, FTZ whitepaper, vacancy fill.", subreddits: ["r/logistics", "r/Warehousing", "r/supplychain"], effort: "High" as const, impact: "High" as const },
    { type: "AMA Sessions" as const, frequency: "Quarterly", description: "'Ask Me Anything' with RK leadership on semiconductor logistics, FTZ operations, or warehouse management.", subreddits: ["r/supplychain", "r/logistics"], effort: "Medium" as const, impact: "High" as const },
    { type: "OTT Freight Content" as const, frequency: "1x/week", description: "On Time Trucking: share LTL market insights, carrier partnership tips, Northeast freight trends.", subreddits: ["r/FreightBrokers", "r/logistics"], effort: "Low" as const, impact: "Medium" as const },
  ],
  adOpportunity: {
    budget: "$2,000–5,000/month",
    targetSubreddits: ["r/supplychain", "r/logistics", "r/Warehousing", "r/FreightBrokers"],
    adFormats: ["Promoted posts (native feel)", "Conversation placement ads", "Subreddit takeover (r/Warehousing)"],
    estimatedReach: "150K–250K impressions/month",
    expectedCTR: "0.8–1.5% (Reddit avg for B2B)",
    vsLinkedIn: "60–80% lower cost per click vs LinkedIn Ads",
  },
  competitorPresence: [
    { competitor: "DHL Supply Chain", presence: "None (organic)", adActivity: "None detected", notes: "DHL has no Reddit strategy — entirely LinkedIn/YouTube focused" },
    { competitor: "GXO Logistics", presence: "Minimal", adActivity: "None detected", notes: "Occasionally mentioned in discussions but no official engagement" },
    { competitor: "XPO Inc", presence: "None", adActivity: "None detected", notes: "Zero Reddit presence — pure LinkedIn and events" },
    { competitor: "Ryder System", presence: "None", adActivity: "None detected", notes: "Ryder invests in TV ads and LinkedIn, not Reddit" },
    { competitor: "CEVA Logistics", presence: "None", adActivity: "None detected", notes: "No Reddit engagement — uses LinkedIn and events" },
    { competitor: "NFI Industries", presence: "None", adActivity: "None detected", notes: "Daily LinkedIn posters but zero Reddit activity" },
    { competitor: "Radiant Logistics", presence: "None", adActivity: "None detected", notes: "Newsletter-focused content strategy, no Reddit" },
  ],
};

// ═══════════════════════════════════════════════════════
// YouTube Strategy Data
// ═══════════════════════════════════════════════════════

export const marketingYouTubeData = {
  overview: {
    rkPresence: "No channel",
    opportunity: "High",
    platformUsers: "2.85B monthly active users globally",
    b2bOpportunity: "73% of B2B buyers watch video before purchase decisions",
    summary: "Every major competitor has a YouTube channel. RK Logistics has none — missing out on facility tours, customer testimonials, thought leadership, and recruitment content that drives B2B decision-making.",
  },
  competitorChannels: [
    { name: "DHL", subscribers: "127K", videos: 2700, viewAvg: "~5K/video", topContent: "F1 partnerships, sustainability stories, global trade documentaries", strategy: "Premium brand storytelling. Heavy investment in cinematic content and F1 sponsorship visibility.", frequency: "3–5x/week", quality: "High" as const },
    { name: "XPO", subscribers: "5.3K", videos: 61, viewAvg: "~800/video", topContent: "LTL data reports, MasterTech competition, brand campaign videos", strategy: "Corporate brand + employee recognition. 'Your freight first' campaign anchors content.", frequency: "1–2x/month", quality: "Medium" as const },
    { name: "CEVA Logistics", subscribers: "5.5K", videos: 340, viewAvg: "~1.2K/video", topContent: "Origin story documentary, Ferrari partnership, AI/tech showcases", strategy: "Heritage storytelling + tech innovation. FORPLANET sustainability sub-brand content.", frequency: "2–3x/month", quality: "High" as const },
    { name: "Ryder System", subscribers: "3.9K", videos: 280, viewAvg: "~1K/video", topContent: "CEO interviews, supply chain explainers, 'Stories from the Supply Chain' TV campaign", strategy: "Executive thought leadership + recruitment. CEO Robert Sanchez featured prominently.", frequency: "2–4x/month", quality: "Medium" as const },
    { name: "GXO Logistics", subscribers: "3.2K", videos: 123, viewAvg: "~450/video", topContent: "Consultant Xchange, automation showcases, earnings calls, semiconductor logistics", strategy: "Innovation/automation narrative. Tech-forward brand positioning with facility showcases.", frequency: "2–3x/month", quality: "Medium" as const },
    { name: "NFI Industries", subscribers: "2.3K", videos: 338, viewAvg: "~600/video", topContent: "Transportation management, company decade retrospective, zero-emission fleet", strategy: "People-first culture content + sustainability milestones. 'NFI Through the Decades' series.", frequency: "1–2x/month", quality: "Medium" as const },
    { name: "Radiant Logistics", subscribers: "54", videos: 12, viewAvg: "~50/video", topContent: "Corporate overview, freight market updates", strategy: "Minimal investment. Corporate presence only.", frequency: "Sporadic", quality: "Low" as const },
  ],
  rkChannelPlan: {
    channelName: "RK Logistics Group",
    tagline: "Precision Logistics for High-Value Supply Chains",
    target: "500 subscribers in Year 1, 2K by Year 2",
    contentPillars: [
      { pillar: "Facility Tours", frequency: "Monthly", description: "Walk-through of RK facilities showing semiconductor handling, FTZ operations, cleanroom-grade processes.", format: "3–5 min guided tour", effort: "Medium" as const, impact: "High" as const, competitors: "GXO does Innovation Tours; no competitor does semi-specific facility content" },
      { pillar: "Customer Success Stories", frequency: "Bi-monthly", description: "Video testimonials from LAM, KLA, Panasonic (with permission) on RK's value proposition.", format: "2–3 min testimonial", effort: "Medium" as const, impact: "High" as const, competitors: "Ryder and NFI lead here; RK's niche focus is a differentiator" },
      { pillar: "CEO Thought Leadership", frequency: "Monthly", description: "Short commentary on tariffs, FTZ strategies, semiconductor supply chain trends, EV battery logistics.", format: "1–3 min talking head", effort: "Low" as const, impact: "High" as const, competitors: "Ryder CEO is most visible; RK can own the semi/EV niche" },
      { pillar: "Industry Explainers", frequency: "Monthly", description: "'What is an FTZ?', 'How semiconductor logistics works', 'EV battery warehousing challenges'.", format: "5–8 min educational", effort: "High" as const, impact: "Medium" as const, competitors: "Generic supply chain YouTubers cover basics; no competitor owns semi-specific explainers" },
      { pillar: "Behind the Scenes", frequency: "Bi-weekly", description: "Day-in-the-life of warehouse operators, forklift team, safety protocols, employee spotlights.", format: "1–2 min Shorts", effort: "Low" as const, impact: "Medium" as const, competitors: "NFI's people-first approach; RK can differentiate with high-tech operations" },
      { pillar: "OTT Trucking Content", frequency: "Monthly", description: "LTL market updates, carrier partnership highlights with Saia/TForce, Northeast freight coverage.", format: "2–4 min update", effort: "Low" as const, impact: "Medium" as const, competitors: "XPO dominates LTL video; OTT can carve out regional niche" },
    ],
  },
  kpis: [
    { metric: "Channel Subscribers", current: "0", target6mo: "250", target12mo: "500", benchmark: "Radiant: 54, GXO: 3.2K" },
    { metric: "Monthly Views", current: "0", target6mo: "2,000", target12mo: "8,000", benchmark: "GXO: ~5K/mo, NFI: ~8K/mo" },
    { metric: "Videos Published", current: "0", target6mo: "18", target12mo: "40", benchmark: "CEVA: 340 total, XPO: 61 total" },
    { metric: "Avg View Duration", current: "N/A", target6mo: ">50%", target12mo: ">55%", benchmark: "B2B avg: 45–55%" },
    { metric: "Engagement Rate", current: "N/A", target6mo: "3%", target12mo: "4%", benchmark: "B2B avg: 2–4%" },
    { metric: "Leads from Video", current: "0", target6mo: "5/mo", target12mo: "15/mo", benchmark: "Hard to attribute; use UTM links" },
  ],
  shorts: [
    { title: "Inside Our Semiconductor Clean Warehouse", description: "15-second walk-through of ESD-protected semiconductor handling area", views: "Est. 2–5K", category: "Facility" as const },
    { title: "What is a Foreign Trade Zone?", description: "30-second explainer on FTZ benefits for importers", views: "Est. 5–10K", category: "Education" as const },
    { title: "Day in the Life: Warehouse Lead", description: "60-second follow of a shift lead at Mowry Ave facility", views: "Est. 1–3K", category: "Culture" as const },
    { title: "EV Battery Logistics Challenge", description: "30-second on hazmat requirements for battery warehousing", views: "Est. 3–7K", category: "Education" as const },
    { title: "13 Facilities, 5 States, 1 Team", description: "Quick montage of all RK facilities coast to coast", views: "Est. 3–5K", category: "Brand" as const },
    { title: "How We Saved $2M in Tariffs with FTZ", description: "45-second case study teaser driving to website", views: "Est. 5–10K", category: "Education" as const },
  ],
  budget: {
    setup: "$2,000–3,000 (branding, channel art, intro/outro templates)",
    monthly: "$3,000–5,000 (2–3 videos/month production + editing)",
    equipment: "$1,500–2,500 (camera, mic, lighting for in-house production)",
    ads: "$1,000–2,000/month (YouTube pre-roll targeting supply chain decision-makers)",
    roi: "Videos have 2–5 year shelf life; compound ROI vs. one-time ad spend",
  },
};

// ═══════════════════════════════════════════════════════
// Strategy Hub Data
// ═══════════════════════════════════════════════════════

export const competitorProfiles = [
  { name: "GXO Logistics", ticker: "GXO", revenue: "$13.2B", employees: "~154,000", facilities: "1,043", sqft: "221M", evEbitda: "9.8x", focus: "Tech-driven contract logistics, automation, omnichannel", strengths: "Largest pure-play contract logistics; 1,000+ sites globally; heavy automation investment", weaknesses: "Net margin <1%; Wincanton integration risk; heavy European exposure", threatToRK: "High", region: "Global (strong US/EU)" },
  { name: "XPO Inc.", ticker: "XPO", revenue: "$8.1B", employees: "~38,000", facilities: "611", sqft: "—", evEbitda: "8.2x", focus: "LTL freight, technology-driven pricing, yield optimization", strengths: "#2 LTL carrier in NA; AI-driven pricing; 25% local account mix (high margin)", weaknesses: "Pure LTL focus limits cross-sell; capital intensive hub network", threatToRK: "Medium", region: "North America" },
  { name: "Ryder System", ticker: "R", revenue: "$12.7B", employees: "~44,000", facilities: "800+", sqft: "60M+", evEbitda: "5.9x", focus: "Fleet leasing, supply chain solutions, dedicated transport", strengths: "Integrated fleet + SCS + dedicated; 150+ fulfillment sites; strong brand", weaknesses: "Legacy fleet business under pressure; slow SCS tech adoption", threatToRK: "High", region: "North America" },
  { name: "NFI Industries", ticker: "Private", revenue: "$3.7B", employees: "~17,000", facilities: "400+", sqft: "70M+", evEbitda: "—", focus: "Warehousing, drayage, dedicated transport, e-commerce fulfillment", strengths: "Privately held (long-term view); strong East Coast; fast e-commerce growth", weaknesses: "Limited West Coast presence; less technology investment vs. GXO", threatToRK: "Medium", region: "Primarily East Coast/Midwest" },
  { name: "Hub Group", ticker: "HUBG", revenue: "$3.8B", employees: "~6,000", facilities: "—", sqft: "—", evEbitda: "8.5x", focus: "Intermodal, truck brokerage, dedicated, logistics", strengths: "Strong intermodal network; asset-light model flexibility; growing logistics segment", weaknesses: "Intermodal market cyclicality; limited warehousing footprint", threatToRK: "Low", region: "North America" },
  { name: "CEVA Logistics", ticker: "Subsidiary (CMA CGM)", revenue: "$18.4B", employees: "~110,000", facilities: "1,000+", sqft: "100M+", evEbitda: "—", focus: "Global freight management, contract logistics, e-commerce", strengths: "CMA CGM ocean backing; global scale; strong Asia-Pacific", weaknesses: "Integration complexity; lower margins in contract logistics", threatToRK: "Medium", region: "Global" },
  { name: "Radiant Logistics", ticker: "RLGT", revenue: "$830M", employees: "~1,200", facilities: "100+", sqft: "—", evEbitda: "10.1x", focus: "Domestic/international freight forwarding, 3PL", strengths: "Asset-light; strong agent network; good acquisition track record", weaknesses: "Small scale vs. majors; agent model limits control", threatToRK: "Low", region: "North America" },
  { name: "DHL Supply Chain", ticker: "Subsidiary (DPDHL)", revenue: "$20B+ (NA)", employees: "~50,000 (NA)", facilities: "500+ (NA)", sqft: "150M+", evEbitda: "—", focus: "Contract logistics, e-fulfillment, life sciences, automotive", strengths: "Global brand; deep vertical expertise; massive scale", weaknesses: "Bureaucratic; slow to customize for mid-market; premium pricing", threatToRK: "Medium", region: "Global" },
];

export const swotAnalysis = {
  strengths: [
    { item: "Silicon Valley heritage with 30+ years semiconductor/tech logistics expertise", category: "Expertise" },
    { item: "Zero fault tolerance operations — ideal for high-value semiconductor/EV components", category: "Quality" },
    { item: "FTZ (Foreign Trade Zone) capabilities at Fremont facilities", category: "Capability" },
    { item: "Strong customer relationships: LAM ($27M), Tesla, KLA anchor accounts", category: "Revenue" },
    { item: "Dual business model (warehousing + OTT drayage) creates cross-sell synergies", category: "Diversification" },
    { item: "Regional density in Bay Area with 8 facilities within 30 miles", category: "Network" },
  ],
  weaknesses: [
    { item: "High customer concentration: Top 3 = 68% of RK revenue", category: "Risk" },
    { item: "Negative margins on Tesla (-50.4%), KLA (-22.4%), Delta (-53.4%)", category: "Profitability" },
    { item: "Kato facility at 72% vacancy with 62 months remaining on lease", category: "Real Estate" },
    { item: "Limited geographic footprint outside CA/AZ (only MI, TX)", category: "Scale" },
    { item: "Technology stack behind competitors — no proprietary WMS platform", category: "Technology" },
    { item: "Small scale ($105M) vs. GXO ($13.2B), Ryder ($12.7B), NFI ($3.7B)", category: "Scale" },
  ],
  opportunities: [
    { item: "Cold chain logistics market growing at 13.8% CAGR to $1.37T by 2035", category: "Market" },
    { item: "Semiconductor reshoring: TSMC AZ, Intel OH, Samsung TX creating new demand", category: "Industry" },
    { item: "LAM Research AZ expansion ($8M pipeline) opens Southwest corridor", category: "Pipeline" },
    { item: "E-commerce fulfillment in CA growing 3.94% annually; Bay Area hub potential", category: "Market" },
    { item: "AI/automation adoption can differentiate vs. slower mid-market competitors", category: "Technology" },
    { item: "EV battery storage/transport expertise as battery manufacturing scales in US", category: "Specialty" },
  ],
  threats: [
    { item: "GXO and Ryder aggressively expanding tech-sector contract logistics", category: "Competition" },
    { item: "California regulatory costs (CARB rules, labor laws) squeeze margins", category: "Regulatory" },
    { item: "Customer nearshoring to AZ/TX could shift volume away from CA facilities", category: "Geographic" },
    { item: "Rising warehouse lease rates in Bay Area eroding cost competitiveness", category: "Cost" },
    { item: "Tariff volatility disrupting semiconductor supply chains", category: "Trade" },
    { item: "Labor shortages in warehousing driving up costs 8-12% annually", category: "Labor" },
  ],
};

export const emergingTechnologies = [
  {
    name: "AI-Powered Route Optimization",
    category: "AI & Analytics",
    maturity: "Mainstream",
    adoptionTimeline: "Now – 12 months",
    impact: "High",
    investmentRange: "$150K – $500K",
    description: "ML algorithms optimize delivery routes using real-time traffic, weather, and demand data. Reduces fuel costs 10-15%, improves on-time delivery 8-12%.",
    rkRelevance: "Directly applicable to OTT drayage operations. Can reduce empty miles and improve fleet utilization for the 40+ truck fleet.",
    keyVendors: ["Google OR-Tools", "Nuvizz", "Wise Systems", "Locus Robotics"],
    stats: { costReduction: "10-15%", efficiencyGain: "20-30%", adoptionRate: "85%" },
  },
  {
    name: "Autonomous Mobile Robots (AMRs)",
    category: "Robotics",
    maturity: "Early Mainstream",
    adoptionTimeline: "6 – 18 months",
    impact: "High",
    investmentRange: "$500K – $2M per facility",
    description: "Self-navigating robots for picking, packing, and internal transport. No infrastructure changes needed — deploy in weeks.",
    rkRelevance: "High-value for LAM/KLA operations at Christy and Mowry. Can reduce pick times 50% and labor costs 30% in high-volume zones.",
    keyVendors: ["Locus Robotics", "6 River Systems", "Fetch Robotics", "inVia Robotics"],
    stats: { costReduction: "25-40%", efficiencyGain: "200-300%", adoptionRate: "45%" },
  },
  {
    name: "Predictive Analytics & Digital Twins",
    category: "AI & Analytics",
    maturity: "Growth",
    adoptionTimeline: "12 – 24 months",
    impact: "Medium-High",
    investmentRange: "$200K – $750K",
    description: "Virtual models of warehouse operations for scenario planning, demand forecasting, and layout optimization.",
    rkRelevance: "Critical for Kato vacancy resolution — model fill scenarios. Predictive demand forecasting for LAM/Tesla seasonal volumes.",
    keyVendors: ["Körber", "Blue Yonder", "Manhattan Associates", "Coupa"],
    stats: { costReduction: "15-20%", efficiencyGain: "25-40%", adoptionRate: "35%" },
  },
  {
    name: "Blockchain Supply Chain Transparency",
    category: "Data & Security",
    maturity: "Early Growth",
    adoptionTimeline: "18 – 36 months",
    impact: "Medium",
    investmentRange: "$100K – $400K",
    description: "Immutable ledger for chain-of-custody tracking, smart contracts for automated payments, and compliance verification.",
    rkRelevance: "Valuable for semiconductor customers requiring provenance tracking (LAM, KLA). FTZ documentation automation. Regulatory compliance for hazmat.",
    keyVendors: ["IBM Food Trust", "TradeLens", "Chronicled", "VeChain"],
    stats: { costReduction: "5-10%", efficiencyGain: "60-80%", adoptionRate: "15%" },
  },
  {
    name: "Autonomous Trucking (L4)",
    category: "Transportation",
    maturity: "Pilot",
    adoptionTimeline: "24 – 48 months",
    impact: "Transformative",
    investmentRange: "$1M – $5M",
    description: "Level 4 autonomous trucks for hub-to-hub middle-mile freight. Driver shortage solution with 24/7 operations capability.",
    rkRelevance: "Long-term OTT opportunity for inter-facility transfers and Bay Area drayage. Monitor Waymo Via, Aurora, and TuSimple progress.",
    keyVendors: ["Aurora Innovation", "Waymo Via", "Kodiak Robotics", "Gatik"],
    stats: { costReduction: "30-45%", efficiencyGain: "40-60%", adoptionRate: "5%" },
  },
  {
    name: "Sustainable Logistics & EV Fleet",
    category: "Sustainability",
    maturity: "Growth",
    adoptionTimeline: "Now – 24 months",
    impact: "Medium-High",
    investmentRange: "$500K – $3M",
    description: "Electric drayage trucks, solar-powered warehouses, and carbon tracking. California CARB compliance driver.",
    rkRelevance: "Mandatory for CARB compliance timeline. EV drayage aligns with Tesla/Lucid customer values. BAAQMD incentives available ($150-240K per truck).",
    keyVendors: ["Forum Mobility", "Volvo Trucks", "Daimler eCascadia", "BYD"],
    stats: { costReduction: "20-35%", efficiencyGain: "15-25%", adoptionRate: "25%" },
  },
  {
    name: "Cloud-Native WMS (SaaS)",
    category: "Software",
    maturity: "Mainstream",
    adoptionTimeline: "Now – 12 months",
    impact: "High",
    investmentRange: "$200K – $800K",
    description: "Multi-tenant cloud WMS replacing legacy on-prem systems. Real-time inventory, mobile-first UX, API integrations.",
    rkRelevance: "Foundational upgrade — enables all other tech initiatives. 65% complete migration already in progress. Critical for multi-facility visibility.",
    keyVendors: ["Manhattan Active", "Körber WMS", "Blue Yonder", "Deposco"],
    stats: { costReduction: "10-20%", efficiencyGain: "30-50%", adoptionRate: "60%" },
  },
];

export const marketExpansionOpportunities = [
  {
    name: "Cold Chain Logistics",
    marketSize: "$429B (2026)",
    cagr: "13.8%",
    targetYear: "2035 TAM: $1.37T",
    feasibility: "High",
    investmentRequired: "$5M – $15M",
    timeToRevenue: "12-18 months",
    description: "Temperature-controlled warehousing and transport for pharma, biotech, food/bev. Fastest-growing 3PL segment.",
    rkAdvantage: "Existing hazmat certification; Bay Area biotech cluster (Genentech, Gilead, AbbVie); Hardy AZ facility convertible to cold storage.",
    keyDrivers: ["mRNA vaccine logistics", "Biologics/specialty pharma growth (14.9% CAGR)", "Online grocery demand", "USDA/FDA compliance requirements"],
    risks: ["High capex for refrigeration infrastructure", "Specialized labor requirements", "Compliance complexity"],
    priority: 1,
  },
  {
    name: "E-Commerce Fulfillment",
    marketSize: "$85B (US 2026)",
    cagr: "8.5%",
    targetYear: "Key growth through 2030",
    feasibility: "High",
    investmentRequired: "$2M – $8M",
    timeToRevenue: "6-12 months",
    description: "Direct-to-consumer order fulfillment, returns processing, and omnichannel distribution for mid-market brands.",
    rkAdvantage: "Existing e-commerce capabilities (retail product management, store-door fulfillment). Kato facility ideal for conversion (150K sqft available). Bay Area proximity to DTC brands.",
    keyDrivers: ["CA e-commerce growing 3.94% annually", "Nearshoring accelerating DTC fulfillment needs", "Returns management complexity", "Same-day/next-day expectations"],
    risks: ["Price competition from Amazon/Shopify Fulfillment", "High peak-season labor variability", "Thin margins without scale"],
    priority: 2,
  },
  {
    name: "Semiconductor Logistics Hub (AZ)",
    marketSize: "$8-12B (US semi logistics)",
    cagr: "15%+",
    targetYear: "2026-2030 buildout cycle",
    feasibility: "Very High",
    investmentRequired: "$3M – $10M",
    timeToRevenue: "3-6 months (LAM already awarded)",
    description: "Dedicated semiconductor supply chain services in Arizona aligned with TSMC, Intel, LAM Research fab expansions.",
    rkAdvantage: "30+ years semi expertise (LAM, KLA). LAM AZ $8M already awarded. Hardy AZ facility operational. TSMC supplier relationships transferable.",
    keyDrivers: ["CHIPS Act $52B driving US fab construction", "LAM AZ service parts ($8M won)", "TSMC Phoenix 3 fabs under construction", "Intel Chandler expansion"],
    risks: ["Timeline delays on fab construction", "GXO/Ryder competing for same accounts", "Capital requirements for cleanroom-grade warehousing"],
    priority: 1,
  },
  {
    name: "International Freight Forwarding",
    marketSize: "$337B (2026)",
    cagr: "6.0%",
    targetYear: "2034 TAM: $537B",
    feasibility: "Medium",
    investmentRequired: "$1M – $5M",
    timeToRevenue: "12-24 months",
    description: "Cross-border logistics coordination, customs brokerage, and multi-modal transport management.",
    rkAdvantage: "FTZ expertise already operational. Port of Oakland/San Francisco proximity. Existing customs knowledge from semiconductor imports. OTT drayage covers port-to-warehouse.",
    keyDrivers: ["Cross-border e-commerce boom", "Nearshoring from Asia to Mexico", "FTZ demand for tariff mitigation", "Semiconductor import/export compliance"],
    risks: ["Highly competitive (Kuehne+Nagel, DHL, DB Schenker)", "Requires customs broker licenses", "FX and trade policy volatility"],
    priority: 3,
  },
  {
    name: "EV Battery Storage & Transport",
    marketSize: "$4-6B (US 2026)",
    cagr: "25%+",
    targetYear: "Rapid growth through 2030",
    feasibility: "High",
    investmentRequired: "$2M – $6M",
    timeToRevenue: "6-12 months",
    description: "Specialized hazmat warehousing and transport for lithium-ion batteries, modules, and EV components.",
    rkAdvantage: "Already certified for hazmat/lithium-ion battery storage. Tesla and Lucid are existing customers. Panasonic NV/KS gigafactories need logistics.",
    keyDrivers: ["US battery manufacturing scaling rapidly", "Panasonic, CATL, LG Chem building US plants", "Hazmat certification is a barrier to entry", "Growing regulatory requirements"],
    risks: ["Insurance costs for battery storage", "Regulatory changes (UN3480/3481)", "Customer concentration in EV sector"],
    priority: 2,
  },
];

export const expansionRoadmap = [
  { phase: "Phase 1: Foundation", timeline: "Q2 2026 – Q4 2026", initiatives: ["Launch AZ Semi Hub (LAM $8M)", "Cloud WMS migration complete", "Kato conversion to e-commerce fulfillment", "EV fleet pilot (5 trucks, BAAQMD incentives)"], investment: "$4-6M" },
  { phase: "Phase 2: Growth", timeline: "Q1 2027 – Q4 2027", initiatives: ["Cold chain pilot at Hardy AZ", "AI route optimization for OTT fleet", "International freight forwarding license", "AMR deployment at Christy (LAM ops)"], investment: "$6-10M" },
  { phase: "Phase 3: Scale", timeline: "Q1 2028 – Q4 2028", initiatives: ["Second AZ facility (Chandler/Tempe)", "Cold chain expansion to NorCal", "Battery logistics center of excellence", "Blockchain pilot for semi chain-of-custody"], investment: "$8-15M" },
  { phase: "Phase 4: Maturity", timeline: "Q1 2029 – Q4 2030", initiatives: ["Autonomous trucking pilot (middle-mile)", "Full e-commerce fulfillment network", "National cold chain partnerships", "Revenue target: $200M+"], investment: "$10-20M" },
];

// ═══════════════════════════════════════════════════════
// OPERATIONS — BENCH STRENGTH
// ═══════════════════════════════════════════════════════

export interface FacilityOperator {
  facility: string;
  location: string;
  sqft: number;
  jan26Revenue: number;
  jan26Costs: number;
  jan26NetRevenue: number;
  margin: number;
  laborPsf: number;
  rentPsf: number;
  directOhPsf: number;
  totalCustomers: number;
  avgPrice: number;
  vacancyPct: number;
  monthsRemaining: number;
  clientMix: string;
  contractPct: number;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  strengths: string[];
  risks: string[];
  actions: string[];
}

export const facilityOperators: FacilityOperator[] = [
  {
    facility: "Mowry",
    location: "Newark, CA",
    sqft: 268538,
    jan26Revenue: 1542184,
    jan26Costs: -984296,
    jan26NetRevenue: 557887,
    margin: 36.2,
    laborPsf: 1.95,
    rentPsf: 1.10,
    directOhPsf: 0.30,
    totalCustomers: 2,
    avgPrice: 2.55,
    vacancyPct: 0,
    monthsRemaining: 62,
    clientMix: "LAM Research (sole tenant)",
    contractPct: 100,
    score: 92,
    grade: "A",
    strengths: ["Highest net revenue facility ($558K/mo)", "Zero vacancy — fully occupied", "Strong pricing ($2.55/psf) vs. cost basis", "62 months lease runway"],
    risks: ["Single-tenant concentration risk (LAM)", "Labor cost highest in portfolio ($1.95/psf)"],
    actions: ["Negotiate long-term LAM renewal with 3% escalator", "Audit labor efficiency — high cost but justified by complexity"],
  },
  {
    facility: "Kato",
    location: "Fremont, CA",
    sqft: 209748,
    jan26Revenue: 1066216,
    jan26Costs: -639640,
    jan26NetRevenue: 426576,
    margin: 40.0,
    laborPsf: 0.09,
    rentPsf: 1.71,
    directOhPsf: 0.13,
    totalCustomers: 11,
    avgPrice: 0.11,
    vacancyPct: 72.0,
    monthsRemaining: 62,
    clientMix: "Tesla FTZ, Wisk, Delta, Antora, Amprius, Cepheid",
    contractPct: 18,
    score: 38,
    grade: "F",
    strengths: ["High margin on occupied space (40%)", "Diversified client base (11 tenants)", "Low labor cost ($0.09/psf)"],
    risks: ["72% vacancy — 151K sqft idle", "62 months remaining on lease (critical liability)", "82% month-to-month contracts", "Revenue from occupied space does not cover full rent"],
    actions: ["Priority fill: target Lucid (500K sqft need) and Panasonic", "Evaluate sublease or conversion to e-commerce fulfillment", "Assign dedicated BD resource to fill within 6 months"],
  },
  {
    facility: "Christy",
    location: "Fremont, CA",
    sqft: 190080,
    jan26Revenue: 910487,
    jan26Costs: -666288,
    jan26NetRevenue: 244199,
    margin: 26.8,
    laborPsf: 0.95,
    rentPsf: 1.59,
    directOhPsf: 0.29,
    totalCustomers: 1,
    avgPrice: 2.23,
    vacancyPct: 0,
    monthsRemaining: 33,
    clientMix: "KLA Tencor (sole tenant)",
    contractPct: 100,
    score: 78,
    grade: "B",
    strengths: ["Zero vacancy — fully occupied", "Strong revenue base ($910K/mo)", "Long-standing KLA relationship"],
    risks: ["Single-tenant risk (KLA)", "Below-average margin (26.8%) vs portfolio", "Rent at $1.59/psf — higher than Hardy/Grand"],
    actions: ["Push KLA rate increase at next renewal", "Cross-sell 2nd shift opportunity (in pipeline)"],
  },
  {
    facility: "Morton",
    location: "Newark, CA",
    sqft: 141275,
    jan26Revenue: 571717,
    jan26Costs: -327224,
    jan26NetRevenue: 244493,
    margin: 42.8,
    laborPsf: 0.34,
    rentPsf: 1.31,
    directOhPsf: 0.11,
    totalCustomers: 16,
    avgPrice: 1.57,
    vacancyPct: 0,
    monthsRemaining: 6,
    clientMix: "KLA CCM, KLA Eng, Delta, Lucid, LAM, Quilt, Visby",
    contractPct: 35,
    score: 70,
    grade: "B",
    strengths: ["Highest margin in portfolio (42.8%)", "Zero vacancy", "Most diversified client mix (16 tenants)"],
    risks: ["Only 6 months remaining on lease — critical renewal", "65% month-to-month contracts", "Complex multi-tenant ops with 16 clients"],
    actions: ["Immediate lease renewal negotiation", "Convert top 5 MtM clients to term contracts", "Evaluate consolidation with Christy for KLA ops"],
  },
  {
    facility: "Vista Ridge",
    location: "Kyle, TX",
    sqft: 208010,
    jan26Revenue: 547171,
    jan26Costs: -361512,
    jan26NetRevenue: 185659,
    margin: 33.9,
    laborPsf: 0.73,
    rentPsf: 0.89,
    directOhPsf: 0.32,
    totalCustomers: 3,
    avgPrice: 1.66,
    vacancyPct: 0,
    monthsRemaining: 31,
    clientMix: "Tesla (primary), Lunar",
    contractPct: 67,
    score: 75,
    grade: "B",
    strengths: ["Zero vacancy", "Lowest rent in portfolio ($0.89/psf)", "Good margin (33.9%) despite lower pricing"],
    risks: ["Tesla concentration risk", "Direct OH highest in portfolio ($0.32/psf)", "Remote from HQ — oversight challenges"],
    actions: ["Investigate high direct overhead", "Diversify with NMC battery ramp opportunity"],
  },
  {
    facility: "Hardy",
    location: "Phoenix, AZ",
    sqft: 157992,
    jan26Revenue: 428710,
    jan26Costs: -286863,
    jan26NetRevenue: 141848,
    margin: 33.1,
    laborPsf: 0.11,
    rentPsf: 0.48,
    directOhPsf: 0.02,
    totalCustomers: 4,
    avgPrice: 0.00,
    vacancyPct: 0,
    monthsRemaining: 23,
    clientMix: "Corning, SOLogistics, DSV/JA Solar, One Source",
    contractPct: 50,
    score: 72,
    grade: "B",
    strengths: ["Lowest rent in portfolio ($0.48/psf)", "Lowest labor cost ($0.11/psf)", "Strategic AZ location for semi expansion", "Zero vacancy"],
    risks: ["No established pricing visible — subcontract relationships", "50% month-to-month", "Limited revenue per sqft"],
    actions: ["Establish direct customer relationships vs. sub-contracts", "Target Corning shuttle/warehouse expansion ($4M pipeline)"],
  },
  {
    facility: "Patterson",
    location: "Livermore, CA",
    sqft: 181458,
    jan26Revenue: 244082,
    jan26Costs: -261661,
    jan26NetRevenue: -17579,
    margin: -7.2,
    laborPsf: 0.20,
    rentPsf: 0.99,
    directOhPsf: 0.17,
    totalCustomers: 7,
    avgPrice: 1.14,
    vacancyPct: 38.1,
    monthsRemaining: 18,
    clientMix: "KLA, Tesla FTZ, CATL, Delta, Amprius, Relyion",
    contractPct: 14,
    score: 35,
    grade: "F",
    strengths: ["Diversified tenant mix across sectors", "Low labor cost ($0.20/psf)", "Pipeline includes LAM Panasonic fill ($2M)"],
    risks: ["Negative margin (-7.2%) — losing money", "38.1% vacancy (69K sqft idle)", "86% month-to-month contracts", "Below breakeven occupancy"],
    actions: ["Priority: secure Panasonic Patterson fill ($2M closed won)", "Convert CATL and Tesla FTZ to term contracts", "If vacancy persists past Q3, evaluate lease exit"],
  },
  {
    facility: "Hawthorne",
    location: "Livermore, CA",
    sqft: 75451,
    jan26Revenue: 202662,
    jan26Costs: -114220,
    jan26NetRevenue: 88443,
    margin: 43.6,
    laborPsf: 0.17,
    rentPsf: 1.13,
    directOhPsf: 0.11,
    totalCustomers: 1,
    avgPrice: 0.00,
    vacancyPct: 0,
    monthsRemaining: 11,
    clientMix: "KLA (multiple divisions)",
    contractPct: 0,
    score: 65,
    grade: "C",
    strengths: ["Second-highest margin (43.6%)", "Zero vacancy", "Lean labor ($0.17/psf)"],
    risks: ["100% month-to-month with KLA", "Only 11 months on lease", "KLA sole tenant — no diversification"],
    actions: ["Negotiate KLA term contract before lease renewal", "Assess consolidation into Christy/Morton if KLA downsizes"],
  },
  {
    facility: "Hayman",
    location: "Hayward, CA",
    sqft: 75328,
    jan26Revenue: 201440,
    jan26Costs: -150575,
    jan26NetRevenue: 50865,
    margin: 25.3,
    laborPsf: 0.42,
    rentPsf: 1.08,
    directOhPsf: 0.16,
    totalCustomers: 10,
    avgPrice: 1.29,
    vacancyPct: 26.3,
    monthsRemaining: 15,
    clientMix: "Tesla Glass, Verb Surgical, Netflix, Lens, Coagusense",
    contractPct: 20,
    score: 48,
    grade: "D",
    strengths: ["High client diversity (10 tenants)", "Interesting client mix (Netflix, med-tech)"],
    risks: ["26.3% vacancy increasing", "80% month-to-month", "Below-average margin (25.3%)", "15 months to lease expiry"],
    actions: ["Fill 20K sqft via Tesla Glass expansion or new client", "Convert top 3 clients to term contracts", "Plan for lease expiry — renew only if vacancy <15%"],
  },
  {
    facility: "Whitmore Lake",
    location: "Whitmore Lake, MI",
    sqft: 52800,
    jan26Revenue: 168986,
    jan26Costs: -95061,
    jan26NetRevenue: 73925,
    margin: 43.7,
    laborPsf: 0.67,
    rentPsf: 0.81,
    directOhPsf: 0.11,
    totalCustomers: 3,
    avgPrice: 1.48,
    vacancyPct: 14.4,
    monthsRemaining: 18,
    clientMix: "KLA, Lucid, Tesla Glass",
    contractPct: 33,
    score: 68,
    grade: "C",
    strengths: ["Highest margin (43.7%) in portfolio", "Strategic Midwest location (MI auto corridor)", "Low rent ($0.81/psf)"],
    risks: ["14.4% vacancy (7.6K sqft idle)", "67% month-to-month", "Small facility — limited scale"],
    actions: ["Fill remaining vacancy with SHB or Tesla Glass", "Push for KLA term contract"],
  },
  {
    facility: "Grand",
    location: "Fremont, CA",
    sqft: 85000,
    jan26Revenue: 162110,
    jan26Costs: -99311,
    jan26NetRevenue: 62799,
    margin: 38.7,
    laborPsf: 0.02,
    rentPsf: 0.36,
    directOhPsf: 0.02,
    totalCustomers: 2,
    avgPrice: 0.00,
    vacancyPct: 30.9,
    monthsRemaining: 21,
    clientMix: "Tesla, Infineon",
    contractPct: 0,
    score: 45,
    grade: "D",
    strengths: ["Lowest cost facility (rent $0.36/psf)", "Good margin despite vacancy", "Near-zero labor cost — self-service model"],
    risks: ["30.9% vacancy (26K sqft idle)", "100% month-to-month", "No established pricing"],
    actions: ["Target Tesla volume overflow to fill vacancy", "Explore conversion to last-mile staging hub"],
  },
  {
    facility: "Industrial",
    location: "Fremont, CA",
    sqft: 14000,
    jan26Revenue: 51351,
    jan26Costs: -45956,
    jan26NetRevenue: 5395,
    margin: 10.5,
    laborPsf: 0.83,
    rentPsf: 2.72,
    directOhPsf: 0.11,
    totalCustomers: 5,
    avgPrice: 4.77,
    vacancyPct: 13.9,
    monthsRemaining: 6,
    clientMix: "Amazon Kuiper, CellPoint, Movano, Q'Apel, Zerova",
    contractPct: 40,
    score: 52,
    grade: "D",
    strengths: ["Highest pricing in portfolio ($4.77/psf avg)", "Niche high-value clients (Amazon Kuiper, med-tech)", "Premium value-added services"],
    risks: ["Highest rent in portfolio ($2.72/psf) — low margin (10.5%)", "Only 6 months on lease", "Small facility limits upside"],
    actions: ["Decide: renew only if margin improves to 20%+", "Renegotiate rent on renewal", "Consider relocating clients to Patterson or Kato"],
  },
];

export const benchStrengthSummary = {
  totalFacilities: 12,
  totalSqft: 1659680,
  totalMonthlyRevenue: 7753935,
  totalMonthlyCosts: 7284578,
  totalMonthlyNetRevenue: 469357,
  portfolioMargin: 6.1,
  avgScore: 61.5,
  gradeDistribution: { A: 1, B: 4, C: 2, D: 3, F: 2 },
  topPerformer: "Mowry (92/100)",
  bottomPerformer: "Patterson (-7.2% margin)",
  criticalActions: [
    "Kato: 72% vacancy with 62 months lease remaining — #1 priority fill",
    "Patterson: Operating at -7.2% margin — secure Panasonic fill or evaluate exit",
    "Morton & Industrial: Both expire in 6 months — negotiate renewals now",
    "Convert MtM contracts to term — 68% of client contracts are month-to-month",
  ],
};

export const personnelChanges = [
  { name: "Guillermo Larios", role: "Business Development Representative", date: "Feb 2026", event: "Hired", type: "Backfill", notes: "Replacement for Frank Tomasula" },
  { name: "Brian Dunleavy", role: "Director of Business Development", date: "Jan 2026", event: "Hired", type: "Backfill", notes: "Replacement for Nikki Michaux" },
  { name: "Justin Graham", role: "Director of Business Development", date: "Jan 2026", event: "Terminated", type: "Involuntary", notes: "Performance" },
  { name: "Nikki Michaux", role: "Director of Business Development", date: "Jan 2026", event: "Terminated", type: "Involuntary", notes: "Performance" },
  { name: "Mick Henning", role: "Operational Excellence Associate", date: "Jan 2026", event: "Terminated", type: "Involuntary", notes: "Performance" },
  { name: "Alex Niswander", role: "AI Specialist", date: "Dec 2025", event: "Hired", type: "Net New", notes: "New position" },
  { name: "Robert Miller", role: "Operations Site Manager", date: "Jan 2025", event: "Hired", type: "Backfill", notes: "Replacement for Russell Smith" },
  { name: "Brian Saucier", role: "Sr. Director of Business Dev", date: "Apr 2025", event: "Hired", type: "Net New", notes: "New position" },
  { name: "Peter O'Donnell", role: "VP of Business Development", date: "Jul 2024", event: "Hired", type: "Net New", notes: "New position" },
  { name: "Susana Andino", role: "Director of Account Mgmt", date: "May 2024", event: "Hired", type: "Backfill", notes: "Backfill for Michael Powell" },
  { name: "Keith Hochberg", role: "Terminal Manager", date: "Jun 2025", event: "Hired", type: "Backfill", notes: "Replacement for Christopher Wresche" },
  { name: "Kendall Newman", role: "Director of Transportation", date: "Jun 2025", event: "Hired", type: "Backfill", notes: "Replacement for Emir Haskic" },
  { name: "Nathaniel Cantrell", role: "Facilities Maintenance Mgr", date: "May 2025", event: "Hired", type: "Backfill", notes: "Replacement for Kristopher LaCrosse" },
  { name: "Kip Boetel", role: "Operations Site Manager", date: "Aug 2024", event: "Hired", type: "Net New", notes: "Expansion Site Manager at Hardy, AZ" },
  { name: "Fred Behrens", role: "Site Manager", date: "Feb 2024", event: "Hired", type: "Backfill", notes: "Backfill for Lee Porter; managing LAM" },
];

// ═══════════════════════════════════════════════════════
// Daily Activity Reports — Operator Reports & Analytics
// ═══════════════════════════════════════════════════════

export interface DailyActivity {
  category: "Operations" | "Client Management" | "Safety & Compliance" | "Labor Management" | "Business Development" | "Maintenance & Facilities" | "Admin & Reporting" | "Training & Development";
  description: string;
  hoursSpent: number;
  impact: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Blocked";
}

export interface DailyReport {
  id: string;
  operatorName: string;
  facility: string;
  date: string;
  submittedAt: string;
  activities: DailyActivity[];
  totalHours: number;
  highlights: string;
  blockers: string;
  tomorrowPriorities: string;
}

export interface ProductivityMetrics {
  facility: string;
  operator: string;
  reportsSubmitted: number;
  avgHoursLogged: number;
  categoryBreakdown: Record<string, number>;
  highImpactPct: number;
  completionRate: number;
  consistencyScore: number;
  trend: "Improving" | "Stable" | "Declining";
}

export interface AIInsight {
  type: "improvement" | "alert" | "recognition" | "rebalance";
  facility: string;
  title: string;
  detail: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  category: string;
}

export const dailyReports: DailyReport[] = [
  {
    id: "DR-001", operatorName: "Fred Behrens", facility: "Mowry", date: "2026-03-15", submittedAt: "2026-03-15T17:45:00",
    activities: [
      { category: "Operations", description: "Managed LAM Research inbound receiving — 14 pallets of semiconductor tools processed, all scanned and staged within SLA", hoursSpent: 3.5, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Conducted quarterly review prep with LAM account team; assembled KPI deck showing 99.2% order accuracy", hoursSpent: 2.0, impact: "High", status: "Completed" },
      { category: "Safety & Compliance", description: "Completed monthly fire suppression inspection with facilities team, all systems green", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Labor Management", description: "Conducted performance check-ins with 3 shift leads; addressed overtime scheduling for LAM ramp", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
      { category: "Admin & Reporting", description: "Submitted weekly facility P&L variance report; flagged labor overrun on weekend shift", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
    ],
    totalHours: 9.0,
    highlights: "LAM quarterly prep going well. 99.2% order accuracy — up from 97.8% last quarter. Fire inspection passed without issues.",
    blockers: "None",
    tomorrowPriorities: "LAM quarterly review meeting at 10am. Finalize headcount request for AZ ramp support.",
  },
  {
    id: "DR-002", operatorName: "Fred Behrens", facility: "Mowry", date: "2026-03-14", submittedAt: "2026-03-14T18:10:00",
    activities: [
      { category: "Operations", description: "Supervised shift changeover — addressed staging bottleneck in Zone C that was delaying LAM outbound by 45 min", hoursSpent: 3.0, impact: "High", status: "Completed" },
      { category: "Business Development", description: "Walked new Panasonic prospect through facility; showed cleanroom-adjacent staging capabilities", hoursSpent: 1.5, impact: "High", status: "Completed" },
      { category: "Labor Management", description: "Interviewed 2 forklift operator candidates for open position; recommending one for hire", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Coordinated HVAC repair on dock 7 — unit back online by 2pm", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Training & Development", description: "Led WMS refresher training for 6 new temp workers", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
    ],
    totalHours: 8.5,
    highlights: "Fixed Zone C staging bottleneck — saved ~45 min on LAM outbound cycle time. Strong Panasonic tour. HVAC resolved same-day.",
    blockers: "Temp agency sending inconsistent quality — need to escalate to HR.",
    tomorrowPriorities: "Fire inspection. LAM quarterly prep.",
  },
  {
    id: "DR-003", operatorName: "Fred Behrens", facility: "Mowry", date: "2026-03-13", submittedAt: "2026-03-13T17:30:00",
    activities: [
      { category: "Operations", description: "Managed peak volume day — 22 outbound shipments for LAM, all on time", hoursSpent: 4.0, impact: "High", status: "Completed" },
      { category: "Safety & Compliance", description: "Investigated near-miss incident at dock 3; implemented temporary guard rail, ordered permanent fixture", hoursSpent: 1.5, impact: "High", status: "In Progress" },
      { category: "Client Management", description: "Resolved LAM priority escalation on missing serial number — traced to mislabel in receiving, corrected within 2 hours", hoursSpent: 1.5, impact: "High", status: "Completed" },
      { category: "Admin & Reporting", description: "Updated daily ops metrics dashboard; submitted monthly labor forecast", hoursSpent: 1.0, impact: "Low", status: "Completed" },
    ],
    totalHours: 8.0,
    highlights: "Peak volume day handled cleanly. Near-miss at dock 3 being addressed — permanent guard rail ordered.",
    blockers: "Guard rail vendor quoting 2-week lead time. Checking alternative suppliers.",
    tomorrowPriorities: "Shift changeover process improvement. Panasonic tour. Interview forklift candidates.",
  },
  {
    id: "DR-010", operatorName: "Robert Miller", facility: "Christy", date: "2026-03-15", submittedAt: "2026-03-15T18:20:00",
    activities: [
      { category: "Operations", description: "Processed KLA bonded shipments — 8 containers received and logged into FTZ system", hoursSpent: 3.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Met with KLA Bonded Transportation team to discuss new dedicated fleet SOW timeline", hoursSpent: 2.0, impact: "High", status: "In Progress" },
      { category: "Labor Management", description: "Reassigned 2 workers from receiving to VAS line to handle KLA inspection surge", hoursSpent: 0.5, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Dock leveler on bay 4 jammed — maintenance dispatched, temporary reroute to bay 5", hoursSpent: 1.0, impact: "Medium", status: "In Progress" },
      { category: "Admin & Reporting", description: "Completed KLA monthly activity report and FTZ compliance filing", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
    ],
    totalHours: 8.0,
    highlights: "KLA bonded fleet SOW discussion progressing — target close April. FTZ compliance filing completed ahead of deadline.",
    blockers: "Dock leveler parts on backorder — 3 days. Using bay 5 as workaround.",
    tomorrowPriorities: "Follow up on dock leveler repair. Prepare KLA campus MFG support cost model.",
  },
  {
    id: "DR-020", operatorName: "Kip Boetel", facility: "Vista Ridge", date: "2026-03-15", submittedAt: "2026-03-15T18:45:00",
    activities: [
      { category: "Operations", description: "Managed Tesla parts sequencing — 18 outbound loads, 100% on-time delivery to Gigafactory", hoursSpent: 4.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Tesla requested expedited NMC battery component staging; coordinated with night shift to accommodate", hoursSpent: 1.5, impact: "High", status: "Completed" },
      { category: "Labor Management", description: "Addressed attendance issue with 2nd shift team; formal coaching session documented", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Checked HVAC after temp complaints on south wing — thermostat recalibrated", hoursSpent: 0.5, impact: "Low", status: "Completed" },
      { category: "Admin & Reporting", description: "Updated Tesla volume forecast spreadsheet for Q2 planning", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
    ],
    totalHours: 8.0,
    highlights: "100% on-time delivery to Tesla today. Accommodated Tesla expedite request without OT.",
    blockers: "None",
    tomorrowPriorities: "NMC battery component staging completion. Q2 labor planning.",
  },
  {
    id: "DR-030", operatorName: "James Bryant", facility: "Hardy", date: "2026-03-15", submittedAt: "2026-03-15T19:00:00",
    activities: [
      { category: "Operations", description: "Corning shuttle service ran 4 round-trips — all on schedule. Processed DSV/JA Solar inbound (6 pallets)", hoursSpent: 3.0, impact: "High", status: "Completed" },
      { category: "Business Development", description: "Prepared capacity analysis for Corning warehouse expansion pipeline opportunity ($4M)", hoursSpent: 2.0, impact: "High", status: "In Progress" },
      { category: "Client Management", description: "Call with SOLogistics on contract renewal — they want to extend 12 months at current rate", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Admin & Reporting", description: "Monthly P&L review submitted; flagged direct overhead increase from new security contract", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Reviewed bids for parking lot reseal — selecting vendor this week", hoursSpent: 0.5, impact: "Low", status: "In Progress" },
    ],
    totalHours: 7.5,
    highlights: "Corning expansion analysis underway — strong pipeline opportunity. SOLogistics wants to extend.",
    blockers: "Need corporate approval on security contract increase before next billing cycle.",
    tomorrowPriorities: "Continue Corning expansion analysis. Finalize parking lot vendor selection.",
  },
  {
    id: "DR-040", operatorName: "Tom Vasquez", facility: "Patterson", date: "2026-03-15", submittedAt: "2026-03-15T19:30:00",
    activities: [
      { category: "Operations", description: "KLA receiving and storage — 4 pallets. Light volume day across all accounts", hoursSpent: 2.0, impact: "Low", status: "Completed" },
      { category: "Admin & Reporting", description: "Updated vacancy tracking spreadsheet; current vacancy at 38.1% (69K sqft idle)", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Walked vacant sections to check for leaks/pest issues after rain. Found minor roof leak in section D", hoursSpent: 2.0, impact: "Medium", status: "In Progress" },
      { category: "Labor Management", description: "Adjusted staffing schedule — reduced to minimum crew given low volume", hoursSpent: 0.5, impact: "Low", status: "Completed" },
      { category: "Client Management", description: "Called CATL for status on their MtM renewal. No response — left voicemail", hoursSpent: 0.5, impact: "Medium", status: "Blocked" },
    ],
    totalHours: 6.5,
    highlights: "Low volume day. Found roof leak in section D that needs attention before rains worsen.",
    blockers: "CATL unresponsive on contract renewal. Panasonic fill timeline still unclear from BD team.",
    tomorrowPriorities: "Follow up with Panasonic fill team. Get roof leak repair scheduled.",
  },
  {
    id: "DR-050", operatorName: "Ray Chen", facility: "Kato", date: "2026-03-15", submittedAt: "2026-03-15T17:15:00",
    activities: [
      { category: "Operations", description: "Wisk receiving — 2 pallets of drone components. Tesla overflow storage — 1 container", hoursSpent: 1.5, impact: "Low", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Supervised pest control treatment in vacant zone B (151K sqft vacant)", hoursSpent: 2.0, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Met with janitorial vendor about reducing service to vacant areas — negotiated $800/mo savings", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Admin & Reporting", description: "Submitted cost reduction report showing $2,400/mo savings from reduced staffing/services", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
      { category: "Safety & Compliance", description: "Quarterly emergency exit inspection on vacant areas — all clear", hoursSpent: 0.5, impact: "Low", status: "Completed" },
    ],
    totalHours: 6.5,
    highlights: "Negotiated $800/mo janitorial savings. Total cost reduction this month is $2,400.",
    blockers: "No pipeline visibility from BD on filling 151K sqft vacancy. 62 months on lease.",
    tomorrowPriorities: "Explore sublease options for vacant sections. Review utility costs for potential shutdowns.",
  },
  {
    id: "DR-060", operatorName: "Maria Santos", facility: "Hawthorne", date: "2026-03-15", submittedAt: "2026-03-15T18:30:00",
    activities: [
      { category: "Operations", description: "KLA inspection and VAS work — processed 8 units, all passed QC on first attempt", hoursSpent: 4.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "KLA asked about adding packaging service — quoted $12/unit; they're reviewing internally", hoursSpent: 1.0, impact: "High", status: "In Progress" },
      { category: "Admin & Reporting", description: "Updated KLA service metrics dashboard for monthly review", hoursSpent: 1.0, impact: "Low", status: "Completed" },
      { category: "Training & Development", description: "Cross-trained 2 associates on KLA packaging standards in prep for potential new service", hoursSpent: 1.5, impact: "Medium", status: "Completed" },
    ],
    totalHours: 7.5,
    highlights: "100% first-pass QC rate. Potential packaging service upsell to KLA — quoted $12/unit.",
    blockers: "Lease only 11 months remaining — need clarity on renewal.",
    tomorrowPriorities: "Follow up on KLA packaging quote. Prepare for lease renewal discussion.",
  },
  {
    id: "DR-070", operatorName: "Dan Kowalski", facility: "Whitmore Lake", date: "2026-03-15", submittedAt: "2026-03-15T19:15:00",
    activities: [
      { category: "Operations", description: "KLA receiving — 3 pallets. Lucid motor assembly staging — 5 outbound shipments", hoursSpent: 3.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Met with Tesla Glass team about potential expansion to fill remaining 7.6K sqft vacancy", hoursSpent: 1.5, impact: "High", status: "In Progress" },
      { category: "Safety & Compliance", description: "Updated MSDS sheets for new Lucid chemical storage requirements", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Labor Management", description: "Reviewed overtime trends — 3 consecutive weeks of OT. Requesting additional headcount", hoursSpent: 1.0, impact: "Medium", status: "In Progress" },
    ],
    totalHours: 6.5,
    highlights: "Tesla Glass expansion discussion positive — could eliminate 14.4% vacancy. Lucid ramp driving OT.",
    blockers: "Headcount approval delayed. Running on OT which is eating margin.",
    tomorrowPriorities: "Escalate headcount request. Continue Tesla Glass vacancy fill discussions.",
  },
  {
    id: "DR-080", operatorName: "Lisa Park", facility: "Hayman", date: "2026-03-15", submittedAt: "2026-03-15T18:00:00",
    activities: [
      { category: "Operations", description: "Tesla Glass receiving — 4 pallets. Netflix returns processing — 12 units", hoursSpent: 2.5, impact: "Medium", status: "Completed" },
      { category: "Client Management", description: "Verb Surgical wants to reduce footprint by 5K sqft next month. They're firm", hoursSpent: 1.5, impact: "High", status: "Completed" },
      { category: "Admin & Reporting", description: "Updated vacancy projections — with Verb reduction, vacancy will increase to ~33%", hoursSpent: 1.0, impact: "Medium", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Coordinated lighting repair in section B (2 ballasts replaced)", hoursSpent: 1.0, impact: "Low", status: "Completed" },
      { category: "Labor Management", description: "Adjusted schedules to match reduced volume. Moving 1 FTE to Mowry temporarily", hoursSpent: 0.5, impact: "Medium", status: "Completed" },
    ],
    totalHours: 6.5,
    highlights: "Verb Surgical downsizing 5K sqft — vacancy will increase to ~33%.",
    blockers: "No new prospects in pipeline for this facility. BD team hasn't toured here in 3 months.",
    tomorrowPriorities: "Request BD meeting to discuss Hayman fill strategy.",
  },
  {
    id: "DR-090", operatorName: "Steve Martinez", facility: "Morton", date: "2026-03-15", submittedAt: "2026-03-15T17:50:00",
    activities: [
      { category: "Operations", description: "KLA outbound — 6 shipments. Delta inbound — 8 pallets. Lucid staging — 3 containers", hoursSpent: 4.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Delta requesting additional 10K sqft for battery component storage. Working on pricing", hoursSpent: 1.5, impact: "High", status: "In Progress" },
      { category: "Safety & Compliance", description: "Completed OSHA 300 log update for Q1. Zero recordable incidents this quarter", hoursSpent: 0.5, impact: "Medium", status: "Completed" },
      { category: "Admin & Reporting", description: "Submitted lease renewal analysis — 6 months remaining, recommending 3-year renewal", hoursSpent: 1.0, impact: "High", status: "Completed" },
    ],
    totalHours: 7.0,
    highlights: "Zero recordable incidents in Q1. Delta expansion request is positive. Lease renewal analysis submitted.",
    blockers: "Need corporate decision on Morton lease renewal within 30 days.",
    tomorrowPriorities: "Delta expansion pricing proposal. Continue lease renewal discussions.",
  },
  {
    id: "DR-100", operatorName: "Mike Torres", facility: "Grand", date: "2026-03-15", submittedAt: "2026-03-15T17:00:00",
    activities: [
      { category: "Operations", description: "Tesla overflow storage management — self-service model, monitored access and inventory", hoursSpent: 1.5, impact: "Low", status: "Completed" },
      { category: "Maintenance & Facilities", description: "Walk-through of vacant 26K sqft area. Addressed drainage issue on north side", hoursSpent: 2.0, impact: "Medium", status: "In Progress" },
      { category: "Admin & Reporting", description: "Updated cost tracking; low labor model keeping costs minimal but revenue also low", hoursSpent: 1.0, impact: "Low", status: "Completed" },
      { category: "Business Development", description: "No tours or prospects scheduled. Sent email to BD team requesting marketing push", hoursSpent: 0.5, impact: "Medium", status: "Blocked" },
    ],
    totalHours: 5.0,
    highlights: "Low activity day consistent with self-service model. Drainage issue needs follow-up.",
    blockers: "No BD engagement on filling 30.9% vacancy. Self-service model limits revenue potential.",
    tomorrowPriorities: "Follow up on drainage repair. Push BD team for prospect activity.",
  },
  {
    id: "DR-110", operatorName: "Anna Krishnan", facility: "Industrial", date: "2026-03-15", submittedAt: "2026-03-15T18:15:00",
    activities: [
      { category: "Operations", description: "Amazon Kuiper order processing — 2 precision handling shipments. CellPoint component staging", hoursSpent: 3.0, impact: "High", status: "Completed" },
      { category: "Client Management", description: "Met with Movano Health to discuss expanded cleanroom-adjacent storage needs", hoursSpent: 1.5, impact: "Medium", status: "In Progress" },
      { category: "Admin & Reporting", description: "Prepared lease renewal cost analysis — current rent $2.72/psf is our highest", hoursSpent: 1.5, impact: "High", status: "Completed" },
      { category: "Safety & Compliance", description: "Updated hazmat handling procedures for Q'Apel medical device chemicals", hoursSpent: 1.0, impact: "High", status: "Completed" },
    ],
    totalHours: 7.0,
    highlights: "Amazon Kuiper precision handling went smoothly. Lease analysis shows we must renegotiate.",
    blockers: "Only 6 months on lease. Need corporate decision on renew vs. relocate ASAP.",
    tomorrowPriorities: "Prepare relocation cost analysis. Meet with Zerova on contract status.",
  },
];

export const productivityMetrics: ProductivityMetrics[] = [
  { facility: "Mowry", operator: "Fred Behrens", reportsSubmitted: 7, avgHoursLogged: 8.5, categoryBreakdown: { "Operations": 35, "Client Management": 20, "Safety & Compliance": 10, "Labor Management": 12, "Business Development": 8, "Maintenance & Facilities": 5, "Admin & Reporting": 7, "Training & Development": 3 }, highImpactPct: 58, completionRate: 94, consistencyScore: 96, trend: "Improving" },
  { facility: "Christy", operator: "Robert Miller", reportsSubmitted: 7, avgHoursLogged: 8.0, categoryBreakdown: { "Operations": 38, "Client Management": 18, "Safety & Compliance": 12, "Labor Management": 8, "Business Development": 5, "Maintenance & Facilities": 8, "Admin & Reporting": 9, "Training & Development": 2 }, highImpactPct: 48, completionRate: 88, consistencyScore: 92, trend: "Stable" },
  { facility: "Vista Ridge", operator: "Kip Boetel", reportsSubmitted: 7, avgHoursLogged: 8.0, categoryBreakdown: { "Operations": 42, "Client Management": 15, "Safety & Compliance": 5, "Labor Management": 12, "Business Development": 3, "Maintenance & Facilities": 8, "Admin & Reporting": 10, "Training & Development": 5 }, highImpactPct: 52, completionRate: 91, consistencyScore: 90, trend: "Stable" },
  { facility: "Hardy", operator: "James Bryant", reportsSubmitted: 6, avgHoursLogged: 7.5, categoryBreakdown: { "Operations": 30, "Client Management": 12, "Safety & Compliance": 5, "Labor Management": 5, "Business Development": 22, "Maintenance & Facilities": 10, "Admin & Reporting": 12, "Training & Development": 4 }, highImpactPct: 45, completionRate: 85, consistencyScore: 82, trend: "Improving" },
  { facility: "Morton", operator: "Steve Martinez", reportsSubmitted: 7, avgHoursLogged: 7.2, categoryBreakdown: { "Operations": 40, "Client Management": 18, "Safety & Compliance": 10, "Labor Management": 8, "Business Development": 2, "Maintenance & Facilities": 5, "Admin & Reporting": 15, "Training & Development": 2 }, highImpactPct: 50, completionRate: 90, consistencyScore: 88, trend: "Stable" },
  { facility: "Hawthorne", operator: "Maria Santos", reportsSubmitted: 7, avgHoursLogged: 7.5, categoryBreakdown: { "Operations": 45, "Client Management": 15, "Safety & Compliance": 5, "Labor Management": 5, "Business Development": 5, "Maintenance & Facilities": 5, "Admin & Reporting": 10, "Training & Development": 10 }, highImpactPct: 55, completionRate: 92, consistencyScore: 94, trend: "Stable" },
  { facility: "Whitmore Lake", operator: "Dan Kowalski", reportsSubmitted: 5, avgHoursLogged: 6.8, categoryBreakdown: { "Operations": 38, "Client Management": 20, "Safety & Compliance": 10, "Labor Management": 12, "Business Development": 2, "Maintenance & Facilities": 8, "Admin & Reporting": 8, "Training & Development": 2 }, highImpactPct: 42, completionRate: 78, consistencyScore: 70, trend: "Declining" },
  { facility: "Patterson", operator: "Tom Vasquez", reportsSubmitted: 5, avgHoursLogged: 6.2, categoryBreakdown: { "Operations": 25, "Client Management": 10, "Safety & Compliance": 5, "Labor Management": 8, "Business Development": 2, "Maintenance & Facilities": 28, "Admin & Reporting": 20, "Training & Development": 2 }, highImpactPct: 22, completionRate: 72, consistencyScore: 68, trend: "Declining" },
  { facility: "Kato", operator: "Ray Chen", reportsSubmitted: 6, avgHoursLogged: 6.0, categoryBreakdown: { "Operations": 15, "Client Management": 2, "Safety & Compliance": 8, "Labor Management": 5, "Business Development": 5, "Maintenance & Facilities": 40, "Admin & Reporting": 22, "Training & Development": 3 }, highImpactPct: 18, completionRate: 80, consistencyScore: 75, trend: "Stable" },
  { facility: "Hayman", operator: "Lisa Park", reportsSubmitted: 6, avgHoursLogged: 6.5, categoryBreakdown: { "Operations": 30, "Client Management": 18, "Safety & Compliance": 5, "Labor Management": 10, "Business Development": 2, "Maintenance & Facilities": 15, "Admin & Reporting": 15, "Training & Development": 5 }, highImpactPct: 35, completionRate: 82, consistencyScore: 78, trend: "Declining" },
  { facility: "Grand", operator: "Mike Torres", reportsSubmitted: 4, avgHoursLogged: 5.2, categoryBreakdown: { "Operations": 20, "Client Management": 5, "Safety & Compliance": 5, "Labor Management": 5, "Business Development": 8, "Maintenance & Facilities": 35, "Admin & Reporting": 18, "Training & Development": 4 }, highImpactPct: 15, completionRate: 70, consistencyScore: 55, trend: "Declining" },
  { facility: "Industrial", operator: "Anna Krishnan", reportsSubmitted: 7, avgHoursLogged: 7.0, categoryBreakdown: { "Operations": 35, "Client Management": 15, "Safety & Compliance": 15, "Labor Management": 5, "Business Development": 5, "Maintenance & Facilities": 8, "Admin & Reporting": 15, "Training & Development": 2 }, highImpactPct: 48, completionRate: 86, consistencyScore: 88, trend: "Stable" },
];

export const aiInsights: AIInsight[] = [
  { type: "alert", facility: "Patterson", title: "Patterson: 70% of time on maintenance & admin — not revenue-generating", detail: "Tom Vasquez is spending 48% of his week on maintenance walkdowns and administrative reporting at a facility operating at -7.2% margin. Recommend redirecting 30% of his time toward active client outreach and CATL/Tesla FTZ contract conversion. Assign maintenance walkthroughs to a part-time facilities tech ($18/hr) to free operator for revenue activities.", priority: "Critical", category: "Time Reallocation" },
  { type: "alert", facility: "Kato", title: "Kato: 40% of activity is maintaining empty space", detail: "Ray Chen's reports show the majority of time is spent on pest control, janitorial coordination, and vacant space inspections for 151K sqft of empty warehouse. While cost reduction efforts are commendable ($2,400/mo savings), the operator should spend at least 2 hrs/day on BD support — preparing space for tours, creating marketing materials, reaching out to local brokers.", priority: "Critical", category: "Revenue Focus" },
  { type: "alert", facility: "Grand", title: "Grand: Lowest engagement — only 4 reports in 7 days, avg 5.2 hours", detail: "Mike Torres is logging the fewest hours and submitting the fewest reports across all facilities. Consider splitting role: 50% Grand oversight + 50% cross-facility or BD float support to improve utilization. If pattern continues, evaluate whether Grand needs a full-time dedicated operator.", priority: "High", category: "Utilization" },
  { type: "improvement", facility: "Whitmore Lake", title: "Whitmore Lake: Declining consistency — overtime trend unsustainable", detail: "Dan Kowalski's report frequency dropped (5/7 days) and his reports show 3 consecutive weeks of overtime driven by Lucid ramp without headcount adjustment. Approve the headcount request to prevent burnout and margin erosion. The 43.7% margin will degrade to ~35% at current OT rate over 60 days.", priority: "High", category: "Staffing" },
  { type: "improvement", facility: "Hayman", title: "Hayman: No BD engagement for 3 months — vacancy growing", detail: "Lisa Park reports zero BD tours or prospect engagement at Hayman for 90 days while vacancy is climbing to 33% after Verb Surgical downsizes. Immediate action: schedule BD team visit this week, provide Lisa with a prospect kit and local broker contacts.", priority: "High", category: "Revenue Focus" },
  { type: "rebalance", facility: "Portfolio", title: "Admin time portfolio-wide averages 13% — should target <8%", detail: "Across all 12 operators, admin and reporting tasks consume 13% of logged hours. Top offenders: Kato (22%), Patterson (20%), Grand (18%). Implement standardized daily report templates and automated metric dashboards to reduce time spent on manual reporting. Target: cut admin hours by 40% portfolio-wide (saves ~15 operator-hours per week).", priority: "Medium", category: "Efficiency" },
  { type: "rebalance", facility: "Portfolio", title: "Safety compliance unevenly distributed — standardize protocol", detail: "Mowry and Christy spend 10-12% on safety while Grand and Vista Ridge spend <5%. Standardize safety audit cadence (monthly walk-through, quarterly formal audit) across all facilities. Low-safety-activity sites are exposure risks.", priority: "Medium", category: "Compliance" },
  { type: "improvement", facility: "Industrial", title: "Industrial: Strong execution but 6-month lease cliff approaching", detail: "Anna Krishnan runs a tight operation (86% completion, 88% consistency) with premium clients. Her reports consistently flag the lease cliff. Prioritize the renew-vs-relocate decision within 2 weeks. If relocating, she needs 60+ days to transition clients.", priority: "High", category: "Decision Required" },
  { type: "recognition", facility: "Mowry", title: "Mowry: Gold standard — 96% consistency, 58% high-impact work", detail: "Fred Behrens consistently submits the most detailed, highest-quality reports. 58% of time on high-impact activities, 94% task completion, proactively resolves issues (Zone C bottleneck saved 45 min/day). Pattern: strong operators spend <10% on admin and >50% on direct value creation. Use Mowry as the benchmark.", priority: "Low", category: "Best Practice" },
  { type: "recognition", facility: "Hawthorne", title: "Hawthorne: 100% QC first-pass and packaging upsell initiative", detail: "Maria Santos achieved 100% first-pass QC rate and proactively identified a packaging service upsell opportunity ($12/unit). This proactive revenue thinking should be incentivized and replicated across facilities.", priority: "Low", category: "Best Practice" },
  { type: "improvement", facility: "Portfolio", title: "BD team disconnect from operators — 3 of 12 flagging no engagement", detail: "Patterson, Hayman, and Grand operators all report minimal to zero BD team engagement despite significant vacancy (38.1%, ~33%, 30.9%). Implement a weekly BD-Operator sync (15 min) for every facility with >15% vacancy. Add 'BD Support' as a required daily activity category for high-vacancy facilities.", priority: "Critical", category: "Cross-Function" },
];

export const categoryColors: Record<string, string> = {
  "Operations": "#10b981",
  "Client Management": "#3b82f6",
  "Safety & Compliance": "#f59e0b",
  "Labor Management": "#8b5cf6",
  "Business Development": "#ec4899",
  "Maintenance & Facilities": "#f97316",
  "Admin & Reporting": "#6b7280",
  "Training & Development": "#06b6d4",
};
