import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { technologyInitiatives } from "@/lib/data";
import { Cpu, Server, BrainCircuit, Shield } from "lucide-react";

const categoryIcons: Record<string, any> = {
  "WMS & Automation": Server,
  "AI & Analytics": BrainCircuit,
  "IT Infrastructure": Shield,
};

function getStatusColor(status: string) {
  switch (status) {
    case "Active": case "Completed": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "In Progress": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "Planning": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

function getPriorityColor(p: string) {
  switch (p) {
    case "High": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "Medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Low": return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    default: return "";
  }
}

export default function Technology() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Active Initiatives</p>
            <p className="text-xl font-bold tabular-nums">9</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">2</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="text-xl font-bold tabular-nums text-blue-600 dark:text-blue-400">5</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Planning</p>
            <p className="text-xl font-bold tabular-nums text-amber-600 dark:text-amber-400">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Sections */}
      {technologyInitiatives.map((cat) => {
        const Icon = categoryIcons[cat.category] || Cpu;
        return (
          <Card key={cat.category} className="border border-border" data-testid={`tech-category-${cat.category}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-semibold">{cat.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {cat.items.map((item) => (
                <div key={item.name} className="p-3 rounded-lg border border-border" data-testid={`tech-item-${item.name}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <div className="flex gap-1 shrink-0 ml-2">
                      <Badge variant="outline" className={`text-[10px] ${getStatusColor(item.status)}`}>{item.status}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${getPriorityColor(item.priority)}`}>{item.priority}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="h-1.5 flex-1" />
                    <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
