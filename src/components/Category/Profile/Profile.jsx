import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { logout } from "../../../utils/auth"; // Ensure the correct path

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get('Bearer'); 

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("No token provided");
        return;
      }

      try {
        const response = await axios.get('https://etafqna-api.onrender.com/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data.user;
        console.log("User data fetched successfully:", userData);

        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleEditClick = () => {
    navigate('/Editprofilepage');
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  const { name, email, phone, bio, location, image } = user;

  // Ensure location is properly handled
  let locationString = "No location set";
  if (location) {
    if (typeof location === 'string') {
      locationString = location;
    } else if (location.address) {
      locationString = location.address;
    }
  }

  return (
    <div className="min-500 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="mt-1 text-lg text-gray-800 bg-gray-100 p-2 rounded-lg">{name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1 text-lg text-gray-800 bg-gray-100 p-2 rounded-lg">{email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <p className="mt-1 text-lg text-gray-800 bg-gray-100 p-2 rounded-lg">{phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Bio</label>
              <p className="mt-1 text-lg text-gray-800 bg-gray-100 p-4 rounded-lg">{bio || " "}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Location</label>
              <p className="mt-1 text-lg text-gray-800 bg-gray-100 p-2 rounded-lg flex items-center">
                <CiLocationOn size={25} className="text-gray-600 mr-2" />
                {locationString}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={image ? image.url : "/default-photo.png"}
              className="w-40 h-40 rounded-full border border-gray-300"
              alt="Profile"
            />
            <button
              onClick={handleEditClick}
              className="w-full py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
