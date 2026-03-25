// ═══════════════════════════════════════════════════════
// RK Logistics — Facility Pricing Engine
// Source: Rich Frainier rate card emails (Finance Manager)
// ═══════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────
// 1. FACILITIES
// ──────────────────────────────────────────────────────

export interface Facility {
  id: string;
  name: string;
  location: string;
  state: string;
  sqft: string;
  ftz: boolean;
  notes: string;
}

export const facilities: Facility[] = [
  { id: "patterson", name: "Patterson", location: "Patterson, CA", state: "CA", sqft: "185,000", ftz: true, notes: "FTZ-activated, semiconductor & EV battery" },
  { id: "hayman", name: "Hayman", location: "Fremont, CA", state: "CA", sqft: "142,000", ftz: true, notes: "Racked storage available" },
  { id: "kato", name: "Kato", location: "Fremont, CA", state: "CA", sqft: "125,000", ftz: true, notes: "125K sqft FTZ space, higher labor costs" },
  { id: "morton", name: "Morton", location: "Fremont, CA", state: "CA", sqft: "120,000", ftz: false, notes: "General warehousing" },
  { id: "mowry", name: "Mowry", location: "Fremont, CA", state: "CA", sqft: "95,000", ftz: false, notes: "General warehousing" },
  { id: "christy", name: "Christy", location: "Fremont, CA", state: "CA", sqft: "85,000", ftz: false, notes: "General warehousing" },
  { id: "vista-ridge", name: "Vista Ridge", location: "Fremont, CA", state: "CA", sqft: "75,000", ftz: false, notes: "" },
  { id: "hardy", name: "Hardy", location: "Fremont, CA", state: "CA", sqft: "68,000", ftz: false, notes: "" },
  { id: "hawthorne", name: "Hawthorne", location: "Fremont, CA", state: "CA", sqft: "55,000", ftz: false, notes: "" },
  { id: "grand", name: "Grand", location: "Fremont, CA", state: "CA", sqft: "50,000", ftz: false, notes: "" },
  { id: "whitmore-lake", name: "Whitmore Lake", location: "Whitmore Lake, MI", state: "MI", sqft: "95,000", ftz: false, notes: "Lucid Motors, 31.31% margin 2025" },
  { id: "lucid-az", name: "Lucid AZ", location: "Arizona", state: "AZ", sqft: "50,000", ftz: false, notes: "Sublease, lower labor costs" },
  { id: "industrial", name: "Industrial", location: "Fremont, CA", state: "CA", sqft: "45,000", ftz: false, notes: "Closing" },
];

// ──────────────────────────────────────────────────────
// 2. MARKUP TIERS
// ──────────────────────────────────────────────────────

export type MarkupTier = "25" | "30" | "35" | "40";

export const markupTiers: { value: MarkupTier; label: string; description: string }[] = [
  { value: "25", label: "25% — New Account", description: "Standard for new accounts, first quotes, AZ sublease" },
  { value: "30", label: "30% — Mid-Tier", description: "Some Morton accounts (KLA, Tesla Off-Book)" },
  { value: "35", label: "35% — Standard/Renewal", description: "Standard renewals, small accounts, preferred rate" },
  { value: "40", label: "40% — Premium", description: "Premium accounts (e.g., KLA at Patterson)" },
];

// ──────────────────────────────────────────────────────
// 3. BASE COST RATES (before markup) by facility
// Derived by reverse-engineering from Rich's rate cards
// ──────────────────────────────────────────────────────

