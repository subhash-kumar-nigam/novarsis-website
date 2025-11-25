import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../../slice/productSlice';
function CartList() {
  const cartData = useSelector((state) => state.product);

  const dispatch = useDispatch();
  // const [total, setTotal] = useState(0)
  return (
    <>
      <table className="table container section">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th>Remove</th>
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
            </>
          ) : (
            <th className="text-center" colSpan={6}>
              <span>No Data Found</span>
            </th>
          )}
        </tbody>
      </table>
    </>
  );
}

export default CartList;
