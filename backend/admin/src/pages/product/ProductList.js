import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, removeProduct, updateProduct } from 'slice/productSlice';
import AdminTable from 'common/AdminTable';
import TruncatedMessage from 'common/TruncatedMessage';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.product);

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
    setImageFile(null);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('id', currentProduct.id);
    formData.append('name', currentProduct.name);
    formData.append('sprice', currentProduct.sprice);
    formData.append('quantity', currentProduct.quantity);
    formData.append('long_description', currentProduct.long_description);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    dispatch(updateProduct({ id: currentProduct.id, data: formData }));
    handleCloseModal();
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ row }) => <img src={`${process.env.REACT_APP_BACKEND}uploads/${row.original.image}`} alt={row.original.name} width={50} />
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'sprice' },
    { Header: 'Quantity', accessor: 'quantity' },
    {
      Header: 'Description',
      accessor: 'long_description',
      Cell: ({ row }) => <TruncatedMessage text={row.original.long_description} maxLength={30} />
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button className="btn removebtn mx-1" onClick={() => dispatch(removeProduct(row.original.id))}>
            Remove
          </button>
          <button className="btn editbtn mx-1" onClick={() => handleEditClick(row.original)}>
            Edit
          </button>
        </>
      )
    }
  ];

  return (
    <>
      <div className="container-fluid mt-5 ">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Medicine List</h4>
        </div>

        {cartData?.data?.length > 0 && <AdminTable tableHeaders={tableHeaders} tableData={cartData.data} />}
      </div>

      {showModal && currentProduct && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="productName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      value={currentProduct.sprice}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, sprice: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productQuantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="productQuantity"
                      value={currentProduct.quantity}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productDescription">Description</label>
                    <textarea
                      className="form-control"
                      id="productDescription"
                      value={currentProduct.long_description}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, long_description: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productImage">Image</label>
                    <input type="file" className="form-control" id="productImage" onChange={handleImageChange} />
                    {currentProduct.image && (
                      <img
                        src={`${process.env.REACT_APP_BACKEND}uploads/${currentProduct.image}`}
                        alt={currentProduct.name}
                        width={50}
                        className="mt-2"
                      />
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add PropTypes to fix warnings
ProductList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      sprice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      long_description: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  })
};

export default ProductList;
