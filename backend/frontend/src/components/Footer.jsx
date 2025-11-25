import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
 
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
 
  FaWhatsapp,
  FaBriefcase,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import FooterContactForm from "./FooterContactForm";

const Footer = () => {
  return (
    <footer className="bg-[#0b1424] text-white pt-16 pb-6 relative overflow-hidden">
      {/* 🔹 TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* ========== QUICK LINKS ========== */}
        <div>
          <h3 className="text-xl font-semibold mb-6 border-l-4 border-[#00A3FF] pl-3">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["About Us", "Know who we are", "/about"],
              ["Our Team", "Meet our professionals", "/about"],
              ["Services", "What we offer", "/services"],
              ["Carrier", "Our recent projects", "/career"],
              ["Gallery", "Latest Tech Glimpse", "/gallery"],
              ["Need Help", "FAQs & guidance", "/faq"],
              ["Support", "Get in touch with us", "/contact"],
              ["Clients", "Who we’ve worked with", "/about"],
              ["Contact", "Start a conversation", "/contact"],
            ].map(([title, subtitle, path], i) => (
              <Link
                to={path}
                key={i}
                className="bg-[#111b2e] hover:bg-[#16233c] transition rounded-lg p-4 block"
              >
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ========== OFFICIAL INFO ========== */}
        <div>
          <Reveal>
            <h3 className="text-xl font-semibold mb-6 border-l-4 border-[#00A3FF] pl-3">
              Official Info
            </h3>
          </Reveal>
          <ul className="space-y-3 text-gray-300 text-sm">
            <Reveal>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#00A3FF] mt-1 mr-3" />
                <a
                  href="https://maps.app.goo.gl/1VWNa3CsZPsuK6YEA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A3FF] transition"
                >
                  Vijay Nagar, Indore, Madhya Pradesh
                </a>
              </li>
            </Reveal>
            <Reveal>
              <li className="flex items-center">
                <FaPhoneAlt className="text-[#00A3FF] mr-3" />
                <a
                  href="tel:+919111720303"
                  className="hover:text-[#00A3FF] transition"
                >
                  +91 9111720303
                </a>
              </li>
            </Reveal>
            <Reveal>
              <li className="flex items-center">
                <FaPhoneAlt className="text-[#00A3FF] mr-3" />
                <a
                  href="tel:+916264059829"
                  className="hover:text-[#00A3FF] transition"
                >
                  +91 6264059829
                </a>
              </li>
            </Reveal>
            <Reveal>
              <li className="flex items-center">
                <FaEnvelope className="text-[#00A3FF] mr-3" />
                <a
                  href="mailto:info@novarsistech.com"
                  className="hover:text-[#00A3FF] transition"
                >
                  info@novarsistech.com
                </a>
              </li>
            </Reveal>
          </ul>

          <div className="mt-5 text-sm">
            <Reveal>
              <h4 className="font-semibold text-white mb-1">Open Hours:</h4>
            </Reveal>
            <div className="space-y-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <Reveal key={day}>
                  <p>
                    {day}:{" "}
                    <span className="text-gray-300">10:00 am - 6:00 pm</span>
                  </p>
                </Reveal>
              ))}
              <Reveal>
                <p>Sunday: CLOSED</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ========== NEWSLETTER ========== */}
        <div>
          <Reveal>
            <h3 className="text-xl font-semibold mb-6 border-l-4 border-[#00A3FF] pl-3">
              Subscribe to our Newsletter
            </h3>
          </Reveal>
          <Reveal>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed text-justify">
              Stay informed with the latest trends in digital marketing, website
              development, and business technology. Our newsletter delivers
              curated tips, industry news, exclusive offers, and insights from
              our experts—all straight to your inbox. Whether you're a business
              owner or just starting out, you’ll always be one step ahead when
              you subscribe. You'll gain access to real-world strategies, case
              studies, and tools that are working today—not outdated tactics. We
              also share updates about our recent projects, success stories, and
              opportunities to collaborate. Our goal is to empower your growth
              and help you make smarter digital decisions. Join a growing
              community of professionals who trust us to deliver value that
              matters.
            </p>
          </Reveal>
          <div className="flex mt-4">
            <Reveal>
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 rounded-l-md text-black w-full outline-none"
              />
            </Reveal>
           
          </div>
        </div>

      <FooterContactForm/>
      </div>

      {/* ========== BOTTOM FOOTER ========== */}
      <div className="max-w-7xl mx-auto px-6 mt-16 border-t border-gray-800 pt-10 grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <Reveal>
            <img
              src="/Images/Novarsis-Logo-For-Footer-Pic-600x115.png"
              alt="Novarsis Tech"
              className="mb-3 h-12"
            />
          </Reveal>
          <Reveal>
            <p className="text-gray-400 mb-4 text-sm max-w-xs">
              We work with a passion for taking challenges and creating new ones
              in the advertising sector.
            </p>
          </Reveal>
          <div className="flex items-center gap-4 flex-wrap">
           
          </div>
        </div>

        {/* Center Section */}
        <div>
          <ul className="text-sm text-gray-300 space-y-2">
            <Reveal>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-[#00A3FF] mr-3" />
                <a
                  href="https://maps.app.goo.gl/1VWNa3CsZPsuK6YEA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A3FF] transition"
                >
                  Vijay Nagar, Indore, Madhya Pradesh
                </a>
              </li>
            </Reveal>
            <Reveal>
              <li className="flex items-center">
                <FaPhoneAlt className="text-[#00A3FF] mr-3" />
                <a
                  href="tel:+919111720303"
                  className="hover:text-[#00A3FF] transition"
                >
                  +91 9111720303
                </a>
                ,{" "}
                <a
                  href="tel:+916264059829"
                  className="hover:text-[#00A3FF] transition ml-1"
                >
                  +91 6264059829
                </a>
              </li>
            </Reveal>
            <Reveal>
              <li className="flex items-center">
                <FaEnvelope className="text-[#00A3FF] mr-3" />
                <a
                  href="mailto:info@novarsistech.com"
                  className="hover:text-[#00A3FF] transition"
                >
                  info@novarsistech.com
                </a>
              </li>
            </Reveal>
          </ul>
        </div>

        {/* Right Section */}
        <div>
      <h4 className="text-white font-semibold mb-3">Follow Us</h4>
      <div className="flex gap-3 flex-wrap">
        <a
          href="https://www.facebook.com/NovarsisTechindia/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md bg-[#111b2e] hover:bg-[#00A3FF] transition"
        >
          <FaFacebookF size={16} />
        </a>
        <a
          href="https://x.com/novarsistech_"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md bg-[#111b2e] hover:bg-[#00A3FF] transition"
        >
          <FaTwitter size={16} />
        </a>
        <a
          href="https://www.instagram.com/novarsistech/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md bg-[#111b2e] hover:bg-[#00A3FF] transition"
        >
          <FaInstagram size={16} />
        </a>
        <a
          href="https://www.linkedin.com/company/87981778/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md bg-[#111b2e] hover:bg-[#00A3FF] transition"
        >
          <FaLinkedinIn size={16} />
        </a>
      </div>
    </div>
      </div>

      {/* ========== COPYRIGHT ========== */}
      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm text-gray-400">
        <Reveal>
          <p>
            Copyright © 2025{" "}
            <span className="text-[#00A3FF]">Novarsis Technology</span> | All
            rights reserved.
          </p>
        </Reveal>
        <div className="mt-3 flex justify-center flex-wrap gap-3 text-xs">
          {[
            ["Our Team", "/about"],
            ["About Us", "/about"],
            ["Services", "/services"],
            ["Carrier", "/career"],
            ["Gallery", "/gallery"],
            ["FAQs", "/faq"],
            ["Contact Us", "/contact"],
          ].map(([label, path], i) => (
            <Link
              key={i}
              to={path}
              className="text-[#00A3FF] hover:underline transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed right-6 bottom-20 flex flex-col gap-4">
       <a
  href="tel:+919111720303"
  className="bg-white text-[#00A3FF] p-3 rounded-full shadow-lg hover:scale-110 transition"
>
  <FaPhoneAlt />
</a>
<a
  href="https://wa.me/919111720303"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-[#00A3FF] p-3 rounded-full shadow-lg hover:scale-110 transition"
>
  <FaWhatsapp />
</a>
        <Link
          to="/services"
          className="bg-white text-[#00A3FF] p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaBriefcase />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
