import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { facilities, facilitySummary, facilityCustomers } from "@/lib/data";
import { Building2, AlertTriangle, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SiTesla, SiPanasonic, SiDelta } from "react-icons/si";

function getVacancyColor(pct: number) {
  if (pct === 0) return { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", fill: "#10b981" };
  if (pct < 25) return { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", fill: "#f59e0b" };
  if (pct < 50) return { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400", fill: "#f97316" };
  return { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", badge: "bg-red-500/10 text-red-600 dark:text-red-400", fill: "#ef4444" };
}

function formatSqft(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

const customerLogoConfig: Record<string, { icon?: any; color: string; textColor: string }> = {
  Tesla: { icon: SiTesla, color: "bg-red-500/15", textColor: "text-red-700 dark:text-red-400" },
  "LAM Research": { color: "bg-blue-500/15", textColor: "text-blue-700 dark:text-blue-400" },
  KLA: { color: "bg-violet-500/15", textColor: "text-violet-700 dark:text-violet-400" },
  Delta: { icon: SiDelta, color: "bg-emerald-500/15", textColor: "text-emerald-700 dark:text-emerald-400" },
  Corning: { color: "bg-cyan-500/15", textColor: "text-cyan-700 dark:text-cyan-400" },
  Amazon: { color: "bg-orange-500/15", textColor: "text-orange-700 dark:text-orange-400" },
  Panasonic: { icon: SiPanasonic, color: "bg-indigo-500/15", textColor: "text-indigo-700 dark:text-indigo-400" },
  Lucid: { color: "bg-pink-500/15", textColor: "text-pink-700 dark:text-pink-400" },
  Wisk: { color: "bg-teal-500/15", textColor: "text-teal-700 dark:text-teal-400" },
};

function CustomerLogo({ name }: { name: string }) {
  const config = customerLogoConfig[name] || { color: "bg-muted", textColor: "text-muted-foreground" };
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${config.color} ${config.textColor}`}>
      {IconComponent && <IconComponent className="w-3 h-3" />}
      <span className="text-[10px] font-bold leading-none">{name}</span>
    </div>
  );
}

export default function Facilities() {
  const sortedByVacancy = [...facilities].sort((a, b) => b.vacancy_pct - a.vacancy_pct);
  const chartData = sortedByVacancy.filter(f => f.vacancy_pct > 0).map(f => ({
    name: f.name,
    vacancy: f.vacancy_pct,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="facility-kpis">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total SqFt</p>
            <p className="text-xl font-bold tabular-nums">{formatSqft(facilitySummary.total_sqft)}</p>
            <p className="text-xs text-muted-foreground mt-1">12 facilities</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Vacancy Rate</p>
            <p className="text-xl font-bold tabular-nums text-red-600 dark:text-red-400">{facilitySummary.overall_vacancy}</p>
            <p className="text-xs text-muted-foreground mt-1">Target: 8%</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Vacancy SqFt</p>
            <p className="text-xl font-bold tabular-nums">{formatSqft(facilitySummary.total_vacancy_sqft)}</p>
            <p className="text-xs text-muted-foreground mt-1">+7.3K sqft WoW</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Facilities</p>
            <p className="text-xl font-bold tabular-nums">12</p>
            <p className="text-xs text-muted-foreground mt-1">CA, TX, AZ, MI</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alert */}
      <Card className="border border-red-500/30 bg-red-500/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400">Critical Alert — Kato Facility</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            72% vacancy (151K sqft idle) with 62 months remaining on lease. Highest priority fill needed.
            Pipeline candidates: Lucid (500K sqft need), Panasonic DC Ops.
          </p>
        </CardContent>
      </Card>

      {/* Vacancy Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Vacancy % by Facility</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                  formatter={(value: number) => [`${value}%`, "Vacancy"]}
                />
                <Bar dataKey="vacancy" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, idx) => (
                    <Cell key={idx} fill={getVacancyColor(entry.vacancy).fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Facility Cards */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedByVacancy.map((f) => {
            const colors = getVacancyColor(f.vacancy_pct);
            const customers = facilityCustomers[f.name] || [];
            return (
              <Card key={f.name} className={`border border-border ${f.vacancy_pct > 50 ? "border-red-500/30" : ""}`} data-testid={`facility-${f.name.toLowerCase()}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold">{f.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{f.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                      {f.vacancy_pct === 0 ? "Full" : `${f.vacancy_pct}% vacant`}
                    </Badge>
                  </div>

                  {/* Customer Logos */}
                  {customers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {customers.map((c) => (
                        <CustomerLogo key={c} name={c} />
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">SqFt</span>
                      <p className="font-semibold tabular-nums">{formatSqft(f.sqft)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lease Exp</span>
                      <p className="font-semibold tabular-nums">{f.lease_exp.substring(0, 7)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Months Left</span>
                      <p className={`font-semibold tabular-nums ${f.months_to_exp <= 12 ? "text-red-600 dark:text-red-400" : ""}`}>{f.months_to_exp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Weekly Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ul className="space-y-1.5">
            {facilitySummary.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
