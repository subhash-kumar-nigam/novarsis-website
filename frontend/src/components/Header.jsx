import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdOutlineApps,
  MdPhone,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import logo from "../../src/assets/images/Novarsis-Logo-1-scaled.webp";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full font-sans relative z-50">
      {/* 🔹 Top Bar */}
      <div className="bg-[#132A7E] text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          <span className="font-medium">Now Hiring:</span>

          <div className="flex items-center space-x-4">
            {/* 📧 Email */}
            <a
              href="mailto:info@novarsistech.com"
              className="flex items-center space-x-2 border-r border-white/30 pr-4 hover:text-[#32B6F6] transition-colors"
            >
              <MdEmail className="text-[#32B6F6]" />
              <span>info@novarsistech.com</span>
            </a>

            {/* 📍 Address */}
            <a
              href="https://maps.app.goo.gl/1VWNa3CsZPsuK6YEA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 border-r border-white/30 pr-4 hover:text-[#32B6F6] transition-colors"
            >
              <MdLocationOn className="text-[#32B6F6]" />
              <span>Vijay Nagar, Indore, Madhya Pradesh</span>
            </a>

            {/* 🔗 Social Icons */}
            <div className="flex items-center space-x-3 text-white text-lg">
              <a
                href="https://www.facebook.com/NovarsisTechindia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="cursor-pointer hover:text-[#32B6F6]" />
              </a>

              <a
                href="https://x.com/novarsistech_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="cursor-pointer hover:text-[#32B6F6]" />
              </a>

              <a
                href="https://www.linkedin.com/company/87981778/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="cursor-pointer hover:text-[#32B6F6]" />
              </a>

              <a
                href="https://www.instagram.com/novarsistech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="cursor-pointer hover:text-[#32B6F6]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Novarsis Tech" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 text-[#1C1C1C] font-medium">
            <li>
              <Link
                to="/"
                className="text-[#00A9F4] border-b-2 border-[#00A9F4] pb-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#00A9F4] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-[#00A9F4] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-[#00A9F4] transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-[#00A9F4] transition-colors"
              >
                FAQ
              </Link>
            </li>
              <li>
              <Link
                to="/career"
                className="hover:text-[#00A9F4] transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#00A9F4] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* 🔍 Search Icon → Opens Google */}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
            >
              <FiSearch className="text-xl text-[#00A9F4]" />
            </a>

            {/* Sidebar Trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
            >
              <MdOutlineApps className="text-2xl text-[#00A9F4]" />
            </button>

            {/* 📞 Phone Section */}
            <a
              href="tel:+919111720303"
              className="flex items-center space-x-2 hover:text-[#00A9F4] transition-colors"
            >
              <div className="bg-[#00A9F4] p-3 rounded-full text-white">
                <MdPhone className="text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Call Anytime</p>
                <p className="text-[#00A9F4] font-semibold text-lg leading-tight">
                  +91 9111720303
                </p>
              </div>
            </a>
          </div>

          {/* 🔹 Mobile Menu Button */}
          <button
            className="md:hidden border border-gray-300 rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <MdClose className="text-2xl text-[#00A9F4]" />
            ) : (
              <MdMenu className="text-2xl text-[#00A9F4]" />
            )}
          </button>
        </div>

        {/* 🔹 Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <ul className="flex flex-col space-y-3 p-5 text-[#1C1C1C] font-medium">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#00A9F4] border-b-2 border-[#00A9F4] pb-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A9F4]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A9F4]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A9F4]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A9F4]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A9F4]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ✅ Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
