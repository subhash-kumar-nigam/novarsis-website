import React from "react";
import Reveal from "../../components/Reveal";

const steps = [
  {
    step: "01",
    title: "Contact Us",
    description:
      "Reach out to our team through call, email, or our contact form. Let’s discuss your goals and business needs.",
    image: "/Images/novarsis-technology1.webp",
  },
  {
    step: "02",
    title: "Get a Quote",
    description:
      "We analyse your requirements and share a tailored plan. No strings attached, just expert & best advice for your growth.",
    image: "/Images/novarsis-technology2.webp",
  },
  {
    step: "03",
    title: "Novarsis Magic Begins",
    description:
      "Our skilled team designs and develops your solution. We keep you updated at every milestone.",
    image: "/Images/novarsis-technology3.webp",
  },
  {
    step: "04",
    title: "Testing & Refinement",
    description:
      "Rigorous testing to ensure top performance and quality. We fine-tune everything for your satisfaction.",
    image: "/Images/novarsis-technology4.webp",
  },
  {
    step: "05",
    title: "Grow Your Business",
    description:
      "Your project goes live, backed by Novarsis support. Watch your business succeed and scale digitally.",
    image: "/Images/novarsis-technology5.webp",
  },
];

const StepsSection = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <Reveal>
          <p className="text-sky-600 font-semibold uppercase tracking-wide">
            In just 5 steps
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How to <span className="text-sky-600">Scale your Business</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Develop, Design & Scale your business, generate quality leads, and
            boost your reach — all made simple with Novarsis Tech.
          </p>
        </Reveal>
      </div>

      {/* Steps Section */}
      <div className="relative mt-20 flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute w-[2px] bg-gray-200 h-full left-1/2 transform -translate-x-1/2 z-0"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row items-center mb-24 w-full max-w-6xl 
              transition-transform duration-500 transform hover:scale-[1.03] hover:-translate-y-2
              ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image Section */}
            <div className="md:w-1/2 w-full flex justify-center z-10">
              <Reveal>
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-xl shadow-lg w-[85%] object-cover border-l-4 border-r-4 border-[#00A3FF] transition-transform duration-500 hover:scale-105"
                />
              </Reveal>
            </div>

            {/* Text Card */}
            <div
              className={`md:w-1/2 w-full bg-white rounded-xl shadow-lg p-8 z-10 mt-8 md:mt-0
              border-l-4 border-r-4 border-[#00A3FF] transition-transform duration-500 hover:scale-105
              ${index % 2 === 0 ? "md:ml-[-100px]" : "md:mr-[-100px]"}`}
            >
              <Reveal>
                <p className="text-sky-600 font-semibold text-sm mb-1">
                  {step.step}
                </p>
              </Reveal>
              <Reveal>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
              </Reveal>
              <Reveal>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </Reveal>
            </div>

            {/* Step Number Background */}
            <h4
              className={`absolute top-1/2 transform -translate-y-1/2 text-[80px] md:text-[100px] font-extrabold text-sky-500 opacity-10 select-none
              ${index % 2 === 0 ? "left-12 md:left-0" : "right-12 md:right-0"}`}
            >
              Step {index + 1}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
