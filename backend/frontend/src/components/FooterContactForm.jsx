import React, { useState, useEffect } from "react";
import Reveal from "./Reveal";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, clearContactStatus } from "../slice/contactSlice";

const FooterContactForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(submitContactForm(formData));
    }
    setErrors(validationErrors);
  };

  // ✅ Clear form and status
  useEffect(() => {
    if (success || error) {
      if (success) {
        setFormData({ name: "", mobile: "", subject: "", message: "" });
        setErrors({});
      }
      const timer = setTimeout(() => dispatch(clearContactStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div className="bg-[#1f3c88] rounded-xl p-6">
      <Reveal>
        <h3 className="text-xl font-semibold mb-4 text-center text-white">
          Contact Us
        </h3>
      </Reveal>

      {success && (
        <p className="text-green-400 text-center mb-2">
          Message sent successfully!
        </p>
      )}
      {error && <p className="text-red-400 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Reveal>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-white bg-[#111b2e] placeholder-gray-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </Reveal>

        <Reveal>
          <input
            type="tel"
            name="mobile"
            placeholder="Phone Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-white bg-[#111b2e] placeholder-gray-400 focus:outline-none"
          />
          {errors.mobile && (
            <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
          )}
        </Reveal>

        <Reveal>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-white bg-[#111b2e] placeholder-gray-400 focus:outline-none"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </Reveal>

        <Reveal>
          <textarea
            name="message"
            placeholder="Message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-white bg-[#111b2e] placeholder-gray-400 focus:outline-none"
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </Reveal>

        <Reveal>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A3FF] hover:bg-[#008AD6] text-white font-semibold py-3 rounded-md transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </Reveal>
      </form>
    </div>
  );
};

export default FooterContactForm;
