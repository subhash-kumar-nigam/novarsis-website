import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {

  FaPhoneAlt,
  FaPaperPlane,
  FaBriefcase,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 🔹 Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* 🔹 Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-white to-blue-50 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ❌ Close Button */}
        <button
          className="absolute top-5 right-5 text-2xl text-gray-600 hover:text-blue-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 🔹 Sidebar Content */}
        <div className="p-8 mt-10 space-y-8">
          {/* 🏢 About Section */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3">
              About Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We help businesses grow globally with innovative, customized, and
              result-driven strategies.
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition"
            >
              CONTACT US
            </a>
          </div>

          {/* 📞 Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3">
              Contact Info
            </h2>
            <ul className="text-gray-700 space-y-3">
              {/* 🗺️ Address (Opens in Google Maps) */}
              <li>
                <a
                  href="https://maps.app.goo.gl/1VWNa3CsZPsuK6YEA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  Vijay Nagar, Indore, Madhya Pradesh
                </a>
              </li>

              {/* 📞 Phone Numbers (Clickable) */}
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-600" />
                <div className="flex flex-col">
                  <a
                    href="tel:+919111720303"
                    className="hover:text-blue-600 transition"
                  >
                    +91 9111720303
                  </a>
                  <a
                    href="tel:+916264059829"
                    className="hover:text-blue-600 transition"
                  >
                    +91 6264059829
                  </a>
                </div>
              </li>

              {/* 📧 Email (Opens Mail App) */}
              <li>
                <a
                  href="mailto:info@novarsistech.com"
                  className="text-blue-600 hover:underline"
                >
                  info@novarsistech.com
                </a>
              </li>
            </ul>
          </div>

          {/* 🌐 Social Media Links */}
      <div className="flex gap-3 pt-4">
  <a
    href="https://www.facebook.com/NovarsisTechindia/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-110"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/novarsistech_"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-110"
  >
    <FaTwitter />
  </a>

  <a
    href="https://www.linkedin.com/company/87981778/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-110"
  >
    <FaLinkedinIn />
  </a>

  <a
    href="https://www.instagram.com/novarsistech/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-110"
  >
    <FaInstagram />
  </a>
</div>
        </div>

        {/* ⚡ Floating Action Buttons (Bottom Right) */}
        <div className="fixed bottom-10 right-6 flex flex-col gap-3">
          {/* Call Button */}
          <a
            href="tel:+919111720303"
            className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            <FaPhoneAlt />
          </a>

          {/* WhatsApp or Message Button */}
          <a
            href="https://wa.me/919111720303"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition"
          >
            <FaPaperPlane />
          </a>

          {/* Career / Jobs Button */}
          <a
            href="/careers"
            className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            <FaBriefcase />
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
