"use client";

import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Find The Best Tutors For Your Learning Journey",
    description:
      "Browse experienced tutors, compare schedules, and book sessions instantly with MediQueue.",
    image: "/assets/images/hero-image/hero-image-1.png",
  },
  {
    id: 2,
    title: "Book Sessions Without Schedule Conflicts",
    description:
      "Choose available time slots and manage your classes smoothly from one platform.",
    image: "/assets/images/hero-image/hero-image-2.png",
  },
  {
    id: 3,
    title: "Learn Online With Trusted Mentors",
    description:
      "Get personalized guidance from expert tutors in Mathematics, Physics, Programming and more.",
    image: "/assets/images/hero-image/hero-image-3.png",
  },
];

export default function Hero() {
  return (
    <div className="w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[91vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>

              <div className="relative z-10 flex h-full text-center justify-center items-center ">
                <div className="max-w-content px-6 md:px-16 text-white justify-center items-center flex flex-col">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    {slide.description}
                  </p>
                  <Link
                    href="/tutors"
                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  >
                    <Button className="font-semibold bg-linear-to-r from-blue-600 to-cyan-500 flex justify-center">
                      Explore Tutors
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
