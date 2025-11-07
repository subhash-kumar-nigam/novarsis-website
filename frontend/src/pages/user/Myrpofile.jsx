import React, { useEffect, useState } from 'react';
import { getRequest } from '../../apis/ApiInstence';

const Myrpofile = () => {
  const [user, setUser] = useState(null);

 useEffect(() => {
  const fetchProfile = async () => {
    const id = localStorage.getItem("userId");
    console.log("Fetched ID from localStorage:", id);

    if (!id || id === "undefined") {
      console.warn("No valid userId found in localStorage");
      return;
    }

    try {
      const res = await getRequest(`customer/one/${id}`);
      console.log("API Response:", res);
      if (res?.data) setUser(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchProfile();
}, []);


  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#fc3c04]">My Profile</h2>
      {user ? (
        <div className="space-y-2 text-lg">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      ) : (
        <p className="text-red-500">User data not found. Check console for errors.</p>
      )}
    </div>
  );
};

export default Myrpofile;
