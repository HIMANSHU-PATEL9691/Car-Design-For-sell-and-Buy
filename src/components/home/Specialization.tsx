import { motion } from "framer-motion";
import { Sparkles, Award, TrendingUp, Shield } from "lucide-react";

const specializations = [
  { icon: Sparkles, title: "Luxury Sedans", count: "250+", description: "Premium comfort and performance" },
  { icon: Award, title: "Sport SUVs", count: "180+", description: "Power meets versatility" },
  { icon: TrendingUp, title: "Electric Vehicles", count: "90+", description: "The future of sustainable driving" },
  { icon: Shield, title: "Vintage Classics", count: "45+", description: "Timeless pieces for collectors" },
];

export const Specialization = () => (
  <section className="py-24 bg-secondary/10 relative">
    <div className="container mx-auto px-4 text-center max-w-3xl mb-20">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Expertise</h2>
      <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
      <p className="text-muted-foreground text-lg">We specialize in niche categories to ensure you find exactly what your heart desires.</p>
    </div>
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {specializations.map((spec, idx) => (
        <motion.div key={spec.title} whileHover={{ y: -10 }} className="bg-card p-10 rounded-2xl border border-border/50 text-center group shadow-sm hover:shadow-glow transition-all">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <spec.icon className="w-8 h-8" />
          </div>
          <h3 className="text-primary text-4xl font-bold mb-2 tracking-tighter">{spec.count}</h3>
          <h4 className="text-xl font-display font-semibold mb-3">{spec.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{spec.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);