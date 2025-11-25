import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const FixedContactButtons = () => {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 space-y-3 pr-1">
      {/* Phone Button */}
      <a
        href="tel:+917566064764"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-l-lg shadow-lg flex items-center justify-center"
      >
        <FaPhoneAlt className="text-xl" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917566064764"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-l-lg shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp className="text-xl" />
      </a>
    </div>
  );
};

export default FixedContactButtons;
