import { useState } from "react";
import { ArrowRight, Upload, Car, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const brands = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Toyota",
  "Hyundai",
  "Honda",
  "Tata",
  "Mahindra",
  "Other",
];

const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString());
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];

const SellCar = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    variant: "",
    fuel: "",
    km: "",
    expectedPrice: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 10));
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.fuel ||
      !formData.km ||
      !formData.expectedPrice ||
      !formData.name ||
      !formData.phone
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      images.forEach((img) => data.append("images", img));

      const res = await fetch("http://localhost:5000/api/sell-cars", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Submit failed");

      alert("Your car details have been sent to admin!");

      setFormData({
        brand: "",
        model: "",
        year: "",
        variant: "",
        fuel: "",
        km: "",
        expectedPrice: "",
        description: "",
        name: "",
        phone: "",
        email: "",
        city: "",
      });
      setImages([]);
      setCurrentStep(0);
    } catch {
      alert("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-12 bg-gradient-hero text-center">
        <h1 className="text-4xl font-bold">Sell Your Car</h1>
        <p className="text-muted-foreground mt-2">
          Submit your car details & admin will contact you
        </p>
      </section>

      {/* FORM */}
      <section className="py-12">
        <div className="container mx-auto max-w-2xl glass p-8 rounded-xl">

          {/* STEP 1 */}
          {currentStep === 0 && (
            <>
              <Label>Brand *</Label>
              <Select
                value={formData.brand}
                onValueChange={(v) => handleInputChange("brand", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="mt-3"
                placeholder="Model"
                value={formData.model}
                onChange={(e) =>
                  handleInputChange("model", e.target.value)
                }
              />

              <Select
                value={formData.year}
                onValueChange={(v) => handleInputChange("year", v)}
              >
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.fuel}
                onValueChange={(v) => handleInputChange("fuel", v)}
              >
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder="Fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="mt-3"
                placeholder="KM Driven"
                value={formData.km}
                onChange={(e) =>
                  handleInputChange("km", e.target.value)
                }
              />

              {/* ✅ EXPECTED PRICE (FIX) */}
              <Input
                className="mt-3"
                type="number"
                placeholder="Expected Price (₹)"
                value={formData.expectedPrice}
                onChange={(e) =>
                  handleInputChange("expectedPrice", e.target.value)
                }
              />
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 1 && (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </>
          )}

          {/* STEP 3 */}
          {currentStep === 2 && (
            <>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
              />

              <Input
                className="mt-3"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  handleInputChange("phone", e.target.value)
                }
              />
            </>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </Button>
            )}

            {currentStep < 2 ? (
              <Button onClick={() => setCurrentStep((s) => s + 1)}>
                Continue <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellCar;
