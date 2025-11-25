import React from "react";
import { FaStar } from "react-icons/fa";
import Reveal from "../../components/Reveal";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mansi Patel",
      review:
        "Very good IT company in Dubai. Helpful team and great service. I personally recommend them.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 4,
    },
    {
      name: "Simran Singh",
      review:
        "Best platform to grow your business through Novarsis Tech. Best services & experienced team.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
    {
      name: "Khushi Tiwari",
      review:
        "Outstanding service from Novarsis Tech and one of the best in the company. 👌",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
    {
      name: "Monika Singh",
      review:
        "Amazing development team, always on time and very professional. Highly recommended!",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
    {
      name: "Anya Agrawal",
      review:
        "Working with Novarsis was a great experience. The team is highly skilled and dedicated.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 4,
    },
    {
      name: "Ravi Patel",
      review:
        "Their innovative ideas and attention to detail helped us boost our business growth.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
    {
      name: "Sara Wilson",
      review:
        "Exceptional work! They delivered beyond expectations and before the deadline.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      review:
        "Top-notch IT services and excellent support team. Great communication throughout.",
      image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#001b5e] via-[#004aad] to-[#00a3ff] text-white">
      {/* Decorative Blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ffffff22,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#00a3ff33,transparent_60%)]"></div>

      {/* Heading */}
      <div className="relative text-center mb-16">
        <Reveal>
          <p className="text-[#b4e1ff] font-semibold uppercase tracking-widest">
            Client Testimonials
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            What Our <span className="text-[#00E0FF]">Clients Say</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-lg">
            Hear from our satisfied clients who trusted us to take their digital
            presence to the next level.
          </p>
        </Reveal>
      </div>

      {/* Testimonials Grid / Scroll */}
      <div className="relative max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 md:space-x-8 pb-4">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex-none w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/20 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,163,255,0.4)]"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <Reveal>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full border-4 border-[#00E0FF]/70 shadow-lg bg-[#004aad]/30 p-1"
                  />
                </Reveal>
              </div>

              {/* Review Text */}
              <Reveal>
                <p className="text-gray-100 text-center italic leading-relaxed mb-4">
                  “{t.review}”
                </p>
              </Reveal>

              {/* Name */}
              <Reveal>
                <h4 className="text-center font-semibold text-[#00E0FF] tracking-wide">
                  {t.name}
                </h4>
              </Reveal>

              {/* Rating */}
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl transition ${
                      i < t.rating ? "text-[#FFD700]" : "text-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <Reveal>
        <p className="text-center text-white/60 mt-8 text-sm">
          👉 Swipe or scroll to see more testimonials
        </p>
      </Reveal>
    </section>
  );
};

export default TestimonialsSection;
