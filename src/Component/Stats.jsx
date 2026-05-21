"use client";

import { Card, CardContent } from "@heroui/react";
import { Users, GraduationCap, BookOpenCheck, ThumbsUp } from "lucide-react";
import { getAnimationClass } from "@/lib/utilis/animation";

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

const Stats = () => {
  return (
    <section className="bg-background py-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl font-extrabold mb-4 text-foreground tracking-tight ${getAnimationClass("entry")}`}
          >
            Our Learning Impact
          </h2>

          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${getAnimationClass("pageLoad", { delay: "animate__delay-1s" })}`}
          >
            Thousands of students are improving their skills and achieving
            better academic performance with MediQueue.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                style={{ animationDelay: `${index * 150}ms` }}
                className={`transition-all duration-300 ${getAnimationClass("entry")}`}
              >
                <Card
                  className="relative group rounded-2xl border border-border/60 bg-card shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;

