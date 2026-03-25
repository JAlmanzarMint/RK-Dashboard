import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { kpis } from "@/lib/data";
import { Target, TrendingUp, Building2, AlertCircle } from "lucide-react";

function GoalCard({ title, icon: Icon, actual, target, unit, progress, status, details, color }: {
  title: string; icon: any; actual: string; target: string; unit: string;
  progress: number; status: string; details: string[]; color: string;
}) {
  return (
    <Card className="border border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <Badge variant={progress >= 90 ? "default" : progress >= 70 ? "secondary" : "destructive"} className="text-[10px] mt-1">
                {status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums">{actual}</p>
            <p className="text-xs text-muted-foreground">vs {target} target</p>
          </div>
        </div>
        <Progress value={progress} className="h-2.5 mb-3" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold tabular-nums">{progress}%</span>
        </div>
        <div className="space-y-1.5">
          {details.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Goals() {
  const [tab, setTab] = useState("fy2026");

  return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList data-testid="goals-tabs">
          <TabsTrigger value="fy2026" data-testid="tab-fy2026">FY2026</TabsTrigger>
          <TabsTrigger value="monthly" data-testid="tab-monthly">Monthly Jan '26</TabsTrigger>
        </TabsList>

        <TabsContent value="fy2026" className="mt-4 space-y-4">
          <GoalCard
            title="Revenue Target"
            icon={TrendingUp}
            actual={kpis.combined.revenue_fy2025}
            target="$120M"
            unit="revenue"
            progress={88}
            status="On Track"
            color="bg-primary/10 text-primary"
            details={[
              `FY2025 actual: ${kpis.combined.revenue_fy2025} with ${kpis.combined.yoy_rev_growth} YoY growth`,
              "Jan '26 run rate: $9.1M/mo × 12 = $109.2M annualized",
              "Pipeline of $65.8M at 22% conversion = $14.5M potential adds",
              "Near-term wins: LAM AZ ($8M), Panasonic ($2M), KLA Bonded ($2M)",
            ]}
          />
          <GoalCard
            title="EBITDA Margin Target"
            icon={Target}
            actual="15.0%"
            target="18.0%"
            unit="margin"
            progress={83}
            status="Needs Improvement"
            color="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            details={[
              "Combined EBITDA margin: 15.0% (FY2025), 3pp gap to target",
              `RK Logistics: ${kpis.rk_logistics.ebitda_margin} — dragged by Tesla (-50.4%), KLA (-22.4%), Delta (-53.4%)`,
              `OTT: ${kpis.ott.ebitda_margin} — strong performer, exceeds target`,
              "Priority: Fix margins on Tesla, KLA, Delta — combined revenue $4.1M/mo at negative margins",
            ]}
          />
          <GoalCard
            title="Facility Utilization"
            icon={Building2}
            actual="84%"
            target="92%"
            unit="utilization"
            progress={91}
            status="At Risk"
            color="bg-red-500/10 text-red-600 dark:text-red-400"
            details={[
              "Current utilization: 84% (16% vacancy rate across 1.66M sqft)",
              "265K sqft vacant — Kato alone at 72% vacancy (151K sqft idle)",
              "Critical: Kato has 62 months remaining on lease — $X.XM exposure",
              "Pipeline fills: Franklin (Patterson Pass), Panasonic (Patterson Pass) could reduce vacancy by ~75K sqft",
            ]}
          />
        </TabsContent>

        <TabsContent value="monthly" className="mt-4 space-y-4">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">January 2026 Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold tabular-nums">{kpis.combined.jan26_revenue}</p>
                  <Badge variant="secondary" className="text-[10px] mt-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">+{kpis.combined.yoy_rev_growth} YoY</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">EBITDA</p>
                  <p className="text-xl font-bold tabular-nums">{kpis.combined.jan26_ebitda}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpis.combined.jan26_ebitda_margin} margin</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gross Margin</p>
                  <p className="text-xl font-bold tabular-nums">{kpis.combined.jan26_gross_margin}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">vs Prior Month</p>
                  <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">+2.2%</p>
                  <p className="text-xs text-muted-foreground mt-1">Revenue growth MoM</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-semibold mb-3">Division Breakdown — Jan '26</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs font-medium mb-2">RK Logistics</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Rev:</span> <span className="font-semibold tabular-nums">{kpis.rk_logistics.jan26_revenue}</span></div>
                      <div><span className="text-muted-foreground">EBITDA:</span> <span className="font-semibold tabular-nums">{kpis.rk_logistics.jan26_ebitda}</span></div>
                      <div><span className="text-muted-foreground">Margin:</span> <span className="font-semibold tabular-nums">{kpis.rk_logistics.jan26_ebitda_margin}</span></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/50">
                    <p className="text-xs font-medium mb-2">OnTime Trucking</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Rev:</span> <span className="font-semibold tabular-nums">{kpis.ott.jan26_revenue}</span></div>
                      <div><span className="text-muted-foreground">EBITDA:</span> <span className="font-semibold tabular-nums">{kpis.ott.jan26_ebitda}</span></div>
                      <div><span className="text-muted-foreground">Margin:</span> <span className="font-semibold tabular-nums">{kpis.ott.jan26_ebitda_margin}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
