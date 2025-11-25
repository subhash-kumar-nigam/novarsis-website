import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getOurteam, removeOurteam, updateOurteam } from 'slice/ourteamSlice';
import AdminTable from 'common/AdminTable';
import { toast } from 'react-toastify';

const ListOurteam = () => {
  const dispatch = useDispatch();
  const teamData = useSelector((state) => state.team);

  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: null,
    existingImage: ''
  });

  useEffect(() => {
    dispatch(getOurteam());
  }, [dispatch]);

  const handleEditClick = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setFormData({
      name: teamMember.name,
      title: teamMember.title,
      image: null,
      existingImage: `${process.env.REACT_APP_BACKEND}team/${teamMember.image}`
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeamMember(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file
    }));
  };

  const handleSaveChanges = async () => {
    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('title', formData.title);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    try {
      await dispatch(updateOurteam({ id: selectedTeamMember.id, data: updatedData }));
      toast.success('Team member updated successfully!');
      dispatch(getOurteam());
    } catch (error) {
      console.error('Error updating team member:', error);
      toast.error('Failed to update team member!');
    }

    closeModal();
  };

  const tableHeaders = [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ row }) => (
        <img
          src={`${process.env.REACT_APP_BACKEND}../uploads/teams/${row.original.image}`}
          alt={row.original.name}
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: '5px' }}
        />
      )
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Title', accessor: 'title' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button className="btn removebtn mx-1" onClick={() => dispatch(removeOurteam(row.original.id))}>
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
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Team Members</h4>
        </div>

        {teamData?.data?.length > 0 && <AdminTable tableHeaders={tableHeaders} tableData={teamData.data} />}
      </div>

      {showModal && selectedTeamMember && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="editTeamMemberModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editTeamMemberModal">
                  Edit Team Member
                </h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <p>
                  Edit details for: <strong>{selectedTeamMember.name}</strong>
                </p>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <input type="file" name="image" onChange={handleImageChange} className="form-control mb-2" accept="image/*" />
                {formData.image ? (
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" width={100} className="mt-2" />
                ) : (
                  <img src={formData.existingImage} alt="Existing" width={100} className="mt-2" />
                )}
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
    </>
  );
};

// PropTypes to remove warnings
ListOurteam.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  })
};

export default ListOurteam;
