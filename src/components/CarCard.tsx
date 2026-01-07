import { Phone, MessageCircle, Fuel, Calendar, Gauge, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  emi?: number;
  isVerified?: boolean;
}

const CarCard = ({
  id,
  image,
  name,
  price,
  year,
  km,
  fuel,
  transmission,
  emi,
  isVerified = true,
}: CarCardProps) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatKm = (km: number) => {
    if (km >= 1000) {
      return `${(km / 1000).toFixed(0)}K km`;
    }
    return `${km} km`;
  };

  return (
    <div className="group bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elevated">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isVerified && (
          <Badge variant="verified" className="absolute top-3 left-3">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Link to={`/car/${id}`}>
            <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{formatPrice(price)}</span>
            {emi && (
              <span className="text-sm text-muted-foreground">
                EMI from ₹{emi.toLocaleString()}/mo
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md">
            <Calendar className="w-3.5 h-3.5" />
            {year}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md">
            <Gauge className="w-3.5 h-3.5" />
            {formatKm(km)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md">
            <Fuel className="w-3.5 h-3.5" />
            {fuel}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md">
            {transmission}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="tel:+919691365052">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </a>
          </Button>
          <Button variant="whatsapp" size="sm" className="flex-1" asChild>
            <a
              href={`https://wa.me/919691365052?text=${encodeURIComponent(`Hi, I'm interested in ${name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
