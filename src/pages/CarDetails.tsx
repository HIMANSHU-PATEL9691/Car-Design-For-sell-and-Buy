import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Calendar, Fuel, Gauge, Shield, CheckCircle, ChevronLeft, ChevronRight, Calculator, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loanAmount, setLoanAmount] = useState(1000000);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoanAmount(data.price * 0.8);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <div className="text-center pt-40">Loading details...</div>;
  if (!car) return <div className="text-center pt-40">Car not found.</div>;

  const formatPrice = (price: number) => {
    return price >= 100000 ? `₹${(price / 100000).toFixed(2)} Lakh` : `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/buy" className="inline-flex items-center gap-2 mb-6 text-muted-foreground"><ArrowLeft size={16}/> Back</Link>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{car.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{formatPrice(car.price)}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-card border rounded-lg text-center">
                  <Calendar className="mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="font-semibold">{car.year}</p>
                </div>
                <div className="p-4 bg-card border rounded-lg text-center">
                  <Gauge className="mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">KM</p>
                  <p className="font-semibold">{car.km.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1" asChild><a href={`tel:+919691365052`}><Phone className="mr-2" size={18}/> Call Seller</a></Button>
                <Button variant="whatsapp" className="flex-1" asChild>
                    <a href={`https://wa.me/919691365052?text=Hi, I'm interested in ${car.name}`} target="_blank"><MessageCircle className="mr-2" size={18}/> WhatsApp</a>
                </Button>
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