export interface FacilityBaseCosts {
  facilityId: string;
  // Storage (monthly)
  storagePerSqFt: number;     // base cost/sqft
  bulkPerPallet: number;      // non-stackable pallet
  rackedPerPallet: number | null; // racked position (not all facilities)
  // Hourly labor
  mhIcHourly: number;
  leadHourly: number;
  supervisorHourly: number;
  managerHourly: number;
  // Transactional base costs (before markup)
  inboundPalletFIFO: number;
  inboundPalletLot: number;
  inboundCartonNonSerialized: number;
  inboundCartonLot: number;
  inboundCartonSerial: number;
  inboundOversized: number;
  inboundFlatbed: number;
  inboundVariance: number;
  inboundDeblock: number;
  inboundLabelCreation: number;
  inboundFailedReturn: number;
  inboundOrderEntry: number;
  inboundRePalletizing: number;
  inboundReBoxing: number;
  inboundTierCorrection: number;
  inboundContainer40: number;
  inboundContainer20: number;
  // Inventory control
  icCycleCountPallet: number;
  icCycleCountBulk: number;
  icCycleCountBin: number;
  icPartCreation: number;
  icInventoryCheck: number;
  icPartCorrection: number;
  icConsolidationPallet: number;
  icConsolidationBin: number;
  icConsolidationBulk: number;
  icPictures: number;
  // Outbound
  outboundPallet: number;
  outboundCartonNonSerialized: number;
  outboundCartonLot: number;
  outboundCartonSerial: number;
  outboundOrderEntry: number;
  outboundArrangeShipping: number;
  outboundFlatbed: number;
  outboundOrderCorrection: number;
  outboundVideoRecording: number;
  outboundRtsPallet: number;
  outboundRtsCarton: number;
  outboundRtsBin: number;
  outboundSeal: number;
  outboundLabeling: number;
  outboundContainer40: number;
  outboundContainer20: number;
  // Misc
  miscScanPaperwork: number;
  miscDimsWeights: number;
  miscCustomReport: number;
  miscNonSystematic: number;
  miscBanding: number;
  miscStretchWrap: number;
  miscWasteDisposal: number;
  miscSpecialty: number;
}

// Patterson base costs (reverse-engineered from 35% markup rates)
const pattersonBase: FacilityBaseCosts = {
  facilityId: "patterson",
  storagePerSqFt: 1.464, bulkPerPallet: 21.79, rackedPerPallet: null,
  mhIcHourly: 41.20, leadHourly: 43.18, supervisorHourly: 59.84, managerHourly: 71.87,
  inboundPalletFIFO: 8.86, inboundPalletLot: 10.00, inboundCartonNonSerialized: 5.57,
  inboundCartonLot: 6.71, inboundCartonSerial: 6.71, inboundOversized: 13.28,
  inboundFlatbed: 22.80, inboundVariance: 5.70, inboundDeblock: 5.70,
  inboundLabelCreation: 2.28, inboundFailedReturn: 3.42, inboundOrderEntry: 5.70,
  inboundRePalletizing: 11.40, inboundReBoxing: 3.42, inboundTierCorrection: 17.10,
  inboundContainer40: 820.69, inboundContainer20: 410.35,
  icCycleCountPallet: 5.70, icCycleCountBulk: 25.65, icCycleCountBin: 5.70,
  icPartCreation: 5.70, icInventoryCheck: 11.40, icPartCorrection: 5.70,
  icConsolidationPallet: 17.10, icConsolidationBin: 5.70, icConsolidationBulk: 31.35,
  icPictures: 3.42,
  outboundPallet: 8.86, outboundCartonNonSerialized: 5.57, outboundCartonLot: 6.71,
  outboundCartonSerial: 6.71, outboundOrderEntry: 5.70, outboundArrangeShipping: 17.10,
  outboundFlatbed: 22.80, outboundOrderCorrection: 5.70, outboundVideoRecording: 68.39,
  outboundRtsPallet: 10.00, outboundRtsCarton: 6.71, outboundRtsBin: 6.71,
  outboundSeal: 5.70, outboundLabeling: 1.14, outboundContainer40: 820.69, outboundContainer20: 410.35,
  miscScanPaperwork: 5.70, miscDimsWeights: 5.70, miscCustomReport: 17.10,
  miscNonSystematic: 17.10, miscBanding: 2.28, miscStretchWrap: 1.14,
  miscWasteDisposal: 5.70, miscSpecialty: 29.29,
};

