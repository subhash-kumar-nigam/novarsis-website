import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postRequest } from "../../apis/ApiInstence";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await postRequest("customer/login", {
        identifier: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        Swal.fire("Login Successful", "", "success");

        // ✅ Save token and userId to localStorage
        localStorage.setItem("token", response.data?.access_token);
        localStorage.setItem("userId", response.data?.userId);
        console.log("Login Response:", response.data); // 👈 Add this line

        // ✅ Redirect to user dashboard
        navigate("/user");
      }
    } catch (err) {
      Swal.fire("Login Failed", err?.response?.data?.message || "Error occurred", "error");
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow">
        <h2 className="text-3xl font-bold text-center text-[#fc3c04] mb-8">Log In</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass("password")}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#345bf3] hover:bg-[#fc3c04] hover:text-white text-white font-semibold rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* 👇 Signup section */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#fc3c04] hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
