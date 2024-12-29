import React from 'react';
import { Link } from "react-router-dom";
import profileImage from '../../../Assests/SM.png';
import { FaUser, FaShieldAlt, FaMoon, FaBell, FaGlobe } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="flex py-20 justify-center min-h-500 bg-gray-100">
      <div className="flex w-full max-w-4xl border border-gray-300 rounded-lg p-8 shadow-lg ">
        <div className="flex-1 pr-10">
          <h2 className="text-3xl font-semibold mb-6">Settings</h2>
          <hr></hr>
          <ul className="space-y-4">
            <Link to="/Accountpage">
              <li className="flex items-center p-3 text-lg hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer rounded-lg border border-gray-300">
                <FaUser className="mr-3" /> Account
              </li>
            </Link>
            <li className="flex items-center p-3 text-lg hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer rounded-lg border border-gray-300">
              <FaShieldAlt className="mr-3" /> Privacy
            </li>
            <li className="flex items-center p-3 text-lg hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer rounded-lg border border-gray-300">
              <FaMoon className="mr-3" /> Dark Mode
            </li>
            <li className="flex items-center p-3 text-lg hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer rounded-lg border border-gray-300">
              <FaBell className="mr-3" /> Notifications
            </li>
            <li className="flex items-center p-3 text-lg hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer rounded-lg border border-gray-300">
              <FaGlobe className="mr-3" /> Language
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pl-10">
          <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Samar Mostafa</h3>
        </div>
      </div>
    </div>
  );
};

export default Settings;
