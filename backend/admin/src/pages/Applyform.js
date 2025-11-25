import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getApplyForm, removeApplyForm } from '../slice/applyFormSlice';
import AdminTable from 'common/AdminTable';

// Component for Resume cell
const ResumeCell = ({ row }) =>
  row.original.resume ? (
    <a
      href={`${process.env.REACT_APP_BACKEND}uploads/${row.original.resume}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sm btn-outline-info"
    >
      View
    </a>
  ) : (
    'No File'
  );

ResumeCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      resume: PropTypes.string
    }).isRequired
  }).isRequired
};

// Component for Actions cell
const ActionsCell = ({ row }) => {
  const dispatch = useDispatch();
  return (
    <button className="btn removebtn" onClick={() => dispatch(removeApplyForm(row.original.id))}>
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

const Applyform = () => {
  const dispatch = useDispatch();
  const applyData = useSelector((state) => state.applyform);

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Number', accessor: 'number' },
    { Header: 'Experience', accessor: 'experience' },
    { Header: 'Current CTC', accessor: 'currentCTC' },
    { Header: 'Expected CTC', accessor: 'expectedCTC' },
    {
      Header: 'Resume',
      accessor: 'resume',
      Cell: (props) => <ResumeCell {...props} />
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => <ActionsCell {...props} />
    }
  ];

  useEffect(() => {
    dispatch(getApplyForm());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Apply Form List</h4>
      </div>
      {applyData?.data?.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={applyData.data} />
      ) : (
        <p className="text-white mx-4 mt-3">No applications found.</p>
      )}
    </div>
  );
};

export default Applyform;
