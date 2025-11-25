import React, { useRef, useEffect } from "react";
import Reveal from "../../components/Reveal";

const logos = [
  "/Images/novarsis-logo1.webp",
  "/Images/novarsis-logo2.webp",
  "/Images/novarsis-logo3.webp",
  "/Images/novarsis-logo4.webp",
  "/Images/novarsis-logo5.webp",
  "/Images/novarsis-logo6.webp",
];

const HappyFamilyCarousel = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollContent = scrollContainer.innerHTML;
    scrollContainer.innerHTML += scrollContent;

    let scrollAmount = 0;
    const scrollSpeed = 1.2; // smaller = slower scroll

    const scrollStep = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <Reveal>
          <h2 className="text-3xl font-bold text-[#172554]">
            Novarsis <span className="text-sky-600">Happy Family</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-gray-500 mt-2">
            Trusted by businesses that grow with us every day.
          </p>
        </Reveal>
      </div>

      {/* Carousel */}
      <div ref={scrollRef} className="flex overflow-hidden whitespace-nowrap w-full">
        {logos.map((logo, index) => (
          <div key={index} className="inline-block w-1/4 flex-shrink-0 p-6">
            <div
              className="
                relative flex justify-center items-center 
                border-l-4 border-[#00A3FF]
                bg-white rounded-lg shadow-md 
                transform transition-all duration-500
                hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
              "
            >
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="
                  w-32 h-20 object-contain grayscale 
                  hover:grayscale-0 transition-all duration-700 
                  hover:scale-110
                "
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyFamilyCarousel;
