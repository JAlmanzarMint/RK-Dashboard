import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { liquidity } from "@/lib/data";
import { Wallet, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

export default function Liquidity() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="liquidity-kpis">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Cash Position (Net ABL)</p>
            <p className="text-xl font-bold tabular-nums text-red-600 dark:text-red-400">{liquidity.cash_position_net_abl}</p>
            <Badge variant="destructive" className="text-[10px] mt-1">Negative</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Accounts Receivable</p>
            <p className="text-xl font-bold tabular-nums">{liquidity.ar}</p>
            <Badge variant="secondary" className="text-[10px] mt-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">{liquidity.ar_current_pct} current</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Accounts Payable</p>
            <p className="text-xl font-bold tabular-nums">{liquidity.ap}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Net Working Capital</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{liquidity.net_working_capital}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ABL Details */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Asset-Based Lending (ABL)</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Balance</p>
                <p className="text-lg font-bold tabular-nums">{liquidity.abl_balance}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{liquidity.abl_availability}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Limit</p>
                <p className="text-lg font-bold tabular-nums">{liquidity.abl_limit}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Utilization</p>
                <p className="text-lg font-bold tabular-nums">{liquidity.abl_utilization}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">ABL Utilization</span>
                <span className="text-xs font-semibold tabular-nums">{liquidity.abl_utilization}</span>
              </div>
              <Progress value={33.6} className="h-2.5" />
              <p className="text-[10px] text-muted-foreground mt-1">{liquidity.abl_availability} remaining availability</p>
            </div>
          </CardContent>
        </Card>

        {/* Debt & Valuation */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Debt & Valuation</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Debt</p>
                <p className="text-lg font-bold tabular-nums">{liquidity.total_debt}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">TTM Adj. EBITDA</p>
                <p className="text-lg font-bold tabular-nums">{liquidity.ttm_adj_ebitda}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold">Enterprise Valuation</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">{liquidity.net_enterprise_value}</span>
                <span className="text-xs text-muted-foreground">({liquidity.ttm_adj_ebitda} × {liquidity.valuation_multiple})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AR Quality */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <CardTitle className="text-sm font-semibold">AR Quality</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total AR</p>
              <p className="text-lg font-bold tabular-nums">{liquidity.ar}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{liquidity.ar_current_pct}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Past Due 1-30</p>
              <p className="text-lg font-bold tabular-nums">{liquidity.ar_past_due_11}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Past Due 30+</p>
              <p className="text-lg font-bold tabular-nums">{liquidity.ar_past_due_30}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">AR Health</span>
              <span className="text-xs font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{liquidity.ar_current_pct} Current</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden bg-muted flex">
              <div className="bg-emerald-500 h-full" style={{ width: "99.8%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "0.15%" }} />
              <div className="bg-red-500 h-full" style={{ width: "0.05%" }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
