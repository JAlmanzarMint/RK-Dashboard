// ──────────────────────────────────────────────────────
// On Time Trucking — LTL Final Mile Pricing Engine
// Based on: Ruth@ontimetrucking.com daily ops, Nereida weekly KPIs,
// Travis Bell monthly revenue data, and industry LTL rate structures
// ──────────────────────────────────────────────────────

// ── Service Area Zones ──────────────────────────────
export interface Zone {
  id: string;
  name: string;
  description: string;
  baseMileRadius: string;
  fuelPct: number; // fuel surcharge %
  deliveryDays: string;
}

export const zones: Zone[] = [
  { id: "zone-a", name: "Zone A — Metro NYC", description: "Manhattan, Brooklyn, Queens, Bronx, Staten Island", baseMileRadius: "0–25 mi", fuelPct: 12.5, deliveryDays: "Next Day" },
  { id: "zone-b", name: "Zone B — Inner Ring", description: "Long Island, Northern NJ, Lower Westchester, SW Connecticut", baseMileRadius: "25–50 mi", fuelPct: 13.0, deliveryDays: "Next Day" },
  { id: "zone-c", name: "Zone C — Outer Ring", description: "Central NJ, Westchester, Rockland, Fairfield CT", baseMileRadius: "50–100 mi", fuelPct: 13.5, deliveryDays: "1–2 Days" },
  { id: "zone-d", name: "Zone D — Extended", description: "PA (East), CT (Statewide), Upstate NY (South)", baseMileRadius: "100–150 mi", fuelPct: 14.0, deliveryDays: "2–3 Days" },
  { id: "zone-e", name: "Zone E — Regional", description: "Greater Tristate Extended — DE, MD, MA border", baseMileRadius: "150–250 mi", fuelPct: 15.0, deliveryDays: "3–5 Days" },
];

// ── Freight Classes (NMFC standard) ─────────────────
export interface FreightClass {
  classNum: number;
  label: string;
  densityRange: string;
  rateMultiplier: number; // vs class 100 base
}

export const freightClasses: FreightClass[] = [
  { classNum: 50, label: "Class 50", densityRange: "50+ lbs/ft³", rateMultiplier: 0.55 },
  { classNum: 55, label: "Class 55", densityRange: "35–50 lbs/ft³", rateMultiplier: 0.60 },
  { classNum: 60, label: "Class 60", densityRange: "30–35 lbs/ft³", rateMultiplier: 0.65 },
  { classNum: 65, label: "Class 65", densityRange: "22.5–30 lbs/ft³", rateMultiplier: 0.72 },
  { classNum: 70, label: "Class 70", densityRange: "15–22.5 lbs/ft³", rateMultiplier: 0.80 },
  { classNum: 77.5, label: "Class 77.5", densityRange: "13.5–15 lbs/ft³", rateMultiplier: 0.87 },
  { classNum: 85, label: "Class 85", densityRange: "12–13.5 lbs/ft³", rateMultiplier: 0.93 },
  { classNum: 92.5, label: "Class 92.5", densityRange: "10.5–12 lbs/ft³", rateMultiplier: 0.97 },
  { classNum: 100, label: "Class 100", densityRange: "8–10.5 lbs/ft³", rateMultiplier: 1.00 },
  { classNum: 110, label: "Class 110", densityRange: "7–8 lbs/ft³", rateMultiplier: 1.10 },
  { classNum: 125, label: "Class 125", densityRange: "6–7 lbs/ft³", rateMultiplier: 1.25 },
  { classNum: 150, label: "Class 150", densityRange: "4–6 lbs/ft³", rateMultiplier: 1.45 },
  { classNum: 175, label: "Class 175", densityRange: "3–4 lbs/ft³", rateMultiplier: 1.65 },
  { classNum: 200, label: "Class 200", densityRange: "2–3 lbs/ft³", rateMultiplier: 1.90 },
  { classNum: 250, label: "Class 250", densityRange: "1–2 lbs/ft³", rateMultiplier: 2.40 },
  { classNum: 300, label: "Class 300", densityRange: "<1 lbs/ft³", rateMultiplier: 3.00 },
  { classNum: 400, label: "Class 400", densityRange: "<0.5 lbs/ft³", rateMultiplier: 3.80 },
  { classNum: 500, label: "Class 500", densityRange: "Very low density", rateMultiplier: 4.50 },
];

// ── Weight Breaks (CWT rates) ───────────────────────
export interface WeightBreak {
  label: string;
  minLbs: number;
  maxLbs: number;
  baseCWT: number; // base rate per CWT (hundredweight) for Class 100
}

