import React from "react";
import { FaGlobe, FaRocket, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";

const services = [
  {
    title: "Web Design & Dev.",
    desc: "We craft user-friendly websites with premium design and dev. tailored to your brand.",
    icon: <FaGlobe />,
    img: "/Images/novarsis-service1.webp",
  },
  {
    title: "Social Marketing.",
    desc: "We grow your brand online through targeted and engaging social media marketing.",
    icon: <FaRocket />,
    img: "/Images/novarsis-service2.webp",
  },
  {
    title: "Paid Advertisement.",
    desc: "We drive results with strategic paid advertising across Google, Meta, and other leading platforms.",
    icon: <FaChartLine />,
    img: "/Images/novarsis-service3.webp",
  },
  {
    title: "eCommerce Solution.",
    desc: "We design high-converting eCommerce stores and sales strategies to boost online revenue.",
    icon: <FaShoppingCart />,
    img: "/Images/novarsis-service4.webp",
  },
];

const ServiceItems = () => {
  return (
    <section className="py-20 bg-[#f9fbff] relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Reveal>
          <p className="text-[#0097FF] font-semibold tracking-wide uppercase">
            What We’re Offering
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0b1b3f] mt-2 mb-4">
            Dealing in all Professional IT Services
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            We offer a complete range of IT, SEO, digital marketing, design,
            development, and sales solutions tailored to grow your business.
          </p>
        </Reveal>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2"
          >
            {/* Gradient Border Animation */}
            <div className="absolute inset-0 rounded-2xl border-[3px] border-transparent bg-gradient-to-r from-[#0097FF] via-[#00C6FF] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border pointer-events-none"></div>

            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-[#0097FF] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 z-0"></div>

            {/* Image */}
            <div className="relative overflow-hidden">
              <Reveal>
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Reveal>
              <Reveal>
                <div className="absolute -bottom-5 right-4 bg-[#0097FF] group-hover:bg-white text-white group-hover:text-[#0097FF] p-3 rounded-lg transition-all duration-500 z-10 shadow-md">
                  {service.icon}
                </div>
              </Reveal>
            </div>

            {/* Text Content */}
            <div className="relative z-10 p-6 transition-all duration-500">
              <Reveal>
                <h3 className="font-bold text-lg mb-2 text-[#0b1b3f] group-hover:text-white transition-all duration-500">
                  {service.title}
                </h3>
              </Reveal>
              <Reveal>
                <p className="text-gray-500 group-hover:text-white text-sm leading-relaxed transition-all duration-500">
                  {service.desc}
                </p>
              </Reveal>
              <Link to={"/services"}>
                <div className="mt-4 font-semibold text-[#0b1b3f] group-hover:text-white flex items-center gap-2 transition-all duration-300">
                  <span>Read More</span>
                  <span className="transform group-hover:translate-x-1 transition">→</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframes for Animated Border */}
      <style>{`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-border 5s ease infinite;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </section>
  );
};

export default ServiceItems;
