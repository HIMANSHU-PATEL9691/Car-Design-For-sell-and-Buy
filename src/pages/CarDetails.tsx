import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Calendar,
  Fuel,
  Gauge,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Calculator,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import carMercedes from "@/assets/car-mercedes.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carAudi from "@/assets/car-audi.jpg";

const carData = {
  "1": {
    name: "Mercedes-Benz C-Class 2023",
    price: 5500000,
    images: [carMercedes, carBmw, carAudi],
    year: 2023,
    km: 12000,
    fuel: "Petrol",
    transmission: "Automatic",
    owners: "1st Owner",
    color: "Obsidian Black",
    registration: "MH02",
    insurance: "Comprehensive",
    location: "Mumbai, Maharashtra",
    specs: {
      engine: "1991 cc",
      power: "204 bhp",
      torque: "300 Nm",
      mileage: "14.1 kmpl",
      seats: "5",
      airbags: "7",
    },
    features: [
      "Sunroof",
      "Leather Seats",
      "360° Camera",
      "Cruise Control",
      "Wireless Charging",
      "Premium Sound System",
      "Ventilated Seats",
      "ADAS",
    ],
    description:
      "This Mercedes-Benz C-Class is in excellent condition with complete service history from authorized dealership. Single owner with no accident history. All features working perfectly.",
  },
};

const CarDetails = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [loanAmount, setLoanAmount] = useState(4000000);
  const [tenure, setTenure] = useState(60);
  const [interestRate] = useState(9.5);

  const car = carData[id as keyof typeof carData] || carData["1"];

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/buy"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card">
                <img
                  src={car.images[currentImage]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="verified">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {car.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {car.location}
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  {formatPrice(car.price)}
                </span>
                <span className="text-lg text-muted-foreground">
                  EMI from ₹{calculateEMI().toLocaleString()}/mo
                </span>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <Calendar className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">{car.year}</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <Gauge className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">KM Driven</p>
                  <p className="font-semibold text-foreground">{car.km.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <Fuel className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold text-foreground">{car.fuel}</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="font-semibold text-foreground">{car.owners}</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(142,70%,45%)]/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[hsl(142,70%,45%)]" />
                  <span className="text-sm text-foreground">Verified Seller</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(142,70%,45%)]/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[hsl(142,70%,45%)]" />
                  <span className="text-sm text-foreground">RC Verified</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(142,70%,45%)]/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[hsl(142,70%,45%)]" />
                  <span className="text-sm text-foreground">No Accidents</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button variant="hero" size="lg" className="flex-1" asChild>
                  <a href="tel:+919876543210">
                    <Phone className="w-5 h-5" />
                    Call Seller
                  </a>
                </Button>
                <Button variant="whatsapp" size="lg" className="flex-1" asChild>
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in ${car.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <div key={key} className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground capitalize">{key}</p>
                      <p className="font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {car.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {car.description}
                </p>
              </div>
            </div>

            {/* EMI Calculator */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Calculator className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">
                    EMI Calculator
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Loan Amount</Label>
                      <span className="text-sm text-foreground">
                        ₹{(loanAmount / 100000).toFixed(1)} Lakh
                      </span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={([value]) => setLoanAmount(value)}
                      min={100000}
                      max={car.price}
                      step={50000}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Tenure (Months)</Label>
                      <span className="text-sm text-foreground">{tenure} months</span>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={([value]) => setTenure(value)}
                      min={12}
                      max={84}
                      step={6}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Interest Rate</Label>
                    <Input value={`${interestRate}%`} disabled />
                  </div>

                  <div className="p-4 bg-gradient-primary rounded-lg text-center">
                    <p className="text-sm text-primary-foreground/80">
                      Estimated EMI
                    </p>
                    <p className="text-3xl font-bold text-primary-foreground">
                      ₹{calculateEMI().toLocaleString()}
                      <span className="text-base font-normal">/month</span>
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Get Loan Approval
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarDetails;
