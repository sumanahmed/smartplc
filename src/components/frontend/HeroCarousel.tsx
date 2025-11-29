"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import sliderImg1 from "../../../public/slider-images/1.jpeg";
import sliderImg2 from "../../../public/slider-images/2.jpeg";
import sliderImg3 from "../../../public/slider-images/3.jpeg";

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Exclusive",
      subtitle: "NEW ARRIVAL",
      description: "Special Limited Edition",
      image: sliderImg1,
      buttonText: "Buy Now",
      buttonColor: "bg-[#f4b000] hover:bg-[#d89a00]",
    },
    {
      id: 2,
      title: "Tech Innovation",
      subtitle: "Latest Gadgets",
      description: "Free shipping on selected items",
      image: sliderImg2,
      buttonText: "Shop Now",
      buttonColor: "bg-[#f4b000] hover:bg-[#d89a00]",
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Modern Design",
      description: "Upgrade your workspace today",
      image: sliderImg3,
      buttonText: "Explore",
      buttonColor: "bg-[#f4b000] hover:bg-[#d89a00]",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // শুধু slider container – outer card Home page থেকে আসবে
  return (
    <div className="relative h-[380px] md:h-[420px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          {/* Background image full */}
          <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover rounded-b-md"
            />
          </div>

          {/* Overlay content (left bottom-ish চাইলে adjust করো) */}
          <div className="absolute inset-0 flex items-center px-10">
            <div className="max-w-md text-white">
              <p className="text-xs tracking-[0.3em] uppercase">
                {slide.title}
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
                {slide.subtitle}
              </h2>
              <p className="mt-3 text-sm md:text-base">
                {slide.description}
              </p>
              <button
                className={`mt-6 px-8 py-3 rounded-full text-sm font-semibold text-gray-900 ${slide.buttonColor} transition-colors`}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HeroCarousel;
