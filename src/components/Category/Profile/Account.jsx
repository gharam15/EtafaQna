import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import photooo from '../../../Assests/SM.png';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for react-confirm-alert

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
  },
  content: {
    width: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    zIndex: '1010',
  },
};

const Account = () => {

  const handleDeactivate = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="react-confirm-alert-overlay" style={customStyles.overlay}>
          <div className="react-confirm-alert" style={customStyles.content}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deactivation</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to deactivate your account?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                onClick={() => {
                  // Handle deactivation logic
                  console.log('Account deactivated');
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="react-confirm-alert-overlay" style={customStyles.overlay}>
          <div className="react-confirm-alert" style={customStyles.content}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                onClick={() => {
                  // Handle deletion logic
                  console.log('Account deleted');
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex items-center py-20 justify-center min-h-500 bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto border border-gray-300 rounded-lg p-5 shadow-lg ">
        <div className="flex-1 pr-0 md:pr-5 mb-5 md:mb-0">
          <h2 className="text-3xl font-semibold mb-5 text-gray-800">Account</h2>
          <hr className="mb-3" />
          <div className="space-y-4">
            <Link to="/ChangePasswordpage">
              <button className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300">
                <TiDeleteOutline className="mr-2" />
                Change Password
              </button>
            </Link>
            <button
              onClick={handleDeactivate}
              className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300"
            >
              <TbExchange className="mr-2" />
              Deactivate Account
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300"
            >
              <RiDeleteBinLine className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-5">
          <img src={photooo} alt="Profile" className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Samar Mostafa</h3>
        </div>
      </div>
    </div>
  );
}

export default Account;