// Kato base costs (slightly higher labor)
const katoBase: FacilityBaseCosts = {
  facilityId: "kato",
  storagePerSqFt: 2.584, bulkPerPallet: 37.81, rackedPerPallet: null,
  mhIcHourly: 41.20, leadHourly: 43.18, supervisorHourly: 66.52, managerHourly: 79.89,
  inboundPalletFIFO: 8.95, inboundPalletLot: 10.10, inboundCartonNonSerialized: 5.63,
  inboundCartonLot: 6.78, inboundCartonSerial: 6.78, inboundOversized: 13.43,
  inboundFlatbed: 23.04, inboundVariance: 5.76, inboundDeblock: 5.76,
  inboundLabelCreation: 2.30, inboundFailedReturn: 3.46, inboundOrderEntry: 5.76,
  inboundRePalletizing: 11.52, inboundReBoxing: 3.46, inboundTierCorrection: 17.28,
  inboundContainer40: 829.41, inboundContainer20: 414.70,
  icCycleCountPallet: 5.76, icCycleCountBulk: 25.92, icCycleCountBin: 5.76,
  icPartCreation: 5.76, icInventoryCheck: 11.52, icPartCorrection: 5.76,
  icConsolidationPallet: 17.28, icConsolidationBin: 5.76, icConsolidationBulk: 31.68,
  icPictures: 3.46,
  outboundPallet: 8.95, outboundCartonNonSerialized: 5.63, outboundCartonLot: 6.78,
  outboundCartonSerial: 6.78, outboundOrderEntry: 5.76, outboundArrangeShipping: 17.28,
  outboundFlatbed: 23.04, outboundOrderCorrection: 5.76, outboundVideoRecording: 69.12,
  outboundRtsPallet: 10.10, outboundRtsCarton: 6.78, outboundRtsBin: 6.78,
  outboundSeal: 5.76, outboundLabeling: 1.16, outboundContainer40: 829.41, outboundContainer20: 414.70,
  miscScanPaperwork: 5.76, miscDimsWeights: 5.76, miscCustomReport: 17.28,
  miscNonSystematic: 17.28, miscBanding: 2.30, miscStretchWrap: 1.16,
  miscWasteDisposal: 5.76, miscSpecialty: 29.39,
};

// Hayman base costs
const haymanBase: FacilityBaseCosts = {
  facilityId: "hayman",
  storagePerSqFt: 1.615, bulkPerPallet: 43.74, rackedPerPallet: 11.63,
  mhIcHourly: 41.20, leadHourly: 43.18, supervisorHourly: 59.84, managerHourly: 76.56,
  inboundPalletFIFO: 8.87, inboundPalletLot: 10.02, inboundCartonNonSerialized: 5.58,
  inboundCartonLot: 6.73, inboundCartonSerial: 6.73, inboundOversized: 13.32,
  inboundFlatbed: 22.85, inboundVariance: 5.71, inboundDeblock: 5.71,
  inboundLabelCreation: 2.28, inboundFailedReturn: 3.43, inboundOrderEntry: 5.71,
  inboundRePalletizing: 11.42, inboundReBoxing: 3.43, inboundTierCorrection: 17.14,
  inboundContainer40: 823.26, inboundContainer20: 411.63,
  icCycleCountPallet: 5.71, icCycleCountBulk: 25.70, icCycleCountBin: 5.71,
  icPartCreation: 5.71, icInventoryCheck: 11.42, icPartCorrection: 5.71,
  icConsolidationPallet: 17.14, icConsolidationBin: 5.71, icConsolidationBulk: 31.53,
  icPictures: 3.43,
  outboundPallet: 8.87, outboundCartonNonSerialized: 5.58, outboundCartonLot: 6.73,
  outboundCartonSerial: 6.73, outboundOrderEntry: 5.71, outboundArrangeShipping: 17.14,
  outboundFlatbed: 22.85, outboundOrderCorrection: 5.71, outboundVideoRecording: 68.56,
  outboundRtsPallet: 10.02, outboundRtsCarton: 6.73, outboundRtsBin: 6.73,
  outboundSeal: 5.71, outboundLabeling: 1.14, outboundContainer40: 823.26, outboundContainer20: 411.63,
  miscScanPaperwork: 5.71, miscDimsWeights: 5.71, miscCustomReport: 17.14,
  miscNonSystematic: 17.14, miscBanding: 2.28, miscStretchWrap: 1.14,
  miscWasteDisposal: 5.71, miscSpecialty: 29.30,
};

