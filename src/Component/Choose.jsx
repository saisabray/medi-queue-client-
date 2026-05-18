"use client";

import { Card, CardContent } from "@heroui/react";
import { CalendarDays, ShieldCheck, BookOpen, Clock3 } from "lucide-react";

const features = [
  {
    title: "Easy Session Booking",
    description:
      "Book tutor sessions instantly without manual scheduling hassle.",
    icon: CalendarDays,
  },
  {
    title: "Verified Tutors",
    description:
      "Learn from experienced and trusted tutors across multiple subjects.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Learning",
    description:
      "Choose online or offline classes based on your comfort and availability.",
    icon: BookOpen,
  },
  {
    title: "Time Slot Management",
    description: "Avoid schedule conflicts with smart availability tracking.",
    icon: Clock3,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Why Choose MediQueue</h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A smarter tutor booking platform designed to simplify learning and
            session management for students.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="group border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20 blur-md group-hover:opacity-40 transition-all" />

                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
