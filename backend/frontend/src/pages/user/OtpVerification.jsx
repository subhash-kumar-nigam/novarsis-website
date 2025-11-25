import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { otpverification } from '../../slice/userSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const OtpVerification = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({ email: id, otp: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user);

  // ✅ Memoize MySwal to prevent re-creation on every render
  const MySwal = useMemo(() => withReactContent(Swal), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.otp) tempErrors.otp = "OTP is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    if (userdata?.response !== null && Object.keys(userdata?.response).length) {
      MySwal.fire({
        title: 'Login Successful',
        text: 'You have been logged in successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continue',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/myprofile');
        }
      });
    }

    if (userdata?.error) {
      setLoading(false);
      MySwal.fire({
        title: 'Verification Failed',
        text: userdata.error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  }, [userdata, MySwal, navigate]); // ✅ dependencies fixed

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        dispatch(otpverification(formData));
      } catch (error) {
        setLoading(false);
        await MySwal.fire({
          title: 'Login Failed',
          text: 'There was an issue with your login. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        console.error("Login failed: ", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-[#345bf3] mb-8">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.otp && (
              <p className="text-sm text-red-500 mt-1">{errors.otp}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#345bf3] hover:bg-black hover:text-white text-white font-semibold rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