export const weightBreaks: WeightBreak[] = [
  { label: "Minimum", minLbs: 0, maxLbs: 99, baseCWT: 48.50 },
  { label: "100–499 lbs", minLbs: 100, maxLbs: 499, baseCWT: 38.75 },
  { label: "500–999 lbs", minLbs: 500, maxLbs: 999, baseCWT: 28.50 },
  { label: "1,000–1,999 lbs", minLbs: 1000, maxLbs: 1999, baseCWT: 22.25 },
  { label: "2,000–4,999 lbs", minLbs: 2000, maxLbs: 4999, baseCWT: 17.80 },
  { label: "5,000–9,999 lbs", minLbs: 5000, maxLbs: 9999, baseCWT: 14.50 },
  { label: "10,000–19,999 lbs", minLbs: 10000, maxLbs: 19999, baseCWT: 11.75 },
  { label: "20,000+ lbs", minLbs: 20000, maxLbs: 99999, baseCWT: 9.25 },
];

// ── Zone Multipliers ────────────────────────────────
export const zoneMultipliers: Record<string, number> = {
  "zone-a": 1.00,
  "zone-b": 1.12,
  "zone-c": 1.28,
  "zone-d": 1.45,
  "zone-e": 1.65,
};

// ── Accessorial Charges ─────────────────────────────
export interface Accessorial {
  id: string;
  name: string;
  description: string;
  rate: number;
  rateType: "flat" | "per-cwt" | "per-piece" | "per-hour" | "pct";
  category: "delivery" | "handling" | "service" | "special";
}

export const accessorials: Accessorial[] = [
  // Delivery
  { id: "liftgate-del", name: "Liftgate Delivery", description: "Hydraulic liftgate at delivery", rate: 95, rateType: "flat", category: "delivery" },
  { id: "liftgate-pu", name: "Liftgate Pickup", description: "Hydraulic liftgate at pickup", rate: 95, rateType: "flat", category: "delivery" },
  { id: "inside-del", name: "Inside Delivery", description: "Delivery past first threshold/door", rate: 125, rateType: "flat", category: "delivery" },
  { id: "inside-pu", name: "Inside Pickup", description: "Pickup from inside location", rate: 125, rateType: "flat", category: "delivery" },
  { id: "residential-del", name: "Residential Delivery", description: "Delivery to residential address", rate: 85, rateType: "flat", category: "delivery" },
  { id: "residential-pu", name: "Residential Pickup", description: "Pickup from residential address", rate: 85, rateType: "flat", category: "delivery" },
  { id: "appointment", name: "Appointment Delivery", description: "Scheduled delivery window", rate: 45, rateType: "flat", category: "delivery" },
  { id: "notify-before", name: "Notify Before Delivery", description: "Call before delivery", rate: 15, rateType: "flat", category: "delivery" },
  { id: "sort-segregate", name: "Sort & Segregate", description: "Sort shipment at delivery", rate: 5.50, rateType: "per-piece", category: "delivery" },

  // Handling
  { id: "redelivery", name: "Redelivery", description: "Failed first attempt redelivery", rate: 145, rateType: "flat", category: "handling" },
  { id: "reconsignment", name: "Reconsignment/Diversion", description: "Redirect after pickup", rate: 125, rateType: "flat", category: "handling" },
  { id: "storage", name: "Storage (Per Day)", description: "Terminal storage after free time", rate: 55, rateType: "flat", category: "handling" },
  { id: "extra-labor", name: "Extra Labor", description: "Additional handling labor per hour", rate: 85, rateType: "per-hour", category: "handling" },
  { id: "palletize", name: "Palletizing", description: "Palletize loose freight per pallet", rate: 45, rateType: "per-piece", category: "handling" },
  { id: "unpack-inspect", name: "Unpack & Inspect", description: "Open, inspect, repack", rate: 12.50, rateType: "per-piece", category: "handling" },

  // Service
  { id: "protect-from-freeze", name: "Protect From Freezing", description: "Temperature-sensitive handling", rate: 4.25, rateType: "per-cwt", category: "service" },
  { id: "hazmat", name: "Hazardous Materials", description: "DOT hazmat handling", rate: 175, rateType: "flat", category: "service" },
  { id: "construction-site", name: "Construction Site Delivery", description: "Non-commercial delivery site", rate: 150, rateType: "flat", category: "service" },
  { id: "limited-access", name: "Limited Access", description: "Schools, churches, military, etc.", rate: 110, rateType: "flat", category: "service" },
  { id: "trade-show", name: "Trade Show Delivery", description: "Convention/trade show venue", rate: 185, rateType: "flat", category: "service" },

  // Special
  { id: "white-glove", name: "White Glove Service", description: "Premium handling, room of choice", rate: 325, rateType: "flat", category: "special" },
  { id: "assembly", name: "Assembly Service", description: "Basic assembly at delivery", rate: 95, rateType: "per-hour", category: "special" },
  { id: "debris-removal", name: "Debris Removal", description: "Remove packaging/old items", rate: 75, rateType: "flat", category: "special" },
  { id: "2-person", name: "2-Person Delivery", description: "Team delivery for heavy items", rate: 185, rateType: "flat", category: "special" },
  { id: "weekend-del", name: "Weekend Delivery", description: "Saturday/Sunday delivery", rate: 250, rateType: "flat", category: "special" },
  { id: "same-day", name: "Same-Day Rush", description: "Same-day expedited delivery", rate: 350, rateType: "flat", category: "special" },
];

// ── Carrier Partners ────────────────────────────────
export interface CarrierPartner {
  name: string;
  code: string;
  type: string;
  avgPickupsDay: number;
  avgStopsDay: number;
  onTimePct: number;
}

export const carrierPartners: CarrierPartner[] = [
  { name: "Saia", code: "SAIA", type: "National LTL", avgPickupsDay: 3, avgStopsDay: 2, onTimePct: 96.2 },
  { name: "TForce Freight", code: "TF", type: "National LTL", avgPickupsDay: 22, avgStopsDay: 14, onTimePct: 94.8 },
  { name: "Roadrunner", code: "RR", type: "National LTL", avgPickupsDay: 28, avgStopsDay: 22, onTimePct: 93.5 },
  { name: "Estes Express", code: "ESTES", type: "National LTL", avgPickupsDay: 12, avgStopsDay: 4, onTimePct: 95.7 },
  { name: "Hercules Forwarding", code: "HERC", type: "Regional", avgPickupsDay: 4, avgStopsDay: 3, onTimePct: 94.0 },
];

// ── Volume Discounts ────────────────────────────────
export interface VolumeDiscount {
  label: string;
  minShipmentsMonth: number;
  maxShipmentsMonth: number;
  discountPct: number;
}

export const volumeDiscounts: VolumeDiscount[] = [
  { label: "Standard", minShipmentsMonth: 0, maxShipmentsMonth: 49, discountPct: 0 },
  { label: "Bronze", minShipmentsMonth: 50, maxShipmentsMonth: 149, discountPct: 5 },
  { label: "Silver", minShipmentsMonth: 150, maxShipmentsMonth: 299, discountPct: 10 },
  { label: "Gold", minShipmentsMonth: 300, maxShipmentsMonth: 499, discountPct: 15 },
  { label: "Platinum", minShipmentsMonth: 500, maxShipmentsMonth: 99999, discountPct: 20 },
];

// ── Service Levels ──────────────────────────────────
export interface ServiceLevel {
  id: string;
  name: string;
  description: string;
  premiumPct: number; // surcharge vs standard
  transitDays: string;
}

export const serviceLevels: ServiceLevel[] = [
  { id: "standard", name: "Standard Final Mile", description: "Standard LTL delivery with notification", premiumPct: 0, transitDays: "2–5 business days" },
  { id: "expedited", name: "Expedited Delivery", description: "Priority handling, guaranteed window", premiumPct: 35, transitDays: "1–2 business days" },
  { id: "white-glove", name: "White Glove", description: "Room of choice, unpack, debris removal", premiumPct: 75, transitDays: "Scheduled" },
  { id: "threshold", name: "Threshold Delivery", description: "First dry area inside first door", premiumPct: 15, transitDays: "2–5 business days" },
  { id: "curbside", name: "Curbside Delivery", description: "Delivery to curbside/ground level", premiumPct: 0, transitDays: "2–5 business days" },
];

// ── Commodity Types (common for final mile) ─────────
export const commodityTypes = [
  "Furniture / Home Furnishings",
  "Appliances (Large)",
  "Appliances (Small)",
  "Electronics / AV Equipment",
  "Building Materials / Fixtures",
  "Medical / Lab Equipment",
  "Industrial Parts / Components",
  "Retail / Consumer Goods",
  "Trade Show / Exhibition",
  "Pharmaceutical / Temperature Sensitive",
  "Mattress / Bedding",
  "Exercise / Fitness Equipment",
  "Office Furniture / Equipment",
  "Other",
];

