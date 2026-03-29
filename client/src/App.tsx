import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Goals from "@/pages/Goals";
import BusinessDevelopment from "@/pages/BusinessDevelopment";
import Customers from "@/pages/Customers";
import Facilities from "@/pages/Facilities";
import OTTCarriers from "@/pages/OTTCarriers";
import Financials from "@/pages/Financials";
import Liquidity from "@/pages/Liquidity";
import MarketIntel from "@/pages/MarketIntel";
import Technology from "@/pages/Technology";
import Marketing from "@/pages/Marketing";
import StrategyHub from "@/pages/StrategyHub";
import Recruiting from "@/pages/Recruiting";
import BenchStrength from "@/pages/BenchStrength";
import FacilityPricing from "@/pages/FacilityPricing";
import OTTQuoteCalculator from "@/pages/OTTQuoteCalculator";
import EmailPulse from "@/pages/EmailPulse";
import FacilityUtilization from "@/pages/FacilityUtilization";
import FacilityProfile from "@/pages/FacilityProfile";
import RoutingOptimization from "@/pages/RoutingOptimization";
import StrategySimulation from "@/pages/StrategySimulation";
import Pipeline from "@/pages/Pipeline";
import RoadmapAudienceTesting from "@/pages/RoadmapAudienceTesting";
import IdeasDashboard from "@/pages/IdeasDashboard";
import { Loader2 } from "lucide-react";

function AppRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/goals" component={Goals} />
        <Route path="/business-development" component={BusinessDevelopment} />
        <Route path="/customers" component={Customers} />
        <Route path="/facilities" component={Facilities} />
        <Route path="/bench-strength" component={BenchStrength} />
        <Route path="/ott-carriers" component={OTTCarriers} />
        <Route path="/financials" component={Financials} />
        <Route path="/liquidity" component={Liquidity} />
        <Route path="/market-intel" component={MarketIntel} />
        <Route path="/technology" component={Technology} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/strategy" component={StrategyHub} />
        <Route path="/recruiting" component={Recruiting} />
        <Route path="/facility-pricing" component={FacilityPricing} />
        <Route path="/ott-pricing" component={OTTQuoteCalculator} />
        <Route path="/email-pulse" component={EmailPulse} />
        <Route path="/facility-utilization" component={FacilityUtilization} />
        <Route path="/facility-profile" component={FacilityProfile} />
        <Route path="/routing-optimization" component={RoutingOptimization} />
        <Route path="/strategy-simulation" component={StrategySimulation} />
        <Route path="/pipeline" component={Pipeline} />
        <Route path="/roadmap-testing" component={RoadmapAudienceTesting} />
        <Route path="/ideas" component={IdeasDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router hook={useHashLocation}>
      <AppRouter />
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <AuthGate />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
