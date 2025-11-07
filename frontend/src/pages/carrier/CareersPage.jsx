import React, { useEffect } from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareers } from "../../slice/careerSlice";
import { motion } from "framer-motion";
import Reveal from "../../components/Reveal";

const CareersPage = () => {
  const dispatch = useDispatch();
  const { careers = [], loading, error } = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(fetchCareers());
  }, [dispatch]);

  // Function to mark new jobs
  const isNewJob = (dateStr) => {
    const createdDate = new Date(dateStr);
    const now = new Date();
    const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Images/novarsis-servicePage.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Reveal>
            <p className="text-gray-300 text-lg md:text-xl mb-2">
              <Link to={"/"} className="hover:text-blue-400 transition">
                Home
              </Link>
              <span className="text-blue-400 mx-1">/</span> Career
            </p>
          </Reveal>
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              Join Our Team
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Explore exciting opportunities and grow with Novarsis Tech. Creativity, passion, and innovation drive our success.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Career Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#00A3FF] mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join our team of talented professionals and contribute to innovative projects that make a difference.
            </p>
          </div>

          {/* Loading/Error */}
          {loading && <p className="text-center text-gray-600">Loading careers...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Career Cards Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.length > 0 ? (
              careers.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: job.id * 0.1 }}
                >
                  {/* Card Container */}
                  <div className="relative bg-white rounded-2xl border-l-4 border-blue-500 shadow-lg p-6 flex flex-col justify-between
                                  hover:scale-105 hover:shadow-2xl transform transition-transform duration-300">

                    {/* New Badge */}
                    {isNewJob(job.createdAt) && (
                      <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
                        New
                      </span>
                    )}

                    {/* Job Header */}
                    <div>
                      <h3 className="text-2xl font-semibold text-[#00A3FF] mb-3 flex items-center gap-2">
                        <Briefcase size={20} /> {job.title}
                      </h3>

                      {/* Job Meta */}
                      <div className="flex items-center gap-4 text-gray-600 mb-3 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} /> {job.type}
                        </span>
                        <span>Exp: {job.experience}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 line-clamp-4">{job.description}</p>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-auto text-center">
                      <Link
                        to={"/apply"}
                        className="inline-block bg-gradient-to-r from-[#00A3FF] to-[#1E3A8A] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              !loading && (
                <p className="text-center text-gray-500 col-span-full">
                  No career openings available right now.
                </p>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
