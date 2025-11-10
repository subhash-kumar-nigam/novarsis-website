// src/pages/Admission.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmissions, removeAdmission } from '../slice/admissionSlice';
import AdminTable from 'common/AdminTable';

const Admission = () => {
  const dispatch = useDispatch();
  const admissionData = useSelector((state) => state.admission);

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'DOB', accessor: 'dob' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Standard', accessor: 'standard' },
    { Header: 'Previous School', accessor: 'previousSchool' },
    { Header: 'Mobile', accessor: 'mobile' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Father Name', accessor: 'fatherName' },
    { Header: 'Mother Name', accessor: 'motherName' },
    { Header: 'Emergency Contact', accessor: 'emergencyContact' },
    {
      Header: 'Photo',
      accessor: 'photo',
      Cell: ({ row }) =>
        row.original.photo ? (
          <img src={`uploads/admissions/${row.original.photo}`} alt="Student" className="w-12 h-12 object-cover rounded" />
        ) : (
          'N/A'
        )
    },
    {
      Header: 'Birth Certificate',
      accessor: 'birthCertificate',
      Cell: ({ row }) =>
        row.original.birthCertificate ? (
          <a
            href={`/uploads/admissions/${row.original.birthCertificate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View
          </a>
        ) : (
          'N/A'
        )
    },
    {
      Header: 'Report Card',
      accessor: 'reportCard',
      Cell: ({ row }) =>
        row.original.reportCard ? (
          <a
            href={`/uploads/admissions/${row.original.reportCard}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View
          </a>
        ) : (
          'N/A'
        )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button
          className="btn removebtn bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(removeAdmission(row.original.id))}
        >
          Remove
        </button>
      )
    }
  ];

  useEffect(() => {
    dispatch(getAdmissions());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Admission List</h4>
      </div>

      {admissionData?.data?.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={admissionData.data} />
      ) : (
        <p className="text-white mx-4 mt-4">No admissions found.</p>
      )}
    </div>
  );
};

export default Admission;
