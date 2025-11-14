import React from "react";
import { motion } from "framer-motion";

// Correct Swiper v11+ imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slidesData = [
  {
    title: "Smart Financial Planning",
    description:
      "Build wealth with strategic insights and well-designed financial tools tailored for your growth.",
    imageUrl:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Invest With Confidence",
    description:
      "Make informed decisions using transparent, data-driven investment strategies.",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Grow Your Wealth",
    description:
      "Unlock long-term sustainable financial growth with our expertly crafted tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Next-Gen Financial Solutions",
    description:
      "Experience modern, user-friendly and AI-powered finance management today.",
    imageUrl:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
  },
];

const Carousel = ({ slides = slidesData }) => {
  return (
    <div className="w-full  bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[500px] flex items-center justify-center"
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-90"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0A1526]/40 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-10 left-10 max-w-xl">
                  <h2 className="text-4xl font-bold text-[#F9C74F] drop-shadow-lg mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-[#F8FAFC]/80 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
