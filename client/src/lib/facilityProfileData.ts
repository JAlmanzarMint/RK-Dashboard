// ═══════════════════════════════════════════════════════
// RK Logistics — Facility Profile Infrastructure Data
// Dock-to-Deal style facility capacity tracking
// ═══════════════════════════════════════════════════════

export interface RackingSection {
  id: string;
  type: "Selective Racking" | "Drive-In Racking" | "Push-Back Racking" | "Pallet Flow" | "Cantilever";
  tempZone: string;
  bayWidth: number; // inches
  aisles: number;
  beamLevels: number;
  positionsPerBay: number;
  totalPositions: number; // auto-calculated
}

export interface ShelvingArea {
  id: string;
  name: string;
  tempZone: string;
  units: number;
  binPositions: number;
  casePositions: number;
}

export interface TempZone {
  id: string;
  name: string;
  type: "Ambient" | "CRT (20–25°C)" | "Refrigerated (2–8°C)" | "Freezer (≤ −18°C)" | "Hazmat" | "DEA Vault" | "Climate Controlled";
  sqft: number;
  palletPositions: number;
  binPositions: number;
}

export interface FloorStorageArea {
  id: string;
  name: string;
  tempZone: string;
  sqft: number;
  palletPositions: number;
}

export interface MHEItem {
  id: string;
  type: string;
  model: string;
  qty: number;
  ownership: "Owned" | "Leased";
  leaseExpiry?: string;
}

export interface LeaseInfo {
  monthlyRent: string;
  annualRent: string;
  rentPsf: string;
  escalation: string;
  leaseStart: string;
  leaseEnd: string;
  renewalOptions: string;
  terminationClause: string;
  cam: string;
  tiAllowance: string;
  insurance: string;
  landlord: string;
}

export interface FacilityProfile {
  name: string;
  status: "Active" | "Partially Vacant" | "Critical Vacancy";
  address: string;
  city: string;
  state: string;
  zip: string;
  totalSqft: number;
  warehouseSqft: number;
  officeSqft: number;
  clearanceHeight: number; // ft
  dockDoors: number;
  driveInDoors: number;
  yearBuilt: number;
  primaryCustomers: string[];
  racking: RackingSection[];
  shelving: ShelvingArea[];
  tempZones: TempZone[];
  floorStorage: FloorStorageArea[];
  mhe: MHEItem[];
  lease: LeaseInfo;
  // Computed capacity summary
  totalPalletPositions: number;
  totalBinPositions: number;
  totalMHEUnits: number;
  leasedMHE: number;
}

// ═══════════════════════════════════════════════════════
// Facility Profiles — All 12 RK Logistics Facilities
// ═══════════════════════════════════════════════════════

