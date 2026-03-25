// ──────────────────────────────────────────────────────
// Facility Utilization — AI Vision Analytics
// Computer vision analysis of video feeds & facility images
// Inspired by: Spot AI, Visionify, Axis Object Analytics,
// Coram AI, Roboflow occupancy analytics
// ──────────────────────────────────────────────────────

// ── Zone Types ───────────────────────────────────────
export type ZoneType = "storage" | "staging" | "dock" | "office" | "aisle" | "value-add" | "cold-chain" | "hazmat";
export type OccupancyLevel = "full" | "high" | "moderate" | "low" | "empty";
export type CameraStatus = "online" | "offline" | "maintenance";

// ── Camera Feed ──────────────────────────────────────
export interface CameraFeed {
  id: string;
  facility: string;
  zone: string;
  zoneType: ZoneType;
  location: string; // descriptive location within facility
  status: CameraStatus;
  lastFrame: string; // timestamp
  resolution: string;
  aiModel: string;
}

// ── Zone Utilization ─────────────────────────────────
export interface ZoneUtilization {
  zoneId: string;
  facility: string;
  zoneName: string;
  zoneType: ZoneType;
  totalSqft: number;
  occupiedSqft: number;
  utilizationPct: number;
  occupancyLevel: OccupancyLevel;
  palletCapacity: number;
  palletsInUse: number;
  rackLevels: number;
  rackUtilPct: number;
  avgDwellHrs: number; // avg time inventory stays in zone
  trafficCount24h: number; // people/forklifts in last 24h
  peakTrafficHour: string;
  lastAnalyzed: string;
  trend7d: "up" | "down" | "stable";
  aiConfidence: number; // 0-100
}

// ── Facility AI Summary ──────────────────────────────
export interface FacilityAISummary {
  facility: string;
  location: string;
  totalSqft: number;
  usableSqft: number; // excluding aisles, offices, etc.
  occupiedSqft: number;
  vacantSqft: number;
  utilPct: number;
  vacancyPct: number;
  rackCapacity: number;
  racksUsed: number;
  rackUtilPct: number;
  zones: number;
  camerasOnline: number;
  camerasTotal: number;
  avgDwellHrs: number;
  dailyTraffic: number;
  peakHour: string;
  aiScore: number; // 0-100 overall AI health score
  customers: string[];
  heatmapIntensity: number[]; // 24-hour heat (0-100 per hour)
  trend30d: "improving" | "declining" | "stable";
  lastScanTime: string;
  alerts: number;
  // vision detection counts
  forkliftsDetected: number;
  personnelDetected: number;
  palletsDetected: number;
  vehiclesAtDock: number;
}

// ── Time-Series Utilization ──────────────────────────
export interface UtilizationTimeSeries {
  timestamp: string;
  facilityAvgUtil: number;
  occupiedSqft: number;
  vacantSqft: number;
  trafficCount: number;
}

// ── AI Alert ─────────────────────────────────────────
export interface AIAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  facility: string;
  zone: string;
  message: string;
  detectionType: string;
  confidence: number;
  timestamp: string;
  acknowledged: boolean;
}

// ── Hourly Heatmap Data ──────────────────────────────
export interface HourlyHeatmap {
  hour: string;
  occupancyPct: number;
  trafficCount: number;
  forklifts: number;
  personnel: number;
}

// ────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────

