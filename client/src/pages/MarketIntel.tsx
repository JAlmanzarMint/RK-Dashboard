import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customerNews, industryEvents, upcomingHolidays } from "@/lib/data";
import { Globe, ChevronDown, ChevronUp, Calendar, AlertCircle } from "lucide-react";

function NewsCard({ news, index }: { news: typeof customerNews[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border border-border" data-testid={`news-card-${index}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold">{news.entity}</h4>
            </div>
            <p className="text-xs font-medium text-foreground leading-relaxed">{news.headline}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{news.developments}</p>

        {/* Financial snippet */}
        <div className="p-2 rounded-md bg-accent/50 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Financial Update</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{news.financial}</p>
        </div>

        {/* Expandable */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
          data-testid={`expand-news-${index}`}
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Show less" : "Logistics & Facility Details"}
        </button>

        {expanded && (
          <div className="mt-2 space-y-2 pt-2 border-t border-border">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Logistics & Supply Chain</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{news.logistics}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Facility Developments</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{news.facility}</p>
            </div>
            <p className="text-[10px] text-muted-foreground">Sources: {news.sources}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MarketIntel() {
  const [tab, setTab] = useState("news");

  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList data-testid="market-intel-tabs">
          <TabsTrigger value="news" data-testid="tab-news">Customer News ({customerNews.length})</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">Industry Events</TabsTrigger>
          <TabsTrigger value="holidays" data-testid="tab-holidays">Upcoming Holidays</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {customerNews.map((news, i) => (
              <NewsCard key={i} news={news} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Event</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Location</TableHead>
                      <TableHead className="text-xs">Relevance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {industryEvents.map((e, i) => (
                      <TableRow key={i} data-testid={`event-row-${i}`}>
                        <TableCell className="text-xs font-medium">{e.event}</TableCell>
                        <TableCell className="text-xs tabular-nums">{e.date}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{e.location}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{e.relevance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays" className="mt-4">
          <div className="space-y-3">
            {upcomingHolidays.map((h, i) => (
              <Card key={i} className="border border-border" data-testid={`holiday-${i}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{h.holiday}</h4>
                        <Badge variant="secondary" className="text-[10px]">{h.date}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{h.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
