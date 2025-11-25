import React from "react";
import missionImage from "../../assets/images/Schools-Infrastructure.jpg"; 
import { Link } from "react-router-dom";

const OurMission = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl text-[#1a237e] font-bold mb-4 border-b-4 border-yellow-400 inline-block pb-1">
            Our <span className="text-orange-500">Mission</span> 
          </h2>
          <p className="text-gray-700 mb-6">
            The International Public  School prepares students to understand, contribute to, 
            and succeed in a rapidly changing society, thus making the world a 
            better and more just place. We will ensure that our students get 
            the full perks of studying in the best cbse school in Bhopal and 
            develop both the skills that a sound education provides and the 
            competencies essential for success and leadership in the emerging 
            creative economy.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>To introduce co-curricular learning and ensure holistic development.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>To make the child confident and ready to step out in today’s global scenario.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>To promote openness, respect and bring out tolerance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>To provide a vibrant atmosphere for quality education.</span>
            </li>
          </ul>
          <Link to="/about" className="bg-orange-500 text-white font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition">
            Read More
          </Link>
        </div>

        {/* Right image */}
        <div className="lg:w-1/2">
          <img 
            src={missionImage} 
            alt="Our Mission" 
            className="w-full rounded-lg shadow-md" 
          />
        </div>
      </div>
    </section>
  );
};

export default OurMission;
