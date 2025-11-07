import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResume, removeResume } from 'slice/internshipSlice';
import AdminTable from 'common/AdminTable';
// import { IoIosEye } from "react-icons/io";

const Internship = () => {
    // const [viewData, setViewData] = useState(null);
    // const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.internship);

    const tableHeaders = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Student Name',
            accessor: 'name',
        },
        {
            Header: 'Student Email',
            accessor: 'email',
        },
        {
            Header: 'standard',
            accessor: 'standard',
        },
        {
            Header: 'mobile',
            accessor: 'mobile',
        },
        {
            Header: 'board',
            accessor: 'board',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <button
                    className="btn removebtn"
                    onClick={() => dispatch(removeResume(row.original.id))}
                >
                    Remove
                </button>
            ),
        },
        // {
        //     Header: 'View',
        //     accessor: 'actions2',
        //     Cell: ({ row }) => (
        //         <button
        //             className="btn btn-success"
        //             onClick={() => {
        //                 setViewData(row.original);
        //                 setModalOpen(true);
        //             }}
        //         >
        //             <IoIosEye />
        //         </button>
        //     ),
        // }
    ];

    useEffect(() => {
        dispatch(getResume());
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid mt-5 pb-5">
                <div className="mainheadig mx-3">
                    <h4 className="text-white font-weight-bold">Admission List</h4>
                </div>

                {cartData?.loading ? (
                    <p className="text-white mx-3">Loading...</p>
                ) : cartData?.data?.length > 0 ? (
                    <AdminTable tableHeaders={tableHeaders} tableData={cartData.data} />
                ) : (
                    <p className="text-white mx-3">No Admission found.</p>
                )}
            </div>

            {/* Modal - View Resume 
            {modalOpen && (
                <div className="custom-modal-backdrop">
                    <div className="custom-modal">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">View Resume</h5>
                            <button type="button" className="close" onClick={() => setModalOpen(false)}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            {viewData?.resume ? (
                                <iframe
                                    src={`${process.env.REACT_APP_BACKEND}resume/${encodeURIComponent(viewData.resume)}`}
                                    width="100%"
                                    height="500px"
                                    title="Resume Viewer"
                                />
                            ) : (
                                <p>No resume available</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}*/}
        </>
    );
};

export default Internship;