// ── Pickup Window Options ───────────────────────────
export const pickupWindows = [
  "8:00 AM – 12:00 PM",
  "12:00 PM – 5:00 PM",
  "8:00 AM – 5:00 PM (Full Day)",
  "Specific Time (Appointment)",
];

// ── Delivery Window Options ─────────────────────────
export const deliveryWindows = [
  "8:00 AM – 12:00 PM",
  "12:00 PM – 5:00 PM",
  "8:00 AM – 5:00 PM (Full Day)",
  "2-Hour Window (Premium)",
  "4-Hour Window",
  "Specific Time (Appointment)",
];

// ── Rate Calculation Engine ─────────────────────────
export interface QuoteInput {
  weight: number;         // lbs
  pieces: number;
  freightClass: number;
  zone: string;           // zone id
  serviceLevel: string;   // service level id
  accessorialIds: string[];
  monthlyVolume: number;  // estimated monthly shipments
  // Dimensions for density calc
  lengthIn?: number;
  widthIn?: number;
  heightIn?: number;
}

export interface QuoteResult {
  baseCharge: number;
  classAdjustment: number;
  zoneCharge: number;
  fuelSurcharge: number;
  serviceLevelPremium: number;
  accessorialTotal: number;
  accessorialBreakdown: { name: string; amount: number }[];
  subtotal: number;
  volumeDiscount: number;
  volumeDiscountPct: number;
  volumeTier: string;
  totalCharge: number;
  ratePerCWT: number;
  ratePerPiece: number;
  ratePerLb: number;
  minimumCharge: number;
  estimatedTransit: string;
  calculatedDensity?: number;
  calculatedClass?: number;
}

export function calculateDensity(lengthIn: number, widthIn: number, heightIn: number, weight: number): { density: number; suggestedClass: number } {
  const cubicFeet = (lengthIn * widthIn * heightIn) / 1728;
  if (cubicFeet <= 0) return { density: 0, suggestedClass: 100 };
  const density = weight / cubicFeet;

  let suggestedClass = 500;
  if (density >= 50) suggestedClass = 50;
  else if (density >= 35) suggestedClass = 55;
  else if (density >= 30) suggestedClass = 60;
  else if (density >= 22.5) suggestedClass = 65;
  else if (density >= 15) suggestedClass = 70;
  else if (density >= 13.5) suggestedClass = 77.5;
  else if (density >= 12) suggestedClass = 85;
  else if (density >= 10.5) suggestedClass = 92.5;
  else if (density >= 8) suggestedClass = 100;
  else if (density >= 7) suggestedClass = 110;
  else if (density >= 6) suggestedClass = 125;
  else if (density >= 4) suggestedClass = 150;
  else if (density >= 3) suggestedClass = 175;
  else if (density >= 2) suggestedClass = 200;
  else if (density >= 1) suggestedClass = 250;
  else if (density >= 0.5) suggestedClass = 300;
  else suggestedClass = 400;

  return { density: Math.round(density * 100) / 100, suggestedClass };
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const MINIMUM_CHARGE = 185;

  // Find weight break
  const wb = weightBreaks.find(w => input.weight >= w.minLbs && input.weight <= w.maxLbs)
    || weightBreaks[weightBreaks.length - 1];
  const baseCWT = wb.baseCWT;

  // CWT calculation
  const cwt = Math.max(input.weight / 100, 1);
  const baseCharge = baseCWT * cwt;

  // Class multiplier
  const fc = freightClasses.find(f => f.classNum === input.freightClass) || freightClasses[8]; // default 100
  const classAdjustment = baseCharge * (fc.rateMultiplier - 1);
  const classAdjustedTotal = baseCharge * fc.rateMultiplier;

  // Zone multiplier
  const zoneMult = zoneMultipliers[input.zone] || 1;
  const zoneCharge = classAdjustedTotal * (zoneMult - 1);
  const zoneTotal = classAdjustedTotal * zoneMult;

  // Fuel surcharge
  const zoneData = zones.find(z => z.id === input.zone);
  const fuelPct = zoneData?.fuelPct || 13;
  const fuelSurcharge = zoneTotal * (fuelPct / 100);

  // Service level
  const sl = serviceLevels.find(s => s.id === input.serviceLevel) || serviceLevels[0];
  const serviceLevelPremium = zoneTotal * (sl.premiumPct / 100);

  // Accessorials
  const accessorialBreakdown: { name: string; amount: number }[] = [];
  let accessorialTotal = 0;
  for (const accId of input.accessorialIds) {
    const acc = accessorials.find(a => a.id === accId);
    if (!acc) continue;
    let amount = 0;
    switch (acc.rateType) {
      case "flat": amount = acc.rate; break;
      case "per-cwt": amount = acc.rate * cwt; break;
      case "per-piece": amount = acc.rate * input.pieces; break;
      case "per-hour": amount = acc.rate * 1; break; // minimum 1 hour
      case "pct": amount = zoneTotal * (acc.rate / 100); break;
    }
    accessorialBreakdown.push({ name: acc.name, amount });
    accessorialTotal += amount;
  }

  const subtotal = zoneTotal + fuelSurcharge + serviceLevelPremium + accessorialTotal;

  // Volume discount
  const vd = volumeDiscounts.find(v => input.monthlyVolume >= v.minShipmentsMonth && input.monthlyVolume <= v.maxShipmentsMonth)
    || volumeDiscounts[0];
  const volumeDiscount = subtotal * (vd.discountPct / 100);

  const totalCharge = Math.max(subtotal - volumeDiscount, MINIMUM_CHARGE);

  // Density calculation if dimensions provided
  let calculatedDensity: number | undefined;
  let calculatedClass: number | undefined;
  if (input.lengthIn && input.widthIn && input.heightIn && input.weight) {
    const dc = calculateDensity(input.lengthIn, input.widthIn, input.heightIn, input.weight);
    calculatedDensity = dc.density;
    calculatedClass = dc.suggestedClass;
  }

  return {
    baseCharge: Math.round(baseCharge * 100) / 100,
    classAdjustment: Math.round(classAdjustment * 100) / 100,
    zoneCharge: Math.round(zoneCharge * 100) / 100,
    fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
    serviceLevelPremium: Math.round(serviceLevelPremium * 100) / 100,
    accessorialTotal: Math.round(accessorialTotal * 100) / 100,
    accessorialBreakdown,
    subtotal: Math.round(subtotal * 100) / 100,
    volumeDiscount: Math.round(volumeDiscount * 100) / 100,
    volumeDiscountPct: vd.discountPct,
    volumeTier: vd.label,
    totalCharge: Math.round(totalCharge * 100) / 100,
    ratePerCWT: Math.round((totalCharge / cwt) * 100) / 100,
    ratePerPiece: Math.round((totalCharge / Math.max(input.pieces, 1)) * 100) / 100,
    ratePerLb: Math.round((totalCharge / Math.max(input.weight, 1)) * 100) / 100,
    minimumCharge: MINIMUM_CHARGE,
    estimatedTransit: sl.transitDays,
    calculatedDensity,
    calculatedClass,
  };
}

