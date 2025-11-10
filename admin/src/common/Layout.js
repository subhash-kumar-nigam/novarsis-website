// Layout.js
import Button from 'components/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'slice/userSlice';
import { useDispatch } from 'react-redux';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdContacts } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';

import { FaBook, FaQuestionCircle, FaUserTie, FaServicestack } from 'react-icons/fa';

import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import logo from '../asserts/img/logo.png'
// import Header from './Header';
// import Footer from './Footer';
// import { linklists, headersClasses } from './RouterList';
const currentUrl = window.location.pathname;
const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

const Layout = ({ children }) => {
  const [toggled, setToggle] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      nevigate('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div id="wrapper">
        <ul
          className={toggled ? 'navbar-nav sidebar sidebar-dark toggled' : 'navbar-nav sidebar sidebar-dark accordion'}
          id="accordionSidebar"
        >
          <Link className="text-decoration-none justify-content-start" to="/dashboard">
            <div className="text-center">
              <img src="/Novarsis-Logo-1-scaled.47b3e3bc739320c1b4da.webp" alt="adminlogo" className="img-fluid adminlogo" />
            </div>
          </Link>
          {/* <hr className="sidebar-divider my-0" /> */}
          <li className="nav-item text-dark">
            <Link className="nav-link" to="/dashboard">
              <MdDashboard className="mr-1" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Contact Us */}
          <li className={`nav-item ${lastSegment === 'contactus' ? 'active' : ''}`}>
            <Link
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'contactus'}
              onClick={() => toggleMenu('contactus')}
            >
              <MdContacts className="mr-1" />
              <span>Enquiry</span>
            </Link>
            <div id="contactus" className={`collapse ${openMenu === 'contactus' ? 'show' : ''}`} aria-labelledby="headingTwo">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item text-dark" to="/contactus">
                  Enquiry List
                </Link>
              </div>
            </div>
          </li>

          {/* Job Apply */}
          <li className={`nav-item ${lastSegment === 'apply' ? 'active' : ''}`}>
            <Link
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'apply'}
              onClick={() => toggleMenu('apply')}
            >
              <MdContacts className="mr-1" />
              <span>Job Apply</span>
            </Link>
            <div id="apply" className={`collapse ${openMenu === 'apply' ? 'show' : ''}`} aria-labelledby="headingTwo">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item text-dark" to="/apply">
                  Job Apply List
                </Link>
              </div>
            </div>
          </li>

          {/* Our GAllery */}
          <li className={`nav-item text-dark ${lastSegment === 'gallery' ? 'active' : ''}`}>
            <Link
              className="nav-link text-dark collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'gallery'}
              onClick={() => toggleMenu('gallery')}
            >
              <GrGallery className="mr-1" />
              <span>Our Gallery</span>
            </Link>
            <div id="ourteam" className={`collapse ${openMenu === 'gallery' ? 'show' : ''}`} aria-labelledby="headingTwo">
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

          <li className={`nav-item text-dark ${lastSegment === 'blog' ? 'active' : ''}`}>
            <button
              className="nav-link text-dark collapsed w-100 text-left bg-transparent border-0"
              data-toggle="collapse"
              aria-expanded={openMenu === 'blog'}
              onClick={() => toggleMenu('blog')}
            >
              <FaBook className="mr-1" />
              <span>Blog</span>
            </button>

            <div id="blog" className={`collapse ${openMenu === 'blog' ? 'show' : ''}`} aria-labelledby="headingBlog">
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

          {/* Career List */}
          <li className={`nav-item text-dark ${lastSegment === 'career' ? 'active' : ''}`}>
            <Link
              className="nav-link text-dark collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'career'}
              onClick={() => toggleMenu('career')}
            >
              <FaUserTie className="mr-1" /> {/* Career icon */}
              <span>Career</span>
            </Link>

            <div id="career" className={`collapse ${openMenu === 'career' ? 'show' : ''}`} aria-labelledby="headingCareer">
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

          {/* Service List */}
          <li className={`nav-item text-dark ${lastSegment === 'service' ? 'active' : ''}`}>
            <Link
              className="nav-link text-dark collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'service'}
              onClick={() => toggleMenu('service')}
            >
              <FaServicestack className="mr-1" /> {/* Service icon */}
              <span>Service</span>
            </Link>

            <div id="service" className={`collapse ${openMenu === 'service' ? 'show' : ''}`} aria-labelledby="headingService">
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

          {/* faqs  */}
          <li className={`nav-item text-dark ${lastSegment === 'faq' ? 'active' : ''}`}>
            <Link
              className="nav-link text-dark collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'faq'}
              onClick={() => toggleMenu('faq')}
            >
              <FaQuestionCircle className="mr-1" /> {/* FAQ icon */}
              <span>FAQs</span>
            </Link>
            <div id="faq" className={`collapse ${openMenu === 'faq' ? 'show' : ''}`} aria-labelledby="headingFaq">
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

          {/* Our team  */}
          <li className={`nav-item text-dark ${lastSegment === 'team' ? 'active' : ''}`}>
            <Link
              className="nav-link text-dark collapsed"
              href="#"
              data-toggle="collapse"
              aria-expanded={openMenu === 'team'}
              onClick={() => toggleMenu('team')}
            >
              <FaQuestionCircle className="mr-1" /> {/* FAQ icon */}
              <span>Our Team</span>
            </Link>
            <div id="team" className={`collapse ${openMenu === 'team' ? 'show' : ''}`} aria-labelledby="headingFaq">
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

          <div className="text-center text-dark d-none d-md-inline mt-5">
            <button className="rounded-circle border-0 text-dark" id="sidebarToggle" onClick={() => setToggle(!toggled)}></button>
          </div>
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" onClick={() => setToggle(!toggled)} className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>
              <ul className="navbar-nav ml-auto">
                {/* <div className="topbar-divider d-none d-sm-block"></div> */}
                <li className="nav-item dropdown no-arrow">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline admintext small">Admin</span>
                    <IoPersonCircleSharp size={20} style={{ color: '#073980' }} />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <div className="dropdown-divider"></div>
                    <Button className="dropdown-item" text="Logout" onclickfun={logoutHandler} />
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  </div>
                </li>
              </ul>
            </nav>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
