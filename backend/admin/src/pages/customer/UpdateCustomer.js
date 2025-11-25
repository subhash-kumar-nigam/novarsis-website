import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCustomer, updateCustomer } from 'slice/customerSlice'; // Import your action creator to fetch a single product
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCustomer = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { loading, data } = useSelector((state) => state.customer);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  useEffect(() => {
    dispatch(getOneCustomer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData)
      // const formDataToSend = new FormData();
      // for (const key in formData) {
      //     formDataToSend.append(key, formData[key]);
      // }

      dispatch(updateCustomer({ id: id, data: formData }));
      toast('Customer updated successfully!');
      nevigate('/customer');
    } catch (error) {
      console.error('There was a problem updating the product:', error.message);
    }
  };

  return (
    <>
      <div className="container card my-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6 mt-2">
              <label htmlFor="productName">Customer Name</label>
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
              <label htmlFor="productName">Customer Mobile</label>
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
              <label htmlFor="productName">Customer Address</label>
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
          <div className="mt-3 text-right">
            <button className="btn btn-success" disabled={loading}>
              Update Banner
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCustomer;
