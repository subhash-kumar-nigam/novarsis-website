import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  // ✅ Base URL from .env
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch existing FAQ data
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/faq/${id}`);
        const data = res.data.data;

        setFormData({
          question: data.question || '',
          answer: data.answer || ''
        });
      } catch (err) {
        console.error('Error fetching FAQ:', err);
        toast.error('Failed to load FAQ details.');
      }
    };

    fetchFaq();
  }, [id, BASE_URL]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/faq/${id}`, formData);
      toast.success('FAQ updated successfully!');
      navigate('/faqs/list');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update FAQ!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Update FAQ</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question */}
        <div>
          <label htmlFor="question" className="block font-medium mb-1">
            Question
          </label>
          <input
            id="question"
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Answer */}
        <div>
          <label htmlFor="answer" className="block font-medium mb-1">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 mt-4 rounded hover:bg-blue-700 transition-all">
            Update FAQ
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFaq;
