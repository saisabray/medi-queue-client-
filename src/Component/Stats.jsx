"use client";

import { Card, CardContent } from "@heroui/react";
import { Users, GraduationCap, BookOpenCheck, ThumbsUp } from "lucide-react";

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
    <section className=" bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Learning Impact</h2>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Thousands of students are improving their skills and achieving
            better academic performance with MediQueue.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Card
                key={index}
                className="relative group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="py-10 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-4xl font-bold mb-3">{stat.number}</h3>
                  <p className="text-gray-950 text-lg font-medium mt-2">
                    {stat.title}
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

export default Stats;
