import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, Users, BarChart2, Calendar, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { label: "Matches", icon: Calendar, href: "/" },
    { label: "Teams", icon: Users, href: "/teams" },
    { label: "Predictions", icon: BarChart2, href: "/predictions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-display font-bold">IPL</div>
          <span className="font-display font-bold text-xl text-slate-900">PREDICTOR</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                    location === item.href 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/40 backdrop-blur-xl border-r border-purple-100 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-purple-200">IPL</div>
          <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">PREDICTOR</span>
        </div>
        
        <nav className="flex flex-col gap-2 px-4 mt-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium cursor-pointer group",
                location === item.href 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200" 
                  : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
              )}>
                <item.icon className={cn("w-5 h-5", location === item.href ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
            <h3 className="font-display font-bold text-lg mb-1">IPL 2026</h3>
            <p className="text-white/80 text-sm mb-3">Live updates & AI predictions</p>
            <div className="text-xs bg-white/20 inline-block px-2 py-1 rounded">v2.0.0</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
