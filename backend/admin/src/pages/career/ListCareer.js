import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getCareer, removeCareer, updateCareer } from '../../slice/careerSlice';
import AdminTable from '../../common/AdminTable';
import { toast } from 'react-toastify';

const ListCareer = () => {
  const dispatch = useDispatch();
  const careerState = useSelector((state) => state.career);
  const { data = [], loading, error } = careerState;

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-Time',
    experience: '',
    description: ''
  });

  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);

  const handleEditClick = (career) => {
    setSelectedCareer(career);
    setFormData({
      title: career.title,
      location: career.location,
      type: career.type,
      experience: career.experience,
      description: career.description
    });
    setShowModal(true);
  };

  const handleRemove = async (id) => {
    try {
      await dispatch(removeCareer(id));
      toast.success('Career removed successfully!');
      dispatch(getCareer());
    } catch {
      toast.error('Failed to remove career');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateCareer({ id: selectedCareer.id, data: formData }));
      toast.success('Career updated successfully!');
      dispatch(getCareer());
      closeModal();
    } catch {
      toast.error('Failed to update career');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCareer(null);
    setFormData({
      title: '',
      location: '',
      type: 'Full-Time',
      experience: '',
      description: ''
    });
  };

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Experience', accessor: 'experience' },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRemove(row.original.id)}>
            Remove
          </button>
          <button className="btn btn-primary btn-sm mx-1" onClick={() => handleEditClick(row.original)}>
            Edit
          </button>
        </>
      )
    }
  ];

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Career List</h4>
      </div>

      {loading && <p className="text-white mx-4">Loading Careers...</p>}
      {error && <p className="text-danger mx-4">{error}</p>}

      {data.length > 0 ? (
        <AdminTable tableHeaders={tableHeaders} tableData={data} />
      ) : (
        !loading && <p className="text-gray-400 mx-4">No careers available.</p>
      )}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Career</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Location"
                />
                <select name="type" value={formData.type} onChange={handleFormChange} className="form-control mb-2">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Contract</option>
                </select>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Experience"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Description"
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>
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

// ✅ PropTypes for AdminTable row cells
ListCareer.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      location: PropTypes.string,
      type: PropTypes.string,
      experience: PropTypes.string,
      description: PropTypes.string
    }).isRequired
  })
};

export default ListCareer;
