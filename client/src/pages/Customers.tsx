import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customerRanking, ottCustomerRanking } from "@/lib/data";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortKey = "name" | "total_revenue" | "profit" | "margin" | "target_margin" | "tier";
type SortDir = "asc" | "desc";

function formatCurrency(val: number) {
  if (Math.abs(val) >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  if (Math.abs(val) >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

function CustomerTable({ data }: { data: typeof customerRanking }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("total_revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 ml-1" /> : <ArrowDown className="w-3 h-3 ml-1" />;
  };

  const filtered = useMemo(() => {
    let items = [...data];
    if (search) {
      items = items.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    items.sort((a, b) => {
      let av: any = a[sortKey];
      let bv: any = b[sortKey];
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = (bv as string).toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return items;
  }, [data, search, sortKey, sortDir]);

  const getMarginColor = (m: number) => {
    if (m > 0.1) return "text-emerald-600 dark:text-emerald-400";
    if (m > 0) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1": return "bg-primary/10 text-primary border-primary/20";
      case "Tier 2": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Tier 3": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
          data-testid="customer-search"
        />
      </div>
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs">#</TableHead>
              <TableHead className="text-xs cursor-pointer select-none" onClick={() => toggleSort("name")} data-testid="sort-name">
                <span className="flex items-center">Customer <SortIcon col="name" /></span>
              </TableHead>
              <TableHead className="text-xs text-right cursor-pointer select-none" onClick={() => toggleSort("total_revenue")} data-testid="sort-revenue">
                <span className="flex items-center justify-end">Revenue <SortIcon col="total_revenue" /></span>
              </TableHead>
              <TableHead className="text-xs text-right cursor-pointer select-none" onClick={() => toggleSort("profit")} data-testid="sort-profit">
                <span className="flex items-center justify-end">Profit <SortIcon col="profit" /></span>
              </TableHead>
              <TableHead className="text-xs text-right cursor-pointer select-none" onClick={() => toggleSort("margin")} data-testid="sort-margin">
                <span className="flex items-center justify-end">Margin % <SortIcon col="margin" /></span>
              </TableHead>
              <TableHead className="text-xs text-right">Target</TableHead>
              <TableHead className="text-xs text-right">Variance</TableHead>
              <TableHead className="text-xs cursor-pointer select-none" onClick={() => toggleSort("tier")} data-testid="sort-tier">
                <span className="flex items-center">Tier <SortIcon col="tier" /></span>
              </TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c, i) => {
              const variance = c.margin - c.target_margin;
              return (
                <TableRow key={c.name} data-testid={`customer-row-${i}`}>
                  <TableCell className="text-xs tabular-nums font-medium">{i + 1}</TableCell>
                  <TableCell className="text-xs font-medium">{c.name}</TableCell>
                  <TableCell className="text-xs text-right tabular-nums font-medium">{formatCurrency(c.total_revenue)}</TableCell>
                  <TableCell className={`text-xs text-right tabular-nums font-medium ${c.profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {formatCurrency(c.profit)}
                  </TableCell>
                  <TableCell className={`text-xs text-right tabular-nums font-semibold ${getMarginColor(c.margin)}`}>
                    {(c.margin * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums text-muted-foreground">
                    {(c.target_margin * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell className={`text-xs text-right tabular-nums font-medium ${variance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {variance >= 0 ? "+" : ""}{(variance * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${getTierColor(c.tier)}`}>{c.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.margin >= c.target_margin ? "default" : "destructive"} className="text-[10px]">
                      {c.margin >= c.target_margin ? "On Target" : "Below Target"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function Customers() {
  const [tab, setTab] = useState("rk");
  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList data-testid="customers-tabs">
          <TabsTrigger value="rk" data-testid="tab-rk">RK Logistics</TabsTrigger>
          <TabsTrigger value="ott" data-testid="tab-ott">OnTime Trucking</TabsTrigger>
        </TabsList>
        <TabsContent value="rk" className="mt-4">
          <CustomerTable data={customerRanking} />
        </TabsContent>
        <TabsContent value="ott" className="mt-4">
          <CustomerTable data={ottCustomerRanking} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
