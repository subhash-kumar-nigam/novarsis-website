// src/pages/Admission.js
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmissions, removeAdmission } from '../slice/admissionSlice';
import AdminTable from 'common/AdminTable';

// Cell components with PropTypes
const PhotoCell = ({ row }) =>
  row.original.photo ? (
    <img src={`uploads/admissions/${row.original.photo}`} alt="Student" className="w-12 h-12 object-cover rounded" />
  ) : (
    'N/A'
  );

PhotoCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      photo: PropTypes.string
    }).isRequired
  }).isRequired
};

const BirthCertificateCell = ({ row }) =>
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
  );

BirthCertificateCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      birthCertificate: PropTypes.string
    }).isRequired
  }).isRequired
};

const ReportCardCell = ({ row }) =>
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
  );

ReportCardCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      reportCard: PropTypes.string
    }).isRequired
  }).isRequired
};

const ActionsCell = ({ row }) => {
  const dispatch = useDispatch();
  return (
    <button className="btn removebtn bg-red-500 text-white px-2 py-1 rounded" onClick={() => dispatch(removeAdmission(row.original.id))}>
      Remove
    </button>
  );
};

ActionsCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired
  }).isRequired
};

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
    { Header: 'Photo', accessor: 'photo', Cell: (props) => <PhotoCell {...props} /> },
    { Header: 'Birth Certificate', accessor: 'birthCertificate', Cell: (props) => <BirthCertificateCell {...props} /> },
    { Header: 'Report Card', accessor: 'reportCard', Cell: (props) => <ReportCardCell {...props} /> },
    { Header: 'Actions', accessor: 'actions', Cell: (props) => <ActionsCell {...props} /> }
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
