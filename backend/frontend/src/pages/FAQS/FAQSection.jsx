import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs } from "../../slice/faqSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../components/Reveal";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleFAQs, setVisibleFAQs] = useState(3);
  const dispatch = useDispatch();

  const { faqs, loading, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleToggleView = () => {
    setVisibleFAQs(visibleFAQs >= faqs.length ? 3 : faqs.length);
  };

  if (loading) return <p className="text-center">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Images/novarsis-servicePage.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Reveal>
            <p className="text-gray-300 text-lg md:text-xl mb-2">
              <Link to={"/"} className="hover:text-blue-400 transition">
                Home
              </Link>{" "}
              <span className="text-blue-400 mx-1">/</span> FAQS
            </p>
          </Reveal>
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              Frequently Asked Questions
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FAQ Cards Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {faqs?.length > 0 ? (
            faqs.slice(0, visibleFAQs).map((faq, index) => (
              <Reveal key={faq.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg border-l-4 border-blue-500 p-6 cursor-pointer hover:shadow-2xl transition-all duration-300`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="text-blue-500" />
                    ) : (
                      <ChevronDown className="text-blue-500" />
                    )}
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-3 text-gray-600 text-justify"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            ))
          ) : (
            <p className="text-center text-gray-600">No FAQs available.</p>
          )}

          {/* View More / View Less Button */}
          {faqs.length > 3 && (
            <div className="text-center mt-8">
              <Reveal>
                <button
                  onClick={handleToggleView}
                  className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold rounded-full hover:scale-105 transition transform duration-300 shadow-md hover:shadow-lg"
                >
                  {visibleFAQs >= faqs.length ? "View Less" : "View More"}
                </button>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FAQSection;
