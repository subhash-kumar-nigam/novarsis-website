import React from "react";
import {
  FaLaptop,
  FaLock,
  FaTrophy,
  FaEye,
  FaBolt,
  FaCode,
  FaSitemap,
  FaPenNib,
} from "react-icons/fa";
import Reveal from "../../components/Reveal";

const SecuritySection = () => {
  const services = [
    { icon: <FaLaptop />, label: "Web Consultation" },
    { icon: <FaTrophy />, label: "Security Optimization" },
    { icon: <FaLock />, label: "Operational Security" },
    { icon: <FaEye />, label: "Smarter Insights" },
    { icon: <FaBolt />, label: "Super Faster" },
    { icon: <FaCode />, label: "Developer Friendly" },
    { icon: <FaSitemap />, label: "Organize Easily" },
    { icon: <FaPenNib />, label: "User Friendly Design" },
  ];

  return (
    <section className="relative bg-[#f9fbff] py-20 px-6 md:px-16 overflow-hidden">
      {/* Left Animated Side Border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#03A9F4] to-[#142b66] origin-top scale-y-100"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Left Image Section */}
        <div className="relative flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform transition duration-700 hover:scale-105 hover:rotate-1 hover:shadow-blue-300/50">
            <img
              src="/Images/novarsis-Protecting-Your-Privacy-Piccc.webp"
              alt="Cyber Security"
              className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
            />
          </div>

          {/* Play Button */}
          <div className="absolute bottom-4 right-10 bg-gradient-to-r from-[#0B63E5] to-[#142b66] w-20 h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer group hover:scale-110 transition-transform duration-300">
            <div className="bg-[#03A9F4] text-white w-12 h-12 flex items-center justify-center rounded-full text-xl group-hover:scale-125 transition duration-300">
              ▶
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="relative">
          {/* Decorative Side Line */}
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#03A9F4] to-[#142b66] rounded-full hidden md:block"></div>

          <Reveal>
            <p className="text-[#03A9F4] font-semibold mb-2 uppercase tracking-wide">
              Advance Protect
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-[#142b66] mb-4">
              Empowering Your Online <br /> Security is Our Priority
            </h2>
          </Reveal>

          <Reveal>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We ensure your digital presence is secure, efficient, and built
              with privacy in mind, using the latest technologies to protect and
              optimize your website.
            </p>
          </Reveal>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center bg-white border-l-4 border-[#03A9F4] shadow-md rounded-md px-4 py-3 hover:bg-[#03A9F4]/10 hover:scale-105 hover:shadow-xl hover:border-[#142b66] transition-all duration-500 cursor-pointer"
              >
                <Reveal>
                  <div className="bg-[#03A9F4] text-white p-2 rounded-md text-lg mr-3 transition-transform duration-500 group-hover:rotate-12">
                    {service.icon}
                  </div>
                </Reveal>
                <Reveal>
                  <span className="font-semibold text-[#142b66] text-sm md:text-base">
                    {service.label}
                  </span>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
