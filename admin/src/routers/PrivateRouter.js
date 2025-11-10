import Layout from 'common/Layout';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const isLoggedIn = useSelector((state) => state.user.response) && localStorage.getItem('user');

  return (
    <div>
      {isLoggedIn ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to={'/signin'} replace />
      )}
    </div>
  );
};

export default PrivateRouter;