// Morton base costs (use Patterson-like structure)
const mortonBase: FacilityBaseCosts = {
  ...pattersonBase,
  facilityId: "morton",
  storagePerSqFt: 1.831,
  bulkPerPallet: 24.50,
};

// Lucid AZ base costs (lower labor market)
const lucidAzBase: FacilityBaseCosts = {
  facilityId: "lucid-az",
  storagePerSqFt: 1.392, bulkPerPallet: 34.26, rackedPerPallet: null,
  mhIcHourly: 35.96, leadHourly: 41.86, supervisorHourly: 51.46, managerHourly: 63.18,
  inboundPalletFIFO: 7.80, inboundPalletLot: 8.80, inboundCartonNonSerialized: 4.90,
  inboundCartonLot: 5.90, inboundCartonSerial: 5.90, inboundOversized: 11.70,
  inboundFlatbed: 20.07, inboundVariance: 5.02, inboundDeblock: 5.02,
  inboundLabelCreation: 2.01, inboundFailedReturn: 3.01, inboundOrderEntry: 5.02,
  inboundRePalletizing: 10.04, inboundReBoxing: 3.01, inboundTierCorrection: 15.06,
  inboundContainer40: 722.00, inboundContainer20: 361.00,
  icCycleCountPallet: 5.02, icCycleCountBulk: 22.58, icCycleCountBin: 5.02,
  icPartCreation: 5.02, icInventoryCheck: 10.04, icPartCorrection: 5.02,
  icConsolidationPallet: 15.06, icConsolidationBin: 5.02, icConsolidationBulk: 27.56,
  icPictures: 3.01,
  outboundPallet: 7.80, outboundCartonNonSerialized: 4.90, outboundCartonLot: 5.90,
  outboundCartonSerial: 5.90, outboundOrderEntry: 5.02, outboundArrangeShipping: 15.06,
  outboundFlatbed: 20.07, outboundOrderCorrection: 5.02, outboundVideoRecording: 60.12,
  outboundRtsPallet: 8.80, outboundRtsCarton: 5.90, outboundRtsBin: 5.90,
  outboundSeal: 5.02, outboundLabeling: 1.00, outboundContainer40: 722.00, outboundContainer20: 361.00,
  miscScanPaperwork: 5.02, miscDimsWeights: 5.02, miscCustomReport: 15.06,
  miscNonSystematic: 15.06, miscBanding: 2.01, miscStretchWrap: 1.00,
  miscWasteDisposal: 5.02, miscSpecialty: 25.80,
};

// Default base (for facilities without specific rate data — use Patterson as baseline)
const defaultBase: FacilityBaseCosts = { ...pattersonBase, facilityId: "default" };

export const facilityBaseCosts: Record<string, FacilityBaseCosts> = {
  "patterson": pattersonBase,
  "kato": katoBase,
  "hayman": haymanBase,
  "morton": mortonBase,
  "lucid-az": lucidAzBase,
  "mowry": { ...defaultBase, facilityId: "mowry" },
  "christy": { ...defaultBase, facilityId: "christy" },
  "vista-ridge": { ...defaultBase, facilityId: "vista-ridge" },
  "hardy": { ...defaultBase, facilityId: "hardy" },
  "hawthorne": { ...defaultBase, facilityId: "hawthorne" },
  "grand": { ...defaultBase, facilityId: "grand" },
  "whitmore-lake": { ...defaultBase, facilityId: "whitmore-lake", storagePerSqFt: 1.50 },
  "industrial": { ...defaultBase, facilityId: "industrial" },
};

