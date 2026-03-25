import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import {
  kpis,
  monthlyRevenue,
  facilities,
  facilityCoordinates,
  facilityCustomers,
  liquidityChartData,
  vacancyForecast,
} from "@/lib/data";
import {
  TrendingUp,
  Building2,
  DollarSign,
  BarChart3,
  Warehouse,
  GitBranch,
  AlertTriangle,
  Newspaper,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
  Cell,
  ReferenceLine,
} from "recharts";
import { useEffect, useRef, useState } from "react";

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  badge?: string;
}) {
  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{title}</p>
            <p className="text-xl font-bold tabular-nums mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            {badge && (
              <Badge
                variant="secondary"
                className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0"
              >
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getVacancyColor(pct: number) {
  if (pct === 0) return "#10b981";
  if (pct < 25) return "#f59e0b";
  if (pct < 50) return "#f97316";
  return "#ef4444";
}

function CustomerBadge({ name }: { name: string }) {
  const colorMap: Record<string, string> = {
    Tesla: "bg-red-500/15 text-red-700 dark:text-red-400",
    "LAM Research": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    KLA: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
    Delta: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    Corning: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    Amazon: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    Panasonic: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    Lucid: "bg-pink-500/15 text-pink-700 dark:text-pink-400",
    Wisk: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${colorMap[name] || "bg-muted text-muted-foreground"}`}
    >
      {name}
    </span>
  );
}

function FacilityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically load Leaflet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([37.0, -105.0], 4);

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map);

      // Group facilities by region for clustering
      facilityCoordinates.forEach((coord) => {
        const fac = facilities.find((f) => f.name === coord.name);
        if (!fac) return;

        const customers = facilityCustomers[fac.name] || [];
        const color = getVacancyColor(fac.vacancy_pct);
        const sqft = fac.sqft >= 1e6 ? `${(fac.sqft / 1e6).toFixed(2)}M` : `${(fac.sqft / 1e3).toFixed(0)}K`;

        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 28px; height: 28px; border-radius: 50%;
            background: ${color}; border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            font-size: 9px; font-weight: 700; color: white;
          ">${fac.vacancy_pct > 0 ? Math.round(fac.vacancy_pct) : "✓"}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const customerHtml = customers.length > 0
          ? `<div style="margin-top:6px;display:flex;gap:3px;flex-wrap:wrap">${customers.map(
              (c) =>
                `<span style="background:hsl(174 72% 33% / 0.15);color:hsl(174 72% 33%);padding:1px 5px;border-radius:3px;font-size:10px;font-weight:600">${c}</span>`,
            ).join("")}</div>`
          : "";

        const popup = `
          <div style="font-family:system-ui;min-width:180px">
            <div style="font-weight:700;font-size:13px;margin-bottom:2px">${fac.name}</div>
            <div style="color:#666;font-size:11px;margin-bottom:6px">${fac.location}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px">
              <div><span style="color:#999">SqFt:</span> <b>${sqft}</b></div>
              <div><span style="color:#999">Vacancy:</span> <b style="color:${color}">${fac.vacancy_pct}%</b></div>
              <div><span style="color:#999">Lease:</span> <b>${fac.lease_exp.substring(0, 7)}</b></div>
              <div><span style="color:#999">Months:</span> <b>${fac.months_to_exp}</b></div>
            </div>
            ${customerHtml}
          </div>
        `;

        L.marker([coord.lat, coord.lng], { icon })
          .addTo(map)
          .bindPopup(popup, { maxWidth: 260 });
      });

      // Fit bounds to show all markers
      const bounds = facilityCoordinates.map(
        (c) => [c.lat, c.lng] as [number, number],
      );
      map.fitBounds(bounds, { padding: [40, 40] });
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[360px] rounded-lg overflow-hidden"
      data-testid="facility-map"
    />
  );
}

function formatSqft(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

export default function Dashboard() {
  const vacantFacilities = [...facilities]
    .filter((f) => f.vacancy_pct > 0)
    .sort((a, b) => b.vacancy_pct - a.vacancy_pct);

  return (
    <div className="space-y-6">
      {/* FY2026 Performance Banner */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <h2 className="text-sm font-bold mb-4">FY2026 Performance Tracker</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Revenue
                </span>
                <span className="text-xs font-semibold tabular-nums">
                  {kpis.combined.revenue_fy2025} actual
                </span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">
                On pace for $115M+ at current run rate
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  EBITDA Margin
                </span>
                <span className="text-xs font-semibold tabular-nums">
                  15.0% vs 18% target
                </span>
              </div>
              <Progress value={83} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">
                3pp gap to close — margin improvement needed
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Facility Utilization
                </span>
                <span className="text-xs font-semibold tabular-nums">
                  84% (target 92%)
                </span>
              </div>
              <Progress value={84} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">
                Kato (72% vacancy) dragging overall rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
        data-testid="kpi-cards"
      >
        <KPICard
          title="Combined Revenue"
          value={kpis.combined.jan26_revenue}
          subtitle="Jan '26 Monthly"
          icon={DollarSign}
          badge={`+${kpis.combined.yoy_rev_growth} YoY`}
        />
        <KPICard
          title="EBITDA"
          value={kpis.combined.jan26_ebitda}
          subtitle={`${kpis.combined.jan26_ebitda_margin} margin`}
          icon={TrendingUp}
        />
        <KPICard
          title="Gross Margin"
          value={kpis.combined.jan26_gross_margin}
          subtitle="Jan '26"
          icon={BarChart3}
        />
        <KPICard
          title="Total Facilities"
          value="12"
          subtitle="1.66M sqft"
          icon={Warehouse}
        />
        <KPICard
          title="Pipeline Value"
          value="$65.8M"
          subtitle="22% conversion"
          icon={GitBranch}
        />
      </div>

      {/* Facility Map */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              Facility Network
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-muted-foreground">Full</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[10px] text-muted-foreground">&lt;25%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span className="text-[10px] text-muted-foreground">&lt;50%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-[10px] text-muted-foreground">50%+</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <FacilityMap />
          {/* Compact facility list below map */}
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {facilities.map((f) => {
              const customers = facilityCustomers[f.name] || [];
              return (
                <div
                  key={f.name}
                  className="flex items-start gap-2 p-2 rounded-md bg-muted/30 border border-border/50"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: getVacancyColor(f.vacancy_pct) }}
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold truncate">{f.name}</p>
                    <p className="text-[10px] text-muted-foreground tabular-nums">
                      {formatSqft(f.sqft)} · {f.vacancy_pct === 0 ? "Full" : `${f.vacancy_pct}% vacant`}
                    </p>
                    {customers.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 mt-1">
                        {customers.map((c) => (
                          <CustomerBadge key={c} name={c} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Revenue Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Monthly Revenue Trend ($M)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} barCategoryGap="20%">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar
                    dataKey="rk"
                    name="RK Logistics"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="ott"
                    name="OTT"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            {[
              {
                label: "Priority Outreach",
                desc: "9 RK customers + 3 OTT carriers",
                icon: AlertTriangle,
                path: "/business-development",
                color: "text-amber-500",
              },
              {
                label: "Facility Alerts",
                desc: "4 facilities with high vacancy",
                icon: Building2,
                path: "/facilities",
                color: "text-red-500",
              },
              {
                label: "Pipeline",
                desc: "Big 9 accounts • $65.8M total",
                icon: GitBranch,
                path: "/pipeline",
                color: "text-primary",
              },
              {
                label: "Customer News",
                desc: "12 priority entities tracked",
                icon: Newspaper,
                path: "/market-intel",
                color: "text-blue-500",
              },
            ].map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors group"
                  data-testid={`quick-action-${item.path.replace("/", "")}`}
                >
                  <item.icon
                    className={`w-4 h-4 ${item.color} shrink-0`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Liquidity & Vacancy Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Liquidity Chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Net Cash Position ($M)
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-0.5 bg-primary" />
                  <span className="text-[10px] text-muted-foreground">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-0.5 bg-primary/40 border-t border-dashed border-primary" />
                  <span className="text-[10px] text-muted-foreground">Forecast</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liquidityChartData}>
                  <defs>
                    <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(v: number) => `$${v.toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toFixed(2)}M`,
                      "Net Cash",
                    ]}
                  />
                  <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <Area
                    type="monotone"
                    dataKey="net_cash"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fill="url(#cashGradient)"
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      if (!payload.is_actual) {
                        return (
                          <circle
                            key={`dot-${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r={2.5}
                            fill="hsl(var(--card))"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={1.5}
                            strokeDasharray="2 2"
                          />
                        );
                      }
                      return <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={0} />;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vacancy Forecast */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Vacancy Rate Trend
              </CardTitle>
              <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 border-0">
                Current: 16.0%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vacancyForecast}>
                  <defs>
                    <linearGradient id="vacancyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 20]}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Vacancy"]}
                  />
                  <ReferenceLine
                    y={8}
                    stroke="#10b981"
                    strokeDasharray="5 5"
                    label={{ value: "Target 8%", position: "right", fill: "#10b981", fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="vacancy_pct"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#vacancyGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facility Vacancy Bar + Forecast Fills */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Facility Vacancy Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vacantFacilities.map((f) => ({
                    name: f.name,
                    vacancy: f.vacancy_pct,
                    sqft: Math.round((f.sqft * f.vacancy_pct) / 100 / 1000),
                  }))}
                  layout="vertical"
                  barCategoryGap="18%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    domain={[0, 80]}
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                    unit="%"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                    width={75}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value}% (${props.payload.sqft}K sqft)`,
                      "Vacancy",
                    ]}
                  />
                  <Bar dataKey="vacancy" radius={[0, 4, 4, 0]}>
                    {vacantFacilities.map((f, idx) => (
                      <Cell key={idx} fill={getVacancyColor(f.vacancy_pct)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Pipeline Fills — Vacancy Relief
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2.5">
            {[
              {
                customer: "Panasonic",
                site: "Patterson Pass",
                sqft: "60K",
                status: "CLOSED WON",
                color: "bg-emerald-500",
              },
              {
                customer: "Franklin",
                site: "Patterson Pass",
                sqft: "15K",
                status: "Contracting",
                color: "bg-blue-500",
              },
              {
                customer: "LAM Research",
                site: "Goodyear AZ",
                sqft: "270K",
                status: "SOW Dev",
                color: "bg-blue-500",
              },
              {
                customer: "Lucid",
                site: "Tempe AZ",
                sqft: "500K",
                status: "Facility Selection",
                color: "bg-amber-500",
              },
              {
                customer: "Corning",
                site: "Tempe AZ",
                sqft: "Expansion",
                status: "Pending Feedback",
                color: "bg-amber-500",
              },
            ].map((deal) => (
              <div
                key={deal.customer + deal.site}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className={`w-1.5 h-8 rounded-full ${deal.color} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{deal.customer}</p>
                    <Badge
                      variant="outline"
                      className={`text-[9px] border-0 ${
                        deal.status === "CLOSED WON"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {deal.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {deal.site} · {deal.sqft} sqft
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="text-sm font-semibold">RK Logistics</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Revenue FY25</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.rk_logistics.revenue_fy2025}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">EBITDA</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.rk_logistics.ebitda_fy2025}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Margin</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.rk_logistics.ebitda_margin}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "hsl(var(--chart-2))" }}
              />
              <h3 className="text-sm font-semibold">OnTime Trucking (OTT)</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Revenue FY25</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.ott.revenue_fy2025}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">EBITDA</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.ott.ebitda_fy2025}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Margin</p>
                <p className="text-lg font-bold tabular-nums">
                  {kpis.ott.ebitda_margin}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
