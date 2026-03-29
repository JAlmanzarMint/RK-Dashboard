import { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Target, Briefcase, Users, Building2, Truck,
  DollarSign, Wallet, Globe, Cpu, Megaphone,
  Sun, Moon, ChevronDown, ChevronRight, Menu, X, Package,
  Compass, UserSearch, Shield, Calculator, Mail, Eye, ClipboardList, Route, Brain,
  GitBranch, FlaskConical, Lightbulb, LogOut
} from "lucide-react";
import { PerplexityAttribution } from "./PerplexityAttribution";
import { useAuth } from "./AuthProvider";

// Theme context
const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

const sections = [
  {
    label: "CORE",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/goals", label: "Goals", icon: Target },
      { path: "/business-development", label: "Business Development", icon: Briefcase },
      { path: "/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { path: "/facilities", label: "Facilities", icon: Building2 },
      { path: "/facility-pricing", label: "Facility Pricing", icon: Package },
      { path: "/bench-strength", label: "Bench Strength", icon: Shield },
      { path: "/ott-carriers", label: "OTT Carriers", icon: Truck },
      { path: "/ott-pricing", label: "OTT Pricing", icon: Calculator },
      { path: "/routing-optimization", label: "Route Optimizer", icon: Route },
      { path: "/facility-utilization", label: "Utilization AI", icon: Eye },
      { path: "/facility-profile", label: "Facility Profile", icon: ClipboardList },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { path: "/financials", label: "Financials", icon: DollarSign },
      { path: "/liquidity", label: "Liquidity", icon: Wallet },
    ],
  },
  {
    label: "PEOPLE",
    items: [
      { path: "/email-pulse", label: "Email Pulse", icon: Mail },
      { path: "/recruiting", label: "Recruiting", icon: UserSearch },
    ],
  },
  {
    label: "STRATEGY",
    items: [
      { path: "/market-intel", label: "Market Intel", icon: Globe },
      { path: "/technology", label: "Technology", icon: Cpu },
      { path: "/marketing", label: "Marketing", icon: Megaphone },
      { path: "/strategy", label: "Strategy Hub", icon: Compass },
      { path: "/strategy-simulation", label: "Strategy Simulation", icon: Brain },
      { path: "/pipeline", label: "Pipeline", icon: GitBranch },
      { path: "/roadmap-testing", label: "Roadmap Testing", icon: FlaskConical },
      { path: "/ideas", label: "Idea Pipeline", icon: Lightbulb },
    ],
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggle = () => setDark((d) => !d);
  const toggleSection = (label: string) => {
    setCollapsedSections((s) => ({ ...s, [label]: !s[label] }));
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static z-50 h-full
            ${sidebarOpen ? "w-64" : "w-16"}
            ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            bg-sidebar border-r border-sidebar-border
            transition-all duration-200 ease-out
            flex flex-col
          `}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border shrink-0">
            {sidebarOpen ? (
              <div className="min-w-0 flex items-center gap-2">
                <img src="/rk-logo-black.png" alt="RK Logistics" className="h-7 brightness-0 invert" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#71A446] flex items-center justify-center shrink-0 mx-auto">
                <span className="text-white text-xs font-extrabold">RK</span>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto no-scrollbar py-2 px-2">
            {sections.map((section) => (
              <div key={section.label} className="mb-1">
                {sidebarOpen && (
                  <button
                    onClick={() => toggleSection(section.label)}
                    className="flex items-center gap-1 px-2 py-1.5 w-full text-[10px] font-semibold tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors"
                    data-testid={`section-toggle-${section.label.toLowerCase()}`}
                  >
                    {collapsedSections[section.label] ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {section.label}
                  </button>
                )}
                {!collapsedSections[section.label] &&
                  section.items.map((item) => {
                    const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} href={item.path}>
                        <div
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors
                            ${isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                            }
                            ${!sidebarOpen ? "justify-center px-0" : ""}
                          `}
                          data-testid={`nav-${item.path.replace(/\//g, "") || "dashboard"}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {sidebarOpen && <span className="truncate">{item.label}</span>}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ))}
          </nav>

          {/* Sidebar footer */}
          {sidebarOpen && (
            <div className="px-4 py-3 border-t border-sidebar-border text-[10px] text-sidebar-foreground/50">
              <div className="font-medium">Logistics for Innovation</div>
              <div>Fremont, CA</div>
            </div>
          )}
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-1.5 rounded-md hover:bg-accent"
                data-testid="mobile-menu-toggle"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-1.5 rounded-md hover:bg-accent"
                data-testid="sidebar-toggle"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-sm font-semibold">
                  {sections.flatMap((s) => s.items).find((i) => i.path === location)?.label || "Dashboard"}
                </h1>
                <p className="text-[11px] text-muted-foreground">Monday, March 16, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                data-testid="theme-toggle"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              {user && (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs font-medium leading-none">{user.username}</span>
                    <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{user.role}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary uppercase">
                    {user.username.slice(0, 2)}
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6 max-w-[1440px]">
              {children}
            </div>
            <PerplexityAttribution />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
