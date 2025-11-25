import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postRequest } from "../../apis/ApiInstence";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        password: formData.password,
      };

      const response = await postRequest("customer", payload);

      if (response?.status === 200) {
        await Swal.fire({
          title: "Registration Successful",
          text: "You have registered successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login", { state: formData.email });
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow">
        <h2 className="text-3xl font-bold text-center text-[#fc3c04] mb-8">
          Create Your <span className="text-[#345bf3]">Account</span> 
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Mobile</label>
            <input
              name="mobile"
              type="tel"
              placeholder="Enter Your Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={inputClass("mobile")}
            />
            {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Address</label>
            <textarea
              name="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass("address")}
              rows={1}
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-[#345bf3]">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass("password")}
            />
            {errors.password && <p className="text-red-600 text-sm ">{errors.password}</p>}
          </div>

          <div>

          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#345bf3] hover:bg-[#fc3c04] hover:text-white text-white font-semibold rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-lg text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#fc3c04] font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;