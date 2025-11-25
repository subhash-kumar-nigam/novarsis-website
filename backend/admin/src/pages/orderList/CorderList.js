import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import AdminTable from 'common/AdminTable';
import TruncatedMessage from 'common/TruncatedMessage';
import { getOrderListDB, updateOrderListDB } from 'slice/orderSliceDB';
import { useNavigate } from 'react-router-dom';

const CorderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.orderDB);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(getOrderListDB());
  }, [dispatch]);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleSave = () => {
    dispatch(updateOrderListDB({ id: currentProduct.id, data: currentProduct }));
    handleCloseModal();
  };

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'customer.name' },
    { Header: 'Price', accessor: 'total_amount' },
    { Header: 'Payment', accessor: 'payment_method' },
    { Header: 'Date', accessor: 'createdAt' },
    {
      Header: 'Address',
      accessor: 'shipping_address',
      Cell: ({ row }) => <TruncatedMessage text={row.original.shipping_address || ''} maxLength={30} />
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => {
        const status = row.original.status || '';
        let bgColor;

        switch (status) {
          case 'pending':
            bgColor = 'bg-warning';
            break;
          case 'complete':
            bgColor = 'bg-success';
            break;
          case 'reject':
            bgColor = 'bg-danger';
            break;
          default:
            bgColor = '';
        }

        return (
          <span className={`badge ${bgColor} text-white p-2`}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}</span>
        );
      }
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button className="btn editbtn mx-1" onClick={() => handleEditClick(row.original)}>
            Confirm
          </button>
          <button className="btn editbtn mx-1" onClick={() => navigate(`/billing/details/${row.original.id}`)}>
            See
          </button>
        </>
      )
    }
  ];

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Order List</h4>
        </div>

        {cartData?.data?.length > 0 && <AdminTable tableHeaders={tableHeaders} tableData={cartData.data} />}
      </div>

      {showModal && currentProduct && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  View Order
                </h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="status">Action</label>
                    <select className="form-control" onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}>
                      <option>pending</option>
                      <option>complete</option>
                      <option>reject</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      value={currentProduct.customer?.name}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      value={currentProduct?.total_amount}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, total_amount: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productQuantity">Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="productQuantity"
                      value={currentProduct.customer?.mobile}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, mobile: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productDescription">Address</label>
                    <textarea
                      className="form-control"
                      id="productDescription"
                      value={currentProduct?.shipping_address}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, shipping_address: e.target.value })}
                    />
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

// PropTypes to remove warnings
CorderList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      shipping_address: PropTypes.string,
      status: PropTypes.string,
      customer: PropTypes.shape({
        name: PropTypes.string,
        mobile: PropTypes.string
      })
    }).isRequired
  })
};

export default CorderList;
