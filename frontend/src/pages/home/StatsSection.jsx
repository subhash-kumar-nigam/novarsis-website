import React from "react";
import { FaUserTie, FaThumbsUp, FaCalendarAlt, FaSmile } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // only once per scroll
    threshold: 0.3, // start when 30% visible
  });

  const stats = [
    { icon: <FaUserTie size={40} />, number: 50, label: "Active Clients" },
    { icon: <FaThumbsUp size={40} />, number: 200, label: "Projects Completed" },
    { icon: <FaCalendarAlt size={40} />, number: 2, label: "Glorious Years" },
    { icon: <FaSmile size={40} />, number: 15, label: "Professional Team" },
  ];

  return (
    <section ref={ref} className="bg-[#03A9F4] text-white py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-6 mb-4">{item.icon}</div>
            <h2 className="text-4xl font-bold">
              {inView ? (
                <CountUp start={0} end={item.number} duration={2.5} suffix="+" />
              ) : (
                "0+"
              )}
            </h2>
            <div className="mt-4 border border-white/50 rounded-md px-6 py-2 font-semibold text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
