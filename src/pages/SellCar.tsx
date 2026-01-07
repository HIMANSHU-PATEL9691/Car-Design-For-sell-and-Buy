import { useState } from "react";
import { ArrowRight, CheckCircle, Upload, Car, User, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { icon: Car, title: "Car Details", description: "Tell us about your car" },
  { icon: Upload, title: "Upload Photos", description: "Add photos of your car" },
  { icon: User, title: "Contact Info", description: "Your contact details" },
];

const brands = ["BMW", "Mercedes-Benz", "Audi", "Toyota", "Hyundai", "Honda", "Tata", "Mahindra", "Other"];
const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString());
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];

const SellCar = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
      setImages((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    alert("Your car listing has been submitted! We will contact you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary">
              <IndianRupee className="w-4 h-4" />
              Free Car Valuation
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Sell Your Car at the Best Price
            </h1>
            <p className="text-lg text-muted-foreground">
              Get the best value for your car in just 3 simple steps. Free inspection and quick payment!
            </p>
          </div>
        </div>
      </section>

      {/* Steps Indicator */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      index <= currentStep
                        ? "bg-gradient-primary shadow-glow"
                        : "bg-secondary"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6 text-primary-foreground" />
                    ) : (
                      <step.icon
                        className={`w-6 h-6 ${
                          index <= currentStep ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>
                  <div className="hidden md:block text-center">
                    <p
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-24 h-0.5 ${
                      index < currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-xl p-8">
              {/* Step 1: Car Details */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Car Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Brand *</Label>
                      <Select
                        value={formData.brand}
                        onValueChange={(value) => handleInputChange("brand", value)}
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
                    </div>

                    <div className="space-y-2">
                      <Label>Model *</Label>
                      <Input
                        placeholder="e.g., 3 Series, C-Class"
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Year *</Label>
                      <Select
                        value={formData.year}
                        onValueChange={(value) => handleInputChange("year", value)}
                      >
                        <SelectTrigger>
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
                    </div>

                    <div className="space-y-2">
                      <Label>Variant</Label>
                      <Input
                        placeholder="e.g., 320d Sport"
                        value={formData.variant}
                        onChange={(e) => handleInputChange("variant", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Fuel Type *</Label>
                      <Select
                        value={formData.fuel}
                        onValueChange={(value) => handleInputChange("fuel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
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
                      <Label>Kilometers Driven *</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 25000"
                        value={formData.km}
                        onChange={(e) => handleInputChange("km", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Price (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Enter your expected price"
                      value={formData.expectedPrice}
                      onChange={(e) => handleInputChange("expectedPrice", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Description</Label>
                    <Textarea
                      placeholder="Tell us more about your car's condition, features, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Upload Photos */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Upload Photos
                  </h2>
                  <p className="text-muted-foreground">
                    Add up to 10 photos of your car. Good photos help sell faster!
                  </p>

                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Click to upload photos
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG up to 10MB each
                        </p>
                      </div>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Car ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Contact Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name </Label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number </Label>
                      <Input
                        type="tel"
                        placeholder="+91 9691365052"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="patelhimanshu6006@gmail.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>City </Label>
                      <Input
                        placeholder="e.g., Mumbai"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      By submitting, you agree to our Terms of Service and Privacy Policy.
                      We'll contact you within 24 hours with a valuation.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button variant="hero" onClick={nextStep}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={handleSubmit}>
                    Submit for Valuation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellCar;
