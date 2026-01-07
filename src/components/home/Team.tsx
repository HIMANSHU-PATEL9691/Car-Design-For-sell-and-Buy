import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import founderImg from "@/assets/owner.jpg";
import inspectorImg from "@/assets/owner.jpg";

const team = [
  { name: "HIMANSHU PATEL", role: "Founder & CEO", description: "15+ years in the luxury automobile industry.", image: founderImg },
  { name: "HIMANSHU PATEL", role: "Head of Inspections", description: "Expert in 200-point car verification.", image: inspectorImg },
];

export const Team = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-20"
      >
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
          Our Leadership
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">The Visionaries</h2>
        <p className="text-muted-foreground mt-4 text-lg">Leading the charge in Indian luxury automobile innovation.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-primary via-accent to-primary p-1.5 transition-transform duration-700 group-hover:rotate-6">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background border-4 border-background">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full shadow-lg border-4 border-background group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-4 bg-primary/40" />
                  <p className="text-primary font-bold uppercase tracking-[0.25em] text-[10px]">{member.role}</p>
                  <span className="h-px w-4 bg-primary/40" />
                </div>
                <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);