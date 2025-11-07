import App from "../App";
import Login from "../pages/Login";
import Layout from "../common/Layout";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import PrivateRouter from '../routers/PrivateRouter';


const f = <PrivateRouter>{Cart}</PrivateRouter>;

const routers = [
    {
     element: <Layout />,
     children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/signin",
            element: <Login/>,
        },
        {
            path: "/signup",
            element: <Signup/>,
        },
        {
            path: "/cart",
            element: <PrivateRouter>{Cart}</PrivateRouter>,
        },
        {
            path: "/*",
            element: <h1>Page not found try again </h1>,
        }
     ]
    }
]

export default routers;