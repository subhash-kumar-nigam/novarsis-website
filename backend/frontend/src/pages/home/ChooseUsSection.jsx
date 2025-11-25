import React from "react";
import { Server, Users } from "lucide-react"; // For icons
import Reveal from "../../components/Reveal";

const ChooseUsSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
      {/* Left Image */}
      <div className="md:w-1/2 w-full flex justify-center relative group">
        {/* Animated Border */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#3278C6] to-[#0B1B3F] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-700"></div>

        <Reveal>
          <img
            src="/Images/novarsis-Why-Choose-Us-Pic.webp"
            alt="Why Choose Us"
            className="rounded-2xl shadow-lg w-full max-w-[500px] object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
          />
        </Reveal>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 w-full space-y-6">
        <Reveal>
          <p className="text-[#3278C6] font-semibold uppercase tracking-wide">
            Company Benefits
          </p>
        </Reveal>

        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1A59] leading-tight">
            Why You Should <br /> Choose Us
          </h2>
        </Reveal>

        <Reveal>
          <p className="text-gray-600">
            Choose us for cutting-edge solutions delivered with precision,
            creativity, and commitment. We blend innovation with reliability for
            your brand’s success.
          </p>
        </Reveal>

        {/* Benefits List */}
        <div className="space-y-6 mt-8">
          {/* Benefit 1 */}
          <div className="flex items-center gap-4 group transition-all duration-500 hover:translate-x-2">
            <div className="bg-blue-100 p-4 rounded-full group-hover:scale-110 transition-transform duration-500">
              <Server className="text-[#3278C6] w-6 h-6" />
            </div>
            <div>
              <Reveal>
                <h3 className="text-lg font-semibold text-[#0B1A59]">
                  Proven Results
                </h3>
              </Reveal>
              <Reveal>
                <p className="text-gray-600 text-sm">
                  Delivering measurable growth and success across every project
                  we handle.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-4 group transition-all duration-500 hover:translate-x-2">
            <div className="bg-blue-100 p-4 rounded-full group-hover:scale-110 transition-transform duration-500">
              <Users className="text-[#3278C6] w-6 h-6" />
            </div>
            <div>
              <Reveal>
                <h3 className="text-lg font-semibold text-[#0B1A59]">
                  Expert Team
                </h3>
              </Reveal>
              <Reveal>
                <p className="text-gray-600 text-sm">
                  Powered by specialists who turn complex challenges into smart
                  solutions.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
