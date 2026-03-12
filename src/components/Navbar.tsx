import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Settings, Compass, Home, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") || !localStorage.getItem("theme");
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navLinks = user
    ? [
        { to: "/", label: "Home", icon: Home },
        { to: "/analyzer", label: "Analyzer", icon: Compass },
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/settings", label: "Settings", icon: Settings },
      ]
    : [
        { to: "/", label: "Home", icon: Home },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto max-w-7xl px-4 py-4">
        <div className="glass-card flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="SkillGap AI Logo" className="w-9 h-9 object-contain rounded-full" />
            <span className="text-xl font-bold tracking-tighter text-foreground">
              SkillGap AI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-200",
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {"icon" in link && link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile hamburger & Theme */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden glass-card mt-2 p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {"icon" in link && link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
