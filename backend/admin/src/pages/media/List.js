import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getMedia, removeMedia } from 'slice/mediaSlice';
import AdminTable from 'common/AdminTable';

const List = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.media);

  const tableHeaders = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ row }) => <img src={`${process.env.REACT_APP_BACKEND}media/${row.original.image}`} alt={row.original.name} width={100} />
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button className="btn removebtn" onClick={() => dispatch(removeMedia(row.original.id))}>
          Remove
        </button>
      )
    }
  ];

  useEffect(() => {
    dispatch(getMedia());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Media List</h4>
      </div>
      {cartData?.data?.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={cartData.data} />
      ) : (
        <p className="text-gray-400 mx-4">No media data available</p>
      )}
    </div>
  );
};

// PropTypes to remove react/prop-types warnings
List.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  })
};

export default List;
