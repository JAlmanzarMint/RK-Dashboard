// OTT Routing Optimization Data — TMS-driven final mile route simulation & optimization
// Covers OnTime Trucking tri-state (NY, NJ, CT) LTL final-mile operations

// ─── Fleet & Vehicles ───────────────────────────────────────────────
export interface Vehicle {
  id: string;
  name: string;
  type: "26ft_box" | "16ft_box" | "sprinter" | "flatbed" | "liftgate";
  capacity: { weight: number; pallets: number; cuft: number };
  status: "available" | "en_route" | "maintenance" | "off_duty";
  driver: string;
  currentLocation: { lat: number; lng: number; label: string };
  fuelLevel: number;
  milestoday: number;
  hoursRemaining: number;
  costPerMile: number;
}

export const fleet: Vehicle[] = [
  { id: "OTT-101", name: "Box Truck 101", type: "26ft_box", capacity: { weight: 10000, pallets: 12, cuft: 1600 }, status: "en_route", driver: "Mike Rosario", currentLocation: { lat: 40.7282, lng: -73.7949, label: "Queens, NY" }, fuelLevel: 72, milestoday: 47, hoursRemaining: 6.5, costPerMile: 2.85 },
  { id: "OTT-102", name: "Box Truck 102", type: "26ft_box", capacity: { weight: 10000, pallets: 12, cuft: 1600 }, status: "en_route", driver: "Carlos Peña", currentLocation: { lat: 40.8568, lng: -74.2262, label: "Montclair, NJ" }, fuelLevel: 58, milestoday: 63, hoursRemaining: 5.0, costPerMile: 2.85 },
  { id: "OTT-103", name: "Box Truck 103", type: "26ft_box", capacity: { weight: 10000, pallets: 12, cuft: 1600 }, status: "available", driver: "James Walsh", currentLocation: { lat: 40.7326, lng: -73.4133, label: "Farmingdale, NY (Depot)" }, fuelLevel: 95, milestoday: 0, hoursRemaining: 11.0, costPerMile: 2.85 },
  { id: "OTT-104", name: "Box Truck 104", type: "16ft_box", capacity: { weight: 6000, pallets: 6, cuft: 900 }, status: "en_route", driver: "Tony Marra", currentLocation: { lat: 40.9176, lng: -74.1719, label: "Wayne, NJ" }, fuelLevel: 64, milestoday: 52, hoursRemaining: 5.5, costPerMile: 2.40 },
  { id: "OTT-105", name: "Sprinter 105", type: "sprinter", capacity: { weight: 3500, pallets: 3, cuft: 530 }, status: "en_route", driver: "Derek Powell", currentLocation: { lat: 40.7580, lng: -73.9855, label: "Midtown Manhattan" }, fuelLevel: 81, milestoday: 31, hoursRemaining: 7.0, costPerMile: 1.90 },
  { id: "OTT-106", name: "Sprinter 106", type: "sprinter", capacity: { weight: 3500, pallets: 3, cuft: 530 }, status: "available", driver: "Ray Kim", currentLocation: { lat: 40.7326, lng: -73.4133, label: "Farmingdale, NY (Depot)" }, fuelLevel: 88, milestoday: 0, hoursRemaining: 11.0, costPerMile: 1.90 },
  { id: "OTT-107", name: "Flatbed 107", type: "flatbed", capacity: { weight: 15000, pallets: 16, cuft: 0 }, status: "maintenance", driver: "—", currentLocation: { lat: 40.7326, lng: -73.4133, label: "Farmingdale, NY (Depot)" }, fuelLevel: 30, milestoday: 0, hoursRemaining: 0, costPerMile: 3.20 },
  { id: "OTT-108", name: "Liftgate 108", type: "liftgate", capacity: { weight: 8000, pallets: 10, cuft: 1400 }, status: "en_route", driver: "Andre Williams", currentLocation: { lat: 41.0534, lng: -74.1310, label: "Suffern, NY" }, fuelLevel: 55, milestoday: 71, hoursRemaining: 4.0, costPerMile: 3.10 },
  { id: "OTT-109", name: "Box Truck 109", type: "26ft_box", capacity: { weight: 10000, pallets: 12, cuft: 1600 }, status: "en_route", driver: "Luis Ortega", currentLocation: { lat: 40.6501, lng: -73.9496, label: "Brooklyn, NY" }, fuelLevel: 67, milestoday: 44, hoursRemaining: 6.0, costPerMile: 2.85 },
  { id: "OTT-110", name: "Sprinter 110", type: "sprinter", capacity: { weight: 3500, pallets: 3, cuft: 530 }, status: "off_duty", driver: "Kevin Tran", currentLocation: { lat: 40.7326, lng: -73.4133, label: "Farmingdale, NY (Depot)" }, fuelLevel: 45, milestoday: 0, hoursRemaining: 0, costPerMile: 1.90 },
  { id: "OTT-111", name: "Box Truck 111", type: "16ft_box", capacity: { weight: 6000, pallets: 6, cuft: 900 }, status: "en_route", driver: "Chris Donovan", currentLocation: { lat: 41.1670, lng: -73.2048, label: "Bridgeport, CT" }, fuelLevel: 48, milestoday: 78, hoursRemaining: 3.5, costPerMile: 2.40 },
  { id: "OTT-112", name: "Liftgate 112", type: "liftgate", capacity: { weight: 8000, pallets: 10, cuft: 1400 }, status: "available", driver: "Pat Sullivan", currentLocation: { lat: 40.7326, lng: -73.4133, label: "Farmingdale, NY (Depot)" }, fuelLevel: 91, milestoday: 0, hoursRemaining: 11.0, costPerMile: 3.10 },
];

// ─── Delivery Zones ─────────────────────────────────────────────────
export interface DeliveryZone {
  id: string;
  name: string;
  region: string;
  zipPrefixes: string[];
  avgStopsPerRoute: number;
  avgMilesPerRoute: number;
  avgTimePerStop: number; // minutes
  trafficMultiplier: number; // 1.0 = normal
  deliveryWindowPeak: string;
  historicalOnTime: number;
}

export const deliveryZones: DeliveryZone[] = [
  { id: "Z1", name: "Manhattan", region: "NYC", zipPrefixes: ["100", "101", "102"], avgStopsPerRoute: 8, avgMilesPerRoute: 22, avgTimePerStop: 28, trafficMultiplier: 1.65, deliveryWindowPeak: "6:00 AM - 10:00 AM", historicalOnTime: 0.82 },
  { id: "Z2", name: "Brooklyn/Queens", region: "NYC", zipPrefixes: ["112", "111", "113", "114"], avgStopsPerRoute: 10, avgMilesPerRoute: 35, avgTimePerStop: 22, trafficMultiplier: 1.45, deliveryWindowPeak: "7:00 AM - 11:00 AM", historicalOnTime: 0.87 },
  { id: "Z3", name: "Bronx/Westchester", region: "NYC", zipPrefixes: ["104", "105", "106"], avgStopsPerRoute: 9, avgMilesPerRoute: 42, avgTimePerStop: 20, trafficMultiplier: 1.35, deliveryWindowPeak: "7:00 AM - 12:00 PM", historicalOnTime: 0.89 },
  { id: "Z4", name: "Long Island", region: "NY", zipPrefixes: ["115", "116", "117", "118", "119"], avgStopsPerRoute: 11, avgMilesPerRoute: 55, avgTimePerStop: 18, trafficMultiplier: 1.20, deliveryWindowPeak: "8:00 AM - 2:00 PM", historicalOnTime: 0.93 },
  { id: "Z5", name: "Northern NJ", region: "NJ", zipPrefixes: ["070", "071", "072", "074", "076"], avgStopsPerRoute: 10, avgMilesPerRoute: 48, avgTimePerStop: 19, trafficMultiplier: 1.40, deliveryWindowPeak: "7:00 AM - 1:00 PM", historicalOnTime: 0.88 },
  { id: "Z6", name: "Central NJ", region: "NJ", zipPrefixes: ["078", "079", "088", "089", "080"], avgStopsPerRoute: 12, avgMilesPerRoute: 62, avgTimePerStop: 17, trafficMultiplier: 1.15, deliveryWindowPeak: "8:00 AM - 2:00 PM", historicalOnTime: 0.91 },
  { id: "Z7", name: "Southern CT", region: "CT", zipPrefixes: ["068", "066", "064", "063"], avgStopsPerRoute: 8, avgMilesPerRoute: 58, avgTimePerStop: 19, trafficMultiplier: 1.25, deliveryWindowPeak: "8:00 AM - 2:00 PM", historicalOnTime: 0.90 },
  { id: "Z8", name: "Staten Island", region: "NYC", zipPrefixes: ["103"], avgStopsPerRoute: 7, avgMilesPerRoute: 30, avgTimePerStop: 21, trafficMultiplier: 1.30, deliveryWindowPeak: "7:00 AM - 12:00 PM", historicalOnTime: 0.86 },
];

// ─── Today's Shipments (TMS Feed) ────────────────────────────────────
export interface Shipment {
  id: string;
  pro: string; // PRO number
  origin: string;
  destination: { name: string; address: string; city: string; state: string; zip: string; lat: number; lng: number };
  pieces: number;
  weight: number;
  pallets: number;
  deliveryWindow: { start: string; end: string };
  priority: "standard" | "expedited" | "white_glove";
  specialReq: string[];
  status: "pending" | "assigned" | "in_transit" | "delivered" | "exception";
  assignedVehicle?: string;
  assignedRoute?: string;
  customer: string;
  serviceType: "LTL" | "final_mile" | "dedicated";
  estimatedMiles: number;
}

