// src/pages/Career/AddCareer.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCareer } from '../../slice/careerSlice'; // Redux thunk action
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCareer = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-Time',
    experience: '',
    description: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.career);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addCareer(formData));

      toast.success(response?.message || 'Career added successfully!');
      navigate('/careers/list');
    } catch (error) {
      console.error('Error adding career:', error);
      toast.error(error?.message || 'Failed to add career');
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4 mb-4">
        <h4 className="text-white font-weight-bold">Add Career</h4>
      </div>

      <form onSubmit={handleSubmit} className="mx-4">
        {/* Title */}
        <div className="form-group mt-3">
          <label htmlFor="title" className="adminlables">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Location */}
        <div className="form-group mt-3">
          <label htmlFor="location" className="adminlables">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter job location"
            required
          />
        </div>

        {/* Type */}
        <div className="form-group mt-3">
          <label htmlFor="type" className="adminlables">
            Type
          </label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="form-control" required>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Experience */}
        <div className="form-group mt-3">
          <label htmlFor="experience" className="adminlables">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. 2-4 years"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group mt-3">
          <label htmlFor="description" className="adminlables">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Write job details..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right mt-4">
          <button type="submit" className="btn btn-lg addbtn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Career'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCareer;
