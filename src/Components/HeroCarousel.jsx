import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = 
  [
    {
      id: 1,
      title: "Drive Your Dream Car Today",
      subtitle: "Experience luxury and comfort with our premium fleet",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop&q=80", 
      cta: "Browse Now",
    },
    {
      id: 2,
      title: "Affordable Rentals, Premium Service",
      subtitle: "Get the best deals on cars without compromising quality",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop&q=80",
      cta: "Explore Fleet",
    },
    {
      id: 3,
      title: "Your Journey, Our Priority",
      subtitle: "24/7 customer support for hassle-free rentals",
      image:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=600&fit=crop&q=80", 
      cta: "Learn More",
    },
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

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative w-full h-96 md:h-screen max-h-[700px] overflow-hidden rounded-lg shadow-2xl">
      <AnimatePresence>
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${activeSlide.image}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <div className="absolute inset-0  bg-opacity-40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center px-4 z-10">
        <div className="text-center text-white max-w-2xl">
          <motion.h1
            key={`${activeSlide.id}-title`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {activeSlide.title}
          </motion.h1>

          <motion.p
            key={`${activeSlide.id}-subtitle`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-2xl mb-8"
          >
            {activeSlide.subtitle}
          </motion.p>

          <motion.button
            key={`${activeSlide.id}-cta`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="btn btn-primary text-lg px-8 py-3 rounded-full font-semibold"
          >
            {activeSlide.cta}
          </motion.button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white text-2xl"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white text-2xl"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-white bg-opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