export const todaysShipments: Shipment[] = [
  { id: "S001", pro: "OTT-240321-001", origin: "Farmingdale Depot", destination: { name: "Gotham Medical Supply", address: "450 W 33rd St", city: "New York", state: "NY", zip: "10001", lat: 40.7527, lng: -73.9960 }, pieces: 12, weight: 2400, pallets: 3, deliveryWindow: { start: "08:00", end: "12:00" }, priority: "expedited", specialReq: ["liftgate", "inside_delivery"], status: "in_transit", assignedVehicle: "OTT-105", assignedRoute: "R1", customer: "Gotham Medical", serviceType: "final_mile", estimatedMiles: 38 },
  { id: "S002", pro: "OTT-240321-002", origin: "Farmingdale Depot", destination: { name: "BrightPath Electronics", address: "1200 Rt 22 E", city: "Bridgewater", state: "NJ", zip: "08807", lat: 40.5934, lng: -74.6076 }, pieces: 24, weight: 5200, pallets: 6, deliveryWindow: { start: "09:00", end: "14:00" }, priority: "standard", specialReq: [], status: "in_transit", assignedVehicle: "OTT-102", assignedRoute: "R3", customer: "BrightPath", serviceType: "LTL", estimatedMiles: 62 },
  { id: "S003", pro: "OTT-240321-003", origin: "Farmingdale Depot", destination: { name: "Harbor View Restaurant Group", address: "87 Atlantic Ave", city: "Brooklyn", state: "NY", zip: "11201", lat: 40.6867, lng: -73.9762 }, pieces: 8, weight: 1600, pallets: 2, deliveryWindow: { start: "06:00", end: "09:00" }, priority: "expedited", specialReq: ["temp_controlled"], status: "delivered", assignedVehicle: "OTT-109", assignedRoute: "R2", customer: "Harbor View", serviceType: "final_mile", estimatedMiles: 32 },
  { id: "S004", pro: "OTT-240321-004", origin: "Farmingdale Depot", destination: { name: "Northeast Builders Supply", address: "445 Fairfield Ave", city: "Bridgeport", state: "CT", zip: "06604", lat: 41.1670, lng: -73.2048 }, pieces: 16, weight: 7800, pallets: 8, deliveryWindow: { start: "10:00", end: "15:00" }, priority: "standard", specialReq: ["flatbed_req"], status: "pending", assignedVehicle: undefined, assignedRoute: undefined, customer: "NE Builders", serviceType: "LTL", estimatedMiles: 75 },
  { id: "S005", pro: "OTT-240321-005", origin: "Farmingdale Depot", destination: { name: "Metro Office Solutions", address: "1 Penn Plaza", city: "New York", state: "NY", zip: "10119", lat: 40.7505, lng: -73.9934 }, pieces: 4, weight: 800, pallets: 1, deliveryWindow: { start: "08:00", end: "11:00" }, priority: "standard", specialReq: ["inside_delivery", "appointment"], status: "in_transit", assignedVehicle: "OTT-105", assignedRoute: "R1", customer: "Metro Office", serviceType: "final_mile", estimatedMiles: 37 },
  { id: "S006", pro: "OTT-240321-006", origin: "Farmingdale Depot", destination: { name: "Greenfield Pharma", address: "300 Lighting Way", city: "Secaucus", state: "NJ", zip: "07094", lat: 40.7893, lng: -74.0567 }, pieces: 20, weight: 3200, pallets: 4, deliveryWindow: { start: "07:00", end: "10:00" }, priority: "white_glove", specialReq: ["temp_controlled", "signature_req", "chain_of_custody"], status: "delivered", assignedVehicle: "OTT-104", assignedRoute: "R3", customer: "Greenfield Pharma", serviceType: "final_mile", estimatedMiles: 45 },
  { id: "S007", pro: "OTT-240321-007", origin: "Farmingdale Depot", destination: { name: "Apex Fitness Equipment", address: "2100 Route 38", city: "Cherry Hill", state: "NJ", zip: "08002", lat: 39.9348, lng: -75.0303 }, pieces: 6, weight: 4200, pallets: 4, deliveryWindow: { start: "10:00", end: "16:00" }, priority: "standard", specialReq: ["liftgate", "2_man_delivery"], status: "pending", assignedVehicle: undefined, assignedRoute: undefined, customer: "Apex Fitness", serviceType: "LTL", estimatedMiles: 98 },
  { id: "S008", pro: "OTT-240321-008", origin: "Farmingdale Depot", destination: { name: "Stamford Tech Hub", address: "1 Landmark Square", city: "Stamford", state: "CT", zip: "06901", lat: 41.0534, lng: -73.5387 }, pieces: 10, weight: 1800, pallets: 2, deliveryWindow: { start: "09:00", end: "13:00" }, priority: "standard", specialReq: ["dock_delivery"], status: "in_transit", assignedVehicle: "OTT-111", assignedRoute: "R5", customer: "Stamford Tech", serviceType: "final_mile", estimatedMiles: 55 },
  { id: "S009", pro: "OTT-240321-009", origin: "Farmingdale Depot", destination: { name: "Island Medical Center", address: "3333 Hylan Blvd", city: "Staten Island", state: "NY", zip: "10306", lat: 40.5659, lng: -74.1143 }, pieces: 14, weight: 2800, pallets: 3, deliveryWindow: { start: "08:00", end: "12:00" }, priority: "expedited", specialReq: ["liftgate", "inside_delivery"], status: "in_transit", assignedVehicle: "OTT-108", assignedRoute: "R4", customer: "Island Medical", serviceType: "final_mile", estimatedMiles: 48 },
  { id: "S010", pro: "OTT-240321-010", origin: "Farmingdale Depot", destination: { name: "Hudson Valley Logistics", address: "100 Market St", city: "Yonkers", state: "NY", zip: "10701", lat: 40.9312, lng: -73.8987 }, pieces: 18, weight: 4100, pallets: 5, deliveryWindow: { start: "09:00", end: "14:00" }, priority: "standard", specialReq: [], status: "assigned", assignedVehicle: "OTT-103", assignedRoute: "R6", customer: "Hudson Valley", serviceType: "LTL", estimatedMiles: 52 },
  { id: "S011", pro: "OTT-240321-011", origin: "Farmingdale Depot", destination: { name: "Park Avenue Interiors", address: "595 Madison Ave", city: "New York", state: "NY", zip: "10022", lat: 40.7633, lng: -73.9712 }, pieces: 3, weight: 600, pallets: 1, deliveryWindow: { start: "07:00", end: "09:00" }, priority: "white_glove", specialReq: ["inside_delivery", "appointment", "blanket_wrap"], status: "delivered", assignedVehicle: "OTT-105", assignedRoute: "R1", customer: "Park Ave Interiors", serviceType: "final_mile", estimatedMiles: 36 },
  { id: "S012", pro: "OTT-240321-012", origin: "Farmingdale Depot", destination: { name: "Parsippany Distribution Ctr", address: "5 Sylvan Way", city: "Parsippany", state: "NJ", zip: "07054", lat: 40.8578, lng: -74.4226 }, pieces: 30, weight: 8400, pallets: 10, deliveryWindow: { start: "08:00", end: "15:00" }, priority: "standard", specialReq: ["dock_delivery"], status: "in_transit", assignedVehicle: "OTT-102", assignedRoute: "R3", customer: "Parsippany DC", serviceType: "LTL", estimatedMiles: 58 },
  { id: "S013", pro: "OTT-240321-013", origin: "Farmingdale Depot", destination: { name: "Greenwich Marina Supply", address: "35 River Rd", city: "Cos Cob", state: "CT", zip: "06807", lat: 41.0381, lng: -73.5990 }, pieces: 7, weight: 1400, pallets: 2, deliveryWindow: { start: "10:00", end: "14:00" }, priority: "standard", specialReq: [], status: "in_transit", assignedVehicle: "OTT-111", assignedRoute: "R5", customer: "Greenwich Marina", serviceType: "final_mile", estimatedMiles: 52 },
  { id: "S014", pro: "OTT-240321-014", origin: "Farmingdale Depot", destination: { name: "Bronx Fresh Foods", address: "800 E 149th St", city: "Bronx", state: "NY", zip: "10455", lat: 40.8196, lng: -73.9171 }, pieces: 22, weight: 3600, pallets: 4, deliveryWindow: { start: "05:00", end: "08:00" }, priority: "expedited", specialReq: ["temp_controlled", "early_morning"], status: "delivered", assignedVehicle: "OTT-101", assignedRoute: "R2", customer: "Bronx Fresh", serviceType: "final_mile", estimatedMiles: 42 },
  { id: "S015", pro: "OTT-240321-015", origin: "Farmingdale Depot", destination: { name: "Newark Airport Cargo", address: "81 Red Anvil Rd", city: "Newark", state: "NJ", zip: "07114", lat: 40.6924, lng: -74.1761 }, pieces: 15, weight: 3800, pallets: 4, deliveryWindow: { start: "11:00", end: "16:00" }, priority: "standard", specialReq: ["dock_delivery"], status: "pending", assignedVehicle: undefined, assignedRoute: undefined, customer: "Newark Cargo", serviceType: "LTL", estimatedMiles: 55 },
  { id: "S016", pro: "OTT-240321-016", origin: "Farmingdale Depot", destination: { name: "Hoboken Design Studio", address: "77 River St", city: "Hoboken", state: "NJ", zip: "07030", lat: 40.7359, lng: -74.0279 }, pieces: 5, weight: 950, pallets: 1, deliveryWindow: { start: "10:00", end: "14:00" }, priority: "standard", specialReq: ["inside_delivery", "stairs"], status: "pending", assignedVehicle: undefined, assignedRoute: undefined, customer: "Hoboken Design", serviceType: "final_mile", estimatedMiles: 42 },
];

