import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDeatilsDB } from 'slice/orderSliceDB';
// import './bill.css'
import { useParams } from 'react-router-dom';

const BillDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.orderDB);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDeatilsDB(id));
    }
  }, [dispatch, id]); // ✅ include 'id' in dependencies

  const calculateTotal = () => {
    if (cartData.data?.itemData1) {
      return cartData.data.itemData1
        .reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
        .toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="container my-5 py-5 shadow">
        <div className="col-md-12">
          <div className="row py-5">
            <div className="receipt-main col-xs-10 col-sm-10 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <div className="receipt-left">
                    <p>
                      <strong>Customer Name :</strong> {cartData.data?.customerData?.name}
                    </p>
                    <p>
                      <strong>Mobile :</strong> {cartData.data?.customerData?.mobile}
                    </p>
                    <p>
                      <strong>Address :</strong> {cartData.data?.order?.shipping_address}
                    </p>
                    <p>
                      <strong>Status :</strong> {cartData.data?.order?.status}
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 text-right">
                  <div className="receipt-right">
                    <h5>Dr Pathaks Holistic Cure</h5>
                    <p>Khajuraho/Bhopal MP</p>
                    <p>India</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="receipt-header receipt-header-mid">
                  <div className="col-xs-8 col-sm-8 col-md-8 text-left">
                    <div className="receipt-right"></div>
                  </div>
                  <div className="col-xs-4 col-sm-12 col-md-12">
                    <div className="receipt-left">
                      <h5>Invoice ID # {cartData.data?.order?.order_id}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.data?.itemData1
                      ? cartData.data.itemData1.map((item, key) => (
                          <tr key={key}>
                            <td className="col-md-4">{item.product.name}</td>
                            <td className="col-md-3">{item.quantity}</td>
                            <td className="col-md-2">{item.price}</td>
                            <td className="col-md-3">
                              <i className="fa fa-inr"></i> {item.subtotal}/-
                            </td>
                          </tr>
                        ))
                      : null}
                    <tr>
                      <td className="text-right" colSpan={3}>
                        <h5>
                          <strong>Total: </strong>
                        </h5>
                      </td>
                      <td className="text-left text-danger">
                        <h5>
                          <strong>
                            <i className="fa fa-inr"></i> {calculateTotal()}/-
                          </strong>
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="receipt-header receipt-header-mid receipt-footer">
                  <div className="col-xs-8 col-sm-8 col-md-12 text-left">
                    <div className="receipt-right">
                      <p>
                        <b>Date :</b> {cartData.data?.itemData1?.[0]?.createdAt}
                      </p>
                      <h5>Thanks for shopping.!</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillDetails;
