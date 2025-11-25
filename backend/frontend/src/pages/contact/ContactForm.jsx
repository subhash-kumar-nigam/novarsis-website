import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, clearContactStatus } from "../../slice/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(submitContactForm(formData));
    }
    setErrors(validationErrors);
  };

  useEffect(() => {
    if (success || error) {
      if (success) {
        setFormData({ name: "", mobile: "", subject: "", message: "" });
        setErrors({});
      }
      setTimeout(() => dispatch(clearContactStatus()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#fc3c04] mb-2">
          Contact <span className="text-[#345bf3]">Us</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you! Fill out the form below and our team will get back to you soon.
        </p>

        {success && (
          <p className="text-green-600 text-center mb-3">Message sent successfully!</p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#345bf3] transition"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#345bf3] transition"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#345bf3] transition"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#345bf3] transition"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#fc3c04] to-[#345bf3] text-white font-semibold py-3 rounded-md shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