// ─── Optimized Routes (Generated) ───────────────────────────────────
export interface OptimizedRoute {
  id: string;
  vehicleId: string;
  driver: string;
  zone: string;
  stops: { shipmentId: string; sequence: number; eta: string; status: "pending" | "completed" | "in_progress" | "skipped" }[];
  totalMiles: number;
  totalTime: number; // minutes
  capacityUtil: number; // percentage
  fuelEstimate: number; // gallons
  costEstimate: number;
  departTime: string;
  returnTime: string;
  optimizationScore: number; // 0-100
}

export const optimizedRoutes: OptimizedRoute[] = [
  { id: "R1", vehicleId: "OTT-105", driver: "Derek Powell", zone: "Manhattan", stops: [
    { shipmentId: "S011", sequence: 1, eta: "07:15", status: "completed" },
    { shipmentId: "S005", sequence: 2, eta: "08:30", status: "in_progress" },
    { shipmentId: "S001", sequence: 3, eta: "09:45", status: "pending" },
  ], totalMiles: 44, totalTime: 195, capacityUtil: 62, fuelEstimate: 5.8, costEstimate: 83.60, departTime: "06:00", returnTime: "11:15", optimizationScore: 88 },
  { id: "R2", vehicleId: "OTT-109", driver: "Luis Ortega", zone: "Brooklyn/Bronx", stops: [
    { shipmentId: "S014", sequence: 1, eta: "05:30", status: "completed" },
    { shipmentId: "S003", sequence: 2, eta: "07:15", status: "completed" },
  ], totalMiles: 52, totalTime: 165, capacityUtil: 50, fuelEstimate: 7.4, costEstimate: 148.20, departTime: "04:30", returnTime: "09:00", optimizationScore: 74 },
  { id: "R3", vehicleId: "OTT-102", driver: "Carlos Peña", zone: "Northern/Central NJ", stops: [
    { shipmentId: "S006", sequence: 1, eta: "07:20", status: "completed" },
    { shipmentId: "S012", sequence: 2, eta: "09:45", status: "in_progress" },
    { shipmentId: "S002", sequence: 3, eta: "12:00", status: "pending" },
  ], totalMiles: 118, totalTime: 330, capacityUtil: 83, fuelEstimate: 16.9, costEstimate: 336.30, departTime: "06:00", returnTime: "14:30", optimizationScore: 91 },
  { id: "R4", vehicleId: "OTT-108", driver: "Andre Williams", zone: "Staten Island/So. NJ", stops: [
    { shipmentId: "S009", sequence: 1, eta: "08:30", status: "in_progress" },
  ], totalMiles: 48, totalTime: 150, capacityUtil: 30, fuelEstimate: 6.2, costEstimate: 148.80, departTime: "07:00", returnTime: "12:00", optimizationScore: 65 },
  { id: "R5", vehicleId: "OTT-111", driver: "Chris Donovan", zone: "Southern CT", stops: [
    { shipmentId: "S008", sequence: 1, eta: "09:30", status: "completed" },
    { shipmentId: "S013", sequence: 2, eta: "11:15", status: "in_progress" },
  ], totalMiles: 72, totalTime: 240, capacityUtil: 33, fuelEstimate: 10.3, costEstimate: 172.80, departTime: "07:30", returnTime: "13:30", optimizationScore: 71 },
  { id: "R6", vehicleId: "OTT-103", driver: "James Walsh", zone: "Westchester/Yonkers", stops: [
    { shipmentId: "S010", sequence: 1, eta: "10:00", status: "pending" },
  ], totalMiles: 52, totalTime: 150, capacityUtil: 42, fuelEstimate: 7.4, costEstimate: 148.20, departTime: "08:30", returnTime: "13:00", optimizationScore: 68 },
];

