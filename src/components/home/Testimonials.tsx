import React from "react";
import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "BMW 3 Series Owner",
    content:
      "The verification process at AutoHub gave me complete peace of mind. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Sold Mercedes C-Class",
    content:
      "Got a much better price than I expected. The valuation was quick and professional.",
    rating: 5,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Testimonials = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
        >
          Voices of Satisfaction
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative bg-background p-10 rounded-3xl border border-border
                         hover:shadow-glow transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl italic mb-6 text-foreground/90 font-medium">
                “{t.content}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-bold text-lg leading-none">{t.name}</p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
