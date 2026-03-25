import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Calculator, Truck, DollarSign, Package, MapPin, ChevronDown, ChevronRight,
  FileText, CheckCircle2, Clock, AlertTriangle, TrendingUp, BarChart3,
  Weight, Ruler, Layers, Star, ArrowRight, Zap, Shield, Box,
  Download, Share2, Copy, Plus, Minus, Info,
} from "lucide-react";
import {
  zones, freightClasses, weightBreaks, accessorials, serviceLevels,
  volumeDiscounts, carrierPartners, commodityTypes, pickupWindows,
  deliveryWindows, sampleQuotes, calculateQuote, calculateDensity,
  zoneMultipliers,
  type QuoteInput, type QuoteResult, type Accessorial,
} from "@/lib/ottPricingData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, LineChart, Line, PieChart, Pie, Legend, Area, AreaChart,
} from "recharts";

const fmt = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtK = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const TEAL = "hsl(174, 72%, 33%)";
const TEAL_LIGHT = "hsl(174, 72%, 45%)";
const PURPLE = "hsl(262, 60%, 50%)";
const AMBER = "hsl(43, 74%, 49%)";
const BLUE = "hsl(210, 80%, 50%)";
const RED = "hsl(0, 72%, 50%)";
const GREEN = "hsl(142, 60%, 40%)";

// ──────────────────────────────────────────────────────
// Tab Navigation
// ──────────────────────────────────────────────────────
type TabId = "calculator" | "rate-card" | "quotes" | "zones";

const tabs: { id: TabId; label: string; icon: typeof Calculator }[] = [
  { id: "calculator", label: "Quote Calculator", icon: Calculator },
  { id: "rate-card", label: "Rate Card", icon: FileText },
  { id: "quotes", label: "Recent Quotes", icon: Clock },
  { id: "zones", label: "Service Zones", icon: MapPin },
];

