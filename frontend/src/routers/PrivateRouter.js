// import Layout from 'common/Layout';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const isLoggedIn = useSelector((state) => state.user.response) && localStorage.getItem('token');
  return (
    <div>
      {isLoggedIn ? (
        <>
        
          <Outlet />
        </>
      ) : (
        <Navigate to={'/login'} replace/>
      )}
    </div>
  );
};
export default PrivateRouter;
