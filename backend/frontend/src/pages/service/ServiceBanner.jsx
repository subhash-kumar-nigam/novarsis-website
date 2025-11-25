import React from "react";
import BestServices from "./BestServices";
import PremiumServices from "../home/PremiumServices";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";

const ServiceBanner = () => {
  return (
    <>
    <section
      className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/Images/novarsis-servicePage.png')", // Replace with your actual image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0f1a]/70"></div>

      {/* Centered content */}
      <div className="relative z-10 text-center text-white">
       <Reveal> <p className="text-gray-300 text-lg md:text-xl mb-2">
         <Link to={"/"}>Home</Link>  <span className="text-blue-400 mx-1">/</span> Service
        </p></Reveal>
       <Reveal> <h1 className="text-4xl md:text-6xl font-bold">Service</h1></Reveal>
      </div>

      {/* Decorative circles (optional for right side design like image) */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block">
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
    <BestServices/>
    <PremiumServices/>
    <br /><br /><br />
    </>
  );
};

export default ServiceBanner;
