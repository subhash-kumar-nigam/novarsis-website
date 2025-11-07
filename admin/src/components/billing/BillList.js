import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderListDB } from 'slice/orderSliceDB';
import { Link } from 'react-router-dom';

const BillList = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.orderDB);

    console.log(cartData)
    useEffect(() => {
        dispatch(getOrderListDB())
    }, [dispatch])

    return (
        <>
            <div className='container-fluid px-lg-5'>
                <div className='mainheadig'>
                    <h4 className='text-white font-weight-bold '>Order List</h4>
                </div>
                <table className="my-5 table table-responsive">
                    <thead>
                        <tr className='mt-5'>
                            <th scope="col">Order ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>

                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData?.data.length ? <> {
                            cartData?.data.map((item, i) => {
                                return <tr key={i}>
                                    <th>{item.order_id}</th>
                                    <td>{item.customer?.name}</td>
                                    <td>{item.customer?.mobile}</td>
                                    <td>{item.customer?.address}</td>
                                    <td>{item.createdAt}</td>
                                    <td><button className='btn btn-danger mx-2' onClick={() => dispatch(removeCustomer(item.id))}><span className='fa fa-trash'></span></button>
                                        <Link className='btn addbtn mx-2' to={`/billing/details/${item.id}`}><span className='fa fa-eye'></span></Link>
                                    </td>
                                </tr>
                            })
                        }
                        </>
                            : <th className='text-center' colSpan={6}><span>No Data Found</span></th>}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Place Verify</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type='text' placeholder='Enter Pin' className='form-control' maxLength={4} minLength={4} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Placed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillList;
