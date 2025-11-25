import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/service/${id}`);
        const data = res.data.data;

        setFormData({
          title: data.title || '',
          description: data.description || '',
          icon: data.icon || ''
        });
      } catch (err) {
        console.error('Error fetching service:', err);
        toast.error('Failed to load service details.');
      }
    };

    fetchService();
  }, [id, BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/service/${id}`, formData);
      toast.success('Service updated successfully!');
      navigate('/services/list');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update service!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Update Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Service Title
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

        <div>
          <label htmlFor="icon" className="block font-medium mb-1">
            Icon (URL or Class)
          </label>
          <input
            id="icon"
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
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

        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 mt-4 rounded hover:bg-blue-700 transition-all">
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateService;
