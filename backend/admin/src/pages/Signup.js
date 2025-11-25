import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import signupimage from '../asserts/img/signup-image.jpg';
import Inputbox from '../components/Inputbox';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../slice/userSlice';
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const { response, error, message, callTimes, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast(message);
    }
  }, [callTimes]);

  const onSubmit = async () => {
    const data = {
      firstName: name,
      email,
      password
    };
    dispatch(signup(data));
  };
  const onChangeReset = (value) => {
    if (value !== password) {
      const err = {
        message: 'Enter password not matched',
        error: true
      };
      setError(err);
    } else {
      setError({});
    }
  };
  return (
    <section className="signup mt-5">
      {response ? <Navigate to="/signin" replace={true} /> : ''}
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign Up</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <Inputbox type="text" name="name" id={'name'} placeholder="Your Name" onchangeFun={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <Inputbox type="email" name="email" id="email" placeholder="Your Email" onchangeFun={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label for="pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <Inputbox type="password" name="pass" id="pass" placeholder="Password" onchangeFun={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label for="re-pass">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <Inputbox type="password" name="pass" id="pass" placeholder="Password" onchangeFun={(e) => onChangeReset(e.target.value)} />
                {/* {Object.keys(error).length ? <span className='text-danger'>{error.message}</span> : ""} */}
              </div>
              <div className="form-group">
                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                <label for="agree-term" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{' '}
                  <a href="#" className="term-service">
                    Terms of service
                  </a>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="button"
                  name="signup"
                  id="signup"
                  className={loading ? 'btn btn-danger form-submit' : 'btn btn-primary'}
                  value="Register"
                  onClick={onSubmit}
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={signupimage} alt="sing up image" />
            </figure>
            <Link to="#" className="signup-image-link">
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Signup;
