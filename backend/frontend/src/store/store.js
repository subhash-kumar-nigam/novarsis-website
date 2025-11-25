import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import jobReducer from "../slice/jobSlice";

import authSlice from '../slice/authSlice';
import userSlice from '../slice/userSlice';
// import contactusSlice from '../slice/contactusSlice';
 import serviceReducer from "../slice/serviceSlice";
import blogReducer from '../slice/blogSlice';
import contactReducer from '../slice/contactSlice';
import cartReducer from '../slice/cartSlice';
import applyNowReducer from '../slice/applyNowSlice';
import admissionReducer from '../slice/admissionSlice'
import galleryReducer from '../slice/gallerySlice'
import careerReducer from "../slice/careerSlice";
import faqReducer from "../slice/faqSlice";
 import teamReducer from "../slice/teamSlice";
import applyFormReducer from "../slice/applyFormSlice";

import rootSaga from '../apis/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    // contact: contactusSlice,
     applyForm: applyFormReducer,
    job: jobReducer,
    services: serviceReducer,
    blog: blogReducer,
    contact: contactReducer,
    cart: cartReducer,
    applyNow: applyNowReducer,
    admission: admissionReducer,
    gallery: galleryReducer,
     career: careerReducer,
    faqs: faqReducer,
      team: teamReducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;













///////////
// import React, { useEffect, useState } from "react";
// import { getRequest } from "../../apis/ApiInstence";

// const MyProfile = () => {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await getRequest("customer/profile");

//         console.log("API response:", res);

//         if (res?.success) {
//           setProfile(res.data);
//         } else {
//           console.error("Backend error:", res.message || res);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profile) return <div>Loading profile...</div>;

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">My Profile</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Mobile:</strong> {profile.mobile}</p>
//     </div>
//   );
// };

// export default MyProfile;



//////////
