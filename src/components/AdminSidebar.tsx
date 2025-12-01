import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  FlaskConical, 
  Settings, 
  LogOut,
  Code2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Challenges", href: "/admin/challenges", icon: Flag },
  { title: "Labs", href: "/admin/labs", icon: FlaskConical },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-border/50 bg-card/50 backdrop-blur-lg transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
          <Link to="/admin" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            {!collapsed && <span className="text-xl font-display font-bold text-gradient">Zencrypt</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border/50 p-2">
          <Link
            to="/"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Exit Admin</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
