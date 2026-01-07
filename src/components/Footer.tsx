import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">
                Auto<span className="text-gradient-primary">Hub</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for buying and selling cars. Over 10,000+ satisfied customers and counting.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {["Buy Car", "Sell Car", "Compare Cars", "Car Valuation", "Book Test Drive"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Popular Brands</h4>
            <ul className="space-y-3">
              {["BMW", "Mercedes-Benz", "Audi", "Toyota", "Honda", "Hyundai"].map((brand) => (
                <li key={brand}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Silicon City , Indore, Madhya Pradesh 452012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919691365052" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  +91 9691365052
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:patelhimanhu6006@gmail.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  patelhimanhu6006@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 AutoHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
