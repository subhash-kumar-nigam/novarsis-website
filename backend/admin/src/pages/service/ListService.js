import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getService, removeService, updateService } from 'slice/serviceSlice';
import AdminTable from 'common/AdminTable';
import { toast } from 'react-toastify';

const ListService = () => {
  const dispatch = useDispatch();
  const serviceData = useSelector((state) => state.service) || {
    data: [],
    loading: false,
    error: null
  };
  const { data = [], loading, error } = serviceData;

  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title || '',
      description: service.description || '',
      image: service.image || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    setFormData({ title: '', description: '', image: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedService) return;
    try {
      await dispatch(updateService({ id: selectedService.id, data: formData }));
      toast.success('Service updated successfully!');
      dispatch(getService());
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('Failed to update service');
    }
    closeModal();
  };

  const handleRemove = async (id) => {
    try {
      await dispatch(removeService(id));
      toast.success('Service removed successfully!');
      dispatch(getService());
    } catch (err) {
      console.error('Error removing service:', err);
      toast.error('Failed to remove service');
    }
  };

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ row }) =>
        row.original.image ? (
          <img
            src={`${process.env.REACT_APP_BACKEND}uploads/services/${row.original.image}`}
            alt={row.original.title}
            width={100}
            style={{ borderRadius: '8px' }}
            onError={(e) => (e.target.src = '/fallback.png')}
          />
        ) : (
          <span>No Image</span>
        )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button className="btn removebtn mx-1" onClick={() => handleRemove(row.original.id)}>
            Remove
          </button>
          <button className="btn editbtn mx-1" onClick={() => handleEditClick(row.original)}>
            Edit
          </button>
        </>
      )
    }
  ];

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Service List</h4>
      </div>

      {loading && <p className="text-white mx-4">Loading Services...</p>}
      {error && <p className="text-danger mx-4">{error}</p>}

      {data.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={data} />
      ) : (
        !loading && <p className="text-gray-400 mx-4">No services available.</p>
      )}

      {showModal && selectedService && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Service</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Image URL"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add PropTypes to fix CI build warnings
ListService.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    })
  })
};

export default ListService;
