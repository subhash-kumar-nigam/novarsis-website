import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-Time',
    experience: '',
    description: ''
  });

  // ✅ Base URL from .env
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch existing career data
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/career/${id}`);
        const data = res.data.data;

        setFormData({
          title: data.title || '',
          location: data.location || '',
          type: data.type || 'Full-Time',
          experience: data.experience || '',
          description: data.description || ''
        });
      } catch (err) {
        console.error('Error fetching career:', err);
        toast.error('Failed to load career details.');
      }
    };

    fetchCareer();
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
      await axios.patch(`${BASE_URL}/career/${id}`, formData);
      toast.success('Career updated successfully!');
      navigate('/careers/list');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update career!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Update Career</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Job Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="type" className="block font-medium mb-1">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block font-medium mb-1">
            Experience
          </label>
          <input
            id="experience"
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 mt-4 rounded hover:bg-blue-700 transition-all">
            Update Career
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCareer;
