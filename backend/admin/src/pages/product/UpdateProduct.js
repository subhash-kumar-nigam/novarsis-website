import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from 'slice/productSlice';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from 'slice/productSlice';
const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { loading, data } = useSelector((state) => state.product);
  const [formData, setFormData] = useState({
    name: '',
    sprice: '',
    type: '',
    size: '',
    offer: '',
    stock: '',
    pdf: null,
    image: null,
    description: '',
    Updateimage: null
  });

  useEffect(() => {
    dispatch(getOneProduct(id));
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
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      dispatch(updateProduct({ id: id, data: formDataToSend }));
      toast('Product updated successfully!');
      nevigate('/products');
    } catch (error) {
      console.error('There was a problem updating the product:', error.message);
    }
  };

  return (
    <>
      <div className="container-fluid px-lg-5">
        <div className="mainheadig">
          <h4 className="text-white font-weight-bold "> Update Product</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row p-3">
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
            <div className="col-sm-4 mt-2">
              <label htmlFor="productName">Product Price</label>
              <input
                type="text"
                id="productName"
                name="sprice"
                defaultValue={formData.sprice}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-4 mt-2">
              <label htmlFor="productName">Product Size</label>
              <input
                type="text"
                id="productName"
                name="unit"
                defaultValue={formData.unit}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-6 mt-2">
              <label htmlFor="productName">Offer</label>
              <input
                type="text"
                id="productName"
                name="offer"
                defaultValue={formData.offer}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-6 mt-2">
              <label htmlFor="productName">Quantity</label>
              <input
                type="text"
                id="productName"
                name="quantity"
                defaultValue={formData.quantity}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 mt-2">
              <label htmlFor="productName">Description</label>
              <textarea
                rows={5}
                name="long_description"
                defaultValue={formData.long_description}
                className="form-control"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-sm-4">
              <input type="file" name="Updateimage" id="Updateimage" onChange={handleChange} />
            </div>
            <div className="col-sm-4">
              <img src={`${process.env.REACT_APP_BACKEND}uploads/${formData.image}`} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="my-3 text-right">
            <button className="btn addbtn" disabled={loading}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
