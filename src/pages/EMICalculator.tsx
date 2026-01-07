import { useState } from "react";
import { Calculator, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(9.5);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  };

  const totalPayment = calculateEMI() * tenure;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Car Loan EMI Calculator</h1>
              <p className="text-muted-foreground text-lg">Plan your car purchase with our easy-to-use finance tool.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 glass p-8 md:p-12 rounded-[2rem] border border-border">
              {/* Controls */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Loan Amount (₹)</Label>
                    <span className="font-bold text-primary">₹{(loanAmount / 100000).toFixed(1)} Lakh</span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={([val]) => setLoanAmount(val)}
                    min={100000}
                    max={10000000}
                    step={50000}
                  />
                  <Input 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Tenure (Months)</Label>
                    <span className="font-bold text-primary">{tenure} Months</span>
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={([val]) => setTenure(val)}
                    min={12}
                    max={84}
                    step={6}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Interest Rate (%)</Label>
                    <span className="font-bold text-primary">{interestRate}%</span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={([val]) => setInterestRate(val)}
                    min={5}
                    max={20}
                    step={0.1}
                  />
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-gradient-primary p-8 rounded-2xl text-center text-primary-foreground shadow-glow">
                  <p className="text-sm uppercase tracking-widest opacity-80 mb-2">Monthly EMI</p>
                  <h2 className="text-5xl font-bold italic">₹{calculateEMI().toLocaleString()}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground uppercase">Total Interest</p>
                    <p className="text-lg font-bold">₹{totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground uppercase">Total Payable</p>
                    <p className="text-lg font-bold">₹{totalPayment.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    *This is an estimate. Actual EMI may vary based on bank terms, credit score, and processing fees.
                  </p>
                </div>

                <Button size="xl" className="w-full text-lg h-14" asChild>
                  <Link to="/contact">Apply for Finance</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EMICalculator;