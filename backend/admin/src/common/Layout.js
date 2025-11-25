// Layout.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'slice/userSlice';
import Button from 'components/Button';

import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdContacts, MdDashboard } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { FaBook, FaQuestionCircle, FaUserTie, FaServicestack } from 'react-icons/fa';

const currentUrl = window.location.pathname;
const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

const Layout = ({ children }) => {
  const [toggled, setToggle] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      navigate('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul
        className={toggled ? 'navbar-nav sidebar sidebar-dark toggled' : 'navbar-nav sidebar sidebar-dark accordion'}
        id="accordionSidebar"
      >
        <Link className="text-decoration-none justify-content-start" to="/dashboard">
          <div className="text-center">
            <img src="/Novarsis-Logo-1-scaled.47b3e3bc739320c1b4da.webp" alt="adminlogo" className="img-fluid adminlogo" />
          </div>
        </Link>

        {/* Dashboard */}
        <li className="nav-item text-dark">
          <Link className="nav-link" to="/dashboard">
            <MdDashboard className="mr-1" />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Contact Us */}
        <li className={`nav-item ${lastSegment === 'contactus' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'contactus'}
            onClick={() => toggleMenu('contactus')}
          >
            <MdContacts className="mr-1" />
            <span>Enquiry</span>
          </button>
          <div className={`collapse ${openMenu === 'contactus' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item text-dark" to="/contactus">
                Enquiry List
              </Link>
            </div>
          </div>
        </li>

        {/* Job Apply */}
        <li className={`nav-item ${lastSegment === 'apply' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'apply'}
            onClick={() => toggleMenu('apply')}
          >
            <MdContacts className="mr-1" />
            <span>Job Apply</span>
          </button>
          <div className={`collapse ${openMenu === 'apply' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item text-dark" to="/apply">
                Job Apply List
              </Link>
            </div>
          </div>
        </li>

        {/* Gallery */}
        <li className={`nav-item text-dark ${lastSegment === 'gallery' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'gallery'}
            onClick={() => toggleMenu('gallery')}
          >
            <GrGallery className="mr-1" />
            <span>Our Gallery</span>
          </button>
          <div className={`collapse ${openMenu === 'gallery' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/gallery/add">
                Add Our Gallery
              </Link>
              <Link className="collapse-item" to="/gallery">
                Our Gallery List
              </Link>
            </div>
          </div>
        </li>

        {/* Blog */}
        <li className={`nav-item text-dark ${lastSegment === 'blog' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'blog'}
            onClick={() => toggleMenu('blog')}
          >
            <FaBook className="mr-1" />
            <span>Blog</span>
          </button>
          <div className={`collapse ${openMenu === 'blog' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/blogs/add">
                Add Blog
              </Link>
              <Link className="collapse-item" to="/blogs/list">
                Blog List
              </Link>
            </div>
          </div>
        </li>

        {/* Career */}
        <li className={`nav-item text-dark ${lastSegment === 'career' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'career'}
            onClick={() => toggleMenu('career')}
          >
            <FaUserTie className="mr-1" />
            <span>Career</span>
          </button>
          <div className={`collapse ${openMenu === 'career' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/careers/add">
                Add Career
              </Link>
              <Link className="collapse-item" to="/careers/list">
                Career List
              </Link>
            </div>
          </div>
        </li>

        {/* Service */}
        <li className={`nav-item text-dark ${lastSegment === 'service' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'service'}
            onClick={() => toggleMenu('service')}
          >
            <FaServicestack className="mr-1" />
            <span>Service</span>
          </button>
          <div className={`collapse ${openMenu === 'service' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/services/add">
                Add Service
              </Link>
              <Link className="collapse-item" to="/services/list">
                Service List
              </Link>
            </div>
          </div>
        </li>

        {/* FAQ */}
        <li className={`nav-item text-dark ${lastSegment === 'faq' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'faq'}
            onClick={() => toggleMenu('faq')}
          >
            <FaQuestionCircle className="mr-1" />
            <span>FAQs</span>
          </button>
          <div className={`collapse ${openMenu === 'faq' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/faqs">
                Add FAQ
              </Link>
              <Link className="collapse-item" to="/faqs/list">
                FAQ List
              </Link>
            </div>
          </div>
        </li>

        {/* Our Team */}
        <li className={`nav-item text-dark ${lastSegment === 'team' ? 'active' : ''}`}>
          <button
            className="nav-link collapsed w-100 text-left bg-transparent border-0"
            aria-expanded={openMenu === 'team'}
            onClick={() => toggleMenu('team')}
          >
            <FaUserTie className="mr-1" />
            <span>Our Team</span>
          </button>
          <div className={`collapse ${openMenu === 'team' ? 'show' : ''}`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/ourteam/add">
                Add Team
              </Link>
              <Link className="collapse-item" to="/ourteam">
                List Team
              </Link>
            </div>
          </div>
        </li>

        {/* Sidebar toggle button */}
        <div className="text-center text-dark d-none d-md-inline mt-5">
          <button className="rounded-circle border-0 text-dark" id="sidebarToggle" onClick={() => setToggle(!toggled)}></button>
        </div>
      </ul>

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" onClick={() => setToggle(!toggled)} className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <button
                  className="nav-link dropdown-toggle bg-transparent border-0"
                  id="userDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline admintext small">Admin</span>
                  <IoPersonCircleSharp size={20} style={{ color: '#073980' }} />
                </button>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <div className="dropdown-divider"></div>
                  <Button className="dropdown-item" text="Logout" onClick={logoutHandler} />
                </div>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
