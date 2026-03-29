import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Target, Briefcase, Users, Building2, Truck,
  DollarSign, Wallet, Globe, Cpu, Megaphone,
  Sun, Moon, ChevronDown, ChevronRight, Menu, X, Package,
  Compass, UserSearch, Shield, Calculator, Mail, Eye, ClipboardList, Route, Brain,
  GitBranch, FlaskConical, Lightbulb, LogOut, KeyRound, Loader2
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (newPw !== confirmPw) { setPwError("Passwords do not match"); return; }
    if (newPw.length < 8) { setPwError("Password must be at least 8 characters"); return; }
    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwSuccess(true);
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        setTimeout(() => { setChangePwOpen(false); setPwSuccess(false); }, 1500);
      } else {
        setPwError(data.message || "Failed to change password");
      }
    } catch {
      setPwError("Network error");
    }
    setPwLoading(false);
  };

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
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors cursor-pointer select-none"
                  >
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs font-medium leading-none">{user.username}</span>
                      <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{user.role}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary uppercase">
                      {user.username.slice(0, 2)}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs font-medium truncate">{user.username}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setUserMenuOpen(false); setChangePwOpen(true); setPwError(null); setPwSuccess(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        Change Password
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); logout(); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-accent transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
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
      {changePwOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={() => setChangePwOpen(false)}>
          <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            {pwSuccess ? (
              <div className="text-sm text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-3 rounded-lg text-center">
                Password changed successfully.
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-3">
                {pwError && (
                  <div className="text-sm text-red-600 bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">{pwError}</div>
                )}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Current Password</label>
                  <input
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">New Password</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">At least 8 characters with uppercase, lowercase, and a number</p>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setChangePwOpen(false)}
                    className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pwLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    {pwLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}
