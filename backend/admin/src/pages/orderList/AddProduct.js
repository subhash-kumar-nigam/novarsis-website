import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from 'slice/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    size: '',
    offer: '',
    stock: '',
    pdf: null,
    image: null,
    description: ''
  });
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

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
      dispatch(addProduct(formDataToSend));
      toast('Product added successfully!');
      nevigate('/products');
    } catch (error) {
      console.error('There was a problem adding the product:', error.message);
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold ">Add Medicines</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-4 mt-2">
              <label htmlFor="productName">Medicines Name</label>
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
              <label htmlFor="productName">Medicines Price</label>
              <input
                type="text"
                id="productName"
                name="price"
                defaultValue={formData.price}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {/* <div className='col-sm-4 mt-2'>
                        <label htmlFor='productName'>Product Size</label>
                        <input type='text' id='productName' name='size' defaultValue={formData.size} className='form-control' onChange={handleChange}  />
                    </div> */}
            {/* <div className='col-sm-6 mt-2'>
                        <label htmlFor='productName'>Offer (if have )</label>
                        <input type='text' id='productName' name='offer' defaultValue={formData.offer} className='form-control' onChange={handleChange} />
                    </div> */}
            <div className="col-sm-4 mt-2">
              <label htmlFor="productName">Quantity</label>
              <input
                type="text"
                id="productName"
                name="stock"
                defaultValue={formData.stock}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 mt-2">
              <label htmlFor="productName">Description</label>
              <textarea
                rows={5}
                name="description"
                defaultValue={formData.description}
                className="form-control"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-sm-12 mt-2">
              <label htmlFor="productName">Image</label>
              <input
                type="file"
                id="productName"
                name="image"
                defaultValue={formData.image}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {/* <div className='col-sm-6 mt-2'>
                        <label htmlFor='productName'>PDF Product</label>
                        <input type='file' id='productName' name='pdf' defaultValue={formData.pdf} className='form-control' onChange={handleChange}  />
                    </div> */}
          </div>
          <div className="mt-4 text-right mx-4">
            <button className="btn btn-lg addbtn" disabled={loading}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
