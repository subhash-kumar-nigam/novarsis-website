import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyCourse = () => {
  const [myCourses, setMyCourses] = useState([]);
  const user = useSelector((state) => state.user.response);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/order/my-courses/${user.id}`);
        const data = await res.json();
        setMyCourses(data.courses || []);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-[#fc3c04]">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          myCourses.map((course) => (
            <div key={course.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-1 text-[#345bf3]">{course.title}</h2>
              <p className="text-sm text-[#345bf3] mt-1">Fee: ₹{course.fee}</p>
              <p className="text-sm text-[#345bf3]">Category: {course.category}</p>
              <img src={`${process.env.REACT_APP_BACKEND_URL_REL}${course.image}`} alt={course.title} className="w-full h-48 object-cover rounded mt-3"/>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyCourse;