// ─── Simulation Scenarios ───────────────────────────────────────────
export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: "reoptimize" | "what_if" | "capacity" | "weather" | "demand_surge";
  parameters: Record<string, string | number>;
  currentMetrics: { totalMiles: number; totalCost: number; avgOnTime: number; avgUtilization: number; totalRoutes: number; unassigned: number };
  optimizedMetrics: { totalMiles: number; totalCost: number; avgOnTime: number; avgUtilization: number; totalRoutes: number; unassigned: number };
  savings: { miles: number; cost: number; time: number };
  confidence: number;
  agentNotes: string[];
}

export const simulationScenarios: SimulationScenario[] = [
  {
    id: "SIM-001", name: "Full Route Reoptimization", description: "Consolidate all pending + in-transit stops using current vehicle positions and real-time traffic",
    type: "reoptimize",
    parameters: { trafficModel: "real_time", timeHorizon: "today", maxVehicles: 12 },
    currentMetrics: { totalMiles: 386, totalCost: 1037.90, avgOnTime: 0.87, avgUtilization: 0.50, totalRoutes: 6, unassigned: 4 },
    optimizedMetrics: { totalMiles: 312, totalCost: 864.20, avgOnTime: 0.94, avgUtilization: 0.72, totalRoutes: 5, unassigned: 0 },
    savings: { miles: 74, cost: 173.70, time: 48 },
    confidence: 0.92,
    agentNotes: [
      "Consolidate S015 + S016 onto R4 (Andre Williams returning via NJ) — saves 38 mi deadhead",
      "Move S004 from pending to R5 (Chris Donovan near Bridgeport) — saves 42 mi vs new route",
      "Combine S007 with next-day Central NJ run — out of efficient range for today",
      "Reroute OTT-101 from depot → Yonkers instead of OTT-103 (closer by 12 mi)",
    ],
  },
  {
    id: "SIM-002", name: "Monday Demand Surge", description: "Simulate 30% increase in shipment volume (typical Monday pattern) with current fleet",
    type: "demand_surge",
    parameters: { volumeIncrease: "30%", additionalShipments: 5, peakHours: "7:00-11:00" },
    currentMetrics: { totalMiles: 386, totalCost: 1037.90, avgOnTime: 0.87, avgUtilization: 0.50, totalRoutes: 6, unassigned: 4 },
    optimizedMetrics: { totalMiles: 488, totalCost: 1345.60, avgOnTime: 0.81, avgUtilization: 0.85, totalRoutes: 8, unassigned: 2 },
    savings: { miles: -102, cost: -307.70, time: -65 },
    confidence: 0.78,
    agentNotes: [
      "Fleet capacity stress: 2 shipments would need to defer to Tuesday or use spot carrier",
      "Manhattan zone becomes bottleneck — suggest split AM/PM routes",
      "Recommend activating OTT-110 (currently off-duty) for peak coverage",
      "Consider pre-positioning OTT-106 at Edison NJ cross-dock for NJ surge",
    ],
  },
  {
    id: "SIM-003", name: "Winter Storm Impact", description: "Simulate nor'easter conditions: 40% speed reduction, I-95 bridge closures, extended service times",
    type: "weather",
    parameters: { speedReduction: "40%", closedRoutes: "GW Bridge, Tappan Zee", serviceTimeMultiplier: 1.5 },
    currentMetrics: { totalMiles: 386, totalCost: 1037.90, avgOnTime: 0.87, avgUtilization: 0.50, totalRoutes: 6, unassigned: 4 },
    optimizedMetrics: { totalMiles: 342, totalCost: 1185.40, avgOnTime: 0.68, avgUtilization: 0.58, totalRoutes: 7, unassigned: 3 },
    savings: { miles: 44, cost: -147.50, time: -95 },
    confidence: 0.65,
    agentNotes: [
      "Cancel CT routes — reroute S008/S013 to next day",
      "Consolidate all NJ deliveries through Holland Tunnel (GW closed)",
      "Pre-notify customers: 2-4 hour window extensions across all zones",
      "Priority triage: White glove + expedited first, defer standard to tomorrow",
      "Fuel + overtime costs increase even with fewer miles due to crawl speeds",
    ],
  },
  {
    id: "SIM-004", name: "Add 2 Vehicles to Fleet", description: "Model impact of adding 2 new 26ft box trucks to the fleet on delivery capacity and efficiency",
    type: "capacity",
    parameters: { newVehicles: 2, vehicleType: "26ft_box", monthlyLeaseCost: 3200 },
    currentMetrics: { totalMiles: 386, totalCost: 1037.90, avgOnTime: 0.87, avgUtilization: 0.50, totalRoutes: 6, unassigned: 4 },
    optimizedMetrics: { totalMiles: 410, totalCost: 1122.50, avgOnTime: 0.96, avgUtilization: 0.68, totalRoutes: 8, unassigned: 0 },
    savings: { miles: -24, cost: -84.60, time: 35 },
    confidence: 0.88,
    agentNotes: [
      "Zero unassigned shipments — all pending orders covered same-day",
      "On-time improves from 87% → 96% with buffer capacity",
      "Payback analysis: $6,400/mo lease vs ~$4,200/mo in spot carrier avoidance + service improvement",
      "Net ROI positive within 45 days based on current volume trajectory",
      "Recommend stationing 1 new truck at NJ cross-dock for western NJ coverage",
    ],
  },
];

