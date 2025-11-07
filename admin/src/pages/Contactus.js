import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactUs, removeContactUs } from '../slice/contactUsSlice';
import AdminTable from 'common/AdminTable';
import TruncatedMessage from 'common/TruncatedMessage';

const Contactus = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.contactus);

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Mobile', accessor: 'mobile' },
    { Header: 'Subject', accessor: 'subject' },
    {
      Header: 'Message',
      accessor: 'message',
      Cell: ({ row }) => (
        <TruncatedMessage text={row.original.message} maxLength={10} />
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button
          className="btn removebtn"
          onClick={() => dispatch(removeContactUs(row.original.id))}
        >
          Remove
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  if (loading) return <p className="text-white px-4">Loading...</p>;
  if (error) return <p className="text-danger px-4">Error: {error}</p>;

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Enquiry List</h4>
      </div>
      {Array.isArray(data) && data.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={data} />
      ) : (
        <p className="text-white px-4">No enquiries found.</p>
      )}
    </div>
  );
};

export default Contactus;
