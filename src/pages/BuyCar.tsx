import { useState, useEffect } from "react";
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

const brands = ["All Brands", "BMW", "Mercedes-Benz", "Audi", "Toyota", "Hyundai", "Honda","nano"];
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
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [fuel, setFuel] = useState("All Fuel Types");
  const [priceRange, setPriceRange] = useState("All Budgets");
  const [transmission, setTransmission] = useState("All Transmissions");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(res => res.json())
      .then(data => {
        setAllCars(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  const filteredCars = allCars.filter((car: any) => {
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
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold mb-6">Find Your Perfect Car</h1>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 bg-card"
              />
            </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="glass rounded-xl p-6 space-y-6 sticky top-24">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Filters</h3>
                  {hasActiveFilters && <button onClick={clearFilters} className="text-sm text-primary">Clear all</button>}
                </div>
                <div className="space-y-4">
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger><SelectValue placeholder="Brand" /></SelectTrigger>
                    <SelectContent>{brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger><SelectValue placeholder="Budget" /></SelectTrigger>
                    <SelectContent>{priceRanges.map(p => <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {loading ? (
                <p className="text-center py-10">Loading cars...</p>
              ) : filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car: any) => (
                    <CarCard key={car._id} id={car._id} {...car} isVerified />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No cars found</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
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