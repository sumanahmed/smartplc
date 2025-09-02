import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import sliderImg1 from '../../../public/slider-images/1.jpeg'
import sliderImg2 from '../../../public/slider-images/2.jpeg'
import sliderImg3 from '../../../public/slider-images/3.jpeg'

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends",
      description: "Up to 50% off on all summer essentials",
      image: sliderImg1, // Clothing product
      buttonText: "Shop Now",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: 2,
      title: "Tech Innovation",
      subtitle: "Latest gadgets & electronics",
      description: "Free shipping on orders over $99",
      image: sliderImg2,  
      buttonText: "Explore",
      buttonColor: "bg-gray-900 hover:bg-gray-800"
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Transform your space",
      description: "New arrivals with modern designs",
      image: sliderImg3, // Home decor product
      buttonText: "Browse",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Column */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-fadeIn">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-2 animate-fadeIn animation-delay-200">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 animate-fadeIn animation-delay-400">
                {slides[currentSlide].description}
              </p>
              <button
                  className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-600 w-fit ${slides[currentSlide].buttonColor}`}
              >
                {slides[currentSlide].buttonText}
              </button>
            </div>

            {/* Carousel Column */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              {slides.map((slide, index) => (
                  <div
                      key={slide.id}
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                          index === currentSlide ? 'translate-x-0' :
                              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                      }`}
                  >
                    <div className="h-full p-4">
                      <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
              ))}

              {/* Navigation Buttons */}
              <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 p-2 rounded-full transition-all duration-300"
                  aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 p-2 rounded-full transition-all duration-300"
                  aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroCarousel;