import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateOurteam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null,
    existingImage: ''
  });

  // ✅ Base URL from .env
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch existing team member data
  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/team/${id}`);
        const data = res.data.data;

        setFormData({
          name: data.name || '',
          role: data.role || '',
          description: data.description || '',
          image: null,
          existingImage: data.image || ''
        });
      } catch (err) {
        console.error('Error fetching team member:', err);
        toast.error('Failed to load team member details.');
      }
    };

    fetchTeamMember();
  }, [id, BASE_URL]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('role', formData.role);
    dataToSend.append('description', formData.description);

    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    try {
      await axios.patch(`${BASE_URL}/team/${id}`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Team member updated successfully!');
      navigate('/ourteam');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update team member!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Update Team Member</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block font-medium mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
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
            rows="4"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Upload Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Change Image
          </label>
          <input id="image" type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
        </div>

        {/* Image Preview */}
        {formData.image ? (
          <img src={URL.createObjectURL(formData.image)} alt="preview" className="mt-2 w-40 h-40 object-cover rounded border" />
        ) : formData.existingImage ? (
          <img src={`${BASE_URL}team/${formData.existingImage}`} alt="existing" className="mt-2 w-40 h-40 object-cover rounded border" />
        ) : null}

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 mt-4 rounded hover:bg-blue-700 transition-all">
            Update Team Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOurteam;