// ──────────────────────────────────────────────────────
// FORM SELECT
// ──────────────────────────────────────────────────────
function FormSelect({ label, value, onChange, options, id }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; id: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-2.5 text-xs rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        data-testid={id}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function FormNumber({ label, value, onChange, placeholder, id, suffix, min }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; id: string; suffix?: string; min?: number;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <div className="relative">
        <input
          type="number" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} min={min || 0}
          className="w-full h-9 px-2.5 text-xs rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 tabular-nums"
          data-testid={id}
        />
        {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// COLLAPSIBLE SECTION
// ──────────────────────────────────────────────────────
function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false, badge }: {
  title: string; icon: typeof Package; children: React.ReactNode; defaultOpen?: boolean; badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
        data-testid={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="text-xs font-semibold">{title}</span>
          {badge && <Badge variant="secondary" className="text-[9px]">{badge}</Badge>}
        </div>
        {open ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
      {open && <div className="px-3 pb-3 border-t border-border pt-3">{children}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// QUOTE CALCULATOR TAB
// ──────────────────────────────────────────────────────
function QuoteCalculatorTab() {
  // Form state
  const [weight, setWeight] = useState("500");
  const [pieces, setPieces] = useState("2");
  const [freightClass, setFreightClass] = useState("100");
  const [zone, setZone] = useState("zone-a");
  const [serviceLevel, setServiceLevel] = useState("standard");
  const [monthlyVol, setMonthlyVol] = useState("0");
  const [selectedAccessorials, setSelectedAccessorials] = useState<string[]>([]);
  const [commodity, setCommodity] = useState("Retail / Consumer Goods");
  const [lengthIn, setLengthIn] = useState("");
  const [widthIn, setWidthIn] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [originZip, setOriginZip] = useState("11735");
  const [destZip, setDestZip] = useState("");

  const toggleAccessorial = (id: string) => {
    setSelectedAccessorials((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Density calculation
  const densityCalc = useMemo(() => {
    if (lengthIn && widthIn && heightIn && weight) {
      return calculateDensity(parseFloat(lengthIn), parseFloat(widthIn), parseFloat(heightIn), parseFloat(weight));
    }
    return null;
  }, [lengthIn, widthIn, heightIn, weight]);

  // Quote calculation
  const quote = useMemo<QuoteResult | null>(() => {
    const w = parseFloat(weight) || 0;
    if (w <= 0) return null;
    const input: QuoteInput = {
      weight: w,
      pieces: parseInt(pieces) || 1,
      freightClass: parseFloat(freightClass),
      zone,
      serviceLevel,
      accessorialIds: selectedAccessorials,
      monthlyVolume: parseInt(monthlyVol) || 0,
      lengthIn: lengthIn ? parseFloat(lengthIn) : undefined,
      widthIn: widthIn ? parseFloat(widthIn) : undefined,
      heightIn: heightIn ? parseFloat(heightIn) : undefined,
    };
    return calculateQuote(input);
  }, [weight, pieces, freightClass, zone, serviceLevel, selectedAccessorials, monthlyVol, lengthIn, widthIn, heightIn]);

  const accByCategory = useMemo(() => {
    const cats: Record<string, Accessorial[]> = {};
    for (const a of accessorials) {
      if (!cats[a.category]) cats[a.category] = [];
      cats[a.category].push(a);
    }
    return cats;
  }, []);

  const catLabels: Record<string, string> = { delivery: "Delivery Services", handling: "Handling", service: "Special Services", special: "Premium / White Glove" };
  const catIcons: Record<string, typeof Truck> = { delivery: Truck, handling: Package, service: Shield, special: Star };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
      {/* LEFT — Form (3 cols) */}
      <div className="xl:col-span-3 space-y-4">
        {/* Customer Info */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Shipment Details</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <FormNumber label="Company Name" value={companyName} onChange={setCompanyName} placeholder="Customer name" id="input-company" />
              <FormNumber label="Contact Email" value={contactEmail} onChange={setContactEmail} placeholder="email@company.com" id="input-email" />
              <FormNumber label="Origin ZIP" value={originZip} onChange={setOriginZip} placeholder="11735" id="input-origin-zip" />
              <FormNumber label="Destination ZIP" value={destZip} onChange={setDestZip} placeholder="10001" id="input-dest-zip" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FormSelect
                label="Commodity Type"
                value={commodity}
                onChange={setCommodity}
                options={commodityTypes.map((c) => ({ value: c, label: c }))}
                id="select-commodity"
              />
              <FormSelect
                label="Service Level"
                value={serviceLevel}
                onChange={setServiceLevel}
                options={serviceLevels.map((s) => ({ value: s.id, label: s.name }))}
                id="select-service"
              />
              <FormSelect
                label="Delivery Zone"
                value={zone}
                onChange={setZone}
                options={zones.map((z) => ({ value: z.id, label: z.name }))}
                id="select-zone"
              />
              <FormNumber
                label="Monthly Volume"
                value={monthlyVol}
                onChange={setMonthlyVol}
                placeholder="Est. shipments/mo"
                id="input-volume"
                suffix="ship/mo"
              />
            </div>
          </CardContent>
        </Card>

        {/* Weight, Dims, Class */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Weight, Dimensions & Class</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <FormNumber label="Total Weight" value={weight} onChange={setWeight} placeholder="500" id="input-weight" suffix="lbs" />
              <FormNumber label="Pieces / Handling Units" value={pieces} onChange={setPieces} placeholder="2" id="input-pieces" />
              <FormSelect
                label="Freight Class"
                value={freightClass}
                onChange={setFreightClass}
                options={freightClasses.map((f) => ({ value: String(f.classNum), label: `${f.label} (${f.densityRange})` }))}
                id="select-class"
              />
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Weight Break</label>
                <div className="h-9 px-2.5 text-xs rounded-md border border-border bg-muted/30 flex items-center tabular-nums font-medium">
                  {weightBreaks.find((w) => (parseFloat(weight) || 0) >= w.minLbs && (parseFloat(weight) || 0) <= w.maxLbs)?.label || "—"}
                </div>
              </div>
            </div>

            {/* Dimensions for density calc */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">Density Calculator (Optional)</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                <FormNumber label="Length" value={lengthIn} onChange={setLengthIn} placeholder="48" id="input-length" suffix="in" />
                <FormNumber label="Width" value={widthIn} onChange={setWidthIn} placeholder="40" id="input-width" suffix="in" />
                <FormNumber label="Height" value={heightIn} onChange={setHeightIn} placeholder="48" id="input-height" suffix="in" />
                {densityCalc && (
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Calculated</label>
                    <div className="h-9 px-2.5 text-xs rounded-md border border-teal-500/30 bg-teal-500/5 flex items-center gap-1.5 tabular-nums font-medium">
                      <span>{densityCalc.density} lbs/ft³</span>
                      <span className="text-muted-foreground">→</span>
                      <Badge variant="outline" className="text-[9px] border-teal-500/30 text-teal-600 dark:text-teal-400">Class {densityCalc.suggestedClass}</Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessorials */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Accessorial Services</span>
              {selectedAccessorials.length > 0 && (
                <Badge className="text-[9px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">{selectedAccessorials.length} selected</Badge>
              )}
            </div>
            <div className="space-y-2">
              {Object.entries(accByCategory).map(([cat, items]) => {
                const CatIcon = catIcons[cat] || Package;
                return (
                  <CollapsibleSection key={cat} title={catLabels[cat] || cat} icon={CatIcon} badge={`${items.length} options`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {items.map((acc) => {
                        const isSelected = selectedAccessorials.includes(acc.id);
                        return (
                          <button
                            key={acc.id}
                            onClick={() => toggleAccessorial(acc.id)}
                            className={`flex items-center justify-between p-2 rounded-md text-left transition-colors text-xs ${
                              isSelected
                                ? "bg-teal-500/10 border border-teal-500/30"
                                : "border border-transparent hover:bg-muted/50"
                            }`}
                            data-testid={`acc-${acc.id}`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                                isSelected ? "bg-teal-600 border-teal-600" : "border-border"
                              }`}>
                                {isSelected && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <div>
                                <p className="font-medium text-[11px]">{acc.name}</p>
                                <p className="text-[9px] text-muted-foreground">{acc.description}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold tabular-nums whitespace-nowrap ml-2">
                              {acc.rateType === "flat" && fmt(acc.rate)}
                              {acc.rateType === "per-cwt" && `${fmt(acc.rate)}/cwt`}
                              {acc.rateType === "per-piece" && `${fmt(acc.rate)}/pc`}
                              {acc.rateType === "per-hour" && `${fmt(acc.rate)}/hr`}
                              {acc.rateType === "pct" && `${acc.rate}%`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CollapsibleSection>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT — Quote Summary (2 cols) */}
      <div className="xl:col-span-2 space-y-4">
        {/* Quote Result */}
        <Card className="border-border sticky top-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-bold">Quote Estimate</span>
              </div>
              {quote && quote.volumeDiscountPct > 0 && (
                <Badge className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  {quote.volumeTier} — {quote.volumeDiscountPct}% off
                </Badge>
              )}
            </div>

            {quote ? (
              <div className="space-y-3">
                {/* Total */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 text-white">
                  <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Estimated Total</p>
                  <p className="text-2xl font-bold tabular-nums">{fmt(quote.totalCharge)}</p>
                  <div className="flex gap-4 mt-2 text-[10px] opacity-80">
                    <span>{fmt(quote.ratePerCWT)}/CWT</span>
                    <span>{fmt(quote.ratePerLb)}/lb</span>
                    <span>{fmt(quote.ratePerPiece)}/piece</span>
                  </div>
                </div>

                {/* Transit */}
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Estimated Transit</p>
                    <p className="text-xs font-semibold">{quote.estimatedTransit}</p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Base Charge ({(parseFloat(weight) / 100).toFixed(1)} CWT)</span>
                    <span className="font-medium tabular-nums">{fmt(quote.baseCharge)}</span>
                  </div>
                  {quote.classAdjustment !== 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Freight Class Adj. (Class {freightClass})</span>
                      <span className={`font-medium tabular-nums ${quote.classAdjustment > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        {quote.classAdjustment > 0 ? "+" : ""}{fmt(quote.classAdjustment)}
                      </span>
                    </div>
                  )}
                  {quote.zoneCharge > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Zone Surcharge ({zones.find((z) => z.id === zone)?.name.split("—")[0]})</span>
                      <span className="font-medium tabular-nums text-amber-600">+{fmt(quote.zoneCharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Fuel Surcharge ({zones.find((z) => z.id === zone)?.fuelPct}%)</span>
                    <span className="font-medium tabular-nums">+{fmt(quote.fuelSurcharge)}</span>
                  </div>
                  {quote.serviceLevelPremium > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{serviceLevels.find((s) => s.id === serviceLevel)?.name} Premium</span>
                      <span className="font-medium tabular-nums text-purple-600">+{fmt(quote.serviceLevelPremium)}</span>
                    </div>
                  )}

                  {/* Accessorials */}
                  {quote.accessorialBreakdown.length > 0 && (
                    <>
                      <div className="border-t border-border my-1.5" />
                      {quote.accessorialBreakdown.map((ab) => (
                        <div key={ab.name} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{ab.name}</span>
                          <span className="font-medium tabular-nums">+{fmt(ab.amount)}</span>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="border-t border-border my-1.5" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold tabular-nums">{fmt(quote.subtotal)}</span>
                  </div>

                  {quote.volumeDiscount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400">Volume Discount ({quote.volumeTier} — {quote.volumeDiscountPct}%)</span>
                      <span className="font-medium tabular-nums text-emerald-600 dark:text-emerald-400">-{fmt(quote.volumeDiscount)}</span>
                    </div>
                  )}

                  <div className="border-t-2 border-border my-1.5" />
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">Total Estimate</span>
                    <span className="font-bold tabular-nums text-teal-600 dark:text-teal-400">{fmt(quote.totalCharge)}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1">Minimum charge: {fmt(quote.minimumCharge)} | Rates subject to fuel surcharge updates</p>
                </div>

                {/* Density info */}
                {quote.calculatedDensity && (
                  <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Info className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-semibold text-muted-foreground">Density Analysis</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Calculated Density</span>
                        <p className="font-semibold tabular-nums">{quote.calculatedDensity} lbs/ft³</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Suggested Class</span>
                        <p className="font-semibold">Class {quote.calculatedClass}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">Enter shipment details to get a quote estimate</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Volume Discount Tiers */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Volume Discount Tiers</span>
            </div>
            <div className="space-y-1.5">
              {volumeDiscounts.map((vd) => {
                const isActive = quote && quote.volumeTier === vd.label;
                return (
                  <div
                    key={vd.label}
                    className={`flex items-center justify-between p-2 rounded-md text-xs ${
                      isActive ? "bg-teal-500/10 border border-teal-500/30" : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isActive && <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />}
                      <span className={isActive ? "font-semibold" : "text-muted-foreground"}>{vd.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-muted-foreground">
                        {vd.minShipmentsMonth === 0 ? "<50" : vd.maxShipmentsMonth >= 99999 ? `${vd.minShipmentsMonth}+` : `${vd.minShipmentsMonth}–${vd.maxShipmentsMonth}`} ship/mo
                      </span>
                      <Badge variant={vd.discountPct > 0 ? "default" : "secondary"} className="text-[9px]">
                        {vd.discountPct > 0 ? `-${vd.discountPct}%` : "Base Rate"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Carrier Partners */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Carrier Network</span>
            </div>
            <div className="space-y-1.5">
              {carrierPartners.map((cp) => (
                <div key={cp.code} className="flex items-center justify-between p-2 rounded-md border border-border text-xs">
                  <div>
                    <p className="font-medium text-[11px]">{cp.name}</p>
                    <p className="text-[9px] text-muted-foreground">{cp.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] tabular-nums">{cp.onTimePct}% OTD</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// RATE CARD TAB
// ──────────────────────────────────────────────────────
function RateCardTab() {
  const [selectedZone, setSelectedZone] = useState("zone-a");
  const zoneMult = zones.find((z) => z.id === selectedZone);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold">Zone:</span>
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelectedZone(z.id)}
            className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-colors ${
              selectedZone === z.id ? "bg-teal-600 text-white" : "bg-muted/50 hover:bg-muted text-foreground"
            }`}
            data-testid={`zone-btn-${z.id}`}
          >
            {z.name.split("—")[0].trim()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CWT Rate Table */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Base Rates (Per CWT — Class 100)</span>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] h-7">Weight Break</TableHead>
                    <TableHead className="text-[10px] h-7 text-right">Base CWT</TableHead>
                    <TableHead className="text-[10px] h-7 text-right">Zone Adj.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weightBreaks.map((wb) => (
                    <TableRow key={wb.label}>
                      <TableCell className="text-[11px] font-medium">{wb.label}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums">{fmt(wb.baseCWT)}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums font-semibold text-teal-600 dark:text-teal-400">
                        {fmt(wb.baseCWT * (zoneMultipliers[selectedZone] || 1))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Class Multipliers */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Freight Class Multipliers</span>
            </div>
            <div className="rounded-lg border border-border overflow-hidden max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] h-7">Class</TableHead>
                    <TableHead className="text-[10px] h-7">Density Range</TableHead>
                    <TableHead className="text-[10px] h-7 text-right">Multiplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freightClasses.map((fc) => (
                    <TableRow key={fc.classNum}>
                      <TableCell className="text-[11px] font-medium">{fc.label}</TableCell>
                      <TableCell className="text-[10px] text-muted-foreground">{fc.densityRange}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums font-semibold">
                        {fc.rateMultiplier.toFixed(2)}x
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessorial Rate Card */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold">Accessorial Services Rate Card</span>
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] h-7">Service</TableHead>
                  <TableHead className="text-[10px] h-7">Category</TableHead>
                  <TableHead className="text-[10px] h-7">Description</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Rate</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessorials.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell className="text-[11px] font-medium">{acc.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[9px] capitalize">{acc.category}</Badge></TableCell>
                    <TableCell className="text-[10px] text-muted-foreground max-w-[200px] truncate">{acc.description}</TableCell>
                    <TableCell className="text-[11px] text-right tabular-nums font-semibold">{fmt(acc.rate)}</TableCell>
                    <TableCell className="text-[10px] text-right text-muted-foreground">{acc.rateType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Service Levels */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold">Service Levels</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {serviceLevels.map((sl) => (
              <div key={sl.id} className="p-3 rounded-lg border border-border">
                <p className="text-[11px] font-semibold mb-1">{sl.name}</p>
                <p className="text-[9px] text-muted-foreground mb-2">{sl.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[9px]">{sl.transitDays}</Badge>
                  <span className="text-[10px] font-semibold tabular-nums">
                    {sl.premiumPct > 0 ? `+${sl.premiumPct}%` : "Base"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// RECENT QUOTES TAB
// ──────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  delivered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "in-transit": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  quoted: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

function RecentQuotesTab() {
  const totalValue = sampleQuotes.reduce((s, q) => s + q.total, 0);
  const deliveredCount = sampleQuotes.filter((q) => q.status === "delivered").length;

  return (
    <div className="space-y-4">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Quotes</p>
            <p className="text-lg font-bold tabular-nums">{sampleQuotes.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Value</p>
            <p className="text-lg font-bold tabular-nums">{fmt(totalValue)}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Delivered</p>
            <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{deliveredCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Avg Quote Value</p>
            <p className="text-lg font-bold tabular-nums">{fmt(totalValue / sampleQuotes.length)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quotes Table */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] h-7">Quote #</TableHead>
                  <TableHead className="text-[10px] h-7">Date</TableHead>
                  <TableHead className="text-[10px] h-7">Customer</TableHead>
                  <TableHead className="text-[10px] h-7">Destination</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Weight</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Pcs</TableHead>
                  <TableHead className="text-[10px] h-7">Service</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Total</TableHead>
                  <TableHead className="text-[10px] h-7">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleQuotes.map((q) => (
                  <TableRow key={q.id} data-testid={`quote-${q.id}`}>
                    <TableCell className="text-[11px] font-mono font-medium">{q.id}</TableCell>
                    <TableCell className="text-[11px] tabular-nums">{q.date}</TableCell>
                    <TableCell className="text-[11px] font-medium">{q.customer}</TableCell>
                    <TableCell className="text-[10px] text-muted-foreground">{q.destination}</TableCell>
                    <TableCell className="text-[11px] text-right tabular-nums">{q.weight.toLocaleString()} lbs</TableCell>
                    <TableCell className="text-[11px] text-right tabular-nums">{q.pieces}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[9px]">{q.serviceLevel}</Badge></TableCell>
                    <TableCell className="text-[11px] text-right tabular-nums font-semibold">{fmt(q.total)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[9px] ${statusColors[q.status]}`}>
                        {q.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// SERVICE ZONES TAB
// ──────────────────────────────────────────────────────
function ServiceZonesTab() {
  const zoneChartData = zones.map((z) => ({
    name: z.name.split("—")[0].trim(),
    multiplier: zoneMultipliers[z.id],
    fuel: z.fuelPct,
  }));

  return (
    <div className="space-y-4">
      {/* Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {zones.map((z, idx) => (
          <Card key={z.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="text-[11px] font-bold">{z.name.split("—")[0].trim()}</span>
              </div>
              <p className="text-[10px] font-medium mb-1">{z.name.split("—")[1]?.trim()}</p>
              <p className="text-[9px] text-muted-foreground mb-3">{z.description}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Radius</span>
                  <span className="font-semibold">{z.baseMileRadius}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Rate Multiplier</span>
                  <span className="font-semibold tabular-nums">{zoneMultipliers[z.id].toFixed(2)}x</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Fuel Surcharge</span>
                  <span className="font-semibold tabular-nums">{z.fuelPct}%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Transit</span>
                  <Badge variant="outline" className="text-[9px]">{z.deliveryDays}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Zone Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Zone Rate Multipliers</span>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0.8, 1.8]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 11 }} />
                  <Bar dataKey="multiplier" fill={TEAL} radius={[4, 4, 0, 0]} name="Multiplier">
                    {zoneChartData.map((_, idx) => (
                      <Cell key={idx} fill={[TEAL, BLUE, PURPLE, AMBER, RED][idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold">Fuel Surcharge by Zone</span>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="%" domain={[10, 16]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 11 }} formatter={(v: number) => [`${v}%`, "Fuel"]} />
                  <Bar dataKey="fuel" fill={AMBER} radius={[4, 4, 0, 0]} name="Fuel %">
                    {zoneChartData.map((_, idx) => (
                      <Cell key={idx} fill={[GREEN, TEAL_LIGHT, BLUE, AMBER, RED][idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Quote by Zone */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold">Sample Quote Comparison — 500 lbs, Class 100, Standard Service</span>
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] h-7">Zone</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Base</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Zone Adj.</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Fuel</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Total</TableHead>
                  <TableHead className="text-[10px] h-7 text-right">Per lb</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {zones.map((z) => {
                  const q = calculateQuote({
                    weight: 500, pieces: 1, freightClass: 100,
                    zone: z.id, serviceLevel: "standard", accessorialIds: [], monthlyVolume: 0,
                  });
                  return (
                    <TableRow key={z.id}>
                      <TableCell className="text-[11px] font-medium">{z.name.split("—")[0].trim()}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums">{fmt(q.baseCharge)}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums">{fmt(q.zoneCharge)}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums">{fmt(q.fuelSurcharge)}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums font-bold text-teal-600 dark:text-teal-400">{fmt(q.totalCharge)}</TableCell>
                      <TableCell className="text-[11px] text-right tabular-nums">{fmt(q.ratePerLb)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────────────
export default function OTTQuoteCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            LTL Final Mile Pricing
          </h1>
          <p className="text-xs text-muted-foreground">On Time Trucking — Farmingdale, NY | Tristate LTL Final Mile Delivery</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="text-[9px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
            Rates Effective March 2026
          </Badge>
          <Badge variant="outline" className="text-[9px]">
            Fuel Index: {zones[0].fuelPct}%–{zones[zones.length - 1].fuelPct}%
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border pb-0 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "calculator" && <QuoteCalculatorTab />}
      {activeTab === "rate-card" && <RateCardTab />}
      {activeTab === "quotes" && <RecentQuotesTab />}
      {activeTab === "zones" && <ServiceZonesTab />}
    </div>
  );
}
