import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../slice/productSlice';
import { getOrderListDB } from 'slice/orderSliceDB';
import axios from 'axios';

const OrderList = () => {
  const [cartData, setCartData] = useState([]);

  // const cartData = useSelector((state) => state.order);

  axios.get('http://localhost:8000/api/v1/order').then((data) => {
    setCartData(data.data);
    console.log('ffffff', data);
  });

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    getOrderListDB();
  }, []);

  return (
    <>
      <h1> </h1>
      <table className="container my-5 table table-striped table-responsive">
        <thead>
          <tr className="mt-5">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length ? (
            <>
              {' '}
              {cartData.map((item, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {' '}
                      <button className="btn btn-warning">-</button> <span className="mx-3">{item.qty} </span>
                      <button className="btn btn-warning">+</button>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.price * item.qty}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => dispatch(removeProduct(item))}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>{total}</td>
              </tr>
              <div className="text-center container mb-5 ">
                <button className="btn btn-danger btn-lg btn-block" data-toggle="modal" data-target="#exampleModalCenter">
                  Place Order
                </button>
              </div>
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
    </>
  );
};

export default OrderList;
