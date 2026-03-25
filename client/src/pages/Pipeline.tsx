import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pipeline } from "@/lib/data";
import { GitBranch, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const STAGE_COLORS = [
  "hsl(174, 72%, 33%)",
  "hsl(174, 72%, 45%)",
  "hsl(174, 72%, 55%)",
  "hsl(174, 72%, 65%)",
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Won": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "CLOSED WON": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "In Progress": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "Early Stage": return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    case "Contracting": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "SOW Development": return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

export default function Pipeline() {
  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="pipeline-kpis">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Pipeline</p>
            <p className="text-xl font-bold tabular-nums">{pipeline.total_value}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <p className="text-xl font-bold tabular-nums">{pipeline.conversion_rate}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Strategic Total</p>
            <p className="text-xl font-bold tabular-nums">{pipeline.strategic_total}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Big 9 Opportunities</p>
            <p className="text-xl font-bold tabular-nums">9</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Pipeline by Stage</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipeline.stages} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit="M" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                  formatter={(value: number) => [`$${value}M`, "Value"]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {pipeline.stages.map((_, idx) => (
                    <Cell key={idx} fill={STAGE_COLORS[idx]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Big 9 Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Big 9 Accounts</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Account</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                  <TableHead className="text-xs text-right">Est Revenue</TableHead>
                  <TableHead className="text-xs">Next Steps</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pipeline.big9_opportunities.map((opp, i) => (
                  <TableRow key={i} data-testid={`big9-row-${i}`}>
                    <TableCell className="text-xs font-medium">{opp.account}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{opp.location}</TableCell>
                    <TableCell className="text-xs max-w-[200px]">{opp.description}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums font-medium">{opp.est_rev}</TableCell>
                    <TableCell className="text-xs max-w-[180px] text-muted-foreground">{opp.next_steps}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] whitespace-nowrap ${getStatusBadge(opp.status)}`}>{opp.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* High Probability Near-Term */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">High Probability Near-Term Deals</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company</TableHead>
                  <TableHead className="text-xs">Site</TableHead>
                  <TableHead className="text-xs text-right">SqFt</TableHead>
                  <TableHead className="text-xs text-right">Annual Rev</TableHead>
                  <TableHead className="text-xs">Close</TableHead>
                  <TableHead className="text-xs">Start</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pipeline.high_prob_near_term.map((deal, i) => (
                  <TableRow key={i} data-testid={`near-term-row-${i}`}>
                    <TableCell className="text-xs font-medium">{deal.company}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{deal.site}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{deal.sqft}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums font-medium">{deal.annual_rev}</TableCell>
                    <TableCell className="text-xs">{deal.close}</TableCell>
                    <TableCell className="text-xs">{deal.start}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] whitespace-nowrap ${getStatusBadge(deal.status)}`}>{deal.status}</Badge>
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
