import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../slice/blogSlice";
import { motion } from "framer-motion";

const BlogSection = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-center py-10 text-gray-600">No blogs found.</div>;
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-5 md:px-16">
      <div className="text-center mb-12">
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Latest news, insights, and stories from our team to keep you updated.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id || blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            {/* Image with zoom effect */}
            <div className="relative overflow-hidden h-64">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL_REL}../uploads/blogs/${blog.image}`}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-400 mb-2">
                📅 {new Date(blog.date).toLocaleDateString("en-GB")}
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#00A3FF] transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {blog.description}
              </p>
             
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
