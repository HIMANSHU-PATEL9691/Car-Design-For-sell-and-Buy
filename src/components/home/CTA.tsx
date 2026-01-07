import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent rounded-full blur-[100px] animate-pulse" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[3.5rem] overflow-hidden bg-card border border-border/50 p-12 md:p-24 text-center group shadow-2xl"
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 group-hover:from-primary/20 transition-all duration-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          {/* Informative Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border border-border/50">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant Valuation</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border border-border/50">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Best Market Price</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border border-border/50">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Paperwork Handled</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-none text-foreground">
              Ready to Sell <br /> 
              <span className="text-gradient-primary">In Just 24 Hours?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Don't let your car sit. Join 10,000+ satisfied sellers who got the best value for their premium vehicles without the stress. 
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
            <Button variant="hero" size="xl" className="h-16 px-10 text-lg shadow-glow-primary group w-full sm:w-auto" asChild>
              <Link to="/sell">
                Get Free Valuation 
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="outline" size="xl" className="h-16 px-10 text-lg backdrop-blur-sm w-full sm:w-auto" asChild>
              <Link to="/buy">
                Browse Collection
              </Link>
            </Button>
          </div>

          {/* Trust Disclaimer */}
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold opacity-60">
            No obligation • Free home inspection • Immediate payment
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);