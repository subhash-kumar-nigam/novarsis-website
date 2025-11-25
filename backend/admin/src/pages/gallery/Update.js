import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneGallery, updateGallery } from 'slice/gallerySlice';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { loading, data } = useSelector((state) => state.gallery);
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  useEffect(() => {
    dispatch(getOneGallery(id));
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
      console.log(formData);
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      dispatch(updateGallery({ id: id, data: formData }));
      toast('Product updated successfully!');
      nevigate('/gallery');
    } catch (error) {
      console.error('There was a problem updating the product:', error.message);
    }
  };

  return (
    <>
      <div className="container card my-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-4 mt-2">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="name"
                defaultValue={formData.name}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 text-right">
            <button className="btn btn-success" disabled={loading}>
              Update Gallery
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