// ──────────────────────────────────────────────────────
// 4. PRICING CALCULATOR
// ──────────────────────────────────────────────────────

export function applyMarkup(baseCost: number, markupPct: number): number {
  return Math.round(baseCost * (1 + markupPct / 100) * 100) / 100;
}

export function generateRateCard(facilityId: string, markupPct: number) {
  const base = facilityBaseCosts[facilityId] || facilityBaseCosts["patterson"];
  const m = (v: number) => applyMarkup(v, markupPct);

  return {
    facility: facilities.find(f => f.id === facilityId),
    markup: markupPct,
    storage: {
      perSqFt: m(base.storagePerSqFt),
      bulkPerPallet: m(base.bulkPerPallet),
      rackedPerPallet: base.rackedPerPallet ? m(base.rackedPerPallet) : null,
    },
    hourly: {
      mhIc: m(base.mhIcHourly),
      lead: m(base.leadHourly),
      supervisor: m(base.supervisorHourly),
      manager: m(base.managerHourly),
    },
    inbound: [
      { service: "Pallet In — Single SKU (FIFO)", rate: m(base.inboundPalletFIFO) },
      { service: "Pallet In — Single SKU (Lot Controlled)", rate: m(base.inboundPalletLot) },
      { service: "Carton In — Non-Serialized / Non-Lot", rate: m(base.inboundCartonNonSerialized) },
      { service: "Carton In — Lot Controlled", rate: m(base.inboundCartonLot) },
      { service: "Carton In — Serial Controlled", rate: m(base.inboundCartonSerial) },
      { service: "Oversized Pallet/Crate (≤96×80×90\")", rate: m(base.inboundOversized) },
      { service: "Flatbed Offloading per Pallet", rate: m(base.inboundFlatbed) },
      { service: "Receiving Variance", rate: m(base.inboundVariance) },
      { service: "DeBlock-N-Brace Inbound Container", rate: m(base.inboundDeblock) },
      { service: "Label Creation", rate: m(base.inboundLabelCreation) },
      { service: "Failed Delivery Return (Re-ship)", rate: m(base.inboundFailedReturn) },
      { service: "Order Entry — Inbound", rate: m(base.inboundOrderEntry) },
      { service: "Re-Palletizing", rate: m(base.inboundRePalletizing) },
      { service: "Re-Boxing", rate: m(base.inboundReBoxing) },
      { service: "TIER / HEIGHT Correction", rate: m(base.inboundTierCorrection) },
      { service: "Floor Loaded 40' Ocean Container", rate: m(base.inboundContainer40) },
      { service: "Floor Loaded 20' Ocean Container", rate: m(base.inboundContainer20) },
    ],
    inventoryControl: [
      { service: "Cycle Count — Pallet Location (Single SKU)", rate: m(base.icCycleCountPallet) },
      { service: "Cycle Count — Bulk Location", rate: m(base.icCycleCountBulk) },
      { service: "Cycle Count — Bin Location (Single SKU)", rate: m(base.icCycleCountBin) },
      { service: "Part Creation", rate: m(base.icPartCreation) },
      { service: "Inventory Check", rate: m(base.icInventoryCheck) },
      { service: "Part/SKU Correction", rate: m(base.icPartCorrection) },
      { service: "Inventory Consolidation per Pallet", rate: m(base.icConsolidationPallet) },
      { service: "Inventory Consolidation per Bin", rate: m(base.icConsolidationBin) },
      { service: "Inventory Consolidation per Bulk", rate: m(base.icConsolidationBulk) },
      { service: "Request For Pictures", rate: m(base.icPictures) },
    ],
    outbound: [
      { service: "Pallet Out — Single SKU", rate: m(base.outboundPallet) },
      { service: "Carton Out — Non-Serialized / Non-Lot", rate: m(base.outboundCartonNonSerialized) },
      { service: "Carton Out — Lot Controlled", rate: m(base.outboundCartonLot) },
      { service: "Carton Out — Serial Controlled", rate: m(base.outboundCartonSerial) },
      { service: "Order Entry — Outbound", rate: m(base.outboundOrderEntry) },
      { service: "Arrange Shipping", rate: m(base.outboundArrangeShipping) },
      { service: "Flatbed Loading per Pallet", rate: m(base.outboundFlatbed) },
      { service: "Order Correction", rate: m(base.outboundOrderCorrection) },
      { service: "Video Recording Outbound Loading", rate: m(base.outboundVideoRecording) },
      { service: "Return to Stock (RTS) — Pallet", rate: m(base.outboundRtsPallet) },
      { service: "Return to Stock (RTS) — Carton", rate: m(base.outboundRtsCarton) },
      { service: "Return to Stock (RTS) — Bin", rate: m(base.outboundRtsBin) },
      { service: "Affixing Seal(s)", rate: m(base.outboundSeal) },
      { service: "OverPack/HazMat/Other Labeling", rate: m(base.outboundLabeling) },
      { service: "Floor Loaded 40' Ocean Container", rate: m(base.outboundContainer40) },
      { service: "Floor Loaded 20' Ocean Container", rate: m(base.outboundContainer20) },
    ],
    miscellaneous: [
      { service: "Scan Paperwork", rate: m(base.miscScanPaperwork) },
      { service: "Dims & Weights Request", rate: m(base.miscDimsWeights) },
      { service: "Custom Report Request", rate: m(base.miscCustomReport) },
      { service: "Non-Systematic Information Request", rate: m(base.miscNonSystematic) },
      { service: "Banding (Plastic)", rate: m(base.miscBanding) },
      { service: "Stretch-Wrap", rate: m(base.miscStretchWrap) },
      { service: "Excess Waste Disposal", rate: m(base.miscWasteDisposal) },
      { service: "Specialty Service", rate: m(base.miscSpecialty) },
    ],
    suppliesMarkup: 25, // always 25%
  };
}

