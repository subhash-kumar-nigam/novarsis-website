import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCareer, removeCareer } from '../slice/careerSlice';

const Career = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.career);
  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);
  return (
    <>
      <div className="container-fluid px-lg-5">
        <div className="mainheadig">
          <h4 className="text-white font-weight-bold ">Resume List</h4>
        </div>
        <table className="my-5 table table-striped table-responsive ">
          <thead>
            <tr className="mt-5">
              <th scope="col">Id</th>
              <th scope="col">Resume</th>
              <th scope="col">Job Role</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
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
                      <td>
                        <a href={`${process.env.REACT_APP_BACKEND}resume/${item.resume}`}>View Resume</a>
                      </td>
                      <td>{item.jobrole}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
                      <td>
                        <button className="btn removebtn" onClick={() => dispatch(removeCareer(item.id))}>
                          Remove
                        </button>
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

export default Career;
