import React from "react";
import { motion } from "framer-motion";
// import { FaPhoneAlt, FaTelegramPlane, FaEnvelope } from "react-icons/fa";

const ScrollingBanner = () => {
  const text =
    "Grow Digitally With Us * Data-Driven Results * Targeted Strategies * Social Media Success * Search Engine Mastery * Continuous Growth * ";

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-white via-[#f9fbff] to-white py-8">
      {/* Scrolling Text */}
      <motion.div
        className="whitespace-nowrap text-[6rem] font-extrabold text-[#142b66] tracking-[0.15em] leading-tight"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="mx-10">
            {text.split("*").map((part, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-block">{part.trim()}</span>
                {idx < text.split("*").length - 1 && (
                  <motion.span
                    className="inline-block mx-12 text-[#0097FF] text-[6.5rem] font-bold"
                    whileHover={{
                      rotate: 360,
                      scale: 1.3,
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }}
                  >
                    *
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </span>
        ))}
      </motion.div>

      {/* Floating Contact Icons (Right side)
      <div className="fixed right-8 bottom-20 flex flex-col gap-4 z-50">
        {[
          { icon: <FaPhoneAlt />, bg: "bg-[#E8F5FF]" },
          { icon: <FaTelegramPlane />, bg: "bg-[#E8F5FF]" },
          { icon: <FaEnvelope />, bg: "bg-[#E8F5FF]" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`${item.bg} p-4 rounded-full text-[#0097FF] shadow-md cursor-pointer`}
            whileHover={{
              scale: 1.25,
              rotate: 360,
              transition: { duration: 0.6 },
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default ScrollingBanner;
