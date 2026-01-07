import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/CarCard";
import carMercedes from "@/assets/car-mercedes.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carHyundai from "@/assets/car-hyundai.jpg";
import carHonda from "@/assets/car-honda.jpg";

const featuredCars = [
  { id: "1", image: carMercedes, name: "Mercedes-Benz C-Class 2023", price: 5500000, year: 2023, km: 12000, fuel: "Petrol", transmission: "Automatic", emi: 45000, isVerified: true },
  { id: "2", image: carBmw, name: "BMW 3 Series 320d Sport", price: 4800000, year: 2022, km: 25000, fuel: "Diesel", transmission: "Automatic", emi: 38000, isVerified: true },
  { id: "3", image: carAudi, name: "Audi A4 Premium Plus", price: 4200000, year: 2021, km: 35000, fuel: "Petrol", transmission: "Automatic", emi: 35000, isVerified: true },
  { id: "4", image: carToyota, name: "Toyota Fortuner Legender", price: 4500000, year: 2023, km: 8000, fuel: "Diesel", transmission: "Automatic", emi: 42000, isVerified: true },
  { id: "5", image: carHyundai, name: "Hyundai Creta SX(O)", price: 1800000, year: 2023, km: 5000, fuel: "Petrol", transmission: "Automatic", emi: 18000, isVerified: true },
  { id: "6", image: carHonda, name: "Honda City ZX CVT", price: 1500000, year: 2022, km: 18000, fuel: "Petrol", transmission: "CVT", emi: 15000, isVerified: true },
];

export const FeaturedCars = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-display font-bold">The Curated Gallery</h2>
          <p className="text-muted-foreground text-lg">Handpicked masterpieces, verified for perfection.</p>
        </div>
        <Button variant="ghost" className="group text-primary hover:bg-primary/5" asChild>
          <Link to="/buy">View Full Inventory <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCars.map((car) => <CarCard key={car.id} {...car} />)}
      </div>
    </div>
  </section>
);