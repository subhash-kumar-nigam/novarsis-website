import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../slice/teamSlice";
import { motion } from "framer-motion";

const TeamPage = () => {
  const dispatch = useDispatch();
  const { team = [], loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00A3FF] mb-4">
          Our Expert Team
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Meet the passionate individuals who drive innovation and excellence at Novarsis Tech.
        </p>

        {loading && <p className="text-gray-600">Loading team members...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.length > 0 ? (
            team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={
                      member.image
                        ? `${process.env.REACT_APP_BACKEND_URL_REL}../uploads/teams/${member.image}`
                        : "/Images/default-user.png"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Overlay info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#00A3FF] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{member.title}</p>
                  
                </div>
              </motion.div>
            ))
          ) : (
            !loading && <p className="text-gray-500 col-span-full">No team members found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
