import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollToggleButton = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: isTop ? document.body.scrollHeight : 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-4 z-50 bg-gradient-to-br from-orange-500 to-yellow-400 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    >
      {isTop ? (
        <FaArrowDown className="text-xl" />
      ) : (
        <FaArrowUp className="text-xl" />
      )}
    </button>
  );
};

export default ScrollToggleButton;
