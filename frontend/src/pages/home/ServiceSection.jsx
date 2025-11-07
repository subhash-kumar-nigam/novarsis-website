import React from "react";
import {
  FaHandsHelping,
  FaUsers,
  FaLifeRing,
  FaChartPie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";

const services = [
  {
    id: 1,
    icon: <FaHandsHelping size={40} className="text-[#00A3FF]" />,
    title: "Quality Service",
    description:
      "We deliver tailored solutions with precision, ensuring top-notch quality in every project.",
  },
  {
    id: 2,
    icon: <FaUsers size={40} className="text-[#FF6600]" />,
    title: "Expert Team",
    description:
      "Our skilled professionals bring industry expertise to drive innovation and best results.",
  },
  {
    id: 3,
    icon: <FaLifeRing size={40} className="text-[#1A1A75]" />,
    title: "Excellent Support",
    description:
      "We provide fast responsive, 24/7 support to keep your business running smoothly.",
  },
  {
    id: 4,
    icon: <FaChartPie size={40} className="text-[#00A36C]" />,
    title: "Management",
    description:
      "From planning to execution, we manage every detail with strategic efficiency.",
  },
];

const ServiceSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Why Choose Us
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-gray-600">
              We provide complete digital solutions that empower your business to grow.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-white rounded-xl shadow-lg p-8 text-center group transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 rounded-xl border-[3px] border-transparent bg-gradient-to-r from-blue-500 via-[#FF6600] to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border"></div>

              {/* Dotted Left Side Background */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:10px_10px] rounded-l-xl"></div>

              {/* Icon with Orbit Animation */}
              <div className="relative mx-auto mb-6 w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                {service.icon}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full transition-all duration-500 group-hover:animate-[spin_5s_linear_infinite]">
                    <span className="absolute top-2 left-2 w-3 h-3 bg-[#3278C6] rounded-full"></span>
                    <span className="absolute bottom-2 right-2 w-3 h-3 bg-[#3278C6] rounded-full"></span>
                  </div>
                </div>
              </div>

              <Reveal>
                <h3 className="text-lg font-bold text-[#001B5E] mb-2 relative z-10">
                  {service.title}
                </h3>
              </Reveal>
              <Reveal>
                <p className="text-gray-600 mb-4 relative z-10">
                  {service.description}
                </p>
              </Reveal>
              <Link
                to={"/services"}
                className="text-[#001B5E] font-semibold hover:underline relative z-10"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animation Keyframes */}
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

export default ServiceSection;
