import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addOurteam } from '../../slice/ourteamSlice';

const AddOurteam = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: null
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.team);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await dispatch(addOurteam(formDataToSend));
      toast.success('Team member added successfully!');
      navigate('/ourteam');
      setFormData({
        name: '',
        title: '',
        image: null
      });
    } catch (error) {
      console.error('There was a problem adding the team member:', error.message);
      toast.error('Failed to add team member!');
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Add Team Member</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row mx-4">
            {/* Name */}
            <div className="col-sm-12 mt-4">
              <label htmlFor="name" className="adminlables">
                Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
            </div>

            {/* Title */}
            <div className="col-sm-12 mt-4">
              <label htmlFor="title" className="adminlables">
                Title
              </label>
              <input type="text" id="title" name="title" value={formData.title} className="form-control" onChange={handleChange} required />
            </div>

            {/* Image */}
            <div className="col-sm-12 mt-4">
              <label htmlFor="image" className="adminlables">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control btn-block filebg"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="mt-5 text-right mx-4">
            <button className="btn btn-lg addbtn" disabled={loading}>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddOurteam;
