import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlog, removeBlog, updateBlog } from "slice/blogSlice";
import AdminTable from "common/AdminTable";
import { toast } from "react-toastify";

const ListBlog = () => {
  const dispatch = useDispatch();

  // ✅ Redux state selector (ensure store name is correct)
  const blogState = useSelector((state) => state.blog) || {
    data: [],
    loading: false,
    error: null,
  };
  const { data = [], loading, error } = blogState;

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  // ✅ Fetch Blogs on mount
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  // ✅ Edit modal open
  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      date: blog.date || "",
    });
    setShowModal(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    setFormData({ title: "", description: "", date: "" });
  };

  // ✅ Form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Save changes
  const handleSaveChanges = async () => {
    if (!selectedBlog) return;
    try {
      await dispatch(updateBlog({ id: selectedBlog.id, data: formData }));
      toast.success("Blog updated successfully!");
      dispatch(getBlog()); // refresh list
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Failed to update blog");
    }
    closeModal();
  };

  // ✅ Remove blog
  const handleRemove = async (id) => {
    try {
      await dispatch(removeBlog(id));
      toast.success("Blog removed successfully!");
      dispatch(getBlog());
    } catch (err) {
      console.error("Error removing blog:", err);
      toast.error("Failed to remove blog");
    }
  };

  // ✅ Table columns
  const tableHeaders = [
    { Header: "ID", accessor: "id" },
    { Header: "Title", accessor: "title" },
    { Header: "Description", accessor: "description" },
    { Header: "Date", accessor: "date" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <button
            className="btn removebtn mx-1"
            onClick={() => handleRemove(row.original.id)}
          >
            Remove
          </button>
          <button
            className="btn editbtn mx-1"
            onClick={() => handleEditClick(row.original)}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Blog List</h4>
        </div>

        {loading && <p className="text-white mx-4">Loading Blogs...</p>}
        {error && <p className="text-danger mx-4">{error}</p>}

        {data.length > 0 ? (
          <AdminTable tableHeaders={tableHeaders} tableData={data} />
        ) : (
          !loading && <p className="text-gray-400 mx-4">No blogs available.</p>
        )}
      </div>

      {/* ✅ Edit Modal */}
      {showModal && selectedBlog && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Blog</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
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
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Description"
                  rows={4}
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
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

export default ListBlog;
