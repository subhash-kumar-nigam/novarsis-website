import React, { useEffect, useState } from "react";
import Reveal from "../../components/Reveal";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState(6); // start with 6
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}gallery`
        );
        setImages(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleToggleView = () => {
    if (visibleImages >= images.length) {
      // View Less: reset to 6
      setVisibleImages(6);
    } else {
      // View More: add 3 more images
      setVisibleImages((prev) => Math.min(prev + 3, images.length));
    }
  };

  return (
    <>
        <section
                className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage:
                    "url('/Images/novarsis-servicePage.png')", // Replace with your actual image path
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0a0f1a]/70"></div>
          
                {/* Centered content */}
                <div className="relative z-10 text-center text-white">
                 <Reveal> <p className="text-gray-300 text-lg md:text-xl mb-2">
                   <Link to={"/"}>Home</Link>  <span className="text-blue-400 mx-1">/</span> Gallery
                  </p></Reveal>
              <Reveal>    <h1 className="text-4xl md:text-6xl font-bold">Gallery</h1></Reveal>
                </div>
          
                {/* Decorative circles (optional for right side design like image) */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <div className="w-16 h-16 border-4 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full"></div>
                  </div>
                </div>
              </section>
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && <p className="text-center text-gray-500">Loading images…</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.slice(0, visibleImages).map((image, index) => (
              <Reveal key={index}>
                <div className="rounded overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
                  <img
                    src={`${process.env.REACT_APP_BACKEND}gallery/${image.image}`}
                    alt={image.title || `Gallery item ${index + 1}`}
                    loading="lazy"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {image.title && (
                    <p className="text-center text-gray-700 mt-2">
                      {image.name}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Button toggles between View More / View Less */}
          {images.length > 6 && (
            <div className="text-center mt-10">
              <Reveal>
                <button
                  onClick={handleToggleView}
                  className="px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition duration-300"
                >
                  {visibleImages >= images.length ? "View Less" : "View More"}
                </button>
              </Reveal>
            </div>
          )}

          {!loading && !images.length && !error && (
            <p className="text-center text-red-500 mt-4">No Images Found!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
