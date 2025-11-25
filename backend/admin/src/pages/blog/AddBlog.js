import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../../slice/blogSlice'; // ✅ Import from blog slice
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: null
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blog);
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await dispatch(addBlog(formDataToSend));
      toast.success('Blog added successfully!');
      navigate('/blogs/list');
    } catch (err) {
      console.error('Error adding blog:', err);
      toast.error('Failed to add blog');
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Add Blog</h4>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mx-4">
          {/* Title */}
          <div className="col-sm-12 mt-3">
            <label htmlFor="title" className="adminlables">
              Title
            </label>
            <input type="text" id="title" name="title" value={formData.title} className="form-control" onChange={handleChange} required />
          </div>

          {/* Description */}
          <div className="col-sm-12 mt-3">
            <label htmlFor="description" className="adminlables">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              className="form-control"
              rows="4"
              onChange={handleChange}
              required
            />
          </div>

          {/* Date */}
          <div className="col-sm-12 mt-3">
            <label htmlFor="date" className="adminlables">
              Date
            </label>
            <input type="date" id="date" name="date" value={formData.date} className="form-control" onChange={handleChange} required />
          </div>

          {/* Image */}
          <div className="col-sm-12 mt-3">
            <label htmlFor="image" className="adminlables">
              Upload Image
            </label>
            <input type="file" id="image" name="image" className="form-control" accept="image/*" onChange={handleChange} />
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="col-sm-12 mt-3">
              <img src={URL.createObjectURL(formData.image)} alt="preview" width="150" className="rounded" />
            </div>
          )}
        </div>

        <div className="mt-4 text-right mx-4">
          <button className="btn btn-lg addbtn" disabled={loading}>
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
