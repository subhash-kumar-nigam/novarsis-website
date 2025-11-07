import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitApplyForm,
  clearApplyFormStatus,
} from "../../slice/applyFormSlice";

const ApplyForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.applyForm);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Validate input fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.number || !/^\d{10}$/.test(formData.number))
      newErrors.number = "Enter a valid 10-digit mobile number.";
    if (!formData.experience)
      newErrors.experience = "Experience is required.";
    if (!formData.currentCTC) newErrors.currentCTC = "Current CTC is required.";
    if (!formData.expectedCTC)
      newErrors.expectedCTC = "Expected CTC is required.";
    if (!formData.resume) newErrors.resume = "Please upload your resume.";
    return newErrors;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      dispatch(submitApplyForm(formDataToSend));
    }
    setErrors(validationErrors);
  };

  // ✅ Clear status and reset form after success/error
  useEffect(() => {
    if (success || error) {
      if (success) {
        setFormData({
          name: "",
          email: "",
          number: "",
          experience: "",
          currentCTC: "",
          expectedCTC: "",
          resume: null,
        });
        setErrors({});
      }
      setTimeout(() => dispatch(clearApplyFormStatus()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#fc3c04] mb-2">
          Apply <span className="text-[#345bf3]">Now</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Fill out the form below and our HR team will reach out to you soon.
        </p>

        {success && (
          <p className="text-green-600 text-center mb-3">
            Application submitted successfully!
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Number */}
          <div>
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <input
              type="text"
              name="experience"
              placeholder="Total Experience (in years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Current CTC */}
          <div>
            <input
              type="text"
              name="currentCTC"
              placeholder="Current CTC (in LPA)"
              value={formData.currentCTC}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.currentCTC && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentCTC}
              </p>
            )}
          </div>

          {/* Expected CTC */}
          <div>
            <input
              type="text"
              name="expectedCTC"
              placeholder="Expected CTC (in LPA)"
              value={formData.expectedCTC}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.expectedCTC && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expectedCTC}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345bf3] outline-none"
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#fc3c04] to-[#345bf3] text-white font-semibold py-3 rounded-md shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplyForm;