// ─── Route Performance Analytics ────────────────────────────────────
export interface DailyPerformance {
  date: string;
  totalShipments: number;
  delivered: number;
  onTime: number;
  late: number;
  exceptions: number;
  totalMiles: number;
  totalCost: number;
  avgCostPerStop: number;
  avgMilesPerRoute: number;
  fleetUtilization: number;
  fuelGallons: number;
  driverHours: number;
}

export const weeklyPerformance: DailyPerformance[] = [
  { date: "Mar 14", totalShipments: 18, delivered: 18, onTime: 16, late: 2, exceptions: 0, totalMiles: 412, totalCost: 1148.40, avgCostPerStop: 63.80, avgMilesPerRoute: 58.9, fleetUtilization: 0.68, fuelGallons: 58.9, driverHours: 66 },
  { date: "Mar 15", totalShipments: 14, delivered: 14, onTime: 13, late: 1, exceptions: 0, totalMiles: 338, totalCost: 942.20, avgCostPerStop: 67.30, avgMilesPerRoute: 56.3, fleetUtilization: 0.55, fuelGallons: 48.3, driverHours: 52 },
  { date: "Mar 16", totalShipments: 12, delivered: 12, onTime: 12, late: 0, exceptions: 0, totalMiles: 295, totalCost: 822.50, avgCostPerStop: 68.54, avgMilesPerRoute: 49.2, fleetUtilization: 0.50, fuelGallons: 42.1, driverHours: 45 },
  { date: "Mar 17", totalShipments: 20, delivered: 19, onTime: 16, late: 3, exceptions: 1, totalMiles: 468, totalCost: 1305.60, avgCostPerStop: 65.28, avgMilesPerRoute: 58.5, fleetUtilization: 0.75, fuelGallons: 66.9, driverHours: 74 },
  { date: "Mar 18", totalShipments: 22, delivered: 21, onTime: 18, late: 3, exceptions: 1, totalMiles: 502, totalCost: 1400.80, avgCostPerStop: 63.67, avgMilesPerRoute: 55.8, fleetUtilization: 0.78, fuelGallons: 71.7, driverHours: 82 },
  { date: "Mar 19", totalShipments: 15, delivered: 15, onTime: 14, late: 1, exceptions: 0, totalMiles: 356, totalCost: 992.80, avgCostPerStop: 66.19, avgMilesPerRoute: 50.9, fleetUtilization: 0.58, fuelGallons: 50.9, driverHours: 56 },
  { date: "Mar 20", totalShipments: 16, delivered: 12, onTime: 10, late: 2, exceptions: 0, totalMiles: 386, totalCost: 1037.90, avgCostPerStop: 64.87, avgMilesPerRoute: 55.1, fleetUtilization: 0.60, fuelGallons: 55.1, driverHours: 58 },
];

