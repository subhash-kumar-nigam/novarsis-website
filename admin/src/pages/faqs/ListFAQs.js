import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFaqs, removeFaq, updateFaq } from 'slice/faqSlice';
import AdminTable from 'common/AdminTable';
import { toast } from 'react-toastify';

const ListFAQs = () => {
  const dispatch = useDispatch();
  const faqData = useSelector((state) => state.faq);

  const [selectedFaq, setSelectedFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  // Fetch FAQs list
  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  // When edit button is clicked
  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFaq(null);
    setFormData({ question: '', answer: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save updated FAQ
  const handleSaveChanges = async () => {
    try {
      await dispatch(updateFaq({ id: selectedFaq.id, data: formData }));
      toast.success('FAQ updated successfully!');
      dispatch(getFaqs()); // Refresh list
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ!');
    }

    closeModal();
  };

  // Table columns
  const tableHeaders = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Question',
      accessor: 'question',
    },
    {
      Header: 'Answer',
      accessor: 'answer',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button
            className="btn removebtn mx-1"
            onClick={() => dispatch(removeFaq(row.original.id))}
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
          <h4 className="text-white font-weight-bold">FAQs List</h4>
        </div>

        {faqData?.data?.length > 0 && (
          <AdminTable tableHeaders={tableHeaders} tableData={faqData.data} />
        )}
      </div>

      {/* Edit Modal */}
      {showModal && selectedFaq && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editFaqModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editFaqModal">
                  Edit FAQ
                </h5>
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
                <p>
                  Editing FAQ: <strong>{selectedFaq.question}</strong>
                </p>

                {/* Question */}
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Question"
                />

                {/* Answer */}
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleFormChange}
                  className="form-control mb-2"
                  placeholder="Answer"
                  rows="4"
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
    </>
  );
};

export default ListFAQs;
