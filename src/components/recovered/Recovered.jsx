import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import logo from '../../Assests/logo.png';
import varifation from '../../Assests/varifation.png'

function Recovered() {
  const [otp, setOtp] = useState(''); // State to store OTP
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://etafqna-api.onrender.com/api/v1/auth/verifyCode',
        { otp }
      );
      if (response.data.status === 'success') {
        // If verification is successful, navigate to the "reset" page
        navigate('/reset'); // Adjust the route according to your app structure
      }
    } catch (err) {
      // If an error occurs, display an appropriate message
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Set the error message
      } else {
        setError('An unexpected error occurred. Please try again.'); // Default error message
      }
    }
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col bg-gray-200'>
        <div className='my-20 text-center flex flex-col'>
          <img className='logo-image flex p-0 my-3' src={logo} alt='logo' />
          <motion.p className='p-0 text-center text-2xl font-bold text-gray-900 my-3'>
            Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
          </motion.p>
        </div>
      </div>
      <div className='w-1/2 h-full flex flex-col'>
        <div className='flex flex-col sm:px-20'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='py-20 px-5 sm:rounded-2xl sm:px-12'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                <img className='my-2 h-48 ml-20' src={varifation} alt='OTP' />
              </h2>
              <div>
                <p className='text-center text-1xl my-5'>
                  Enter the OTP sent to your email
                </p>
              </div>
              {error && (
                <p className='text-red-500 text-center my-3'>{error}</p>
              )}
              <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                  type='text'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // Update OTP state
                />
                <div>
                  <button
                    type='submit'
                    className='w-full h-12 flex justify-center items-center bg-orange-600 text-white rounded-md hover:bg-orange-700'
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
              <div className='mt-6'>
                <Link to='/login' className='text-sm text-gray-600 hover:underline'>
                  Return to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovered;
