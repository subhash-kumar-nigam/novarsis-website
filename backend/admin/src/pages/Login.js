import { useState, useEffect } from 'react';
import signinimage from '../asserts/img/software.png';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, response, message } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(response?.data?.access_token);
    if (response && response?.data?.access_token) {
      if (rememberMe) {
        localStorage.setItem('userToken', response.data.token);
      } else {
        sessionStorage.setItem('userToken', response.data.token);
      }
      // window.location.href = '/dashboard';
      navigate('/dashboard');
    } else if (error) {
      toast(message || 'Something went wrong');
    }
  }, [response, error, navigate, message, rememberMe, dispatch]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signin({ username, password }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-12">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row mt-5">
                  <div className="col-lg-6 d-none d-lg-block text-center">
                    <img src={signinimage} alt="login " className="img-fluid" />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 mb-4 text-dark">
                          <strong>Welcome Admin</strong>
                        </h1>
                      </div>
                      <form className="user" onSubmit={loginHandler}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            placeholder="Enter Email Address..."
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                            />
                            <label className="custom-control-label" htmlFor="customCheck">
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <Button onclickfun={loginHandler} disabled={loading} className="btn addbtn btn-user btn-block" text="Login" />
                        <hr />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
