import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: null,
    existingImage: ''
  });

  // ✅ Base URL from .env
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const IMAGE_PATH = process.env.REACT_APP_BACKEND;

  // ✅ Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blog/${id}`);
        const blog = res.data.data;

        setFormData({
          title: blog.title || '',
          description: blog.description || '',
          date: blog.date ? blog.date.slice(0, 10) : '',
          image: null,
          existingImage: blog.image || ''
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
        toast.error('Failed to load blog details.');
      }
    };

    fetchBlog();
  }, [id, BASE_URL]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.patch(`${BASE_URL}/blog/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Blog updated successfully!');
      navigate('/blogs/list');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update blog!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Update Blog</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
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

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            rows="4"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Image
          </label>
          <input id="image" type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
        </div>

        {/* Image Preview */}
        <div className="mt-2">
          {formData.image ? (
            <img src={URL.createObjectURL(formData.image)} alt="preview" width={180} className="rounded-md border" />
          ) : formData.existingImage ? (
            <img
              src={formData.existingImage.startsWith('http') ? formData.existingImage : `${IMAGE_PATH}${formData.existingImage}`}
              alt="existing"
              width={180}
              className="rounded-md border"
            />
          ) : null}
        </div>

        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 mt-4 rounded hover:bg-blue-700 transition-all">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
