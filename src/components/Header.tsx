import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/packages", label: "Packages" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container-pad flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-display font-bold">
            B
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">BuildCraft</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-0.5">Interior Studio</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn("px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/80")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/quote">Request a Quote</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-pad py-4 flex flex-col gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("px-3 py-2.5 text-sm font-medium rounded-md",
                    isActive ? "bg-muted text-primary" : "text-foreground/80")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild size="sm" className="mt-2 sm:hidden">
              <Link to="/quote" onClick={() => setOpen(false)}>Request a Quote</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};
