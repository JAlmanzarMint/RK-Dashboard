import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign, Building2, Calculator, ChevronDown, ChevronRight,
  FileText, Warehouse, Users, Package, ArrowRightLeft, ClipboardList,
  TrendingUp, Clock, CheckCircle2, AlertTriangle, BarChart3, Settings,
  Truck, Box, Layers, Ruler, Star, Calendar, Target,
} from "lucide-react";
import {
  facilities, markupTiers, generateRateCard, recentBenchmarks,
  recentQuotes, serviceTypes, serviceCategories, opportunityTypes,
  verticals, tiers, contractTerms, inboundHandlingUnits, inboundDeliveryTypes,
  inboundDeliveryConditions, outboundHandlingUnits, outboundDeliveryTypes,
  outboundDeliveryConditions, stackingOptions, hoursOfOperation,
  paymentTermsOptions, storageTypes, type MarkupTier, type RecentQuote,
} from "@/lib/facilityPricingData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const fmt = (v: number) => `$${v.toFixed(2)}`;
const statusColors: Record<string, string> = {
  approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "in-review": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

// ──────────────────────────────────────────────────────
// SELECT COMPONENT (simple, no localStorage)
// ──────────────────────────────────────────────────────
function Select({ label, value, onChange, options, id }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; id: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 px-2 text-xs rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        data-testid={id}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, id }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; id: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-8 px-2 text-xs rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        data-testid={id}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────
// RATE TABLE SECTION (collapsible)
// ──────────────────────────────────────────────────────
function RateSection({ title, icon: Icon, items }: {
  title: string; icon: typeof Package;
  items: { service: string; rate: number }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
        data-testid={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="text-xs font-semibold">{title}</span>
          <Badge variant="outline" className="text-[9px]">{items.length} items</Badge>
        </div>
        {open ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
      {open && (
        <CardContent className="p-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-[10px] h-7">Service</TableHead>
                <TableHead className="text-[10px] h-7 text-right">Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.service} className="border-border">
                  <TableCell className="text-xs py-1.5">{item.service}</TableCell>
                  <TableCell className="text-xs py-1.5 text-right font-mono font-semibold">{fmt(item.rate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// INTAKE FORM + RATE CARD GENERATOR
// ──────────────────────────────────────────────────────
function IntakeForm() {
  // Form state
  const [clientName, setClientName] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [facilityId, setFacilityId] = useState("patterson");
  const [markupTier, setMarkupTier] = useState<MarkupTier>("35");
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [serviceCategory, setServiceCategory] = useState(serviceCategories[0]);
  const [oppType, setOppType] = useState(opportunityTypes[0]);
  const [vertical, setVertical] = useState(verticals[0]);
  const [tier, setTier] = useState(tiers[1]);
  const [contractTerm, setContractTerm] = useState(contractTerms[2]);
  const [estSqft, setEstSqft] = useState("");
  const [numSKUs, setNumSKUs] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productDims, setProductDims] = useState("");
  const [serialControlled, setSerialControlled] = useState("No");
  const [stacking, setStacking] = useState(stackingOptions[0]);
  const [storageType, setStorageType] = useState(storageTypes[0]);
  const [inboundUnit, setInboundUnit] = useState(inboundHandlingUnits[0]);
  const [inboundDelivery, setInboundDelivery] = useState(inboundDeliveryTypes[0]);
  const [inboundCondition, setInboundCondition] = useState(inboundDeliveryConditions[0]);
  const [outboundUnit, setOutboundUnit] = useState(outboundHandlingUnits[0]);
  const [outboundDelivery, setOutboundDelivery] = useState(outboundDeliveryTypes[0]);
  const [outboundCondition, setOutboundCondition] = useState(outboundDeliveryConditions[0]);
  const [hours, setHours] = useState(hoursOfOperation[0]);
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsOptions[1]);
  const [comments, setComments] = useState("");
  const [showRateCard, setShowRateCard] = useState(false);

  // Generate rate card
  const rateCard = useMemo(
    () => generateRateCard(facilityId, parseInt(markupTier)),
    [facilityId, markupTier]
  );

  const selectedFacility = facilities.find((f) => f.id === facilityId);

  // Monthly storage estimate
  const estMonthly = useMemo(() => {
    const sq = parseFloat(estSqft.replace(/,/g, ""));
    if (isNaN(sq)) return null;
    if (storageType === "Sq. Ft. (Monthly)") return sq * rateCard.storage.perSqFt;
    if (storageType === "Bulk Pallet") return sq * rateCard.storage.bulkPerPallet;
    if (storageType === "Racked Pallet" && rateCard.storage.rackedPerPallet) return sq * rateCard.storage.rackedPerPallet;
    return null;
  }, [estSqft, storageType, rateCard]);

  // Benchmark comparison
  const facilityBenchmarks = recentBenchmarks.filter(
    (b) => b.facility.toLowerCase() === (selectedFacility?.name || "").toLowerCase()
  );

  return (
    <div className="space-y-4">
      {/* Form Header */}
      <Card className="border-border border-teal-500/20 bg-teal-500/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            RK Logistics — Quote Intake Form
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Select facility and markup tier to auto-generate a complete rate card. All rates sourced from Finance (Rich Frainier).
          </p>
        </CardContent>
      </Card>

      {/* Row 1: Client + Opportunity + Core Selectors */}
      <div className="grid md:grid-cols-4 gap-3">
        <TextInput label="Client Name" value={clientName} onChange={setClientName} placeholder="e.g., Delta Products Corp" id="input-client" />
        <TextInput label="Opportunity Name" value={opportunityName} onChange={setOpportunityName} placeholder="e.g., DEI Patterson" id="input-opportunity" />
        <Select label="Opportunity Type" value={oppType} onChange={setOppType} id="select-opp-type"
          options={opportunityTypes.map(v => ({ value: v, label: v }))} />
        <Select label="Vertical" value={vertical} onChange={setVertical} id="select-vertical"
          options={verticals.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Row 2: Facility + Markup + Tier + Service */}
      <div className="grid md:grid-cols-4 gap-3">
        <Select label="Facility" value={facilityId} onChange={setFacilityId} id="select-facility"
          options={facilities.map(f => ({ value: f.id, label: `${f.name} — ${f.location}` }))} />
        <Select label="Markup Tier" value={markupTier} onChange={(v) => setMarkupTier(v as MarkupTier)} id="select-markup"
          options={markupTiers.map(m => ({ value: m.value, label: m.label }))} />
        <Select label="Account Tier" value={tier} onChange={setTier} id="select-tier"
          options={tiers.map(v => ({ value: v, label: v }))} />
        <Select label="Service Type" value={serviceType} onChange={setServiceType} id="select-service-type"
          options={serviceTypes.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Row 3: Storage Details */}
      <div className="grid md:grid-cols-4 gap-3">
        <Select label="Storage Type" value={storageType} onChange={setStorageType} id="select-storage-type"
          options={storageTypes.map(v => ({ value: v, label: v }))} />
        <TextInput label={storageType === "Sq. Ft. (Monthly)" ? "Estimated Sq. Ft." : "Pallet Positions"} value={estSqft} onChange={setEstSqft} placeholder={storageType === "Sq. Ft. (Monthly)" ? "e.g., 8,000" : "e.g., 200"} id="input-sqft" />
        <Select label="Contract Term" value={contractTerm} onChange={setContractTerm} id="select-contract"
          options={contractTerms.map(v => ({ value: v, label: v }))} />
        <Select label="Payment Terms" value={paymentTerms} onChange={setPaymentTerms} id="select-payment"
          options={paymentTermsOptions.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Row 4: Product Details */}
      <div className="grid md:grid-cols-4 gap-3">
        <TextInput label="Product Description" value={productDesc} onChange={setProductDesc} placeholder="e.g., EV battery modules" id="input-product-desc" />
        <TextInput label="Number of SKUs" value={numSKUs} onChange={setNumSKUs} placeholder="e.g., 12" id="input-skus" />
        <TextInput label="Product Weight (lbs)" value={productWeight} onChange={setProductWeight} placeholder="e.g., 2,500" id="input-weight" />
        <TextInput label="Product Dims (L×W×H)" value={productDims} onChange={setProductDims} placeholder='e.g., 40"×48"×40"' id="input-dims" />
      </div>

      {/* Row 5: Handling Details */}
      <div className="grid md:grid-cols-4 gap-3">
        <Select label="Serial Controlled" value={serialControlled} onChange={setSerialControlled} id="select-serial"
          options={[{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }]} />
        <Select label="Stacking" value={stacking} onChange={setStacking} id="select-stacking"
          options={stackingOptions.map(v => ({ value: v, label: v }))} />
        <Select label="Hours of Operation" value={hours} onChange={setHours} id="select-hours"
          options={hoursOfOperation.map(v => ({ value: v, label: v }))} />
        <Select label="Service Category" value={serviceCategory} onChange={setServiceCategory} id="select-service-cat"
          options={serviceCategories.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Row 6: Inbound */}
      <div className="grid md:grid-cols-3 gap-3">
        <Select label="Inbound Handling Unit" value={inboundUnit} onChange={setInboundUnit} id="select-inbound-unit"
          options={inboundHandlingUnits.map(v => ({ value: v, label: v }))} />
        <Select label="Inbound Delivery Type" value={inboundDelivery} onChange={setInboundDelivery} id="select-inbound-delivery"
          options={inboundDeliveryTypes.map(v => ({ value: v, label: v }))} />
        <Select label="Inbound Condition" value={inboundCondition} onChange={setInboundCondition} id="select-inbound-condition"
          options={inboundDeliveryConditions.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Row 7: Outbound */}
      <div className="grid md:grid-cols-3 gap-3">
        <Select label="Outbound Handling Unit" value={outboundUnit} onChange={setOutboundUnit} id="select-outbound-unit"
          options={outboundHandlingUnits.map(v => ({ value: v, label: v }))} />
        <Select label="Outbound Delivery Type" value={outboundDelivery} onChange={setOutboundDelivery} id="select-outbound-delivery"
          options={outboundDeliveryTypes.map(v => ({ value: v, label: v }))} />
        <Select label="Outbound Condition" value={outboundCondition} onChange={setOutboundCondition} id="select-outbound-condition"
          options={outboundDeliveryConditions.map(v => ({ value: v, label: v }))} />
      </div>

      {/* Comments */}
      <div>
        <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Additional Comments</label>
        <textarea
          value={comments} onChange={(e) => setComments(e.target.value)}
          className="w-full h-16 px-2 py-1.5 text-xs rounded-md border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Special requirements, FTZ needs, hazmat, climate control, etc."
          data-testid="input-comments"
        />
      </div>

      {/* ═══ AUTO-GENERATED PRICING ═══ */}
      <Card className="border-border border-l-2 border-l-teal-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Calculator className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Auto-Generated Rate Card
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
                {selectedFacility?.name || "—"}
              </Badge>
              <Badge variant="outline">{markupTier}% Markup</Badge>
            </div>
          </div>

          {/* Storage + Hourly Summary */}
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {/* Storage */}
            <Card className="border-border bg-muted/30">
              <CardContent className="p-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Warehouse className="w-3 h-3 inline mr-1" />Storage Rates
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Per Sq. Ft. (Monthly)</span>
                    <span className="text-sm font-bold font-mono">{fmt(rateCard.storage.perSqFt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Bulk Pallet (Non-Stackable)</span>
                    <span className="text-sm font-bold font-mono">{fmt(rateCard.storage.bulkPerPallet)}</span>
                  </div>
                  {rateCard.storage.rackedPerPallet && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Racked Pallet</span>
                      <span className="text-sm font-bold font-mono">{fmt(rateCard.storage.rackedPerPallet)}</span>
                    </div>
                  )}
                  {estMonthly !== null && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Est. Monthly Storage</span>
                        <span className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400">
                          ${estMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Hourly */}
            <Card className="border-border bg-muted/30">
              <CardContent className="p-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Users className="w-3 h-3 inline mr-1" />Hourly Labor Rates
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Material Handler / IC", rate: rateCard.hourly.mhIc },
                    { label: "Lead", rate: rateCard.hourly.lead },
                    { label: "Supervisor", rate: rateCard.hourly.supervisor },
                    { label: "Manager", rate: rateCard.hourly.manager },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center">
                      <span className="text-xs">{r.label}</span>
                      <span className="text-sm font-bold font-mono">{fmt(r.rate)}/hr</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benchmark comparison */}
          {facilityBenchmarks.length > 0 && (
            <Card className="border-border bg-amber-500/5 border-amber-500/10 mb-4">
              <CardContent className="p-3">
                <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  <BarChart3 className="w-3 h-3 inline mr-1" />Recent Benchmarks — {selectedFacility?.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {facilityBenchmarks.map((b) => (
                    <div key={b.client} className="px-2 py-1 rounded bg-muted/50 border border-border">
                      <span className="text-[10px] font-semibold">{b.client}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">${b.rateSqFt}/sqft ({b.markup})</span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-muted-foreground mt-1.5">Your quote: {fmt(rateCard.storage.perSqFt)}/sqft at {markupTier}% markup</p>
              </CardContent>
            </Card>
          )}

          {/* Toggle full transactional rate card */}
          <button
            onClick={() => setShowRateCard(!showRateCard)}
            className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline mb-3"
            data-testid="toggle-rate-card"
          >
            {showRateCard ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {showRateCard ? "Hide Full Transactional Rates" : "View Full Transactional Rate Card"}
          </button>

          {showRateCard && (
            <div className="space-y-2">
              <RateSection title="Inbound" icon={Package} items={rateCard.inbound} />
              <RateSection title="Inventory Control" icon={ClipboardList} items={rateCard.inventoryControl} />
              <RateSection title="Outbound" icon={Truck} items={rateCard.outbound} />
              <RateSection title="Miscellaneous" icon={Settings} items={rateCard.miscellaneous} />
              <div className="p-2 rounded bg-muted/30 border border-border">
                <p className="text-[10px] text-muted-foreground">
                  <DollarSign className="w-3 h-3 inline mr-1" />Supplies Markup: <span className="font-semibold">{rateCard.suppliesMarkup}%</span> (applied separately)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// RECENT QUOTES VIEW
// ──────────────────────────────────────────────────────
function RecentQuotesView() {
  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Quotes</p>
          </div>
          <p className="text-xl font-bold">{recentQuotes.length}</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending Approval</p>
          </div>
          <p className="text-xl font-bold">{recentQuotes.filter(q => q.status === "pending").length}</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Approved</p>
          </div>
          <p className="text-xl font-bold">{recentQuotes.filter(q => q.status === "approved").length}</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Markup</p>
          </div>
          <p className="text-xl font-bold">32%</p>
        </CardContent></Card>
      </div>

      {/* Quote Cards */}
      <div className="space-y-2">
        {recentQuotes.map((q) => (
          <Card key={q.id} className="border-border">
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-semibold">{q.client}</span>
                    <Badge variant="outline" className={statusColors[q.status]}>{q.status}</Badge>
                    <Badge variant="outline" className="text-[10px]">{q.type}</Badge>
                    <span className="text-[10px] text-muted-foreground">{q.date}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    <Building2 className="w-2.5 h-2.5 inline mr-0.5" />{q.facility}
                    <span className="mx-1.5">·</span>
                    <DollarSign className="w-2.5 h-2.5 inline mr-0.5" />Markup: {q.markup}
                    <span className="mx-1.5">·</span>
                    Storage: {q.storageSqFt}/sqft
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{q.notes}</p>
                </div>
                {q.margin && (
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{q.margin}</p>
                    <p className="text-[9px] text-muted-foreground">margin</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// RATE BENCHMARKS VIEW
// ──────────────────────────────────────────────────────
function BenchmarksView() {
  const chartData = recentBenchmarks.map((b) => ({
    name: `${b.client} (${b.facility.substring(0, 3)})`,
    rate: b.rateSqFt,
  }));

  const barColors = recentBenchmarks.map((b) => {
    if (b.markup === "COLA") return "#f59e0b";
    const pct = parseInt(b.markup);
    if (pct >= 40) return "#ef4444";
    if (pct >= 35) return "#0d9488";
    if (pct >= 30) return "#3b82f6";
    return "#6b7280";
  });

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardContent className="p-4">
          <p className="text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
            Storage Rate Benchmarks ($/Sq. Ft. Monthly)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 4]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={120} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} formatter={(v: number) => [`$${v.toFixed(2)}/sqft`, "Rate"]} />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={barColors[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-2 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-gray-500 inline-block" /> 25%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500 inline-block" /> 30%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-teal-500 inline-block" /> 35%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500 inline-block" /> 40%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500 inline-block" /> COLA</span>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-[10px] h-7">Client</TableHead>
                <TableHead className="text-[10px] h-7">Facility</TableHead>
                <TableHead className="text-[10px] h-7 text-right">Rate/SqFt</TableHead>
                <TableHead className="text-[10px] h-7">Markup</TableHead>
                <TableHead className="text-[10px] h-7">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBenchmarks.map((b, i) => (
                <TableRow key={i} className="border-border">
                  <TableCell className="text-xs py-1.5 font-semibold">{b.client}</TableCell>
                  <TableCell className="text-xs py-1.5">{b.facility}</TableCell>
                  <TableCell className="text-xs py-1.5 text-right font-mono font-semibold">${b.rateSqFt}</TableCell>
                  <TableCell className="text-xs py-1.5"><Badge variant="outline" className="text-[9px]">{b.markup}</Badge></TableCell>
                  <TableCell className="text-xs py-1.5 text-muted-foreground">{b.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Markup Policy */}
      <Card className="border-border">
        <CardContent className="p-3">
          <p className="text-xs font-semibold mb-2">Markup Policy</p>
          <div className="space-y-1.5">
            {markupTiers.map((t) => (
              <div key={t.value} className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] w-10 justify-center">{t.value}%</Badge>
                <span className="text-[10px] text-muted-foreground">{t.description}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] w-10 justify-center bg-amber-500/10 text-amber-600 border-amber-500/20">COLA</Badge>
              <span className="text-[10px] text-muted-foreground">Accounts already above target — only cost-of-living adjustment</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-border">
              <Badge variant="outline" className="text-[10px]">Supplies</Badge>
              <span className="text-[10px] text-muted-foreground">Always 25% markup, applied separately from labor/handling</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">Split Markup</Badge>
              <span className="text-[10px] text-muted-foreground">DEI/Delta contracts: Storage 25%, Hourly & Transactional 35%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// MAIN: Facility Pricing Page
// ──────────────────────────────────────────────────────
export default function FacilityPricing() {
  const [view, setView] = useState<"intake" | "quotes" | "benchmarks">("intake");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Facility Pricing
          </h1>
          <p className="text-xs text-muted-foreground">Auto-generate rate cards by facility and markup tier · Source: Rich Frainier (Finance)</p>
        </div>
        <div className="flex gap-1">
          {(["intake", "quotes", "benchmarks"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                view === v ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20" : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
              data-testid={`pricing-view-${v}`}
            >
              {v === "intake" ? "Quote Builder" : v === "quotes" ? "Recent Quotes" : "Benchmarks"}
            </button>
          ))}
        </div>
      </div>

      {view === "intake" && <IntakeForm />}
      {view === "quotes" && <RecentQuotesView />}
      {view === "benchmarks" && <BenchmarksView />}
    </div>
  );
}