export const cameraFeeds: CameraFeed[] = [
  { id: "CAM-MOW-01", facility: "Mowry", zone: "Main Storage A", zoneType: "storage", location: "Ceiling Mount — Bay A1-A12", status: "online", lastFrame: "Today 10:14 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-MOW-02", facility: "Mowry", zone: "Main Storage B", zoneType: "storage", location: "Ceiling Mount — Bay B1-B10", status: "online", lastFrame: "Today 10:14 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-MOW-03", facility: "Mowry", zone: "Dock Area", zoneType: "dock", location: "Overhead — Docks 1-8", status: "online", lastFrame: "Today 10:14 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-MOW-04", facility: "Mowry", zone: "Value-Add Area", zoneType: "value-add", location: "Wall Mount — East Wing", status: "online", lastFrame: "Today 10:14 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-CHR-01", facility: "Christy", zone: "Primary Storage", zoneType: "storage", location: "Ceiling Mount — Main Floor", status: "online", lastFrame: "Today 10:13 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-CHR-02", facility: "Christy", zone: "Staging Area", zoneType: "staging", location: "Wall Mount — Loading Bay", status: "online", lastFrame: "Today 10:13 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-CHR-03", facility: "Christy", zone: "Dock", zoneType: "dock", location: "Overhead — Docks 1-6", status: "online", lastFrame: "Today 10:13 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-VR-01", facility: "Vista Ridge", zone: "Main Floor", zoneType: "storage", location: "Ceiling Mount — Full Floor", status: "online", lastFrame: "Today 10:12 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-VR-02", facility: "Vista Ridge", zone: "Dock / Staging", zoneType: "dock", location: "Overhead — South Docks", status: "online", lastFrame: "Today 10:12 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-HAR-01", facility: "Hardy", zone: "Storage", zoneType: "storage", location: "Ceiling Mount — Main", status: "online", lastFrame: "Today 10:11 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-HAR-02", facility: "Hardy", zone: "Cold Chain", zoneType: "cold-chain", location: "Interior — Temp Controlled", status: "online", lastFrame: "Today 10:11 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-MOR-01", facility: "Morton", zone: "Main Storage", zoneType: "storage", location: "Ceiling Mount", status: "online", lastFrame: "Today 10:10 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-MOR-02", facility: "Morton", zone: "Dock", zoneType: "dock", location: "Overhead — Docks", status: "online", lastFrame: "Today 10:10 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-IND-01", facility: "Industrial", zone: "Full Floor", zoneType: "storage", location: "Wall Mount", status: "online", lastFrame: "Today 10:09 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-WL-01", facility: "Whitmore Lake", zone: "Main Storage", zoneType: "storage", location: "Ceiling Mount", status: "online", lastFrame: "Today 10:08 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-WL-02", facility: "Whitmore Lake", zone: "Dock", zoneType: "dock", location: "Overhead", status: "maintenance", lastFrame: "Yesterday 4:32 PM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-HAY-01", facility: "Hayman", zone: "Main Floor", zoneType: "storage", location: "Ceiling Mount", status: "online", lastFrame: "Today 10:07 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-GRD-01", facility: "Grand", zone: "Storage", zoneType: "storage", location: "Ceiling Mount", status: "online", lastFrame: "Today 10:06 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-GRD-02", facility: "Grand", zone: "Staging", zoneType: "staging", location: "Wall Mount", status: "offline", lastFrame: "Today 7:42 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-PAT-01", facility: "Patterson", zone: "Main Storage", zoneType: "storage", location: "Ceiling Mount — Bays 1-20", status: "online", lastFrame: "Today 10:05 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-PAT-02", facility: "Patterson", zone: "Staging / Dock", zoneType: "dock", location: "Overhead", status: "online", lastFrame: "Today 10:05 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-KAT-01", facility: "Kato", zone: "Active Storage", zoneType: "storage", location: "Ceiling Mount — East Wing", status: "online", lastFrame: "Today 10:04 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-KAT-02", facility: "Kato", zone: "Vacant Floor", zoneType: "storage", location: "Ceiling Mount — West Wing", status: "online", lastFrame: "Today 10:04 AM", resolution: "4K", aiModel: "SpotAI v3.2" },
  { id: "CAM-KAT-03", facility: "Kato", zone: "Dock Area", zoneType: "dock", location: "Overhead", status: "online", lastFrame: "Today 10:04 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-HAW-01", facility: "Hawthorne", zone: "Main Floor", zoneType: "storage", location: "Ceiling Mount", status: "online", lastFrame: "Today 10:03 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
  { id: "CAM-HAW-02", facility: "Hawthorne", zone: "Dock", zoneType: "dock", location: "Overhead", status: "online", lastFrame: "Today 10:03 AM", resolution: "1080p", aiModel: "SpotAI v3.2" },
];

export const facilityAISummaries: FacilityAISummary[] = [
  {
    facility: "Mowry", location: "Newark, CA", totalSqft: 268538, usableSqft: 228257, occupiedSqft: 228257, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 4200, racksUsed: 3948, rackUtilPct: 94, zones: 6, camerasOnline: 4, camerasTotal: 4,
    avgDwellHrs: 168, dailyTraffic: 342, peakHour: "10:00 AM", aiScore: 96,
    customers: ["LAM Research"], heatmapIntensity: [5,3,2,2,2,8,22,55,78,92,88,75,48,72,85,80,68,42,25,15,10,8,6,5],
    trend30d: "stable", lastScanTime: "Today 10:14 AM", alerts: 0,
    forkliftsDetected: 8, personnelDetected: 42, palletsDetected: 3812, vehiclesAtDock: 3,
  },
  {
    facility: "Christy", location: "Fremont, CA", totalSqft: 190080, usableSqft: 161568, occupiedSqft: 161568, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 2800, racksUsed: 2688, rackUtilPct: 96, zones: 5, camerasOnline: 3, camerasTotal: 3,
    avgDwellHrs: 192, dailyTraffic: 218, peakHour: "9:30 AM", aiScore: 97,
    customers: ["KLA"], heatmapIntensity: [4,3,2,2,2,7,20,52,75,90,86,72,45,68,82,78,65,40,22,12,8,6,5,4],
    trend30d: "stable", lastScanTime: "Today 10:13 AM", alerts: 0,
    forkliftsDetected: 5, personnelDetected: 28, palletsDetected: 2456, vehiclesAtDock: 2,
  },
  {
    facility: "Hawthorne", location: "Livermore, CA", totalSqft: 75451, usableSqft: 64133, occupiedSqft: 64133, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 1200, racksUsed: 1128, rackUtilPct: 94, zones: 3, camerasOnline: 2, camerasTotal: 2,
    avgDwellHrs: 144, dailyTraffic: 98, peakHour: "10:15 AM", aiScore: 93,
    customers: ["LAM Research"], heatmapIntensity: [3,2,2,1,1,6,18,48,72,85,82,70,42,65,78,75,62,38,20,10,7,5,4,3],
    trend30d: "stable", lastScanTime: "Today 10:03 AM", alerts: 0,
    forkliftsDetected: 2, personnelDetected: 14, palletsDetected: 1024, vehiclesAtDock: 1,
  },
  {
    facility: "Vista Ridge", location: "Kyle, TX", totalSqft: 208010, usableSqft: 176809, occupiedSqft: 176809, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 3200, racksUsed: 3072, rackUtilPct: 96, zones: 5, camerasOnline: 2, camerasTotal: 2,
    avgDwellHrs: 216, dailyTraffic: 185, peakHour: "9:45 AM", aiScore: 94,
    customers: ["Tesla"], heatmapIntensity: [4,3,2,2,2,8,25,58,82,94,90,78,50,75,88,84,72,45,28,18,12,8,6,4],
    trend30d: "stable", lastScanTime: "Today 10:12 AM", alerts: 0,
    forkliftsDetected: 6, personnelDetected: 32, palletsDetected: 2845, vehiclesAtDock: 2,
  },
  {
    facility: "Hardy", location: "Phoenix, AZ", totalSqft: 157992, usableSqft: 134293, occupiedSqft: 134293, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 2400, racksUsed: 2280, rackUtilPct: 95, zones: 4, camerasOnline: 2, camerasTotal: 2,
    avgDwellHrs: 240, dailyTraffic: 152, peakHour: "9:00 AM", aiScore: 95,
    customers: ["Corning"], heatmapIntensity: [3,2,2,1,1,10,28,62,88,92,88,75,48,72,85,82,70,42,22,12,8,5,4,3],
    trend30d: "stable", lastScanTime: "Today 10:11 AM", alerts: 0,
    forkliftsDetected: 4, personnelDetected: 22, palletsDetected: 2124, vehiclesAtDock: 1,
  },
  {
    facility: "Morton", location: "Newark, CA", totalSqft: 141275, usableSqft: 120084, occupiedSqft: 120084, vacantSqft: 0, utilPct: 100, vacancyPct: 0,
    rackCapacity: 2000, racksUsed: 1880, rackUtilPct: 94, zones: 4, camerasOnline: 2, camerasTotal: 2,
    avgDwellHrs: 180, dailyTraffic: 168, peakHour: "10:00 AM", aiScore: 92,
    customers: ["KLA", "Delta", "Lucid"], heatmapIntensity: [4,3,2,2,2,8,22,55,78,90,86,74,46,70,84,80,68,40,24,14,10,7,5,4],
    trend30d: "stable", lastScanTime: "Today 10:10 AM", alerts: 1,
    forkliftsDetected: 4, personnelDetected: 24, palletsDetected: 1742, vehiclesAtDock: 2,
  },
  {
    facility: "Industrial", location: "Fremont, CA", totalSqft: 14000, usableSqft: 11900, occupiedSqft: 10245, vacantSqft: 1655, utilPct: 86.1, vacancyPct: 13.9,
    rackCapacity: 200, racksUsed: 168, rackUtilPct: 84, zones: 2, camerasOnline: 1, camerasTotal: 1,
    avgDwellHrs: 120, dailyTraffic: 45, peakHour: "11:00 AM", aiScore: 78,
    customers: ["Amazon"], heatmapIntensity: [2,1,1,1,1,4,12,32,52,68,72,65,38,55,68,64,52,30,15,8,5,3,2,2],
    trend30d: "declining", lastScanTime: "Today 10:09 AM", alerts: 1,
    forkliftsDetected: 1, personnelDetected: 6, palletsDetected: 156, vehiclesAtDock: 0,
  },
  {
    facility: "Whitmore Lake", location: "Whitmore Lake, MI", totalSqft: 52800, usableSqft: 44880, occupiedSqft: 38422, vacantSqft: 6458, utilPct: 85.6, vacancyPct: 14.4,
    rackCapacity: 800, racksUsed: 672, rackUtilPct: 84, zones: 3, camerasOnline: 1, camerasTotal: 2,
    avgDwellHrs: 200, dailyTraffic: 72, peakHour: "10:30 AM", aiScore: 72,
    customers: ["Tesla"], heatmapIntensity: [2,1,1,1,1,5,15,38,58,72,75,68,40,60,72,68,55,32,18,10,6,4,3,2],
    trend30d: "declining", lastScanTime: "Today 10:08 AM", alerts: 2,
    forkliftsDetected: 2, personnelDetected: 10, palletsDetected: 612, vehiclesAtDock: 1,
  },
  {
    facility: "Hayman", location: "Hayward, CA", totalSqft: 75328, usableSqft: 64029, occupiedSqft: 47185, vacantSqft: 16844, utilPct: 73.7, vacancyPct: 26.3,
    rackCapacity: 1100, racksUsed: 792, rackUtilPct: 72, zones: 3, camerasOnline: 1, camerasTotal: 1,
    avgDwellHrs: 160, dailyTraffic: 62, peakHour: "9:30 AM", aiScore: 65,
    customers: ["Tesla"], heatmapIntensity: [2,1,1,1,1,4,12,35,52,65,68,60,35,52,65,62,50,28,15,8,5,3,2,2],
    trend30d: "improving", lastScanTime: "Today 10:07 AM", alerts: 1,
    forkliftsDetected: 2, personnelDetected: 8, palletsDetected: 724, vehiclesAtDock: 0,
  },
  {
    facility: "Grand", location: "Fremont, CA", totalSqft: 85000, usableSqft: 72250, occupiedSqft: 49925, vacantSqft: 22325, utilPct: 69.1, vacancyPct: 30.9,
    rackCapacity: 1200, racksUsed: 804, rackUtilPct: 67, zones: 3, camerasOnline: 1, camerasTotal: 2,
    avgDwellHrs: 140, dailyTraffic: 55, peakHour: "10:00 AM", aiScore: 58,
    customers: ["Tesla"], heatmapIntensity: [2,1,1,1,1,3,10,28,45,58,62,55,32,48,58,55,45,25,12,6,4,3,2,2],
    trend30d: "improving", lastScanTime: "Today 10:06 AM", alerts: 2,
    forkliftsDetected: 1, personnelDetected: 7, palletsDetected: 735, vehiclesAtDock: 0,
  },
  {
    facility: "Patterson", location: "Livermore, CA", totalSqft: 181458, usableSqft: 154239, occupiedSqft: 95472, vacantSqft: 58767, utilPct: 61.9, vacancyPct: 38.1,
    rackCapacity: 2600, racksUsed: 1586, rackUtilPct: 61, zones: 5, camerasOnline: 2, camerasTotal: 2,
    avgDwellHrs: 132, dailyTraffic: 88, peakHour: "10:15 AM", aiScore: 52,
    customers: ["LAM Research", "Delta", "Panasonic"], heatmapIntensity: [2,1,1,1,1,4,14,38,55,68,65,58,34,52,64,60,48,28,15,8,5,3,2,2],
    trend30d: "improving", lastScanTime: "Today 10:05 AM", alerts: 3,
    forkliftsDetected: 3, personnelDetected: 12, palletsDetected: 1452, vehiclesAtDock: 1,
  },
  {
    facility: "Kato", location: "Fremont, CA", totalSqft: 209748, usableSqft: 178286, occupiedSqft: 49920, vacantSqft: 128366, utilPct: 28.0, vacancyPct: 72.0,
    rackCapacity: 3400, racksUsed: 918, rackUtilPct: 27, zones: 4, camerasOnline: 3, camerasTotal: 3,
    avgDwellHrs: 96, dailyTraffic: 35, peakHour: "10:30 AM", aiScore: 28,
    customers: ["Tesla", "Delta", "Wisk"], heatmapIntensity: [1,1,1,0,0,2,8,18,28,35,38,32,20,30,35,32,25,15,8,4,2,1,1,1],
    trend30d: "declining", lastScanTime: "Today 10:04 AM", alerts: 5,
    forkliftsDetected: 1, personnelDetected: 5, palletsDetected: 842, vehiclesAtDock: 0,
  },
];

// ── Zone-Level Data (selected facilities) ────────────
export const zoneUtilizations: ZoneUtilization[] = [
  // Mowry zones
  { zoneId: "MOW-A", facility: "Mowry", zoneName: "Storage Bay A", zoneType: "storage", totalSqft: 68000, occupiedSqft: 68000, utilizationPct: 100, occupancyLevel: "full", palletCapacity: 1200, palletsInUse: 1152, rackLevels: 4, rackUtilPct: 96, avgDwellHrs: 192, trafficCount24h: 95, peakTrafficHour: "10:00 AM", lastAnalyzed: "Today 10:14 AM", trend7d: "stable", aiConfidence: 97 },
  { zoneId: "MOW-B", facility: "Mowry", zoneName: "Storage Bay B", zoneType: "storage", totalSqft: 65000, occupiedSqft: 65000, utilizationPct: 100, occupancyLevel: "full", palletCapacity: 1100, palletsInUse: 1078, rackLevels: 4, rackUtilPct: 98, avgDwellHrs: 180, trafficCount24h: 82, peakTrafficHour: "9:30 AM", lastAnalyzed: "Today 10:14 AM", trend7d: "stable", aiConfidence: 96 },
  { zoneId: "MOW-C", facility: "Mowry", zoneName: "Staging Area", zoneType: "staging", totalSqft: 32000, occupiedSqft: 28000, utilizationPct: 87.5, occupancyLevel: "high", palletCapacity: 400, palletsInUse: 348, rackLevels: 2, rackUtilPct: 87, avgDwellHrs: 24, trafficCount24h: 125, peakTrafficHour: "2:00 PM", lastAnalyzed: "Today 10:14 AM", trend7d: "up", aiConfidence: 94 },
  { zoneId: "MOW-D", facility: "Mowry", zoneName: "Dock / Receiving", zoneType: "dock", totalSqft: 28000, occupiedSqft: 24000, utilizationPct: 85.7, occupancyLevel: "high", palletCapacity: 300, palletsInUse: 252, rackLevels: 1, rackUtilPct: 84, avgDwellHrs: 8, trafficCount24h: 165, peakTrafficHour: "10:30 AM", lastAnalyzed: "Today 10:14 AM", trend7d: "stable", aiConfidence: 95 },
  { zoneId: "MOW-E", facility: "Mowry", zoneName: "Value-Add", zoneType: "value-add", totalSqft: 22000, occupiedSqft: 22000, utilizationPct: 100, occupancyLevel: "full", palletCapacity: 200, palletsInUse: 192, rackLevels: 2, rackUtilPct: 96, avgDwellHrs: 48, trafficCount24h: 45, peakTrafficHour: "11:00 AM", lastAnalyzed: "Today 10:14 AM", trend7d: "stable", aiConfidence: 93 },
  { zoneId: "MOW-F", facility: "Mowry", zoneName: "Office / Admin", zoneType: "office", totalSqft: 13257, occupiedSqft: 13257, utilizationPct: 100, occupancyLevel: "full", palletCapacity: 0, palletsInUse: 0, rackLevels: 0, rackUtilPct: 0, avgDwellHrs: 0, trafficCount24h: 28, peakTrafficHour: "9:00 AM", lastAnalyzed: "Today 10:14 AM", trend7d: "stable", aiConfidence: 98 },

  // Kato zones (high vacancy)
  { zoneId: "KAT-A", facility: "Kato", zoneName: "East Wing (Active)", zoneType: "storage", totalSqft: 52000, occupiedSqft: 36400, utilizationPct: 70, occupancyLevel: "moderate", palletCapacity: 900, palletsInUse: 612, rackLevels: 4, rackUtilPct: 68, avgDwellHrs: 120, trafficCount24h: 22, peakTrafficHour: "10:00 AM", lastAnalyzed: "Today 10:04 AM", trend7d: "down", aiConfidence: 95 },
  { zoneId: "KAT-B", facility: "Kato", zoneName: "West Wing (Vacant)", zoneType: "storage", totalSqft: 85000, occupiedSqft: 4250, utilizationPct: 5, occupancyLevel: "empty", palletCapacity: 1500, palletsInUse: 75, rackLevels: 4, rackUtilPct: 5, avgDwellHrs: 0, trafficCount24h: 3, peakTrafficHour: "8:00 AM", lastAnalyzed: "Today 10:04 AM", trend7d: "stable", aiConfidence: 98 },
  { zoneId: "KAT-C", facility: "Kato", zoneName: "Center Storage", zoneType: "storage", totalSqft: 28000, occupiedSqft: 5600, utilizationPct: 20, occupancyLevel: "low", palletCapacity: 500, palletsInUse: 95, rackLevels: 4, rackUtilPct: 19, avgDwellHrs: 72, trafficCount24h: 5, peakTrafficHour: "11:00 AM", lastAnalyzed: "Today 10:04 AM", trend7d: "down", aiConfidence: 94 },
  { zoneId: "KAT-D", facility: "Kato", zoneName: "Dock / Staging", zoneType: "dock", totalSqft: 13286, occupiedSqft: 3670, utilizationPct: 27.6, occupancyLevel: "low", palletCapacity: 200, palletsInUse: 48, rackLevels: 1, rackUtilPct: 24, avgDwellHrs: 12, trafficCount24h: 5, peakTrafficHour: "10:30 AM", lastAnalyzed: "Today 10:04 AM", trend7d: "stable", aiConfidence: 92 },

  // Patterson zones (moderate vacancy)
  { zoneId: "PAT-A", facility: "Patterson", zoneName: "LAM Section", zoneType: "storage", totalSqft: 48000, occupiedSqft: 42240, utilizationPct: 88, occupancyLevel: "high", palletCapacity: 800, palletsInUse: 696, rackLevels: 4, rackUtilPct: 87, avgDwellHrs: 168, trafficCount24h: 35, peakTrafficHour: "10:00 AM", lastAnalyzed: "Today 10:05 AM", trend7d: "stable", aiConfidence: 96 },
  { zoneId: "PAT-B", facility: "Patterson", zoneName: "Delta / Panasonic", zoneType: "storage", totalSqft: 42000, occupiedSqft: 27300, utilizationPct: 65, occupancyLevel: "moderate", palletCapacity: 700, palletsInUse: 448, rackLevels: 4, rackUtilPct: 64, avgDwellHrs: 144, trafficCount24h: 25, peakTrafficHour: "9:30 AM", lastAnalyzed: "Today 10:05 AM", trend7d: "up", aiConfidence: 95 },
  { zoneId: "PAT-C", facility: "Patterson", zoneName: "Vacant Bay C", zoneType: "storage", totalSqft: 38000, occupiedSqft: 7600, utilizationPct: 20, occupancyLevel: "low", palletCapacity: 650, palletsInUse: 126, rackLevels: 4, rackUtilPct: 19, avgDwellHrs: 48, trafficCount24h: 8, peakTrafficHour: "11:00 AM", lastAnalyzed: "Today 10:05 AM", trend7d: "stable", aiConfidence: 97 },
  { zoneId: "PAT-D", facility: "Patterson", zoneName: "Dock / Staging", zoneType: "dock", totalSqft: 18000, occupiedSqft: 12600, utilizationPct: 70, occupancyLevel: "moderate", palletCapacity: 250, palletsInUse: 168, rackLevels: 1, rackUtilPct: 67, avgDwellHrs: 12, trafficCount24h: 42, peakTrafficHour: "2:00 PM", lastAnalyzed: "Today 10:05 AM", trend7d: "stable", aiConfidence: 93 },
  { zoneId: "PAT-E", facility: "Patterson", zoneName: "Hazmat / Compliance", zoneType: "hazmat", totalSqft: 8239, occupiedSqft: 5732, utilizationPct: 69.6, occupancyLevel: "moderate", palletCapacity: 200, palletsInUse: 132, rackLevels: 2, rackUtilPct: 66, avgDwellHrs: 240, trafficCount24h: 12, peakTrafficHour: "9:00 AM", lastAnalyzed: "Today 10:05 AM", trend7d: "stable", aiConfidence: 91 },
];

// ── AI Vision Alerts ─────────────────────────────────
export const aiAlerts: AIAlert[] = [
  { id: "AV-001", severity: "critical", facility: "Kato", zone: "West Wing", message: "128,366 sqft vacant — AI detects zero inventory movement for 72+ hours", detectionType: "Vacancy Detection", confidence: 98, timestamp: "Today 10:04 AM", acknowledged: false },
  { id: "AV-002", severity: "critical", facility: "Kato", zone: "Center Storage", message: "Rack utilization dropped to 19% — 81% empty rack positions detected via image analysis", detectionType: "Rack Scanning", confidence: 95, timestamp: "Today 10:04 AM", acknowledged: false },
  { id: "AV-003", severity: "warning", facility: "Patterson", zone: "Vacant Bay C", message: "20% utilization in 38,000 sqft bay — AI recommends consolidation with Delta/Panasonic zone", detectionType: "Space Optimization", confidence: 92, timestamp: "Today 10:05 AM", acknowledged: false },
  { id: "AV-004", severity: "warning", facility: "Grand", zone: "Storage", message: "30.9% vacancy — AI detects underutilized rack positions in rows 8-14", detectionType: "Rack Scanning", confidence: 90, timestamp: "Today 10:06 AM", acknowledged: true },
  { id: "AV-005", severity: "warning", facility: "Hayman", zone: "Main Floor", message: "26.3% vacancy — Tesla Glass expansion (+10K sqft) improving trend detected", detectionType: "Trend Analysis", confidence: 88, timestamp: "Today 10:07 AM", acknowledged: true },
  { id: "AV-006", severity: "warning", facility: "Whitmore Lake", zone: "Dock", message: "Camera CAM-WL-02 offline since yesterday — maintenance required", detectionType: "Camera Health", confidence: 100, timestamp: "Yesterday 4:32 PM", acknowledged: false },
  { id: "AV-007", severity: "warning", facility: "Grand", zone: "Staging", message: "Camera CAM-GRD-02 offline since 7:42 AM — connectivity issue", detectionType: "Camera Health", confidence: 100, timestamp: "Today 7:42 AM", acknowledged: false },
  { id: "AV-008", severity: "info", facility: "Mowry", zone: "Staging Area", message: "Peak staging utilization 87.5% — consider overflow routing to Storage Bay B", detectionType: "Space Optimization", confidence: 94, timestamp: "Today 9:30 AM", acknowledged: true },
  { id: "AV-009", severity: "info", facility: "Christy", zone: "Primary Storage", message: "Rack utilization 96% — highest in network. Model facility for best practices.", detectionType: "Benchmark", confidence: 97, timestamp: "Today 10:13 AM", acknowledged: true },
  { id: "AV-010", severity: "info", facility: "Patterson", zone: "LAM Section", message: "Panasonic ramp-up detected — additional 3,500 sqft utilized vs. last week", detectionType: "Trend Analysis", confidence: 91, timestamp: "Today 10:05 AM", acknowledged: true },
  { id: "AV-011", severity: "critical", facility: "Kato", zone: "Full Facility", message: "Monthly vacancy cost: ~$146K at current lease rate — 62 months remaining", detectionType: "Financial Impact", confidence: 99, timestamp: "Today 8:00 AM", acknowledged: false },
  { id: "AV-012", severity: "warning", facility: "Patterson", zone: "Delta / Panasonic", message: "Delta inventory declining 3.5K sqft — monitor for further contraction", detectionType: "Trend Analysis", confidence: 87, timestamp: "Today 10:05 AM", acknowledged: false },
  { id: "AV-013", severity: "info", facility: "Vista Ridge", zone: "Main Floor", message: "Tesla operations running at full capacity — 0 vacancy, 96% rack utilization", detectionType: "Benchmark", confidence: 96, timestamp: "Today 10:12 AM", acknowledged: true },
];

// ── Utilization Timeline (30 days, all-facility avg) ──
export const utilizationTimeline: UtilizationTimeSeries[] = [
  { timestamp: "Feb 16", facilityAvgUtil: 81.2, occupiedSqft: 1348000, vacantSqft: 311680, trafficCount: 1420 },
  { timestamp: "Feb 17", facilityAvgUtil: 81.0, occupiedSqft: 1345000, vacantSqft: 314680, trafficCount: 1398 },
  { timestamp: "Feb 18", facilityAvgUtil: 81.4, occupiedSqft: 1351000, vacantSqft: 308680, trafficCount: 1445 },
  { timestamp: "Feb 19", facilityAvgUtil: 81.1, occupiedSqft: 1346000, vacantSqft: 313680, trafficCount: 1410 },
  { timestamp: "Feb 20", facilityAvgUtil: 81.3, occupiedSqft: 1349000, vacantSqft: 310680, trafficCount: 1435 },
  { timestamp: "Feb 21", facilityAvgUtil: 80.8, occupiedSqft: 1341000, vacantSqft: 318680, trafficCount: 820 },
  { timestamp: "Feb 22", facilityAvgUtil: 80.8, occupiedSqft: 1341000, vacantSqft: 318680, trafficCount: 450 },
  { timestamp: "Feb 23", facilityAvgUtil: 81.5, occupiedSqft: 1353000, vacantSqft: 306680, trafficCount: 1452 },
  { timestamp: "Feb 24", facilityAvgUtil: 81.8, occupiedSqft: 1358000, vacantSqft: 301680, trafficCount: 1478 },
  { timestamp: "Feb 25", facilityAvgUtil: 82.0, occupiedSqft: 1361000, vacantSqft: 298680, trafficCount: 1490 },
  { timestamp: "Feb 26", facilityAvgUtil: 82.2, occupiedSqft: 1364000, vacantSqft: 295680, trafficCount: 1502 },
  { timestamp: "Feb 27", facilityAvgUtil: 82.1, occupiedSqft: 1363000, vacantSqft: 296680, trafficCount: 1495 },
  { timestamp: "Feb 28", facilityAvgUtil: 81.8, occupiedSqft: 1358000, vacantSqft: 301680, trafficCount: 835 },
  { timestamp: "Mar 1", facilityAvgUtil: 81.8, occupiedSqft: 1358000, vacantSqft: 301680, trafficCount: 460 },
  { timestamp: "Mar 2", facilityAvgUtil: 82.3, occupiedSqft: 1366000, vacantSqft: 293680, trafficCount: 1510 },
  { timestamp: "Mar 3", facilityAvgUtil: 82.5, occupiedSqft: 1369000, vacantSqft: 290680, trafficCount: 1525 },
  { timestamp: "Mar 4", facilityAvgUtil: 82.8, occupiedSqft: 1374000, vacantSqft: 285680, trafficCount: 1548 },
  { timestamp: "Mar 5", facilityAvgUtil: 83.0, occupiedSqft: 1377000, vacantSqft: 282680, trafficCount: 1560 },
  { timestamp: "Mar 6", facilityAvgUtil: 83.2, occupiedSqft: 1380000, vacantSqft: 279680, trafficCount: 1572 },
  { timestamp: "Mar 7", facilityAvgUtil: 82.8, occupiedSqft: 1374000, vacantSqft: 285680, trafficCount: 850 },
  { timestamp: "Mar 8", facilityAvgUtil: 82.8, occupiedSqft: 1374000, vacantSqft: 285680, trafficCount: 475 },
  { timestamp: "Mar 9", facilityAvgUtil: 83.4, occupiedSqft: 1384000, vacantSqft: 275680, trafficCount: 1585 },
  { timestamp: "Mar 10", facilityAvgUtil: 83.6, occupiedSqft: 1387000, vacantSqft: 272680, trafficCount: 1598 },
  { timestamp: "Mar 11", facilityAvgUtil: 83.8, occupiedSqft: 1390000, vacantSqft: 269680, trafficCount: 1612 },
  { timestamp: "Mar 12", facilityAvgUtil: 83.5, occupiedSqft: 1385000, vacantSqft: 274680, trafficCount: 1590 },
  { timestamp: "Mar 13", facilityAvgUtil: 83.7, occupiedSqft: 1388000, vacantSqft: 271680, trafficCount: 1605 },
  { timestamp: "Mar 14", facilityAvgUtil: 83.4, occupiedSqft: 1384000, vacantSqft: 275680, trafficCount: 860 },
  { timestamp: "Mar 15", facilityAvgUtil: 83.4, occupiedSqft: 1384000, vacantSqft: 275680, trafficCount: 480 },
  { timestamp: "Mar 16", facilityAvgUtil: 83.9, occupiedSqft: 1392000, vacantSqft: 267680, trafficCount: 1620 },
  { timestamp: "Mar 17", facilityAvgUtil: 84.0, occupiedSqft: 1394000, vacantSqft: 265680, trafficCount: 1635 },
  { timestamp: "Mar 18", facilityAvgUtil: 84.0, occupiedSqft: 1394432, vacantSqft: 265248, trafficCount: 1320 },
];

// ── Hourly Heatmap (today, all facilities) ───────────
export const hourlyHeatmap: HourlyHeatmap[] = [
  { hour: "12am", occupancyPct: 84, trafficCount: 8, forklifts: 0, personnel: 2 },
  { hour: "1am", occupancyPct: 84, trafficCount: 5, forklifts: 0, personnel: 2 },
  { hour: "2am", occupancyPct: 84, trafficCount: 3, forklifts: 0, personnel: 1 },
  { hour: "3am", occupancyPct: 84, trafficCount: 2, forklifts: 0, personnel: 1 },
  { hour: "4am", occupancyPct: 84, trafficCount: 3, forklifts: 0, personnel: 1 },
  { hour: "5am", occupancyPct: 84, trafficCount: 18, forklifts: 2, personnel: 12 },
  { hour: "6am", occupancyPct: 84, trafficCount: 85, forklifts: 12, personnel: 58 },
  { hour: "7am", occupancyPct: 84, trafficCount: 195, forklifts: 28, personnel: 135 },
  { hour: "8am", occupancyPct: 84, trafficCount: 312, forklifts: 38, personnel: 198 },
  { hour: "9am", occupancyPct: 84, trafficCount: 385, forklifts: 42, personnel: 232 },
  { hour: "10am", occupancyPct: 84, trafficCount: 398, forklifts: 45, personnel: 245 },
  { hour: "11am", occupancyPct: 84, trafficCount: 365, forklifts: 40, personnel: 218 },
  { hour: "12pm", occupancyPct: 84, trafficCount: 225, forklifts: 22, personnel: 145 },
  { hour: "1pm", occupancyPct: 84, trafficCount: 342, forklifts: 38, personnel: 205 },
  { hour: "2pm", occupancyPct: 84, trafficCount: 378, forklifts: 42, personnel: 228 },
  { hour: "3pm", occupancyPct: 84, trafficCount: 348, forklifts: 38, personnel: 212 },
  { hour: "4pm", occupancyPct: 84, trafficCount: 285, forklifts: 32, personnel: 175 },
  { hour: "5pm", occupancyPct: 84, trafficCount: 158, forklifts: 18, personnel: 98 },
  { hour: "6pm", occupancyPct: 84, trafficCount: 72, forklifts: 8, personnel: 42 },
  { hour: "7pm", occupancyPct: 84, trafficCount: 38, forklifts: 4, personnel: 22 },
  { hour: "8pm", occupancyPct: 84, trafficCount: 22, forklifts: 2, personnel: 12 },
  { hour: "9pm", occupancyPct: 84, trafficCount: 15, forklifts: 1, personnel: 8 },
  { hour: "10pm", occupancyPct: 84, trafficCount: 12, forklifts: 0, personnel: 5 },
  { hour: "11pm", occupancyPct: 84, trafficCount: 10, forklifts: 0, personnel: 3 },
];

// ── Financial Impact of Vacancy ──────────────────────
export interface VacancyCost {
  facility: string;
  vacantSqft: number;
  monthlyLeasePerSqft: number;
  monthlyCost: number;
  annualCost: number;
  remainingLeaseMonths: number;
  totalExposure: number;
}

export const vacancyCosts: VacancyCost[] = [
  { facility: "Kato", vacantSqft: 128366, monthlyLeasePerSqft: 1.14, monthlyCost: 146337, annualCost: 1756048, remainingLeaseMonths: 62, totalExposure: 9072694 },
  { facility: "Patterson", vacantSqft: 58767, monthlyLeasePerSqft: 0.98, monthlyCost: 57591, annualCost: 691097, remainingLeaseMonths: 18, totalExposure: 1036646 },
  { facility: "Grand", vacantSqft: 22325, monthlyLeasePerSqft: 1.05, monthlyCost: 23441, annualCost: 281295, remainingLeaseMonths: 21, totalExposure: 492261 },
  { facility: "Hayman", vacantSqft: 16844, monthlyLeasePerSqft: 1.02, monthlyCost: 17181, annualCost: 206168, remainingLeaseMonths: 15, totalExposure: 257715 },
  { facility: "Whitmore Lake", vacantSqft: 6458, monthlyLeasePerSqft: 0.72, monthlyCost: 4650, annualCost: 55798, remainingLeaseMonths: 18, totalExposure: 83697 },
  { facility: "Industrial", vacantSqft: 1655, monthlyLeasePerSqft: 1.18, monthlyCost: 1953, annualCost: 23434, remainingLeaseMonths: 6, totalExposure: 11717 },
];

export const totalVacancyCostMonthly = vacancyCosts.reduce((s, v) => s + v.monthlyCost, 0);
export const totalVacancyCostAnnual = vacancyCosts.reduce((s, v) => s + v.annualCost, 0);
export const totalExposure = vacancyCosts.reduce((s, v) => s + v.totalExposure, 0);

// ── Network Summary ──────────────────────────────────
export const networkSummary = {
  totalFacilities: 12,
  totalSqft: 1659680,
  occupiedSqft: 1394432,
  vacantSqft: 265248,
  overallUtilPct: 84.0,
  overallVacancyPct: 16.0,
  totalCameras: 26,
  camerasOnline: 23,
  camerasOffline: 1,
  camerasMaintenence: 2,
  totalPalletsDetected: 18724,
  totalPersonnelDetected: 210,
  totalForkliftsDetected: 39,
  totalDockVehicles: 13,
  avgAIScore: Math.round(facilityAISummaries.reduce((s, f) => s + f.aiScore, 0) / facilityAISummaries.length),
  facilitiesAtFullCapacity: facilityAISummaries.filter(f => f.vacancyPct === 0).length,
  facilitiesWithVacancy: facilityAISummaries.filter(f => f.vacancyPct > 0).length,
  criticalVacancy: facilityAISummaries.filter(f => f.vacancyPct > 30).length,
  aiModelVersion: "SpotAI v3.2 + Custom RK Model",
  lastNetworkScan: "Today 10:14 AM",
};