// ──────────────────────────────────────────────────────
// 5. INTAKE FORM OPTIONS (from Insightly CRM fields)
// ──────────────────────────────────────────────────────

export const serviceTypes = ["Warehouse", "Warehouse & Transportation"];
export const serviceCategories = ["Contract Warehousing", "Managed Transportation", "FTZ Services", "Value-Added Services"];
export const opportunityTypes = ["New", "Addendum", "Renewal"];
export const verticals = ["Semiconductor", "EV / Battery", "Solar / Clean Energy", "Consumer Electronics", "Industrial / Manufacturing", "Automotive", "Medical Device", "Other"];
export const tiers = ["Tier 1 — Strategic", "Tier 2 — Core", "Tier 3 — Standard", "Tier 4 — Transactional"];
export const contractTerms = ["< 3 Months", "3-6 Months", "6-12 Months", "1-2 Years", "2-3 Years", "3+ Years"];
export const inboundHandlingUnits = ["Pallet", "Carton", "Crate / Oversized", "Floor Loaded Container"];
export const inboundDeliveryTypes = ["53' Trailer", "LTL", "40' Ocean Container", "20' Ocean Container", "Flatbed", "Parcel / Small Package"];
export const inboundDeliveryConditions = ["Palletized", "Floor Loaded", "Mixed"];
export const outboundHandlingUnits = ["Pallet", "Carton", "Each / Piece"];
export const outboundDeliveryTypes = ["FTL", "LTL", "Parcel", "Flatbed", "Ocean Container", "Customer Pickup"];
export const outboundDeliveryConditions = ["Palletized", "Floor Loaded", "Mixed"];
export const stackingOptions = ["Single", "Double", "Triple", "Non-Stackable"];
export const hoursOfOperation = ["Standard (M-F 7am-4pm)", "Extended (M-F 6am-6pm)", "24/5", "24/7"];
export const paymentTermsOptions = ["Net 30", "Net 45", "Net 60", "Net 90"];
export const storageTypes = ["Sq. Ft. (Monthly)", "Bulk Pallet", "Racked Pallet"];