// ── Recent Quotes (sample data from OTT ops) ───────
export interface SampleQuote {
  id: string;
  date: string;
  customer: string;
  origin: string;
  destination: string;
  weight: number;
  pieces: number;
  freightClass: number;
  zone: string;
  serviceLevel: string;
  total: number;
  status: "delivered" | "in-transit" | "pending" | "quoted";
}

export const sampleQuotes: SampleQuote[] = [
  { id: "Q-2026-0312", date: "2026-03-12", customer: "Wayfair", origin: "Farmingdale, NY", destination: "Manhattan, NY", weight: 450, pieces: 3, freightClass: 100, zone: "Zone A", serviceLevel: "White Glove", total: 685.00, status: "delivered" },
  { id: "Q-2026-0311", date: "2026-03-11", customer: "Ashley Furniture", origin: "Farmingdale, NY", destination: "Paramus, NJ", weight: 1200, pieces: 6, freightClass: 85, zone: "Zone B", serviceLevel: "Threshold", total: 525.50, status: "delivered" },
  { id: "Q-2026-0310", date: "2026-03-10", customer: "Best Buy", origin: "Farmingdale, NY", destination: "Stamford, CT", weight: 280, pieces: 2, freightClass: 92.5, zone: "Zone C", serviceLevel: "Standard", total: 342.75, status: "delivered" },
  { id: "Q-2026-0309", date: "2026-03-09", customer: "Costco Wholesale", origin: "Farmingdale, NY", destination: "Brooklyn, NY", weight: 3500, pieces: 12, freightClass: 70, zone: "Zone A", serviceLevel: "Standard", total: 1245.00, status: "delivered" },
  { id: "Q-2026-0308", date: "2026-03-08", customer: "Home Depot", origin: "Farmingdale, NY", destination: "Edison, NJ", weight: 850, pieces: 4, freightClass: 100, zone: "Zone B", serviceLevel: "Expedited", total: 785.25, status: "delivered" },
  { id: "Q-2026-0307", date: "2026-03-07", customer: "Overstock", origin: "Farmingdale, NY", destination: "White Plains, NY", weight: 200, pieces: 1, freightClass: 125, zone: "Zone B", serviceLevel: "White Glove", total: 545.00, status: "delivered" },
  { id: "Q-2026-0315", date: "2026-03-15", customer: "Amazon — Last Mile", origin: "Farmingdale, NY", destination: "Newark, NJ", weight: 5200, pieces: 24, freightClass: 70, zone: "Zone B", serviceLevel: "Standard", total: 1875.50, status: "in-transit" },
  { id: "Q-2026-0316", date: "2026-03-16", customer: "MedMetrics RX", origin: "Farmingdale, NY", destination: "Trenton, NJ", weight: 180, pieces: 8, freightClass: 150, zone: "Zone C", serviceLevel: "Standard", total: 495.00, status: "in-transit" },
  { id: "Q-2026-0317", date: "2026-03-17", customer: "Legere Pharma", origin: "Farmingdale, NY", destination: "Hartford, CT", weight: 650, pieces: 5, freightClass: 100, zone: "Zone D", serviceLevel: "Expedited", total: 925.75, status: "pending" },
  { id: "Q-2026-0318", date: "2026-03-18", customer: "Williams-Sonoma", origin: "Farmingdale, NY", destination: "Greenwich, CT", weight: 350, pieces: 2, freightClass: 85, zone: "Zone C", serviceLevel: "White Glove", total: 715.00, status: "quoted" },
];

