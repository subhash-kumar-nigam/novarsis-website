import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addOurteam } from 'slice/ourteamSlice';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);
  const nevigate = useNavigate();

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
      dispatch(addOurteam(formDataToSend));
      toast('User added successfully!');
      nevigate('/users');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: ''
      });
    } catch (error) {
      console.error('There was a problem adding the user:', error.message);
    }
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold ">Add User</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 mt-2">
              <label htmlFor="userName">Name</label>
              <input type="text" id="userName" name="name" defaultValue={formData.name} className="form-control" onChange={handleChange} />
            </div>
            <div className="col-sm-12 mt-2">
              <label htmlFor="email">email</label>
              <input type="email" defaultValue={formData.email} className="form-control" onChange={handleChange} name="email" id="email" />
            </div>

            <div className="col-sm-12 mt-2">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                defaultValue={formData.mobile}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 mt-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={formData.address}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 text-right mx-4">
            <button className="btn btn-lg addbtn" disabled={loading}>
              Add User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