// ─── Zone Heatmap Data ──────────────────────────────────────────────
export interface ZoneHeatmapEntry {
  zone: string;
  hour: number; // 5-20
  intensity: number; // 0-1 delivery density
}

export const zoneHeatmap: ZoneHeatmapEntry[] = [
  // Manhattan
  { zone: "Manhattan", hour: 5, intensity: 0.1 }, { zone: "Manhattan", hour: 6, intensity: 0.35 },
  { zone: "Manhattan", hour: 7, intensity: 0.75 }, { zone: "Manhattan", hour: 8, intensity: 0.95 },
  { zone: "Manhattan", hour: 9, intensity: 0.90 }, { zone: "Manhattan", hour: 10, intensity: 0.70 },
  { zone: "Manhattan", hour: 11, intensity: 0.50 }, { zone: "Manhattan", hour: 12, intensity: 0.40 },
  { zone: "Manhattan", hour: 13, intensity: 0.30 }, { zone: "Manhattan", hour: 14, intensity: 0.20 },
  { zone: "Manhattan", hour: 15, intensity: 0.15 }, { zone: "Manhattan", hour: 16, intensity: 0.10 },
  // Brooklyn/Queens
  { zone: "Brooklyn/Queens", hour: 5, intensity: 0.05 }, { zone: "Brooklyn/Queens", hour: 6, intensity: 0.15 },
  { zone: "Brooklyn/Queens", hour: 7, intensity: 0.45 }, { zone: "Brooklyn/Queens", hour: 8, intensity: 0.70 },
  { zone: "Brooklyn/Queens", hour: 9, intensity: 0.85 }, { zone: "Brooklyn/Queens", hour: 10, intensity: 0.80 },
  { zone: "Brooklyn/Queens", hour: 11, intensity: 0.65 }, { zone: "Brooklyn/Queens", hour: 12, intensity: 0.55 },
  { zone: "Brooklyn/Queens", hour: 13, intensity: 0.40 }, { zone: "Brooklyn/Queens", hour: 14, intensity: 0.30 },
  { zone: "Brooklyn/Queens", hour: 15, intensity: 0.20 }, { zone: "Brooklyn/Queens", hour: 16, intensity: 0.15 },
  // Northern NJ
  { zone: "Northern NJ", hour: 5, intensity: 0.05 }, { zone: "Northern NJ", hour: 6, intensity: 0.10 },
  { zone: "Northern NJ", hour: 7, intensity: 0.30 }, { zone: "Northern NJ", hour: 8, intensity: 0.55 },
  { zone: "Northern NJ", hour: 9, intensity: 0.75 }, { zone: "Northern NJ", hour: 10, intensity: 0.85 },
  { zone: "Northern NJ", hour: 11, intensity: 0.80 }, { zone: "Northern NJ", hour: 12, intensity: 0.70 },
  { zone: "Northern NJ", hour: 13, intensity: 0.55 }, { zone: "Northern NJ", hour: 14, intensity: 0.40 },
  { zone: "Northern NJ", hour: 15, intensity: 0.25 }, { zone: "Northern NJ", hour: 16, intensity: 0.15 },
  // Long Island
  { zone: "Long Island", hour: 5, intensity: 0.02 }, { zone: "Long Island", hour: 6, intensity: 0.08 },
  { zone: "Long Island", hour: 7, intensity: 0.20 }, { zone: "Long Island", hour: 8, intensity: 0.45 },
  { zone: "Long Island", hour: 9, intensity: 0.65 }, { zone: "Long Island", hour: 10, intensity: 0.80 },
  { zone: "Long Island", hour: 11, intensity: 0.75 }, { zone: "Long Island", hour: 12, intensity: 0.60 },
  { zone: "Long Island", hour: 13, intensity: 0.50 }, { zone: "Long Island", hour: 14, intensity: 0.35 },
  { zone: "Long Island", hour: 15, intensity: 0.20 }, { zone: "Long Island", hour: 16, intensity: 0.10 },
  // Southern CT
  { zone: "Southern CT", hour: 5, intensity: 0.0 }, { zone: "Southern CT", hour: 6, intensity: 0.05 },
  { zone: "Southern CT", hour: 7, intensity: 0.15 }, { zone: "Southern CT", hour: 8, intensity: 0.35 },
  { zone: "Southern CT", hour: 9, intensity: 0.55 }, { zone: "Southern CT", hour: 10, intensity: 0.70 },
  { zone: "Southern CT", hour: 11, intensity: 0.75 }, { zone: "Southern CT", hour: 12, intensity: 0.65 },
  { zone: "Southern CT", hour: 13, intensity: 0.50 }, { zone: "Southern CT", hour: 14, intensity: 0.35 },
  { zone: "Southern CT", hour: 15, intensity: 0.20 }, { zone: "Southern CT", hour: 16, intensity: 0.10 },
];

