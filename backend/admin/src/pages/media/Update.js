import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneMedia, updateMedia } from 'slice/mediaSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { loading, data } = useSelector((state) => state.media);
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  useEffect(() => {
    dispatch(getOneMedia(id));
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

      dispatch(updateMedia({ id: id, data: formData }));
      toast('Media updated successfully!');
      nevigate('/media');
    } catch (error) {
      console.error('There was a problem updating the media:', error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
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
              Update Media
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
