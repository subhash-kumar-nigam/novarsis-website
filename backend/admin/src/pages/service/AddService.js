import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../../slice/serviceSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);

      await dispatch(addService(data));
      toast.success('Service added successfully!');
      navigate('/services/list');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4 mb-4">
        <h4 className="text-white font-weight-bold">Add Service</h4>
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
            placeholder="Enter service title"
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
            placeholder="Write about the service..."
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group mt-3">
          <label htmlFor="image" className="adminlables">
            Upload Image
          </label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} className="form-control" />
        </div>

        {/* Submit */}
        <div className="text-right mt-4">
          <button type="submit" className="btn btn-lg addbtn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