// ── OTT Operational KPIs (from Ruth's daily emails) ─
export interface DailyOpsKPI {
  date: string;
  totalBills: number;
  otDrivers: number;
  imcDrivers: number;
  totalPickups: number;
  totalStops: number;
  chargeableReturns: number;
  nonChargeableReturns: number;
  billsPerDriverPct: number;
  carrierPickups: { carrier: string; pickups: number; stops: number }[];
}

export const dailyOpsHistory: DailyOpsKPI[] = [
  { date: "2024-06-17", totalBills: 228, otDrivers: 10, imcDrivers: 17, totalPickups: 72, totalStops: 45, chargeableReturns: 3, nonChargeableReturns: 0, billsPerDriverPct: 11.0, carrierPickups: [{ carrier: "Estes", pickups: 10, stops: 2 }, { carrier: "RR", pickups: 32, stops: 27 }, { carrier: "TF", pickups: 23, stops: 14 }, { carrier: "OT", pickups: 6, stops: 1 }, { carrier: "Saia", pickups: 2, stops: 1 }] },
  { date: "2024-06-18", totalBills: 251, otDrivers: 1, imcDrivers: 19, totalPickups: 65, totalStops: 39, chargeableReturns: 5, nonChargeableReturns: 0, billsPerDriverPct: 10.4, carrierPickups: [{ carrier: "Estes", pickups: 17, stops: 3 }, { carrier: "RR", pickups: 20, stops: 18 }, { carrier: "TF", pickups: 25, stops: 15 }, { carrier: "OT", pickups: 2, stops: 2 }, { carrier: "Saia", pickups: 1, stops: 1 }] },
  { date: "2024-06-19", totalBills: 228, otDrivers: 9, imcDrivers: 19, totalPickups: 62, totalStops: 36, chargeableReturns: 3, nonChargeableReturns: 1, billsPerDriverPct: 10.2, carrierPickups: [{ carrier: "Estes", pickups: 10, stops: 4 }, { carrier: "RR", pickups: 31, stops: 19 }, { carrier: "TF", pickups: 20, stops: 12 }, { carrier: "Saia", pickups: 3, stops: 1 }] },
  { date: "2024-06-20", totalBills: 287, otDrivers: 11, imcDrivers: 23, totalPickups: 63, totalStops: 39, chargeableReturns: 2, nonChargeableReturns: 0, billsPerDriverPct: 10.9, carrierPickups: [{ carrier: "Estes", pickups: 10, stops: 3 }, { carrier: "RR", pickups: 27, stops: 21 }, { carrier: "TF", pickups: 22, stops: 13 }, { carrier: "OT", pickups: 3, stops: 1 }, { carrier: "Saia", pickups: 1, stops: 1 }] },
  { date: "2024-11-18", totalBills: 284, otDrivers: 11, imcDrivers: 22, totalPickups: 65, totalStops: 40, chargeableReturns: 4, nonChargeableReturns: 1, billsPerDriverPct: 10.5, carrierPickups: [{ carrier: "Estes", pickups: 12, stops: 3 }, { carrier: "RR", pickups: 25, stops: 20 }, { carrier: "TF", pickups: 24, stops: 15 }, { carrier: "OT", pickups: 3, stops: 1 }, { carrier: "Saia", pickups: 1, stops: 1 }] },
  { date: "2025-03-10", totalBills: 312, otDrivers: 12, imcDrivers: 25, totalPickups: 78, totalStops: 48, chargeableReturns: 3, nonChargeableReturns: 0, billsPerDriverPct: 11.2, carrierPickups: [{ carrier: "Estes", pickups: 14, stops: 4 }, { carrier: "RR", pickups: 30, stops: 24 }, { carrier: "TF", pickups: 28, stops: 16 }, { carrier: "OT", pickups: 4, stops: 2 }, { carrier: "Saia", pickups: 2, stops: 2 }] },
  { date: "2025-06-15", totalBills: 345, otDrivers: 13, imcDrivers: 28, totalPickups: 85, totalStops: 52, chargeableReturns: 2, nonChargeableReturns: 1, billsPerDriverPct: 11.5, carrierPickups: [{ carrier: "Estes", pickups: 15, stops: 5 }, { carrier: "RR", pickups: 33, stops: 26 }, { carrier: "TF", pickups: 30, stops: 17 }, { carrier: "OT", pickups: 5, stops: 3 }, { carrier: "Saia", pickups: 2, stops: 1 }] },
  { date: "2025-10-20", totalBills: 330, otDrivers: 12, imcDrivers: 26, totalPickups: 80, totalStops: 50, chargeableReturns: 3, nonChargeableReturns: 1, billsPerDriverPct: 11.3, carrierPickups: [{ carrier: "Estes", pickups: 13, stops: 4 }, { carrier: "RR", pickups: 31, stops: 25 }, { carrier: "TF", pickups: 28, stops: 17 }, { carrier: "OT", pickups: 5, stops: 2 }, { carrier: "Saia", pickups: 3, stops: 2 }] },
  { date: "2026-01-12", totalBills: 274, otDrivers: 10, imcDrivers: 24, totalPickups: 68, totalStops: 42, chargeableReturns: 4, nonChargeableReturns: 0, billsPerDriverPct: 10.8, carrierPickups: [{ carrier: "Estes", pickups: 11, stops: 3 }, { carrier: "RR", pickups: 28, stops: 22 }, { carrier: "TF", pickups: 24, stops: 14 }, { carrier: "OT", pickups: 3, stops: 2 }, { carrier: "Saia", pickups: 2, stops: 1 }] },
  { date: "2026-03-17", totalBills: 379, otDrivers: 14, imcDrivers: 30, totalPickups: 92, totalStops: 55, chargeableReturns: 2, nonChargeableReturns: 0, billsPerDriverPct: 11.8, carrierPickups: [{ carrier: "Estes", pickups: 16, stops: 5 }, { carrier: "RR", pickups: 35, stops: 28 }, { carrier: "TF", pickups: 32, stops: 18 }, { carrier: "OT", pickups: 6, stops: 3 }, { carrier: "Saia", pickups: 3, stops: 1 }] },
];

