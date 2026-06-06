import { type ReactNode } from "react";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  Users,
  Settings as SettingsIcon,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export type AdminSection =
  | "dashboard"
  | "fleet"
  | "bookings"
  | "calendar"
  | "customers"
  | "settings";

type NavItem = {
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
};

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "fleet", label: "Flotta", icon: Car },
  { id: "bookings", label: "Prenotazioni", icon: FileText },
  { id: "calendar", label: "Calendario", icon: CalendarDays },
  { id: "customers", label: "Clienti", icon: Users },
  { id: "settings", label: "Impostazioni", icon: SettingsIcon },
];

type Props = {
  active: AdminSection;
  onSelect: (section: AdminSection) => void;
  userEmail?: string;
  children: ReactNode;
};

const AdminLayout = ({ active, onSelect, userEmail, children }: Props) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <p className="font-display text-lg font-bold">GDIS Admin</p>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Esci
          </Button>
          <a
            href="/"
            className="block text-xs text-muted-foreground hover:text-foreground text-center"
          >
            Vai al sito
          </a>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-x-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
