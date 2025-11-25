import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import Reveal from "../../components/Reveal";

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      title:
        "Bridging Creativity and Code: Why Web Design and Development Work Best Together?",
      desc: "Your website isn’t just a digital placeholder – it’s your brand’s voice online. For a business to shine, design and development must work together as a unified force.",
      category: "Web Designing",
      date: "Jul, Sat, 2025",
      author: "Novarsis Tech",
      image: "/Images/novarsis-blog1.webp",
      link: "#",
    },
    {
      id: 2,
      title: "Design & Animations: Crafting Digital Experiences That Captivate.",
      desc: "In today’s digital world, standing out means delivering a memorable visual experience that connects and engages your audience effectively.",
      category: "Branding & Direction",
      date: "Jul, Sat, 2025",
      author: "Novarsis Tech",
      image: "/Images/novarsis-blog2.webp",
      link: "#",
    },
    {
      id: 3,
      title: "Paid Ads: A Modern Strategy for Fast and Targeted Growth.",
      desc: "Reaching your audience is tough without a solid plan. Paid ads give quick visibility, detailed targeting, and real-time measurable growth for brands.",
      category: "Paid Advertisement",
      date: "Jul, Sat, 2025",
      author: "Novarsis Tech",
      image: "/Images/novarsis-blog1.webp",
      link: "#",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 font-sans">
      {/* Heading */}
      <div className="text-center mb-12">
        <Reveal>
          <p className="text-[#3278C6] font-semibold uppercase tracking-wider">
            What’s Happening
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3F] mt-2">
            Latest News & Articles from the{" "}
            <span className="text-[#3278C6]">Posts</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Amet consectetur adipiscing elit sed eiusmod ex tempor incididunt
            labore dolore magna aliqua enim ad minim veniam.
          </p>
        </Reveal>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden group transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.03]"
          >
            {/* Animated Border (Left Side) */}
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#3278C6] to-[#0B1B3F] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"></div>

            <div className="relative overflow-hidden">
              <Reveal>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Reveal>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Reveal>
                <span className="absolute top-3 left-3 bg-[#3278C6] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {post.category}
                </span>
              </Reveal>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <Reveal>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-[#3278C6]" /> {post.author}
                  </div>
                </Reveal>
                <Reveal>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#3278C6]" /> {post.date}
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <h3 className="text-lg font-bold text-[#0B1B3F] hover:text-[#3278C6] transition-colors duration-300">
                  {post.title}
                </h3>
              </Reveal>

              <Reveal>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {post.desc}
                </p>
              </Reveal>

              <Reveal>
                <a
                  href={post.link}
                  className="inline-block mt-4 text-[#3278C6] font-medium hover:underline"
                >
                  Read More →
                </a>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