// ── Weekly Revenue KPIs (from Nereida's reports) ────
export interface WeeklyKPI {
  week: string;
  dateRange: string;
  revenue: number;
  totalPayroll: number | null;
  laborCostPct: number;
  pros: number;
  revPerPro: number;
  moneyAfterPayroll: number | null;
  warehouseOTPct: number;
  supervisorsOTPct: number;
  notes: string;
}

export const weeklyKPIs: WeeklyKPI[] = [
  { week: "W1", dateRange: "Jan 5–11", revenue: 339000, totalPayroll: null, laborCostPct: 52.4, pros: 1686, revPerPro: 201, moneyAfterPayroll: null, warehouseOTPct: 30.5, supervisorsOTPct: 59.7, notes: "Strong start to 2026" },
  { week: "W2", dateRange: "Jan 12–18", revenue: 321000, totalPayroll: null, laborCostPct: 51.8, pros: 1374, revPerPro: 233, moneyAfterPayroll: null, warehouseOTPct: 22.2, supervisorsOTPct: 42.5, notes: "Rev/pro +16%" },
  { week: "W3", dateRange: "Jan 19–25", revenue: 327000, totalPayroll: 166417, laborCostPct: 50.9, pros: 1501, revPerPro: 218, moneyAfterPayroll: 160274, warehouseOTPct: 19.0, supervisorsOTPct: 42.0, notes: "First time below 51% labor" },
  { week: "W4", dateRange: "Jan 26–Feb 1", revenue: 255000, totalPayroll: null, laborCostPct: 53.0, pros: 1209, revPerPro: 211, moneyAfterPayroll: null, warehouseOTPct: 28.2, supervisorsOTPct: 3.9, notes: "4-day (storm)" },
  { week: "W5", dateRange: "Feb 2–8", revenue: 329000, totalPayroll: null, laborCostPct: 55.0, pros: 1418, revPerPro: 232, moneyAfterPayroll: null, warehouseOTPct: 23.9, supervisorsOTPct: 46.8, notes: "OT regression" },
  { week: "W6", dateRange: "Feb 9–15", revenue: 313000, totalPayroll: null, laborCostPct: 59.6, pros: 1731, revPerPro: 181, moneyAfterPayroll: null, warehouseOTPct: 35.8, supervisorsOTPct: 59.9, notes: "Worst week 2026" },
  { week: "W7", dateRange: "Feb 16–22", revenue: 324363, totalPayroll: null, laborCostPct: 53.1, pros: 1673, revPerPro: 194, moneyAfterPayroll: null, warehouseOTPct: 38.7, supervisorsOTPct: 46.3, notes: "OT improving" },
  { week: "W8", dateRange: "Feb 23–Mar 1", revenue: 254880, totalPayroll: null, laborCostPct: 57.0, pros: 1175, revPerPro: 217, moneyAfterPayroll: null, warehouseOTPct: 18.8, supervisorsOTPct: 38.8, notes: "4-day (weather)" },
  { week: "W9", dateRange: "Mar 2–7", revenue: 314270, totalPayroll: 193118, laborCostPct: 61.4, pros: 1855, revPerPro: 169, moneyAfterPayroll: 121152, warehouseOTPct: 67.5, supervisorsOTPct: 45.0, notes: "Highest pros 2026" },
];

