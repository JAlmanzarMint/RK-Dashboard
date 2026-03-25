import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Building2, Layers, Grid3x3, Thermometer, Square, Truck, FileText,
  ChevronDown, ChevronRight, Sparkles, MapPin,
} from "lucide-react";
import {
  facilityProfiles, getAggregateCapacity,
  type FacilityProfile as FP,
  type RackingSection, type ShelvingArea, type TempZone,
  type FloorStorageArea, type MHEItem,
} from "@/lib/facilityProfileData";

// ── Helpers ─────────────────────────────────────────
function fmt(n: number): string {
  return n.toLocaleString();
}

function fmtSqft(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

function statusColor(status: FP["status"]): string {
  switch (status) {
    case "Active": return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30";
    case "Partially Vacant": return "bg-amber-500/15 text-amber-700 border-amber-500/30";
    case "Critical Vacancy": return "bg-red-500/15 text-red-700 border-red-500/30";
  }
}

function statusDot(status: FP["status"]): string {
  switch (status) {
    case "Active": return "bg-emerald-500";
    case "Partially Vacant": return "bg-amber-500";
    case "Critical Vacancy": return "bg-red-500";
  }
}

function tempZoneIconColor(type: string): string {
  if (type.startsWith("Ambient")) return "text-orange-500";
  if (type.startsWith("Climate") || type.startsWith("CRT")) return "text-blue-500";
  if (type.startsWith("Refrigerated")) return "text-cyan-500";
  if (type.startsWith("Freezer")) return "text-indigo-500";
  if (type.startsWith("Hazmat")) return "text-red-500";
  if (type.startsWith("DEA")) return "text-red-600";
  return "text-muted-foreground";
}

// ── Read-only field display ─────────────────────────
function ReadField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="space-y-1" data-testid={`field-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium bg-muted/50 rounded-md px-3 py-2 border border-border tabular-nums">
        {typeof value === "number" ? fmt(value) : value}
      </div>
    </div>
  );
}

// ── Tab IDs ─────────────────────────────────────────
type TabId = "overview" | "racking" | "shelving" | "tempzones" | "floor" | "mhe" | "lease";
type LeaseSubTab = "terms" | "financial" | "renewal" | "insurance";

// ════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════

export default function FacilityProfile() {
  const [selectedFacility, setSelectedFacility] = useState<string>("Christy");
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [leaseSubTab, setLeaseSubTab] = useState<LeaseSubTab>("terms");

  const facility = useMemo(
    () => facilityProfiles.find((f) => f.name === selectedFacility) ?? null,
    [selectedFacility]
  );

  const aggregate = useMemo(() => getAggregateCapacity(), []);

  const isAll = selectedFacility === "__all__";

  function toggleSection(id: string) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // ── Vertical tabs definition ──────────────────────
  const verticalTabs: { id: TabId; label: string; icon: typeof Building2; badgeCount?: number }[] = useMemo(() => {
    if (!facility) return [];
    return [
      { id: "overview", label: "Facility Overview", icon: Building2 },
      { id: "racking", label: "Racking", icon: Layers, badgeCount: facility.racking.length },
      { id: "shelving", label: "Shelving", icon: Grid3x3, badgeCount: facility.shelving.length },
      { id: "tempzones", label: "Temperature Zones", icon: Thermometer, badgeCount: facility.tempZones.length },
      { id: "floor", label: "Floor Storage", icon: Square, badgeCount: facility.floorStorage.length },
      { id: "mhe", label: "MHE Inventory", icon: Truck, badgeCount: facility.mhe.length },
      { id: "lease", label: "Lease Intelligence", icon: FileText },
    ];
  }, [facility]);

  // ══════════════════════════════════════════════════
  // RENDER — Facility Selector Cards
  // ══════════════════════════════════════════════════

  function renderFacilitySelector() {
    return (
      <Card data-testid="facility-selector-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Your Facilities</span>
            <Badge variant="secondary" className="text-xs">{facilityProfiles.length}</Badge>
          </div>
          <div className="flex overflow-x-auto gap-2 pb-1" data-testid="facility-cards-row">
            {/* All Facilities card */}
            <button
              data-testid="facility-card-all"
              onClick={() => { setSelectedFacility("__all__"); setActiveTab("overview"); }}
              className={`shrink-0 rounded-lg border px-3 py-2 text-left transition-all cursor-pointer min-w-[180px] ${
                isAll
                  ? "border-l-2 border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="text-xs font-semibold">All Facilities</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {fmt(aggregate.totalSqft)} SF · {aggregate.totalDocks} docks · {aggregate.facilities} sites
              </div>
            </button>

            {facilityProfiles.map((f) => (
              <button
                key={f.name}
                data-testid={`facility-card-${f.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => { setSelectedFacility(f.name); setActiveTab("overview"); }}
                className={`shrink-0 rounded-lg border px-3 py-2 text-left transition-all cursor-pointer min-w-[200px] ${
                  selectedFacility === f.name
                    ? "border-l-2 border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{f.name}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 leading-4 ${statusColor(f.status)}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${statusDot(f.status)}`} />
                    {f.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  <MapPin className="h-2.5 w-2.5" />
                  {f.city}, {f.state}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                  {fmtSqft(f.warehouseSqft)} SF · {f.racking.length} rack sections · {f.tempZones.length} temp zones · {f.dockDoors} docks
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Live Capacity Banner
  // ══════════════════════════════════════════════════

  function renderCapacityBanner() {
    const pallets = isAll ? aggregate.totalPallets : (facility?.totalPalletPositions ?? 0);
    const bins = isAll ? aggregate.totalBins : (facility?.totalBinPositions ?? 0);
    const docks = isAll ? aggregate.totalDocks : (facility?.dockDoors ?? 0);
    const clearance = isAll ? "—" : `${facility?.clearanceHeight ?? 0}ft`;
    const mheTotal = isAll ? aggregate.totalMHE : (facility?.totalMHEUnits ?? 0);
    const mheLeased = isAll ? aggregate.leasedMHE : (facility?.leasedMHE ?? 0);
    const whSqft = isAll ? aggregate.warehouseSqft : (facility?.warehouseSqft ?? 0);

    const kpis = [
      { label: "PALLET POSITIONS", value: fmt(pallets) },
      { label: "BIN POSITIONS", value: fmt(bins) },
      { label: "DOCK DOORS", value: fmt(docks) },
      { label: "CLEARANCE", value: clearance },
      { label: "MHE UNITS", value: fmt(mheTotal), sub: `${mheLeased} leased` },
      { label: "WAREHOUSE SF", value: fmt(whSqft) },
    ];

    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4" data-testid="capacity-banner">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Live Capacity Summary</span>
          <Badge variant="outline" className="text-[10px] gap-1 border-primary/30 text-primary">
            <Sparkles className="h-3 w-3" />
            Auto-calculated
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-background/80 rounded-md px-3 py-2 border border-border"
              data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-[10px] text-muted-foreground font-medium tracking-wide">{kpi.label}</div>
              <div className="text-sm font-bold tabular-nums mt-0.5">{kpi.value}</div>
              {kpi.sub && <div className="text-[10px] text-muted-foreground tabular-nums">{kpi.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — All Facilities Comparison View
  // ══════════════════════════════════════════════════

  function renderAllFacilitiesView() {
    const sorted = [...facilityProfiles].sort((a, b) => b.totalSqft - a.totalSqft);

    return (
      <Card data-testid="all-facilities-table">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-3">Facility Comparison</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Facility</TableHead>
                  <TableHead className="text-xs">City / State</TableHead>
                  <TableHead className="text-xs text-right">Total SqFt</TableHead>
                  <TableHead className="text-xs text-right">Warehouse SqFt</TableHead>
                  <TableHead className="text-xs text-right">Pallet Pos</TableHead>
                  <TableHead className="text-xs text-right">Bin Pos</TableHead>
                  <TableHead className="text-xs text-right">Docks</TableHead>
                  <TableHead className="text-xs text-right">MHE</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((f) => (
                  <TableRow
                    key={f.name}
                    className="cursor-pointer hover:bg-muted/50"
                    data-testid={`table-row-${f.name.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => { setSelectedFacility(f.name); setActiveTab("overview"); }}
                  >
                    <TableCell className="text-xs font-medium">{f.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.city}, {f.state}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{fmt(f.totalSqft)}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{fmt(f.warehouseSqft)}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{fmt(f.totalPalletPositions)}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{fmt(f.totalBinPositions)}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{f.dockDoors}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{f.totalMHEUnits}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 leading-4 ${statusColor(f.status)}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${statusDot(f.status)}`} />
                        {f.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Overview
  // ══════════════════════════════════════════════════

  function renderOverview(f: FP) {
    return (
      <Card data-testid="tab-overview">
        <CardContent className="p-4 space-y-5">
          {/* Company Information */}
          <div>
            <div className="text-sm font-semibold mb-3">Company Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ReadField label="Company Name" value="RK Logistics" />
              <ReadField label="Street Address" value={f.address} />
              <ReadField label="City" value={f.city} />
              <ReadField label="State" value={f.state} />
              <ReadField label="ZIP" value={f.zip} />
            </div>
          </div>

          <Separator />

          {/* Building Specs */}
          <div>
            <div className="text-sm font-semibold mb-3">Building Specs</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ReadField label="Total Sq Ft" value={f.totalSqft} />
              <ReadField label="Warehouse Sq Ft" value={f.warehouseSqft} />
              <ReadField label="Office Sq Ft" value={f.officeSqft} />
              <ReadField label="Clearance Height" value={`${f.clearanceHeight}ft`} />
              <ReadField label="Dock Doors" value={f.dockDoors} />
              <ReadField label="Drive-In Doors" value={f.driveInDoors} />
              <ReadField label="Year Built" value={f.yearBuilt} />
            </div>
          </div>

          <Separator />

          {/* Primary Customers */}
          <div>
            <div className="text-sm font-semibold mb-3">Primary Customers</div>
            <div className="flex flex-wrap gap-2">
              {f.primaryCustomers.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs" data-testid={`customer-badge-${c.toLowerCase()}`}>
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Racking
  // ══════════════════════════════════════════════════

  function renderRacking(f: FP) {
    const totalPositions = f.racking.reduce((s, r) => s + r.totalPositions, 0);

    return (
      <div className="space-y-3" data-testid="tab-racking">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold">Racking Configuration</span>
          <span className="text-xs text-muted-foreground">
            Total: {fmt(totalPositions)} pallet positions across {f.racking.length} sections
          </span>
        </div>
        {f.racking.map((r: RackingSection) => {
          const isExpanded = expandedSections[r.id] ?? false;
          return (
            <Card key={r.id} data-testid={`racking-card-${r.id}`}>
              <CardContent className="p-0">
                <button
                  data-testid={`racking-toggle-${r.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleSection(r.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Layers className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium">{r.type}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {r.tempZone} · {fmt(r.totalPositions)} positions · {r.aisles} aisles × {r.beamLevels} levels × {r.positionsPerBay}/bay
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-[10px] tabular-nums">{fmt(r.totalPositions)}</Badge>
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <ReadField label="Racking Type" value={r.type} />
                      <ReadField label="Temperature Zone" value={r.tempZone} />
                      <ReadField label="Bay Width" value={`${r.bayWidth}″`} />
                      <ReadField label="Aisles" value={r.aisles} />
                      <ReadField label="Beam Levels" value={r.beamLevels} />
                      <ReadField label="Positions per Bay" value={r.positionsPerBay} />
                    </div>
                    <div className="bg-primary/5 border border-primary/15 rounded-md px-3 py-2 text-xs tabular-nums">
                      <Sparkles className="h-3 w-3 inline mr-1 text-primary" />
                      {r.aisles} aisles × {r.beamLevels} levels × {r.positionsPerBay} pos/bay → <span className="font-semibold">{fmt(r.totalPositions)} pallet positions</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Shelving
  // ══════════════════════════════════════════════════

  function renderShelving(f: FP) {
    const totalBins = f.shelving.reduce((s, a) => s + a.binPositions, 0);
    const totalCases = f.shelving.reduce((s, a) => s + a.casePositions, 0);

    return (
      <div className="space-y-3" data-testid="tab-shelving">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold">Shelving Units</span>
          <span className="text-xs text-muted-foreground">
            {fmt(totalBins)} bin positions · {fmt(totalCases)} case positions
          </span>
        </div>
        {f.shelving.map((a: ShelvingArea) => {
          const isExpanded = expandedSections[a.id] ?? false;
          return (
            <Card key={a.id} data-testid={`shelving-card-${a.id}`}>
              <CardContent className="p-0">
                <button
                  data-testid={`shelving-toggle-${a.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleSection(a.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Grid3x3 className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium">{a.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {a.tempZone} · {a.units} units · {fmt(a.binPositions)} bins · {fmt(a.casePositions)} cases
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReadField label="Name" value={a.name} />
                      <ReadField label="Temp Zone" value={a.tempZone} />
                      <ReadField label="Units" value={a.units} />
                      <ReadField label="Bin Positions" value={a.binPositions} />
                      <ReadField label="Case Positions" value={a.casePositions} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Temperature Zones
  // ══════════════════════════════════════════════════

  function renderTempZones(f: FP) {
    const totalSqft = f.tempZones.reduce((s, z) => s + z.sqft, 0);
    const totalPallets = f.tempZones.reduce((s, z) => s + z.palletPositions, 0);

    return (
      <div className="space-y-3" data-testid="tab-tempzones">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold">Temperature Zones</span>
          <span className="text-xs text-muted-foreground">
            {fmt(totalSqft)} total sq ft · {fmt(totalPallets)} pallets · {f.tempZones.length} zones
          </span>
        </div>
        {f.tempZones.map((z: TempZone) => {
          const isExpanded = expandedSections[z.id] ?? false;
          const iconColor = tempZoneIconColor(z.type);
          return (
            <Card key={z.id} data-testid={`tempzone-card-${z.id}`}>
              <CardContent className="p-0">
                <button
                  data-testid={`tempzone-toggle-${z.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleSection(z.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Thermometer className={`h-4 w-4 shrink-0 ${iconColor}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-medium">{z.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {z.type} · {fmt(z.sqft)} sqft · {fmt(z.palletPositions)} pallets · {fmt(z.binPositions)} bins
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReadField label="Zone Name" value={z.name} />
                      <ReadField label="Type" value={z.type} />
                      <ReadField label="Square Footage" value={z.sqft} />
                      <ReadField label="Pallet Positions" value={z.palletPositions} />
                      <ReadField label="Bin Positions" value={z.binPositions} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Floor Storage
  // ══════════════════════════════════════════════════

  function renderFloorStorage(f: FP) {
    const totalSqft = f.floorStorage.reduce((s, a) => s + a.sqft, 0);
    const totalPallets = f.floorStorage.reduce((s, a) => s + a.palletPositions, 0);

    return (
      <div className="space-y-3" data-testid="tab-floor">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold">Floor Storage Areas</span>
          <span className="text-xs text-muted-foreground">
            {fmt(totalSqft)} sq ft · {fmt(totalPallets)} pallets
          </span>
        </div>
        {f.floorStorage.map((a: FloorStorageArea) => {
          const isExpanded = expandedSections[a.id] ?? false;
          return (
            <Card key={a.id} data-testid={`floor-card-${a.id}`}>
              <CardContent className="p-0">
                <button
                  data-testid={`floor-toggle-${a.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleSection(a.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Square className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium">{a.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {a.tempZone} · {fmt(a.sqft)} sqft · {fmt(a.palletPositions)} pallets
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReadField label="Name" value={a.name} />
                      <ReadField label="Temp Zone" value={a.tempZone} />
                      <ReadField label="Square Footage" value={a.sqft} />
                      <ReadField label="Pallet Positions" value={a.palletPositions} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: MHE Inventory
  // ══════════════════════════════════════════════════

  function renderMHE(f: FP) {
    const totalUnits = f.mhe.reduce((s, m) => s + m.qty, 0);
    const leasedUnits = f.mhe.filter((m) => m.ownership === "Leased").reduce((s, m) => s + m.qty, 0);
    const ownedUnits = totalUnits - leasedUnits;

    return (
      <div className="space-y-3" data-testid="tab-mhe">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold">MHE Inventory</span>
          <span className="text-xs text-muted-foreground">
            {fmt(totalUnits)} total units · {fmt(leasedUnits)} leased · {fmt(ownedUnits)} owned
          </span>
        </div>
        {f.mhe.map((m: MHEItem) => {
          const isExpanded = expandedSections[m.id] ?? false;
          return (
            <Card key={m.id} data-testid={`mhe-card-${m.id}`}>
              <CardContent className="p-0">
                <button
                  data-testid={`mhe-toggle-${m.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleSection(m.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Truck className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium">
                        {m.type} — <span className="text-muted-foreground">{m.model}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground tabular-nums">{m.qty} units</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 leading-4 ${
                            m.ownership === "Owned"
                              ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-700 border-amber-500/30"
                          }`}
                        >
                          {m.ownership}
                        </Badge>
                        {m.ownership === "Leased" && m.leaseExpiry && (
                          <span className="text-[10px] text-muted-foreground">Exp: {m.leaseExpiry}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReadField label="Type" value={m.type} />
                      <ReadField label="Model" value={m.model} />
                      <ReadField label="Quantity" value={m.qty} />
                      <ReadField label="Ownership" value={m.ownership} />
                      {m.ownership === "Leased" && m.leaseExpiry && (
                        <ReadField label="Lease Expiry" value={m.leaseExpiry} />
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab Content: Lease Intelligence
  // ══════════════════════════════════════════════════

  function renderLease(f: FP) {
    const l = f.lease;

    const subTabs: { id: LeaseSubTab; label: string }[] = [
      { id: "terms", label: "Terms" },
      { id: "financial", label: "Financial" },
      { id: "renewal", label: "Renewal" },
      { id: "insurance", label: "Insurance" },
    ];

    return (
      <div className="space-y-4" data-testid="tab-lease">
        {/* Sub-tabs */}
        <div className="flex gap-1 border-b border-border pb-0">
          {subTabs.map((st) => (
            <button
              key={st.id}
              data-testid={`lease-subtab-${st.id}`}
              onClick={() => setLeaseSubTab(st.id)}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                leaseSubTab === st.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-4">
            {leaseSubTab === "terms" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ReadField label="Lease Start" value={l.leaseStart} />
                <ReadField label="Lease End" value={l.leaseEnd} />
                <ReadField label="Escalation" value={l.escalation} />
                <ReadField label="Termination Clause" value={l.terminationClause} />
                <ReadField label="Renewal Options" value={l.renewalOptions} />
                <ReadField label="Landlord" value={l.landlord} />
              </div>
            )}
            {leaseSubTab === "financial" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ReadField label="Monthly Rent" value={l.monthlyRent} />
                <ReadField label="Annual Rent" value={l.annualRent} />
                <ReadField label="Rent / SF" value={l.rentPsf} />
                <ReadField label="CAM Charges" value={l.cam} />
                <ReadField label="TI Allowance" value={l.tiAllowance} />
              </div>
            )}
            {leaseSubTab === "renewal" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ReadField label="Renewal Options" value={l.renewalOptions} />
                <ReadField label="Termination Clause" value={l.terminationClause} />
              </div>
            )}
            {leaseSubTab === "insurance" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ReadField label="Insurance" value={l.insurance} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // RENDER — Tab content router
  // ══════════════════════════════════════════════════

  function renderTabContent(f: FP) {
    switch (activeTab) {
      case "overview": return renderOverview(f);
      case "racking": return renderRacking(f);
      case "shelving": return renderShelving(f);
      case "tempzones": return renderTempZones(f);
      case "floor": return renderFloorStorage(f);
      case "mhe": return renderMHE(f);
      case "lease": return renderLease(f);
      default: return renderOverview(f);
    }
  }

  // ══════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════

  return (
    <div className="space-y-4" data-testid="facility-profile-page">
      {/* Facility Selector */}
      {renderFacilitySelector()}

      {/* Live Capacity Banner */}
      {renderCapacityBanner()}

      {/* Content Area */}
      {isAll ? (
        renderAllFacilitiesView()
      ) : facility ? (
        <div className="flex gap-4" data-testid="facility-detail-layout">
          {/* Left: Vertical Tabs */}
          <div className="w-48 shrink-0 space-y-1" data-testid="vertical-tabs">
            {verticalTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-testid={`vtab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 text-sm cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground rounded-md px-3 py-2"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-3 py-2"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate text-xs">{tab.label}</span>
                  {tab.badgeCount !== undefined && (
                    <Badge
                      variant={isActive ? "secondary" : "outline"}
                      className={`ml-auto text-[10px] px-1.5 py-0 leading-4 shrink-0 ${
                        isActive ? "bg-primary-foreground/20 text-primary-foreground" : ""
                      }`}
                    >
                      {tab.badgeCount}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Content */}
          <div className="flex-1 min-w-0" data-testid="tab-content-area">
            {renderTabContent(facility)}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Facility not found.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
