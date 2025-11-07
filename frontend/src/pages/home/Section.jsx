import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";

const Section = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-28 px-6 md:px-16"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15861.jpg')",
      }}
    >
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[#0288D1]/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
        <Reveal> <p className="text-blue-200 font-medium text-lg">
            Do You Need a Meeting?
          </p></Reveal> 

        <Reveal>  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Better IT Solutions <br /> And Services At <br /> Your Fingertips
          </h1></Reveal>

          <div className="w-20 h-1 bg-blue-300 rounded-full mt-2"></div>

        <Reveal>  <p className="text-gray-100 text-lg leading-relaxed">
            We help our clients succeed by creating brand identities, digital
            experiences, and print materials that communicate clearly.
          </p></Reveal>

          <div className="flex items-center gap-5 mt-6">
          <Reveal>  <Link to={"/services"} className="bg-[#0288D1] hover:bg-[#0277BD] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300">
              Learn More
            </Link></Reveal>
            <Reveal><button className="w-14 h-14 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full border-2 border-white transition-all duration-300">
              <Play className="text-white w-6 h-6" />
            </button></Reveal>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="md:w-1/2 flex flex-col gap-6 items-center md:items-end">
          <div className="bg-white text-[#0B1A59] p-6 rounded-2xl shadow-md w-72 text-center">
            <div className="relative inline-block mb-4">
           <Reveal>   <div className="w-24 h-24 border-8 border-[#FF5722] rounded-full flex items-center justify-center text-2xl font-bold">
                100%
              </div></Reveal>
            </div>
        <Reveal>    <p className="text-sm font-semibold">
              We have 100% satisfied customers
            </p></Reveal>
          </div>

          <div className="bg-white text-[#0B1A59] p-6 rounded-2xl shadow-md w-72 text-center">
            <div className="relative inline-block mb-4">
          <Reveal>    <div className="w-24 h-24 border-8 border-[#FF5722] border-r-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                90%
              </div></Reveal>
            </div>
         <Reveal>   <p className="text-sm font-semibold">
              Projects have been completed
            </p></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
