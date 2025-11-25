import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGallery } from 'slice/gallerySlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null
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

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      dispatch(addGallery(formDataToSend));
      toast('Gallery added successfully!');
      nevigate('/gallery');
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
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold ">Add Gallery</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mx-4">
            <div className="col-sm-12 mt-2">
              <label htmlFor="productName" className="adminlables">
                Title
              </label>
              <input
                type="text"
                id="productName"
                name="name"
                defaultValue={formData.name}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 mt-4">
              <label htmlFor="productName" className="adminlables">
                Image
              </label>
              <input
                type="file"
                id="productName"
                name="image"
                defaultValue={formData.image}
                className="form-control btn-block filebg"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 text-right mx-5">
            <button className="btn addbtn btn-lg" disabled={loading}>
              Add Gallery
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
