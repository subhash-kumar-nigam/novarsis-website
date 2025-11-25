import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Authentication
import Login from './pages/Login';
import PrivateRouter from './routers/PrivateRouter';

// Dashboard & Pages
import Home from './pages/Home';
import Contactus from './pages/Contactus';
import Career from './pages/Career';
import Admission from './pages/Admission';

import Applyform from './pages/Applyform';

// Products
import ProductList from './pages/product/ProductList';
import AddProduct from './pages/product/AddProduct';
import UpdateProduct from './pages/product/UpdateProduct';

// Gallery
import GalleryList from './pages/gallery/List';
import GalleryAdd from './pages/gallery/Add';
import GalleryUpdate from './pages/gallery/Update';

// Media
import MediaList from './pages/media/List';
import MediaAdd from './pages/media/Add';
import MediaUpdate from './pages/media/Update';

// Banner
import BannerList from './pages/banner/List';
import AddBanner from './pages/banner/Add';
import UpdateBanner from './pages/banner/Update';

// Our Team
import AddOurteam from './pages/ourteam/AddOurteam';
import ListOurteam from './pages/ourteam/ListOurteam';
import UpdateOurteam from './pages/ourteam/UpdateOurteam';

// Users
import UsersList from './pages/users/UsersList';
import AddUser from './pages/users/AddUser';
import UpdateUser from './pages/users/UpdateUser';

// Customer
import ListCustomer from './pages/customer/ListCustomer';
import AddCustomer from './pages/customer/AddCustomer';
import UpdateCustomer from './pages/customer/UpdateCustomer';

// Orders
import CorderList from './pages/orderList/CorderList';

// Blogs
import AddBlog from './pages/blog/AddBlog';
import ListBlog from './pages/blog/ListBlog';
import UpdateBlog from './pages/blog/UpdateBlog';

// Careers
import AddCareer from './pages/career/AddCareer';
import ListCareer from './pages/career/ListCareer';
import UpdateCareer from './pages/career/UpdateCareer';

// Services
import AddService from './pages/service/AddService';
import ListService from './pages/service/ListService';
import UpdateService from './pages/service/UpdateService';

// FAQs
import ListFAQs from './pages/faqs/ListFAQs';
import AddFaq from './pages/faqs/AddFaq';
import UpdateFaq from './pages/faqs/UpdateFaq';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/apply" element={<Applyform />} />
          <Route path="/career" element={<Career />} />
          <Route path="/admission" element={<Admission />} />
          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />

          {/* Gallery */}
          <Route path="/gallery" element={<GalleryList />} />
          <Route path="/gallery/add" element={<GalleryAdd />} />
          <Route path="/gallery/update/:id" element={<GalleryUpdate />} />

          {/* Media */}
          <Route path="/media" element={<MediaList />} />
          <Route path="/media/add" element={<MediaAdd />} />
          <Route path="/media/update/:id" element={<MediaUpdate />} />

          {/* Banner */}
          <Route path="/banner" element={<BannerList />} />
          <Route path="/banner/add" element={<AddBanner />} />
          <Route path="/banner/update/:id" element={<UpdateBanner />} />

          {/* Our Team */}
          <Route path="/ourteam" element={<ListOurteam />} />
          <Route path="/ourteam/add" element={<AddOurteam />} />
          <Route path="/ourteam/update/:id" element={<UpdateOurteam />} />

          {/* Users */}
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />

          {/* Customers */}
          <Route path="/customer" element={<ListCustomer />} />
          <Route path="/customer/add" element={<AddCustomer />} />
          <Route path="/customer/update/:id" element={<UpdateCustomer />} />

          {/* Blogs */}
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/blogs/list" element={<ListBlog />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />

          {/* Careers */}
          <Route path="/careers/add" element={<AddCareer />} />
          <Route path="/careers/list" element={<ListCareer />} />
          <Route path="/careers/update/:id" element={<UpdateCareer />} />

          {/* Services */}
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services/list" element={<ListService />} />
          <Route path="/services/update/:id" element={<UpdateService />} />

          {/* FAQs */}
          <Route path="/faqs/list" element={<ListFAQs />} />
          <Route path="/faqs" element={<AddFaq />} />
          <Route path="/faqs/update/:id" element={<UpdateFaq />} />

          {/* Orders */}
          <Route path="/customerorder" element={<CorderList />} />

          {/* 404 Fallback */}
          <Route path="*" element={<h1>No page available</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
