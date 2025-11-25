import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from 'slice/customerSlice';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);
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

    // const formDataToSend = new FormData();
    // for (const key in formData) {
    //     formDataToSend.append(key, formData[key]);
    // }
    try {
      dispatch(addCustomer(formData));
      toast('Customer added successfully!');
      nevigate('/customer');
      setFormData({
        name: '',
        image: null
      });
    } catch (error) {
      console.error('There was a problem adding the product:', error.message);
    }
  };

  return (
    <>
      <div className="container-fluidmt-5d">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold ">Add Banner</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6 mt-2">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                id="productName"
                name="name"
                defaultValue={formData.name}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-6 mt-2">
              <label htmlFor="productName">Mobile</label>
              <input
                type="text"
                id="productName"
                name="mobile"
                defaultValue={formData.mobile}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 mt-2">
              <label htmlFor="productName">Address</label>
              <input
                type="text"
                id="productName"
                name="address"
                defaultValue={formData.address}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 text-right mx-4">
            <button className="btn addbtn" disabled={loading}>
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
