"use client";

import { useState } from "react";
import { Home, Users, FileText, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Tenants", href: "/tenants" },
  { icon: FileText, label: "Leases", href: "/leases" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      <aside
        className={cn(
          "bg-white border-r flex flex-col transition-all duration-300",
          isMobileMenuOpen ? "fixed inset-y-0 left-0 w-64 z-40" : "hidden",
          "md:flex md:w-64 md:flex-shrink-0 md:flex-col md:static",
          className
        )}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-bold text-blue-600">PropManage</span>
        </div>
        <nav className="flex-grow">
          <ul className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
