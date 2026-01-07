import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCar from "@/assets/hero-car.jpg";

const stats = [
  { icon: Car, value: "10,000+", label: "Cars Sold" },
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: Star, value: "4.9/5", label: "Rating" },
  { icon: TrendingUp, value: "₹500Cr+", label: "Value Traded" },
];

import { Users, Star, TrendingUp } from "lucide-react";

export const Hero = () => (
  <section className="relative min-h-[95vh] flex items-center overflow-hidden">
    <motion.div 
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
    >
      <img src={heroCar} alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
    </motion.div>

    <div className="container mx-auto px-4 relative z-10 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-primary font-medium border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          India's Premier Luxury Car Hub
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
          Elevate Your <br />
          <span className="text-gradient-primary">Driving Legacy</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
          Experience a seamless journey in buying and selling verified premium cars with complete transparency.
        </p>

        <div className="flex flex-wrap gap-5">
          <Button variant="hero" size="xl" className="group shadow-glow" asChild>
            <Link to="/buy">
              <Car className="w-5 h-5 transition-transform group-hover:-rotate-12" />
              Explore Collection
            </Link>
          </Button>
          <Button variant="outline" size="xl" className="backdrop-blur-sm" asChild>
            <Link to="/sell">
              Sell Your Car
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border/50">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2 text-primary">
                <stat.icon className="w-5 h-5" />
                <span className="text-2xl font-bold text-foreground tracking-tighter">{stat.value}</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);