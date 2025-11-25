import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomer, removeCustomer } from 'slice/customerSlice';
import { Link } from 'react-router-dom';

const ListCustomer = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.customer);

  console.log(cartData);
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold ">Customer List</h4>
        </div>
        <table className="my-5 table table-responsive">
          <thead>
            <tr className="mt-5">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Register Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.data.length ? (
              <>
                {' '}
                {cartData?.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.address}</td>
                      <td>{item.createdAt}</td>

                      <td>
                        <button className="btn btn-danger mx-2" onClick={() => dispatch(removeCustomer(item.id))}>
                          <span className="fa fa-trash"></span>
                        </button>
                        <Link className="btn addbtn mx-2" to={`update/${item.id}`}>
                          <span className="fa fa-edit"></span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <th className="text-center" colSpan={6}>
                <span>No Data Found</span>
              </th>
            )}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Place Verify
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" placeholder="Enter Pin" className="form-control" maxLength={4} minLength={4} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal">
                  Placed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCustomer;
