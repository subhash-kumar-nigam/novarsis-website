import React, { useState, useEffect } from "react";

const Top = () => {
  const [visible, setVisible] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-[#345bf3] hover:bg-[#fc3c04] text-white rounded-full px-6 py-3 font-semibold shadow-lg flex items-center gap-2 z-50"
      aria-label="Back to Top"
    >
       <span style={{ fontSize: "1.2rem" }}>↑</span>
    </button>
  );
};

export default Top;
