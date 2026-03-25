import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { kpis, ottTopCarriers } from "@/lib/data";
import { Truck, TrendingUp, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = [
  "hsl(174, 72%, 33%)",
  "hsl(262, 60%, 50%)",
  "hsl(43, 74%, 49%)",
  "hsl(210, 80%, 50%)",
];

export default function OTTCarriers() {
  const donutData = ottTopCarriers.map((c) => ({
    name: c.name,
    value: parseFloat(c.pct_total),
  }));

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="ott-kpis">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">OTT Revenue FY25</p>
            <p className="text-xl font-bold tabular-nums">{kpis.ott.revenue_fy2025}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">EBITDA</p>
            <p className="text-xl font-bold tabular-nums">{kpis.ott.ebitda_fy2025}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">EBITDA Margin</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{kpis.ott.ebitda_margin}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">YoY Growth</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">+{kpis.ott.yoy_rev_growth}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donut Chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Revenue Share by Carrier</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {donutData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Carrier Table */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Carrier Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Carrier</TableHead>
                    <TableHead className="text-xs text-right">Revenue</TableHead>
                    <TableHead className="text-xs text-right">Share %</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ottTopCarriers.map((c) => (
                    <TableRow key={c.name} data-testid={`carrier-row-${c.name}`}>
                      <TableCell className="text-xs font-medium">{c.name}</TableCell>
                      <TableCell className="text-xs text-right tabular-nums font-medium">{c.revenue}</TableCell>
                      <TableCell className="text-xs text-right tabular-nums">{c.pct_total}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px]">{c.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-accent/50">
              <h4 className="text-xs font-semibold mb-1">Jan '26 Monthly</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Revenue</span>
                  <p className="font-semibold tabular-nums">{kpis.ott.jan26_revenue}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">EBITDA</span>
                  <p className="font-semibold tabular-nums">{kpis.ott.jan26_ebitda}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gross Margin</span>
                  <p className="font-semibold tabular-nums">{kpis.ott.jan26_gross_margin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
