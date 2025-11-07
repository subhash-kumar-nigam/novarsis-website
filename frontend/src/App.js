import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Footer from './components/Footer';
import './App.css';
import Login from './pages/user/Login';
import Regsiter from './pages/user/Regsiter';
import About from './pages/about/About';
import UserDashboard from './pages/user/UserDashboard';
import ScrollToTop from './pages/TopToBack/ScrollToTop';
import Top from './pages/TopToBack/Top';
import OtpVerification from './pages/user/OtpVerification';
import MyProfile from './pages/user/Myrpofile';
import MyCourse from './pages/user/MyCourse';
import MyJob from './pages/user/MyJob';
import Header from './components/Header';
import ServiceBanner from './pages/service/ServiceBanner';
import FAQSection from './pages/FAQS/FAQSection';
import Blog from './pages/blog/Blog';
import ActivitiesSection from './pages/gallery/gallery';
import CareersPage from './pages/carrier/CareersPage';
import ApplyForm from './pages/carrier/ApplyForm';


const App = () => {
  return (
    <>
    <Header />
    <ScrollToTop />
        <Routes>
        {/* General Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServiceBanner/>} />
        <Route path="/faq" element={<FAQSection/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/gallery" element={<ActivitiesSection/>} />
        <Route path="/career" element={<CareersPage/>} />
        <Route path="/apply" element={<ApplyForm/>} />
       
       
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter />} />
        <Route path="/otpverify" element={<OtpVerification />} />

        {/* User Dashboard */}
        <Route path="/user" element={<UserDashboard />}>
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="myjobs" element={<MyJob />} />
          <Route path="mycourses" element={<MyCourse />} />
        </Route>

      </Routes>
        <Top />
      <Footer />
    </>
  );
};

export default App;