// ─── KPI Summary ────────────────────────────────────────────────────
export const routingKPIs = {
  today: {
    totalShipments: 16,
    delivered: 4,
    inTransit: 8,
    pending: 4,
    onTimeRate: 0.87,
    avgCostPerDelivery: 64.87,
    fleetUtilization: 0.60,
    totalMiles: 386,
    totalRoutes: 6,
    optimizationScore: 76,
    potentialSavings: 173.70,
    unassignedShipments: 4,
  },
  mtd: {
    totalShipments: 348,
    delivered: 340,
    onTimeRate: 0.89,
    avgCostPerDelivery: 65.42,
    fleetUtilization: 0.63,
    totalMiles: 8240,
    fuelCost: 18528,
    laborCost: 42680,
    totalCost: 22768,
    milesOptimized: 1240,
    costSaved: 3720,
  },
  trends: {
    onTimeVsTarget: [
      { week: "W1 Mar", actual: 0.91, target: 0.95 },
      { week: "W2 Mar", actual: 0.88, target: 0.95 },
      { week: "W3 Mar", actual: 0.87, target: 0.95 },
    ],
    costPerDelivery: [
      { week: "W1 Mar", actual: 62.40, optimized: 58.10 },
      { week: "W2 Mar", actual: 65.80, optimized: 60.20 },
      { week: "W3 Mar", actual: 64.87, optimized: 59.50 },
    ],
    utilizationTrend: [
      { week: "W1 Mar", utilization: 0.66 },
      { week: "W2 Mar", utilization: 0.62 },
      { week: "W3 Mar", utilization: 0.60 },
    ],
  },
};

// ─── Optimization Recommendations ───────────────────────────────────
export interface Recommendation {
  id: string;
  priority: "critical" | "high" | "medium" | "low";
  category: "route" | "fleet" | "zone" | "cost" | "service";
  title: string;
  description: string;
  impact: string;
  estimatedSaving: number; // monthly $
}

export const recommendations: Recommendation[] = [
  { id: "REC-01", priority: "critical", category: "route", title: "Consolidate NJ Routes", description: "Merge R3 and R4 Northern NJ stops when deliveries overlap. Current deadhead miles between Parsippany and Secaucus are avoidable.", impact: "Reduce 180 miles/week deadhead", estimatedSaving: 2160 },
  { id: "REC-02", priority: "high", category: "fleet", title: "Pre-position Sprinter at Manhattan", description: "Station OTT-106 overnight at NYC parking facility for early AM Manhattan deliveries. Eliminates 36-mile deadhead from Farmingdale.", impact: "Save 36 mi/day × 22 days = 792 mi/mo", estimatedSaving: 1504 },
  { id: "REC-03", priority: "high", category: "zone", title: "Split Manhattan AM/PM", description: "Manhattan zone traffic multiplier (1.65×) makes single-window routes inefficient. Split into 6-10 AM and 2-5 PM windows.", impact: "Improve Manhattan on-time from 82% to 91%", estimatedSaving: 880 },
  { id: "REC-04", priority: "medium", category: "cost", title: "Right-size Vehicle Selection", description: "38% of Manhattan deliveries use 26ft box trucks for <3 pallet loads. Switch to sprinters for sub-2000 lb shipments.", impact: "Reduce per-stop cost by $0.95/mi differential", estimatedSaving: 1320 },
  { id: "REC-05", priority: "medium", category: "service", title: "Dynamic Time Window Negotiation", description: "Offer customers flexible 2-hour windows with $5/stop discount. Currently 62% of shipments have rigid 3-hour windows.", impact: "Increase route density by 15-20%", estimatedSaving: 960 },
  { id: "REC-06", priority: "low", category: "fleet", title: "Add Cross-dock in Edison, NJ", description: "Central NJ cross-dock would reduce stem miles for 40% of NJ deliveries. Current depot-centric model adds 25+ mi per NJ route.", impact: "Reduce NJ route miles by 22%", estimatedSaving: 3200 },
];
