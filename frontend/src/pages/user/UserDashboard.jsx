import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="min-h-screen flex font-sans bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b text-center">
          <h2 className="text-xl font-bold text-[#345bf3]">User Dashboard</h2>
        </div>
        <div className="mt-6">
          <Link
            to="myprofile"
            className={`block px-6 py-3 hover:bg-[#345bf3] hover:text-white ${
              currentTab === "myprofile" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            My Profile
          </Link>
          <Link
            to="myjobs"
            className={`block px-6 py-3 hover:bg-[#345bf3] hover:text-white ${
              currentTab === "myjobs" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            My Job
          </Link>
          <Link
            to="mycourses"
            className={`block px-6 py-3 hover:bg-[#345bf3] hover:text-white ${
              currentTab === "mycourses" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            My Course
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
