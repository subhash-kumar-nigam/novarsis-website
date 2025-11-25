import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFaq } from '../../slice/faqSlice'; // ✅ faq slice
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddFaq = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.faq);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFaq(formData));
    toast.success('FAQ added successfully!');
    navigate('/faqs/list'); // ✅ list page pe redirect
  };

  return (
    <div className="container-fluid mt-5">
      <div className="mainheadig mx-4">
        <h4 className="text-white font-weight-bold">Add FAQS</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row mx-4">
          <div className="col-sm-12 mt-3">
            <label htmlFor="question" className="adminlables">
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm-12 mt-3">
            <label htmlFor="answer" className="adminlables">
              Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              className="form-control"
              rows="4"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4 text-right mx-4">
          <button className="btn btn-lg addbtn" disabled={loading}>
            Add FAQ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaq;
