import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const authLinks = [
    { href: "/ctf", label: "CTF" },
    { href: "/labs", label: "Labs" },
    { href: "/profile", label: "Profile" },
  ];

  const links = isAuthenticated ? authLinks : publicLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(142_76%_50%)]" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-display font-bold text-gradient">Zencrypt</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:text-primary h-10 px-4 py-2 text-foreground/80"
                >
                  Login
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="glow-green">Get Started</Button>
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                className="ml-4 text-foreground/80 hover:text-destructive px-4 py-2 transition-colors"
              >
                Logout
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-2 flex flex-col animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full justify-start ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="space-y-2 pt-4 border-t border-border/50 flex flex-col">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:text-primary h-10 px-4 py-2 w-full justify-start text-foreground/80"
                >
                  Login
                </Link>
                <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full glow-green">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
