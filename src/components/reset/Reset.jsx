import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import logo from '../../Assests/logo.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../styles/Styles';

function Reset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null); // To store error message
  const [success, setSuccess] = useState(false); // To indicate success

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.'); // Check if passwords match
      return;
    }

    try {
      const response = await axios.post(
        'https://etafqna-api.onrender.com/api/v1/auth/resetPassword',
        {
          email,
          password: newPassword,
          confirmPassword,
        }
      );

      if (response.data.status === 'success') {
        setSuccess(true); // Set success state
        setError(null); // Clear error
        navigate('/login'); // Navigate to login page after success
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Set the error message from response
      } else {
        setError('An unexpected error occurred. Please try again.'); // Default error message
      }
      setSuccess(false); // Clear success state
    }
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className="relative w-1/2 h-full flex flex-col bg-gray-200">
        <div className="my-[130px] align-baseline text-center flex flex-col">
          <img className='logo-image flex p-0 my-3' src={logo} alt='logo' />
          <motion.p className="p-0 text-center text-2xl font-bold text-gray-900 my-3">
            Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
          </motion.p>
        </div>
      </div>

      {/* Form to reset password */}
      <div className='w-1/2 h-full flex flex-col'>
        <div className='flex flex-col sm:px-20'>
          <h5 className="p-0 my-[50px] text-center text-3xl font-bold text-gray-900">
            <span>Change Password</span>
          </h5>
          <form onSubmit={handleResetPassword} className='space-y-7 flex flex-col w-full h-full'>
            <div>
              <label htmlFor='email' className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name='email'
                autoComplete='email'
                placeholder="Enter Your Email Address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
              />
            </div>
            <div>
              <label htmlFor='new-password' className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name='new-password'
                placeholder="••••••••"
                autoComplete='new-password'
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border  border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
              />
            </div>
            <div>
              <label htmlFor='confirm-password' className="block text-sm font-meduim text-gray-700">
                Confirm Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={visible ? "text" : "password"}
                  name='confirm-password'
                  placeholder="••••••••"
                  autoComplete='confirm-password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border  border-gray-400 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                />

                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    class="absolute right-2 top-2  cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-blue-orange border-gray-400 rounded-full"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I accept the Terms and Conditions
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
              >
                Reset Password
              </button>
              <p className="my-3 block text-center text-gray-400"> By clicking Reset Password<br />Iagree to <span className="text-orange-600">ETFA2NA'S</span> terms of service and privacy policy </p>

            </div>
            {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
            {success && <p className='text-green-500 text-center mt-3'>Password reset successful.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