export const facilityProfiles: FacilityProfile[] = [
  {
    name: "Christy",
    status: "Active",
    address: "41707 Christy St",
    city: "Fremont",
    state: "CA",
    zip: "94538",
    totalSqft: 190080,
    warehouseSqft: 175000,
    officeSqft: 15080,
    clearanceHeight: 32,
    dockDoors: 12,
    driveInDoors: 2,
    yearBuilt: 2001,
    primaryCustomers: ["KLA"],
    totalPalletPositions: 4200,
    totalBinPositions: 3840,
    totalMHEUnits: 28,
    leasedMHE: 4,
    racking: [
      { id: "chr-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 40, beamLevels: 5, positionsPerBay: 6, totalPositions: 2400 },
      { id: "chr-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 20, beamLevels: 5, positionsPerBay: 6, totalPositions: 1200 },
      { id: "chr-r3", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 120, aisles: 10, beamLevels: 4, positionsPerBay: 5, totalPositions: 600 },
    ],
    shelving: [
      { id: "chr-s1", name: "Pick Module — Zone A", tempZone: "Ambient", units: 48, binPositions: 2880, casePositions: 1440 },
      { id: "chr-s2", name: "Small Parts Storage", tempZone: "Climate Controlled", units: 16, binPositions: 960, casePositions: 480 },
    ],
    tempZones: [
      { id: "chr-t1", name: "Ambient", type: "Ambient", sqft: 120000, palletPositions: 3000, binPositions: 2880 },
      { id: "chr-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 45000, palletPositions: 1200, binPositions: 960 },
      { id: "chr-t3", name: "Hazmat Storage", type: "Hazmat", sqft: 10000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "chr-f1", name: "Staging / Receiving", tempZone: "Ambient", sqft: 8000, palletPositions: 200 },
      { id: "chr-f2", name: "Outbound Staging", tempZone: "Ambient", sqft: 5000, palletPositions: 120 },
      { id: "chr-f3", name: "KLA Dedicated Staging", tempZone: "Climate Controlled", sqft: 4000, palletPositions: 80 },
    ],
    mhe: [
      { id: "chr-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 4, ownership: "Owned" },
      { id: "chr-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 3, ownership: "Leased", leaseExpiry: "2027-06-30" },
      { id: "chr-m3", type: "Order Picker", model: "Crown SP 3500", qty: 2, ownership: "Leased", leaseExpiry: "2027-06-30" },
      { id: "chr-m4", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 4, ownership: "Owned" },
      { id: "chr-m5", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 6, ownership: "Owned" },
      { id: "chr-m6", type: "Barcode Scanner", model: "Zebra TC52", qty: 6, ownership: "Owned" },
      { id: "chr-m7", type: "Label Printer", model: "Zebra ZT411", qty: 2, ownership: "Owned" },
      { id: "chr-m8", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$190,080",
      annualRent: "$2,280,960",
      rentPsf: "$12.00",
      escalation: "3% annually",
      leaseStart: "2019-01-01",
      leaseEnd: "2028-12-31",
      renewalOptions: "2 x 5-year options",
      terminationClause: "12-month notice, $500K penalty",
      cam: "$2.50/sqft",
      tiAllowance: "$750K (amortized)",
      insurance: "$85K/yr",
      landlord: "Prologis Inc.",
    },
  },
  {
    name: "Mowry",
    status: "Active",
    address: "6753 Mowry Ave",
    city: "Newark",
    state: "CA",
    zip: "94560",
    totalSqft: 268538,
    warehouseSqft: 248000,
    officeSqft: 20538,
    clearanceHeight: 36,
    dockDoors: 18,
    driveInDoors: 3,
    yearBuilt: 1998,
    primaryCustomers: ["LAM Research"],
    totalPalletPositions: 5800,
    totalBinPositions: 4200,
    totalMHEUnits: 35,
    leasedMHE: 6,
    racking: [
      { id: "mow-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 50, beamLevels: 5, positionsPerBay: 6, totalPositions: 3000 },
      { id: "mow-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 25, beamLevels: 5, positionsPerBay: 6, totalPositions: 1500 },
      { id: "mow-r3", type: "Push-Back Racking", tempZone: "Ambient", bayWidth: 120, aisles: 15, beamLevels: 4, positionsPerBay: 4, totalPositions: 600 },
      { id: "mow-r4", type: "Pallet Flow", tempZone: "Ambient", bayWidth: 120, aisles: 10, beamLevels: 3, positionsPerBay: 5, totalPositions: 700 },
    ],
    shelving: [
      { id: "mow-s1", name: "Pick Module — Main", tempZone: "Ambient", units: 56, binPositions: 3360, casePositions: 1680 },
      { id: "mow-s2", name: "Cleanroom Parts Storage", tempZone: "Climate Controlled", units: 14, binPositions: 840, casePositions: 420 },
    ],
    tempZones: [
      { id: "mow-t1", name: "Ambient", type: "Ambient", sqft: 180000, palletPositions: 4300, binPositions: 3360 },
      { id: "mow-t2", name: "Climate Controlled (Semi)", type: "Climate Controlled", sqft: 55000, palletPositions: 1500, binPositions: 840 },
      { id: "mow-t3", name: "Cleanroom Adjacent", type: "CRT (20–25°C)", sqft: 13000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "mow-f1", name: "Receiving / Staging", tempZone: "Ambient", sqft: 12000, palletPositions: 300 },
      { id: "mow-f2", name: "Outbound Dock Staging", tempZone: "Ambient", sqft: 8000, palletPositions: 200 },
    ],
    mhe: [
      { id: "mow-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 6, ownership: "Owned" },
      { id: "mow-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 4, ownership: "Leased", leaseExpiry: "2027-12-31" },
      { id: "mow-m3", type: "Order Picker", model: "Crown SP 3500", qty: 3, ownership: "Leased", leaseExpiry: "2027-12-31" },
      { id: "mow-m4", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 6, ownership: "Owned" },
      { id: "mow-m5", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 8, ownership: "Owned" },
      { id: "mow-m6", type: "Barcode Scanner", model: "Zebra TC52", qty: 5, ownership: "Owned" },
      { id: "mow-m7", type: "Label Printer", model: "Zebra ZT411", qty: 2, ownership: "Owned" },
      { id: "mow-m8", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$295,392",
      annualRent: "$3,544,704",
      rentPsf: "$13.20",
      escalation: "3% annually",
      leaseStart: "2021-06-01",
      leaseEnd: "2031-05-31",
      renewalOptions: "2 x 5-year options",
      terminationClause: "12-month notice, $750K penalty",
      cam: "$2.75/sqft",
      tiAllowance: "$1.2M (amortized)",
      insurance: "$120K/yr",
      landlord: "Prologis Inc.",
    },
  },
  {
    name: "Vista Ridge",
    status: "Active",
    address: "400 Vista Ridge Dr",
    city: "Kyle",
    state: "TX",
    zip: "78640",
    totalSqft: 208010,
    warehouseSqft: 193000,
    officeSqft: 15010,
    clearanceHeight: 32,
    dockDoors: 14,
    driveInDoors: 2,
    yearBuilt: 2018,
    primaryCustomers: ["Tesla"],
    totalPalletPositions: 4500,
    totalBinPositions: 2400,
    totalMHEUnits: 26,
    leasedMHE: 3,
    racking: [
      { id: "vr-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 45, beamLevels: 5, positionsPerBay: 6, totalPositions: 2700 },
      { id: "vr-r2", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 120, aisles: 20, beamLevels: 4, positionsPerBay: 5, totalPositions: 1200 },
      { id: "vr-r3", type: "Cantilever", tempZone: "Ambient", bayWidth: 144, aisles: 8, beamLevels: 3, positionsPerBay: 4, totalPositions: 600 },
    ],
    shelving: [
      { id: "vr-s1", name: "Pick Module — EV Parts", tempZone: "Ambient", units: 40, binPositions: 2400, casePositions: 1200 },
    ],
    tempZones: [
      { id: "vr-t1", name: "Ambient", type: "Ambient", sqft: 175000, palletPositions: 4500, binPositions: 2400 },
      { id: "vr-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 18000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "vr-f1", name: "Tesla Staging Area", tempZone: "Ambient", sqft: 10000, palletPositions: 250 },
      { id: "vr-f2", name: "Outbound Dock", tempZone: "Ambient", sqft: 6000, palletPositions: 150 },
    ],
    mhe: [
      { id: "vr-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 5, ownership: "Owned" },
      { id: "vr-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 3, ownership: "Leased", leaseExpiry: "2027-10-31" },
      { id: "vr-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 5, ownership: "Owned" },
      { id: "vr-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 6, ownership: "Owned" },
      { id: "vr-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 4, ownership: "Owned" },
      { id: "vr-m6", type: "Label Printer", model: "Zebra ZT411", qty: 2, ownership: "Owned" },
      { id: "vr-m7", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$173,340",
      annualRent: "$2,080,080",
      rentPsf: "$10.00",
      escalation: "2.5% annually",
      leaseStart: "2023-11-01",
      leaseEnd: "2028-10-31",
      renewalOptions: "1 x 5-year option",
      terminationClause: "6-month notice, $300K penalty",
      cam: "$2.00/sqft",
      tiAllowance: "$500K (amortized)",
      insurance: "$75K/yr",
      landlord: "Duke Realty",
    },
  },
  {
    name: "Hardy",
    status: "Active",
    address: "2620 W Hardy Dr",
    city: "Phoenix",
    state: "AZ",
    zip: "85009",
    totalSqft: 157992,
    warehouseSqft: 145000,
    officeSqft: 12992,
    clearanceHeight: 30,
    dockDoors: 10,
    driveInDoors: 2,
    yearBuilt: 2005,
    primaryCustomers: ["Corning"],
    totalPalletPositions: 3600,
    totalBinPositions: 1920,
    totalMHEUnits: 22,
    leasedMHE: 2,
    racking: [
      { id: "hdy-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 35, beamLevels: 5, positionsPerBay: 6, totalPositions: 2100 },
      { id: "hdy-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 15, beamLevels: 5, positionsPerBay: 6, totalPositions: 900 },
      { id: "hdy-r3", type: "Push-Back Racking", tempZone: "Ambient", bayWidth: 120, aisles: 8, beamLevels: 4, positionsPerBay: 4, totalPositions: 600 },
    ],
    shelving: [
      { id: "hdy-s1", name: "Pick Module — Corning", tempZone: "Ambient", units: 32, binPositions: 1920, casePositions: 960 },
    ],
    tempZones: [
      { id: "hdy-t1", name: "Ambient", type: "Ambient", sqft: 100000, palletPositions: 2700, binPositions: 1920 },
      { id: "hdy-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 35000, palletPositions: 900, binPositions: 0 },
      { id: "hdy-t3", name: "Hazmat Staging", type: "Hazmat", sqft: 10000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "hdy-f1", name: "Receiving / Staging", tempZone: "Ambient", sqft: 6000, palletPositions: 150 },
      { id: "hdy-f2", name: "Outbound Staging", tempZone: "Ambient", sqft: 4000, palletPositions: 100 },
    ],
    mhe: [
      { id: "hdy-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 4, ownership: "Owned" },
      { id: "hdy-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 2, ownership: "Leased", leaseExpiry: "2027-02-01" },
      { id: "hdy-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 4, ownership: "Owned" },
      { id: "hdy-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 5, ownership: "Owned" },
      { id: "hdy-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 4, ownership: "Owned" },
      { id: "hdy-m6", type: "Label Printer", model: "Zebra ZT411", qty: 2, ownership: "Owned" },
      { id: "hdy-m7", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$138,594",
      annualRent: "$1,663,128",
      rentPsf: "$10.52",
      escalation: "3% annually",
      leaseStart: "2023-02-01",
      leaseEnd: "2028-02-01",
      renewalOptions: "1 x 5-year option",
      terminationClause: "12-month notice, $400K penalty",
      cam: "$2.25/sqft",
      tiAllowance: "$400K (amortized)",
      insurance: "$65K/yr",
      landlord: "LBA Realty",
    },
  },
  {
    name: "Hawthorne",
    status: "Active",
    address: "7600 Hawthorne Ave",
    city: "Livermore",
    state: "CA",
    zip: "94550",
    totalSqft: 75451,
    warehouseSqft: 68000,
    officeSqft: 7451,
    clearanceHeight: 28,
    dockDoors: 6,
    driveInDoors: 1,
    yearBuilt: 1995,
    primaryCustomers: ["LAM Research"],
    totalPalletPositions: 1600,
    totalBinPositions: 1440,
    totalMHEUnits: 14,
    leasedMHE: 1,
    racking: [
      { id: "haw-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 18, beamLevels: 4, positionsPerBay: 6, totalPositions: 1080 },
      { id: "haw-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 8, beamLevels: 4, positionsPerBay: 6, totalPositions: 520 },
    ],
    shelving: [
      { id: "haw-s1", name: "Pick Module — LAM", tempZone: "Ambient", units: 24, binPositions: 1440, casePositions: 720 },
    ],
    tempZones: [
      { id: "haw-t1", name: "Ambient", type: "Ambient", sqft: 48000, palletPositions: 1080, binPositions: 1440 },
      { id: "haw-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 20000, palletPositions: 520, binPositions: 0 },
    ],
    floorStorage: [
      { id: "haw-f1", name: "Receiving / Staging", tempZone: "Ambient", sqft: 4000, palletPositions: 100 },
    ],
    mhe: [
      { id: "haw-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 2, ownership: "Owned" },
      { id: "haw-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 1, ownership: "Leased", leaseExpiry: "2027-02-28" },
      { id: "haw-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 3, ownership: "Owned" },
      { id: "haw-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 4, ownership: "Owned" },
      { id: "haw-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 3, ownership: "Owned" },
      { id: "haw-m6", type: "Label Printer", model: "Zebra ZT411", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$88,025",
      annualRent: "$1,056,300",
      rentPsf: "$14.00",
      escalation: "3% annually",
      leaseStart: "2022-03-01",
      leaseEnd: "2027-02-28",
      renewalOptions: "1 x 3-year option",
      terminationClause: "6-month notice, $200K penalty",
      cam: "$2.50/sqft",
      tiAllowance: "$200K (amortized)",
      insurance: "$40K/yr",
      landlord: "Divcowest",
    },
  },
  {
    name: "Morton",
    status: "Active",
    address: "7375 Morton Ave",
    city: "Newark",
    state: "CA",
    zip: "94560",
    totalSqft: 141275,
    warehouseSqft: 130000,
    officeSqft: 11275,
    clearanceHeight: 30,
    dockDoors: 8,
    driveInDoors: 2,
    yearBuilt: 2002,
    primaryCustomers: ["KLA", "Delta", "Lucid"],
    totalPalletPositions: 3200,
    totalBinPositions: 2400,
    totalMHEUnits: 20,
    leasedMHE: 2,
    racking: [
      { id: "mor-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 30, beamLevels: 5, positionsPerBay: 6, totalPositions: 1800 },
      { id: "mor-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 15, beamLevels: 5, positionsPerBay: 6, totalPositions: 900 },
      { id: "mor-r3", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 120, aisles: 8, beamLevels: 4, positionsPerBay: 4, totalPositions: 500 },
    ],
    shelving: [
      { id: "mor-s1", name: "Pick Module — Multi", tempZone: "Ambient", units: 32, binPositions: 1920, casePositions: 960 },
      { id: "mor-s2", name: "KLA Parts Storage", tempZone: "Climate Controlled", units: 8, binPositions: 480, casePositions: 240 },
    ],
    tempZones: [
      { id: "mor-t1", name: "Ambient", type: "Ambient", sqft: 90000, palletPositions: 2300, binPositions: 1920 },
      { id: "mor-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 35000, palletPositions: 900, binPositions: 480 },
      { id: "mor-t3", name: "Hazmat", type: "Hazmat", sqft: 5000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "mor-f1", name: "Receiving Dock", tempZone: "Ambient", sqft: 5000, palletPositions: 125 },
      { id: "mor-f2", name: "Outbound Staging", tempZone: "Ambient", sqft: 4000, palletPositions: 100 },
    ],
    mhe: [
      { id: "mor-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 3, ownership: "Owned" },
      { id: "mor-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 2, ownership: "Leased", leaseExpiry: "2026-09-30" },
      { id: "mor-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 4, ownership: "Owned" },
      { id: "mor-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 5, ownership: "Owned" },
      { id: "mor-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 4, ownership: "Owned" },
      { id: "mor-m6", type: "Label Printer", model: "Zebra ZT411", qty: 1, ownership: "Owned" },
      { id: "mor-m7", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$152,577",
      annualRent: "$1,830,924",
      rentPsf: "$12.96",
      escalation: "3% annually",
      leaseStart: "2021-10-01",
      leaseEnd: "2026-09-30",
      renewalOptions: "1 x 5-year option",
      terminationClause: "6-month notice",
      cam: "$2.50/sqft",
      tiAllowance: "$350K (amortized)",
      insurance: "$55K/yr",
      landlord: "KBS Real Estate",
    },
  },
  {
    name: "Kato",
    status: "Critical Vacancy",
    address: "47020 Kato Rd",
    city: "Fremont",
    state: "CA",
    zip: "94538",
    totalSqft: 209748,
    warehouseSqft: 195000,
    officeSqft: 14748,
    clearanceHeight: 32,
    dockDoors: 14,
    driveInDoors: 2,
    yearBuilt: 2000,
    primaryCustomers: ["Tesla", "Delta", "Wisk"],
    totalPalletPositions: 4800,
    totalBinPositions: 2880,
    totalMHEUnits: 18,
    leasedMHE: 3,
    racking: [
      { id: "kat-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 45, beamLevels: 5, positionsPerBay: 6, totalPositions: 2700 },
      { id: "kat-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 20, beamLevels: 5, positionsPerBay: 6, totalPositions: 1200 },
      { id: "kat-r3", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 120, aisles: 12, beamLevels: 4, positionsPerBay: 5, totalPositions: 900 },
    ],
    shelving: [
      { id: "kat-s1", name: "Pick Module — Main", tempZone: "Ambient", units: 48, binPositions: 2880, casePositions: 1440 },
    ],
    tempZones: [
      { id: "kat-t1", name: "Ambient", type: "Ambient", sqft: 140000, palletPositions: 3600, binPositions: 2880 },
      { id: "kat-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 45000, palletPositions: 1200, binPositions: 0 },
      { id: "kat-t3", name: "Hazmat", type: "Hazmat", sqft: 10000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "kat-f1", name: "Staging / Receiving", tempZone: "Ambient", sqft: 8000, palletPositions: 200 },
      { id: "kat-f2", name: "Outbound Staging", tempZone: "Ambient", sqft: 5000, palletPositions: 120 },
    ],
    mhe: [
      { id: "kat-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 3, ownership: "Owned" },
      { id: "kat-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 2, ownership: "Leased", leaseExpiry: "2027-05-31" },
      { id: "kat-m3", type: "Order Picker", model: "Crown SP 3500", qty: 1, ownership: "Leased", leaseExpiry: "2027-05-31" },
      { id: "kat-m4", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 3, ownership: "Owned" },
      { id: "kat-m5", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 4, ownership: "Owned" },
      { id: "kat-m6", type: "Barcode Scanner", model: "Zebra TC52", qty: 3, ownership: "Owned" },
      { id: "kat-m7", type: "Label Printer", model: "Zebra ZT411", qty: 1, ownership: "Owned" },
      { id: "kat-m8", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$244,380",
      annualRent: "$2,932,560",
      rentPsf: "$13.98",
      escalation: "3% annually",
      leaseStart: "2021-06-01",
      leaseEnd: "2031-05-31",
      renewalOptions: "2 x 5-year options",
      terminationClause: "12-month notice, $600K penalty",
      cam: "$2.75/sqft",
      tiAllowance: "$800K (amortized)",
      insurance: "$95K/yr",
      landlord: "Prologis Inc.",
    },
  },
  {
    name: "Patterson",
    status: "Partially Vacant",
    address: "7150 Patterson Pass Rd",
    city: "Livermore",
    state: "CA",
    zip: "94550",
    totalSqft: 181458,
    warehouseSqft: 168000,
    officeSqft: 13458,
    clearanceHeight: 32,
    dockDoors: 12,
    driveInDoors: 2,
    yearBuilt: 2003,
    primaryCustomers: ["LAM Research", "Delta", "Panasonic"],
    totalPalletPositions: 4000,
    totalBinPositions: 2400,
    totalMHEUnits: 22,
    leasedMHE: 3,
    racking: [
      { id: "pat-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 38, beamLevels: 5, positionsPerBay: 6, totalPositions: 2280 },
      { id: "pat-r2", type: "Selective Racking", tempZone: "Climate Controlled", bayWidth: 108, aisles: 18, beamLevels: 5, positionsPerBay: 6, totalPositions: 1080 },
      { id: "pat-r3", type: "Push-Back Racking", tempZone: "Ambient", bayWidth: 120, aisles: 10, beamLevels: 4, positionsPerBay: 4, totalPositions: 640 },
    ],
    shelving: [
      { id: "pat-s1", name: "Pick Module — Main", tempZone: "Ambient", units: 32, binPositions: 1920, casePositions: 960 },
      { id: "pat-s2", name: "Panasonic Parts", tempZone: "Climate Controlled", units: 8, binPositions: 480, casePositions: 240 },
    ],
    tempZones: [
      { id: "pat-t1", name: "Ambient", type: "Ambient", sqft: 120000, palletPositions: 2920, binPositions: 1920 },
      { id: "pat-t2", name: "Climate Controlled", type: "Climate Controlled", sqft: 38000, palletPositions: 1080, binPositions: 480 },
      { id: "pat-t3", name: "Hazmat Area", type: "Hazmat", sqft: 10000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "pat-f1", name: "Receiving / Staging", tempZone: "Ambient", sqft: 7000, palletPositions: 175 },
      { id: "pat-f2", name: "Outbound Staging", tempZone: "Ambient", sqft: 5000, palletPositions: 125 },
    ],
    mhe: [
      { id: "pat-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 4, ownership: "Owned" },
      { id: "pat-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 3, ownership: "Leased", leaseExpiry: "2027-09-30" },
      { id: "pat-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 4, ownership: "Owned" },
      { id: "pat-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 5, ownership: "Owned" },
      { id: "pat-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 4, ownership: "Owned" },
      { id: "pat-m6", type: "Label Printer", model: "Zebra ZT411", qty: 1, ownership: "Owned" },
      { id: "pat-m7", type: "Stretch Wrapper", model: "Lantech Q-300", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$196,580",
      annualRent: "$2,358,960",
      rentPsf: "$13.00",
      escalation: "3% annually",
      leaseStart: "2022-10-01",
      leaseEnd: "2027-09-30",
      renewalOptions: "2 x 3-year options",
      terminationClause: "6-month notice, $350K penalty",
      cam: "$2.50/sqft",
      tiAllowance: "$500K (amortized)",
      insurance: "$70K/yr",
      landlord: "Dermody Properties",
    },
  },
  {
    name: "Hayman",
    status: "Partially Vacant",
    address: "31775 Hayman St",
    city: "Hayward",
    state: "CA",
    zip: "94544",
    totalSqft: 75328,
    warehouseSqft: 68000,
    officeSqft: 7328,
    clearanceHeight: 24,
    dockDoors: 4,
    driveInDoors: 1,
    yearBuilt: 1990,
    primaryCustomers: ["Tesla"],
    totalPalletPositions: 1500,
    totalBinPositions: 960,
    totalMHEUnits: 10,
    leasedMHE: 1,
    racking: [
      { id: "hay-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 96, aisles: 16, beamLevels: 4, positionsPerBay: 6, totalPositions: 960 },
      { id: "hay-r2", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 108, aisles: 8, beamLevels: 4, positionsPerBay: 4, totalPositions: 540 },
    ],
    shelving: [
      { id: "hay-s1", name: "Pick Module", tempZone: "Ambient", units: 16, binPositions: 960, casePositions: 480 },
    ],
    tempZones: [
      { id: "hay-t1", name: "Ambient", type: "Ambient", sqft: 62000, palletPositions: 1500, binPositions: 960 },
      { id: "hay-t2", name: "Office / Mezzanine", type: "Climate Controlled", sqft: 6000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "hay-f1", name: "Staging Area", tempZone: "Ambient", sqft: 4000, palletPositions: 100 },
    ],
    mhe: [
      { id: "hay-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 2, ownership: "Owned" },
      { id: "hay-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 1, ownership: "Leased", leaseExpiry: "2027-06-30" },
      { id: "hay-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 2, ownership: "Owned" },
      { id: "hay-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 3, ownership: "Owned" },
      { id: "hay-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 2, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$81,354",
      annualRent: "$976,248",
      rentPsf: "$12.96",
      escalation: "3% annually",
      leaseStart: "2022-07-01",
      leaseEnd: "2027-06-30",
      renewalOptions: "1 x 3-year option",
      terminationClause: "6-month notice, $150K penalty",
      cam: "$2.25/sqft",
      tiAllowance: "$150K (amortized)",
      insurance: "$35K/yr",
      landlord: "BRE Properties",
    },
  },
  {
    name: "Grand",
    status: "Partially Vacant",
    address: "Grand Ave",
    city: "Fremont",
    state: "CA",
    zip: "94538",
    totalSqft: 85000,
    warehouseSqft: 78000,
    officeSqft: 7000,
    clearanceHeight: 26,
    dockDoors: 6,
    driveInDoors: 1,
    yearBuilt: 1996,
    primaryCustomers: ["Tesla"],
    totalPalletPositions: 1800,
    totalBinPositions: 1200,
    totalMHEUnits: 12,
    leasedMHE: 1,
    racking: [
      { id: "grd-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 108, aisles: 20, beamLevels: 4, positionsPerBay: 6, totalPositions: 1200 },
      { id: "grd-r2", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 120, aisles: 8, beamLevels: 4, positionsPerBay: 4, totalPositions: 600 },
    ],
    shelving: [
      { id: "grd-s1", name: "Pick Module", tempZone: "Ambient", units: 20, binPositions: 1200, casePositions: 600 },
    ],
    tempZones: [
      { id: "grd-t1", name: "Ambient", type: "Ambient", sqft: 72000, palletPositions: 1800, binPositions: 1200 },
      { id: "grd-t2", name: "Office / Mezzanine", type: "Climate Controlled", sqft: 6000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "grd-f1", name: "Staging / Receiving", tempZone: "Ambient", sqft: 5000, palletPositions: 125 },
    ],
    mhe: [
      { id: "grd-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 2, ownership: "Owned" },
      { id: "grd-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 1, ownership: "Leased", leaseExpiry: "2027-12-31" },
      { id: "grd-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 2, ownership: "Owned" },
      { id: "grd-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 4, ownership: "Owned" },
      { id: "grd-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 2, ownership: "Owned" },
      { id: "grd-m6", type: "Label Printer", model: "Zebra ZT411", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$85,000",
      annualRent: "$1,020,000",
      rentPsf: "$12.00",
      escalation: "3% annually",
      leaseStart: "2022-01-01",
      leaseEnd: "2027-12-31",
      renewalOptions: "1 x 5-year option",
      terminationClause: "6-month notice, $200K penalty",
      cam: "$2.25/sqft",
      tiAllowance: "$250K (amortized)",
      insurance: "$40K/yr",
      landlord: "CBRE Industrial",
    },
  },
  {
    name: "Whitmore Lake",
    status: "Partially Vacant",
    address: "9257 East M-36",
    city: "Whitmore Lake",
    state: "MI",
    zip: "48189",
    totalSqft: 52800,
    warehouseSqft: 48000,
    officeSqft: 4800,
    clearanceHeight: 24,
    dockDoors: 4,
    driveInDoors: 1,
    yearBuilt: 2000,
    primaryCustomers: ["Tesla"],
    totalPalletPositions: 1100,
    totalBinPositions: 720,
    totalMHEUnits: 8,
    leasedMHE: 1,
    racking: [
      { id: "wl-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 96, aisles: 14, beamLevels: 4, positionsPerBay: 6, totalPositions: 840 },
      { id: "wl-r2", type: "Drive-In Racking", tempZone: "Ambient", bayWidth: 108, aisles: 4, beamLevels: 4, positionsPerBay: 4, totalPositions: 260 },
    ],
    shelving: [
      { id: "wl-s1", name: "Pick Module", tempZone: "Ambient", units: 12, binPositions: 720, casePositions: 360 },
    ],
    tempZones: [
      { id: "wl-t1", name: "Ambient", type: "Ambient", sqft: 44000, palletPositions: 1100, binPositions: 720 },
      { id: "wl-t2", name: "Office", type: "Climate Controlled", sqft: 4000, palletPositions: 0, binPositions: 0 },
    ],
    floorStorage: [
      { id: "wl-f1", name: "Staging / Receiving", tempZone: "Ambient", sqft: 3000, palletPositions: 75 },
    ],
    mhe: [
      { id: "wl-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU25", qty: 2, ownership: "Owned" },
      { id: "wl-m2", type: "Reach Truck", model: "Crown RR 5700", qty: 1, ownership: "Leased", leaseExpiry: "2027-09-30" },
      { id: "wl-m3", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 1, ownership: "Owned" },
      { id: "wl-m4", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 2, ownership: "Owned" },
      { id: "wl-m5", type: "Barcode Scanner", model: "Zebra TC52", qty: 2, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$39,600",
      annualRent: "$475,200",
      rentPsf: "$9.00",
      escalation: "2% annually",
      leaseStart: "2022-10-01",
      leaseEnd: "2027-09-30",
      renewalOptions: "1 x 5-year option",
      terminationClause: "6-month notice",
      cam: "$1.75/sqft",
      tiAllowance: "$100K (amortized)",
      insurance: "$25K/yr",
      landlord: "Ashley Capital",
    },
  },
  {
    name: "Industrial",
    status: "Partially Vacant",
    address: "44951/31 Industrial Dr",
    city: "Fremont",
    state: "CA",
    zip: "94538",
    totalSqft: 14000,
    warehouseSqft: 12500,
    officeSqft: 1500,
    clearanceHeight: 20,
    dockDoors: 2,
    driveInDoors: 1,
    yearBuilt: 1985,
    primaryCustomers: ["Amazon"],
    totalPalletPositions: 300,
    totalBinPositions: 480,
    totalMHEUnits: 5,
    leasedMHE: 0,
    racking: [
      { id: "ind-r1", type: "Selective Racking", tempZone: "Ambient", bayWidth: 96, aisles: 6, beamLevels: 3, positionsPerBay: 6, totalPositions: 300 },
    ],
    shelving: [
      { id: "ind-s1", name: "Pick Shelving", tempZone: "Ambient", units: 8, binPositions: 480, casePositions: 240 },
    ],
    tempZones: [
      { id: "ind-t1", name: "Ambient", type: "Ambient", sqft: 12000, palletPositions: 300, binPositions: 480 },
    ],
    floorStorage: [
      { id: "ind-f1", name: "Staging", tempZone: "Ambient", sqft: 500, palletPositions: 12 },
    ],
    mhe: [
      { id: "ind-m1", type: "Forklift — Counterbalance", model: "Toyota 8FGU15", qty: 1, ownership: "Owned" },
      { id: "ind-m2", type: "Electric Pallet Jack", model: "Crown PE 4500", qty: 1, ownership: "Owned" },
      { id: "ind-m3", type: "Manual Pallet Jack", model: "Wesco 272790", qty: 2, ownership: "Owned" },
      { id: "ind-m4", type: "Barcode Scanner", model: "Zebra TC52", qty: 1, ownership: "Owned" },
    ],
    lease: {
      monthlyRent: "$16,800",
      annualRent: "$201,600",
      rentPsf: "$14.40",
      escalation: "3% annually",
      leaseStart: "2021-10-01",
      leaseEnd: "2026-09-30",
      renewalOptions: "None",
      terminationClause: "3-month notice",
      cam: "$2.50/sqft",
      tiAllowance: "N/A",
      insurance: "$12K/yr",
      landlord: "Private Owner",
    },
  },
];

// ═══════════════════════════════════════════════════════
// Aggregate Capacity Summary (across all facilities)
// ═══════════════════════════════════════════════════════

export function getAggregateCapacity() {
  const totals = facilityProfiles.reduce(
    (acc, f) => ({
      totalPallets: acc.totalPallets + f.totalPalletPositions,
      totalBins: acc.totalBins + f.totalBinPositions,
      totalMHE: acc.totalMHE + f.totalMHEUnits,
      leasedMHE: acc.leasedMHE + f.leasedMHE,
      totalSqft: acc.totalSqft + f.totalSqft,
      warehouseSqft: acc.warehouseSqft + f.warehouseSqft,
      totalDocks: acc.totalDocks + f.dockDoors,
      facilities: acc.facilities + 1,
    }),
    { totalPallets: 0, totalBins: 0, totalMHE: 0, leasedMHE: 0, totalSqft: 0, warehouseSqft: 0, totalDocks: 0, facilities: 0 }
  );
  return totals;
}
