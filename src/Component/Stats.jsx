"use client";

import { Card, CardContent } from "@heroui/react";
import { Users, GraduationCap, BookOpenCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    number: "500+",
    title: "Active Students",
    icon: Users,
  },
  {
    number: "120+",
    title: "Expert Tutors",
    icon: GraduationCap,
  },
  {
    number: "1,000+",
    title: "Sessions Booked",
    icon: BookOpenCheck,
  },
  {
    number: "95%",
    title: "Positive Feedback",
    icon: ThumbsUp,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

const Stats = () => {
  return (
    <section className="bg-background py-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold mb-4 text-foreground tracking-tight"
          >
            Our Learning Impact
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Thousands of students are improving their skills and achieving
            better academic performance with MediQueue.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card
                  className="relative group rounded-2xl border border-border/60 bg-card shadow-xs transition-colors duration-300 h-full"
                >
                  <CardContent className="py-10 flex flex-col items-center text-center">
                    <div className="mb-5 p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-300">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-4xl font-extrabold mb-2 text-foreground tracking-tight">{stat.number}</h3>
                    <p className="text-muted-foreground text-base font-medium mt-1">
                      {stat.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