// ── Monthly Revenue (from Travis Bell) ──────────────
export interface MonthlyRevenue {
  month: string;
  ottRevenue: number;
  rkRevenue: number;
  combinedRevenue: number;
}

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jan 2025", ottRevenue: 1207480, rkRevenue: 7034808, combinedRevenue: 8242288 },
  { month: "Feb 2025", ottRevenue: 1117802, rkRevenue: 7091080, combinedRevenue: 8208882 },
  { month: "Mar 2025", ottRevenue: 1340000, rkRevenue: 7108170, combinedRevenue: 8448170 },
  { month: "Apr 2025", ottRevenue: 1481887, rkRevenue: 7212753, combinedRevenue: 8694640 },
  { month: "May 2025", ottRevenue: 1446463, rkRevenue: 7439269, combinedRevenue: 8885732 },
  { month: "Jun 2025", ottRevenue: 1549010, rkRevenue: 7474459, combinedRevenue: 9023469 },
  { month: "Jul 2025", ottRevenue: 1520000, rkRevenue: 7579509, combinedRevenue: 9099509 },
  { month: "Jan 2026", ottRevenue: 1323879, rkRevenue: 7758851, combinedRevenue: 9082731 },
  { month: "Feb 2026", ottRevenue: 1223967, rkRevenue: 7538864, combinedRevenue: 8762832 },
];

// ── Attrition Data (from Nereida Week 3 report) ─────
export interface AttritionData {
  month: string;
  endingHeadcount: number;
  terminations: number;
  attritionRate: number;
}

export const attritionHistory: AttritionData[] = [
  { month: "Jan 2025", endingHeadcount: 48, terminations: 3, attritionRate: 6.2 },
  { month: "Feb 2025", endingHeadcount: 48, terminations: 2, attritionRate: 4.2 },
  { month: "Mar 2025", endingHeadcount: 49, terminations: 1, attritionRate: 2.0 },
  { month: "Apr 2025", endingHeadcount: 51, terminations: 4, attritionRate: 7.8 },
  { month: "May 2025", endingHeadcount: 54, terminations: 3, attritionRate: 5.6 },
  { month: "Jun 2025", endingHeadcount: 57, terminations: 6, attritionRate: 10.5 },
  { month: "Jul 2025", endingHeadcount: 61, terminations: 5, attritionRate: 8.2 },
  { month: "Aug 2025", endingHeadcount: 63, terminations: 3, attritionRate: 4.8 },
  { month: "Sep 2025", endingHeadcount: 60, terminations: 2, attritionRate: 3.1 },
  { month: "Oct 2025", endingHeadcount: 62, terminations: 2, attritionRate: 3.2 },
  { month: "Nov 2025", endingHeadcount: 62, terminations: 2, attritionRate: 3.2 },
  { month: "Dec 2025", endingHeadcount: 62, terminations: 0, attritionRate: 0.0 },
];
