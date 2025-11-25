import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/Images/novarsis-home1.webp",
    heading: "IT Solutions & Services.",
    subHeading: "Welcome to Novarsis Technology",
    text: "We deliver complete IT and digital solutions — from website development and social media marketing to design, eCommerce, animation, and branding.",
    animation: "from-left",
  },
  {
    id: 2,
    image: "/Images/novarsis-home2.webp",
    heading: "Creative Branding & Digital Growth.",
    subHeading: "Experience the best IT Solutions",
    text: "Elevate your identity with expert branding, design, marketing, and animation solutions.",
    animation: "from-bottom",
  },
  {
    id: 3,
    image: "/Images/novarsis-home3.webp",
    heading: "Let’s Build Your Next Project.",
    subHeading: "Experience the best IT Solutions",
    text: "Connect with us today, fill out the form, and let’s create something impactful together.",
    showForm: true,
    animation: "from-right",
  },
];

const HomeSection = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const slideInterval = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const startAutoSlide = useCallback(() => {
    slideInterval.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const stopAutoSlide = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  const handleNext = () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with hover zoom-out */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ${
              hovered ? "scale-110" : "scale-100"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content with directional animation */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 transition-all duration-1000 ease-in-out ${
              slide.animation === "from-left"
                ? index === current
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
                : slide.animation === "from-bottom"
                ? index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
                : slide.animation === "from-right"
                ? index === current
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
                : ""
            }`}
          >
            <p className="bg-blue-700 text-white px-4 py-1 rounded mb-4 text-sm sm:text-base">
              {slide.subHeading}
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              {slide.heading}
            </h1>
            <p className="max-w-2xl text-sm sm:text-lg mb-6">{slide.text}</p>

            {!slide.showForm ? (
              <div className="flex gap-4">
                <Link
                  to="/about"
                  className="bg-[#00A3FF] hover:bg-[#008EE0] text-white px-6 py-2 rounded-md"
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-gray-800 hover:bg-gray-200 px-6 py-2 rounded-md"
                >
                  Contact
                </Link>
              </div>
            ) : (
              <form className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg max-w-md w-full">
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-2 rounded-md text-gray-800"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-2 rounded-md text-gray-800"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    className="px-4 py-2 rounded-md text-gray-800"
                    rows="3"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-[#00A3FF] hover:bg-[#008EE0] text-white font-semibold px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 
        bg-[#00A3FF]/80 hover:bg-[#008EE0] text-white p-3 rounded-full 
        shadow-lg backdrop-blur-sm border border-white/30 transition-all duration-300 z-20"
      >
        <FaArrowLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 
        bg-[#00A3FF]/80 hover:bg-[#008EE0] text-white p-3 rounded-full 
        shadow-lg backdrop-blur-sm border border-white/30 transition-all duration-300 z-20"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default HomeSection;
