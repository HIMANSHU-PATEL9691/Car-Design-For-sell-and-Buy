import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X, Phone, Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// 1. Import the ThemeToggle component
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/buy", label: "Buy Car" },
    { href: "/sell", label: "Sell Car" },
    { href: "/emi-calculator", label: "EMI Calculator" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Auto<span className="text-gradient-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons, Contact & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* 2. Added ThemeToggle here for desktop */}
            <ThemeToggle />
            
            <a
              href="tel:+919691365052"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mr-2"
            >
              <Phone className="w-4 h-4" />
              +91 9691365052
            </a>
            <Button variant="hero" asChild>
              <Link to="/sell">Sell Your Car</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* 3. Added ThemeToggle next to mobile menu button */}
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium transition-colors flex items-center gap-2 ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label === "EMI Calculator" && <Calculator className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border space-y-4">
                <a
                  href="tel:+919691365052"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Phone className="w-5 h-5" />
                  +91 9691365052
                </a>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/sell" onClick={() => setIsOpen(false)}>
                    Sell Your Car
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;