// ──────────────────────────────────────────────────────
// 6. BENCHMARK DATA (from Rich's analysis)
// ──────────────────────────────────────────────────────

export const recentBenchmarks = [
  { client: "KLA", facility: "Patterson", rateSqFt: 2.05, markup: "40%", date: "Dec 2025" },
  { client: "Tesla Cyber", facility: "Patterson", rateSqFt: 2.49, markup: "COLA", date: "Nov 2025" },
  { client: "Asteel Flash", facility: "Patterson", rateSqFt: 1.96, markup: "35%", date: "Nov 2025" },
  { client: "Delta Fans", facility: "Patterson", rateSqFt: 2.08, markup: "COLA", date: "Nov 2025" },
  { client: "Netflix", facility: "Hayman", rateSqFt: 2.18, markup: "35%+", date: "Feb 2026" },
  { client: "Tesla Glass", facility: "Hayman", rateSqFt: 2.17, markup: "COLA", date: "Dec 2025" },
  { client: "KLA", facility: "Morton", rateSqFt: 2.38, markup: "30%", date: "Dec 2025" },
  { client: "Tesla Off-Book", facility: "Morton", rateSqFt: 2.38, markup: "30%", date: "Dec 2025" },
  { client: "Q'Apel", facility: "Kato", rateSqFt: 3.49, markup: "35%", date: "Mar 2026" },
  { client: "Lucid AZ", facility: "Lucid AZ", rateSqFt: 1.74, markup: "25%", date: "Mar 2026" },
];

// ──────────────────────────────────────────────────────
// 7. RECENT QUOTES (from email approvals)
// ──────────────────────────────────────────────────────

export interface RecentQuote {
  id: string;
  client: string;
  facility: string;
  type: string;
  markup: string;
  storageSqFt: string;
  status: "approved" | "pending" | "in-review";
  date: string;
  notes: string;
  margin?: string;
}

export const recentQuotes: RecentQuote[] = [
  { id: "q1", client: "DEI (Delta Products)", facility: "Patterson", type: "New", markup: "Storage 25% / Hourly-Trans 35%", storageSqFt: "$1.83", status: "pending", date: "Mar 17, 2026", notes: "Split markup per previous Delta contracts" },
  { id: "q2", client: "DEI (Delta Products)", facility: "Kato", type: "New", markup: "Storage 25% / Hourly-Trans 35%", storageSqFt: "$3.23", status: "pending", date: "Mar 17, 2026", notes: "Higher Kato labor base" },
  { id: "q3", client: "Q'Apel", facility: "Kato", type: "Renewal", markup: "35%", storageSqFt: "$3.49", status: "pending", date: "Mar 17, 2026", notes: "Small account — 35% all rates" },
  { id: "q4", client: "Q'Apel", facility: "Hayman", type: "Renewal", markup: "35%", storageSqFt: "$2.18", status: "pending", date: "Mar 17, 2026", notes: "Small account — 35% all rates" },
  { id: "q5", client: "Matic", facility: "Hayman", type: "New", markup: "35%", storageSqFt: "$2.18", status: "approved", date: "Mar 10, 2026", notes: "Racked: $15.70/pallet. Initially 25%, Joe raised to 35%" },
  { id: "q6", client: "Lucid Border Truck", facility: "Lucid AZ", type: "New", markup: "25%", storageSqFt: "$1.74", status: "approved", date: "Mar 11, 2026", notes: "50K sqft sublease, 3-month term" },
  { id: "q7", client: "Lucid", facility: "Whitmore Lake", type: "Renewal", markup: "Flat (COLA)", storageSqFt: "—", status: "approved", date: "Mar 9, 2026", notes: "31.31% margin in 2025 — rates held flat", margin: "31.31%" },
  { id: "q8", client: "Quilt", facility: "Hayman/Morton", type: "Renewal", markup: "35%", storageSqFt: "H: $2.18 / M: $2.45", status: "approved", date: "Feb 23, 2026", notes: "Converted from per-pallet to per-sqft" },
];
