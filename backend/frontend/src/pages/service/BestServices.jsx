import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../slice/serviceSlice";
import { motion } from "framer-motion";

const ServiceSection = () => {
  const dispatch = useDispatch();
  const { services = [], loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading Services...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
      
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide top-notch services to help your business grow. Explore our offerings below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL_REL}../uploads/services/${service.image}`}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1a237e] mb-3 hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-justify mb-4 line-clamp-5">
                  {service.description}
                </p>
                
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No services available.</p>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
