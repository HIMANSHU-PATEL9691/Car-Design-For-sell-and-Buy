import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import carMercedes from "@/assets/car-mercedes.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carHyundai from "@/assets/car-hyundai.jpg";
import carHonda from "@/assets/car-honda.jpg";

const allCars = [
  {
    id: "1",
    image: carMercedes,
    name: "Mercedes-Benz C-Class 2023",
    price: 5500000,
    year: 2023,
    km: 12000,
    fuel: "Petrol",
    transmission: "Automatic",
    emi: 45000,
    brand: "Mercedes-Benz",
  },
  {
    id: "2",
    image: carBmw,
    name: "BMW 3 Series 320d Sport",
    price: 4800000,
    year: 2022,
    km: 25000,
    fuel: "Diesel",
    transmission: "Automatic",
    emi: 38000,
    brand: "BMW",
  },
  {
    id: "3",
    image: carAudi,
    name: "Audi A4 Premium Plus",
    price: 4200000,
    year: 2021,
    km: 35000,
    fuel: "Petrol",
    transmission: "Automatic",
    emi: 35000,
    brand: "Audi",
  },
  {
    id: "4",
    image: carToyota,
    name: "Toyota Fortuner Legender",
    price: 4500000,
    year: 2023,
    km: 8000,
    fuel: "Diesel",
    transmission: "Automatic",
    emi: 42000,
    brand: "Toyota",
  },
  {
    id: "5",
    image: carHyundai,
    name: "Hyundai Creta SX(O)",
    price: 1800000,
    year: 2023,
    km: 5000,
    fuel: "Petrol",
    transmission: "Automatic",
    emi: 18000,
    brand: "Hyundai",
  },
  {
    id: "6",
    image: carHonda,
    name: "Honda City ZX CVT",
    price: 1500000,
    year: 2022,
    km: 18000,
    fuel: "Petrol",
    transmission: "CVT",
    emi: 15000,
    brand: "Honda",
  },
  {
    id: "7",
    image: carBmw,
    name: "BMW X5 xDrive40i",
    price: 8500000,
    year: 2023,
    km: 5000,
    fuel: "Petrol",
    transmission: "Automatic",
    emi: 75000,
    brand: "BMW",
  },
  {
    id: "8",
    image: carMercedes,
    name: "Mercedes-Benz E-Class 2022",
    price: 7200000,
    year: 2022,
    km: 18000,
    fuel: "Diesel",
    transmission: "Automatic",
    emi: 62000,
    brand: "Mercedes-Benz",
  },
  {
    id: "9",
    image: carAudi,
    name: "Audi Q5 Sportback",
    price: 6800000,
    year: 2023,
    km: 3000,
    fuel: "Petrol",
    transmission: "Automatic",
    emi: 58000,
    brand: "Audi",
  },
];

const brands = ["All Brands", "BMW", "Mercedes-Benz", "Audi", "Toyota", "Hyundai", "Honda"];
const fuelTypes = ["All Fuel Types", "Petrol", "Diesel", "Electric", "Hybrid"];
const priceRanges = [
  { label: "All Budgets", min: 0, max: Infinity },
  { label: "Under ₹20 Lakh", min: 0, max: 2000000 },
  { label: "₹20-50 Lakh", min: 2000000, max: 5000000 },
  { label: "₹50-80 Lakh", min: 5000000, max: 8000000 },
  { label: "Above ₹80 Lakh", min: 8000000, max: Infinity },
];
const transmissions = ["All Transmissions", "Automatic", "Manual", "CVT"];

const BuyCar = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [fuel, setFuel] = useState("All Fuel Types");
  const [priceRange, setPriceRange] = useState("All Budgets");
  const [transmission, setTransmission] = useState("All Transmissions");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = allCars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brand === "All Brands" || car.brand === brand;
    const matchesFuel = fuel === "All Fuel Types" || car.fuel === fuel;
    const matchesTransmission = transmission === "All Transmissions" || car.transmission === transmission;
    const selectedPriceRange = priceRanges.find((p) => p.label === priceRange);
    const matchesPrice = selectedPriceRange
      ? car.price >= selectedPriceRange.min && car.price <= selectedPriceRange.max
      : true;

    return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
  });

  const clearFilters = () => {
    setSearch("");
    setBrand("All Brands");
    setFuel("All Fuel Types");
    setPriceRange("All Budgets");
    setTransmission("All Transmissions");
  };

  const hasActiveFilters =
    search || brand !== "All Brands" || fuel !== "All Fuel Types" || priceRange !== "All Budgets" || transmission !== "All Transmissions";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Find Your Perfect Car
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our collection of verified and inspected cars
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by car name, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Toggle for Mobile */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <p className="text-muted-foreground">
              {filteredCars.length} cars found
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="glass rounded-xl p-6 space-y-6 sticky top-24">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Brand</label>
                    <Select value={brand} onValueChange={setBrand}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Budget</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((p) => (
                          <SelectItem key={p.label} value={p.label}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Fuel Type</label>
                    <Select value={fuel} onValueChange={setFuel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Transmission</label>
                    <Select value={transmission} onValueChange={setTransmission}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Close Filters
                </Button>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredCars.length} cars found
                </p>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year">Year: Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} {...car} isVerified />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No cars found matching your criteria
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyCar;
