import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Reveal from "../../components/Reveal";
import ContactForm from "./ContactForm"

const Contact = () => {
  return (
    <div>
      <>
        <section
          className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/Images/novarsis-servicePage.png')", // Replace with your actual image path
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0a0f1a]/70"></div>

          {/* Centered content */}
          <div className="relative z-10 text-center text-white">
         <Reveal>   <p className="text-gray-300 text-lg md:text-xl mb-2">
              <Link to={"/"}>Home</Link>{" "}
              <span className="text-blue-400 mx-1">/</span> Contact
            </p></Reveal>
          <Reveal>  <h1 className="text-4xl md:text-6xl font-bold">Contact</h1></Reveal>
          </div>

          {/* Decorative circles (optional for right side design like image) */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* ===== Left Side ===== */}
            <div>
         <Reveal>     <p className="text-[#00A3FF] uppercase text-sm font-semibold mb-2 tracking-widest">
                Contact With Us
              </p></Reveal>
            <Reveal>  <h2 className="text-4xl md:text-5xl font-bold text-[#1a237e] mb-4 leading-tight">
                Feel Free to Get in <br />{" "}
                <span className="relative">
                  Touch
                  <span className="absolute -bottom-2 left-0 w-20 h-[3px] bg-[#00A3FF] rounded-full"></span>
                </span>
              </h2></Reveal>
            <Reveal>  <p className="text-gray-600 mb-10">
                Get in touch with us today, we’re here to answer your questions
                and bring your vision to life.
              </p></Reveal>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-center gap-4">
                <Reveal>  <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#00A3FF] text-[#00A3FF] text-2xl">
                    <FaPhoneAlt />
                  </div></Reveal>
                  <div>
                  <Reveal>  <p className="text-gray-600 text-sm">Call Anytime</p></Reveal>
                  <Reveal>  <p className="text-[#1a237e] font-semibold text-lg">
                      +971569886214
                    </p></Reveal>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                 <Reveal> <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#00A3FF] text-[#00A3FF] text-2xl">
                    <FaEnvelope />
                  </div></Reveal>
                  <div>
                   <Reveal> <p className="text-gray-600 text-sm">Send Email</p></Reveal>
                  <Reveal>  <p className="text-[#1a237e] font-semibold text-lg">
                      info@novarsis.tech
                    </p></Reveal>
                  </div>
                </div>
              </div>
            </div>

          {/* form  */}
            <ContactForm/>
          </div>

          {/* ===== Background Floating Circles (Optional decoration) ===== */}
          <div className="absolute top-10 right-10 w-4 h-4 bg-[#00A3FF] rounded-full blur-sm opacity-80"></div>
          <div className="absolute bottom-20 left-10 w-5 h-5 bg-pink-400 rounded-full blur-md opacity-70"></div>
          <div className="absolute bottom-5 right-20 w-6 h-6 bg-yellow-400 rounded-full blur-md opacity-60"></div>
        </section>

        <section className="py-20 bg-white text-center">
          {/* ===== Heading ===== */}
          <div className="mb-10">
          <Reveal>  <p className="text-[#00A3FF] uppercase text-sm font-semibold tracking-widest">
              Our Locations
            </p></Reveal>
          <Reveal>  <h2 className="text-4xl md:text-5xl font-bold text-[#1a237e] mb-3">
              Coworking Space Offices <br />
              <span className="relative inline-block">
                Around
                <span className="absolute left-0 -bottom-2 w-24 h-[3px] bg-[#00A3FF] rounded-full"></span>
              </span>{" "}
              The World
            </h2></Reveal>
         <Reveal>   <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Amet consectetur adipiscing elit sed eiusmod ex tempor incididunt
              labore dolore magna aliqua enim ad minim veniam.
            </p></Reveal>
          </div>

          {/* ===== Map Section ===== */}
      <Reveal>    <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="Novarsis Tech Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.4578262972927!2d75.8875728750832!3d22.74838477936685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x44772b3af2956b11%3A0x238e732b1eb8401e!2sNovarsistech%20IT%20Solution%20%7C%20(digital%20marketing%20%26%20app%20web%20development)!5e0!3m2!1sen!2sin!4v1761650473171!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

             
            </div>
          </div></Reveal>
        </section>
      </>
    </div>
  );
};

export default Contact;
