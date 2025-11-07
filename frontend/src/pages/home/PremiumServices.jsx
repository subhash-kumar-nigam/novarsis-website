import React from "react";
import {
  FaLightbulb,
  FaShieldAlt,
  FaLaptopCode,
  FaChartPie,
  FaObjectGroup,
} from "react-icons/fa";
import Reveal from "../../components/Reveal";

const premiumServices = [
  {
    icon: <FaLightbulb />,
    title: "Branding & Direction",
    desc: "We build impactful brand identities and guide creative direction to elevate your business presence.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Product Design & Development",
    desc: "We create and develop visually compelling, functional product designs that bring your ideas to real life.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Video Editing & Grading",
    desc: "We deliver polished video content with professional editing & color grading for a powerful visual impact.",
  },
  {
    icon: <FaObjectGroup />,
    title: "UI/UX Designing",
    desc: "We create user-friendly and visually appealing UI/UX designs that enhance customer experience and engagement.",
  },
  {
    icon: <FaChartPie />,
    title: "Data Analysis",
    desc: "We combine data analysis with content writing to deliver impactful communication that fuels growth.",
  },
];

const PremiumServices = () => {
  return (
    <section className="relative bg-[#0b1b3f] py-20 overflow-hidden">
      {/* Background Pattern (Optional Hex Style) */}
      <div className="absolute inset-0 bg-[url('/Images/hex-pattern.svg')] opacity-10"></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left md:flex md:items-start md:justify-between relative z-10 mb-16">
        <div className="md:w-1/2">
    <Reveal>      <p className="text-[#00aaff] font-semibold uppercase tracking-wider">
            What We’re Offering
          </p></Reveal>
         <Reveal>   <h2 className="text-4xl font-bold text-white leading-snug mt-2">
            Also dealing in these IT <br /> Premium Services
          </h2></Reveal>
          <div className="h-1 w-24 bg-[#00aaff] rounded-full mt-4 mx-auto md:mx-0"></div>
        </div>

    <Reveal>     <p className="text-gray-300 md:w-1/2 mt-6 md:mt-0 text-sm sm:text-base leading-relaxed">
          At Novarsis Tech, we deliver end-to-end IT solutions designed to support
          businesses of all scales with precision and innovation. Our expertise spans
          across system administration, technical support, infrastructure setup, and
          data security. We prioritize dependable, performance-driven, and scalable
          services that streamline operations and improve efficiency.
        </p></Reveal>
      </div>

      {/* Service Cards */}
    <Reveal>  <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
        {premiumServices.map((service, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-500 cursor-pointer overflow-hidden"
          >
            {/* Hover Overlay (bottom-to-top) */}
            <div className="absolute inset-0 bg-[#00aaff] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 z-0"></div>

            <div className="relative z-10">
              <div className="bg-[#e8f6ff] text-[#00aaff] text-4xl inline-flex p-4 rounded-full mb-4 group-hover:bg-white group-hover:text-[#0b1b3f] transition duration-500">
                {service.icon}
              </div>
              <h3 className="font-bold text-lg text-[#0b1b3f] mb-2 group-hover:text-white transition duration-500">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-white transition duration-500">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div></Reveal>
    </section>
  );
};

export default PremiumServices;
