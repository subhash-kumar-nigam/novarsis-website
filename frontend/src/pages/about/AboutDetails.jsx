import React from "react";
import { Play } from "lucide-react";

const AboutDetails = () => {
  return (
    <section className="py-20 bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-10">
      {/* ===== Left Content ===== */}
      <div className="flex-1 relative border-l-4 border-[#00A3FF] pl-6 hover:translate-x-2 transition-transform duration-500">
        <p className="text-[#00A3FF] uppercase tracking-wider font-semibold mb-3">
          About Our IT Company
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-[#1a237e] leading-tight mb-6">
          We Are The Best IT Solution <br /> &
          <span className="relative inline-block ml-2">
            Services
            <span className="absolute left-0 -bottom-2 w-28 h-[4px] bg-[#00A3FF] rounded-full"></span>
          </span>{" "}
          Provider
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Over 50+ professionals work for us in more than 2 countries. This
          breadth of global coverage, combined with specialist expertise,
          allows us to deliver world-class IT solutions to our clients.
        </p>

        {/* ===== Progress Bars ===== */}
        <div className="space-y-6 mb-10">
          {/* UI/UX */}
          <div>
            <div className="flex justify-between mb-2 text-sm font-semibold text-[#1a237e]">
              <span>UI/UX & Graphic Designing</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 h-2 rounded-full w-full animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>

          {/* SEO */}
          <div>
            <div className="flex justify-between mb-2 text-sm font-semibold text-[#1a237e]">
              <span>SEO & Paid Advertisement</span>
              <span>95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full w-[95%] animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>

          {/* Web Design */}
          <div>
            <div className="flex justify-between mb-2 text-sm font-semibold text-[#1a237e]">
              <span>Web Design & Development</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-lime-400 h-2 rounded-full w-full animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>
        </div>

        {/* ===== Watch Video Button ===== */}
        <button className="flex items-center space-x-3 group">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-[#00A3FF]/20 rounded-full animate-ping"></div>
            <div className="absolute w-16 h-16 bg-[#00A3FF]/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative w-10 h-10 flex items-center justify-center bg-[#00A3FF] rounded-full text-white group-hover:scale-125 transition-transform duration-500">
              <Play className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[#1a237e] font-semibold text-lg group-hover:text-[#00A3FF] transition-colors duration-300">
            WATCH VIDEO
          </span>
        </button>
      </div>

      {/* ===== Right Image ===== */}
      <div className="flex-1 flex justify-center relative">
        <div className="relative transform hover:scale-105 hover:-rotate-1 transition-transform duration-700">
          <img
            src="/Images/novarsis-details.webp"
            alt="IT Services"
            className="rounded-lg shadow-2xl w-[80%] md:w-[70%] border-4 border-[#00A3FF]/20"
          />

          {/* Floating Box */}
          <div className="absolute bottom-4 right-10 bg-[#1a237e] text-white rounded-md shadow-xl px-6 py-3 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-500">
            <span className="text-2xl">🏆</span>
            <p className="font-semibold">We are ready to assist you</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetails;
